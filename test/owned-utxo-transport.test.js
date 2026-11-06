const test = require('tape')
const assert = require('node:assert/strict')
const { spawnSync } = require('node:child_process')
const path = require('node:path')
const syscointx = require('syscointx-js')
const { SyscoinJSLib, utils } = require('..')
const { bitcoinjs: bitcoin, BN } = utils
const network = utils.syscoinNetworks.mainnet
const backend = 'https://blockbook.invalid/wallet/'
const base = 'https://blockbook.invalid/wallet'
const sendUrl = base + '/api/v2/sendtx/'
// Fixed synthetic key and transaction inputs. No real wallet or provider is used.
const key = bitcoin.ECPair.fromPrivateKey(Buffer.alloc(32, 1), { network })
const legacy = bitcoin.payments.p2pkh({ pubkey: key.publicKey, network })
const receive = bitcoin.payments.p2wpkh({ pubkey: key.publicKey, network })
const previous = new bitcoin.Transaction()
previous.addInput(Buffer.alloc(32, 7), 0)
previous.addOutput(legacy.output, 100000n)
const source = 'fixture/qualified public key'
const fundingUrl = base + '/api/v2/utxo/' + encodeURIComponent(source)
const rawUrl = base + '/api/v2/tx/' + previous.getId()
const funding = () => [{ txid: previous.getId(), vout: 0, value: '100000', address: legacy.address, confirmations: 10 }]
const respond = (url, data) => ({ ok: true, url, redirected: false, json: async () => data })
const begin = (fetch, signal = new AbortController().signal) => ({ fetch, signal, prepare: async () => {}, assertCurrent () {} })

async function offline (action) {
  const fetch = globalThis.fetch
  globalThis.fetch = async () => { throw new Error('Unexpected ambient fetch') }
  try { return await action() } finally { globalThis.fetch = fetch }
}
async function assertFailure (t, action, dispatched, label, txid) {
  try {
    await action()
    t.fail(label + ' must reject')
  } catch (error) {
    t.equal(error.code, dispatched ? 'UTXO_SUBMISSION_UNKNOWN' : 'UTXO_SUBMISSION_NOT_DISPATCHED', label)
    t.equal(error.transactionNotBroadcast, !dispatched, label + ' uses local dispatch evidence')
    if (txid) t.equal(error.txid, txid, label + ' retains canonical id')
    t.equal(error.message.includes('PRIVATE PROVIDER DETAIL'), false, label + ' omits provider payload')
  }
}
function nativeBuild (main) {
  return main.createTransaction({ rbf: true }, legacy.address, [{ address: receive.address, value: new BN(40000) }], new BN(2), source)
}
function finalize (psbt) {
  psbt.signInput(0, key)
  psbt.finalizeAllInputs()
  return psbt
}

// An actual P2PKH path exercises both funding and the legacy previous tx lookup.
test('owned funding, fee and legacy PSBT use one scoped transport and preserve exact unsigned bytes', async t => {
  const calls = []
  const signal = new AbortController().signal
  let unowned
  const ambient = globalThis.fetch
  try {
    globalThis.fetch = async (...args) => {
      calls.push(args)
      const [url] = args
      if (url === fundingUrl) return respond(url, funding())
      if (url === rawUrl) return respond(url, { hex: previous.toHex() })
      return respond(url, { result: '0.00001234' })
    }
    unowned = await nativeBuild(new SyscoinJSLib(null, backend, network))
    t.deepEqual(calls.splice(0), [[fundingUrl], [rawUrl]], 'default calls keep their original URL and invocation shape')
    t.equal(await utils.fetchEstimateFee(backend, 1, 'conservative=false'), 0.00001234, 'default fee behavior')
    t.deepEqual(calls.splice(0), [[base + '/api/v2/estimatefee/1?conservative=false']])
    await offline(async () => {
      const transport = {
        signal,
        async fetch (url, init) {
          calls.push({ url, init })
          if (url === fundingUrl || url === fundingUrl + '?confirmed=true') return respond(url, funding())
          if (url === rawUrl) return respond(url, { hex: previous.toHex() })
          return respond(url, { result: '0.00001234' })
        }
      }
      const selected = { ...network, bip32: { ...network.bip32 } }
      const owned = new SyscoinJSLib(null, backend, selected, transport)
      t.equal(Reflect.set(owned, 'blockbookURL', 'https://elsewhere.invalid'), false, 'owned builder cannot be retargeted')
      const pending = nativeBuild(owned)
      const fetch = transport.fetch
      transport.fetch = async () => { throw new Error('Replaced transport must not run') }
      transport.signal = new AbortController().signal
      selected.bech32 = 'elsewhere'
      selected.bip32.public = 0
      const built = await pending
      t.equal(built.psbt.toHex(), unowned.psbt.toHex(), 'same selection, unsigned bytes and metadata')
      t.equal(built.fee.toString(), unowned.fee.toString(), 'same selected fee')
      finalize(built.psbt)
      t.equal(built.psbt.getFee(), BigInt(built.fee.toString()), 'legacy prevout verifies the exact fee')
      t.deepEqual(calls.map(call => call.url), [fundingUrl, rawUrl])
      const direct = { fetch, signal }
      t.equal((await utils.fetchBackendUTXOS(backend, source, 'confirmed=true', direct)).addressOrXpub, source)
      t.equal(await utils.fetchEstimateFee(backend, 1, 'conservative=false', direct), 0.00001234)
      t.deepEqual(calls.map(call => call.url), [fundingUrl, rawUrl, fundingUrl + '?confirmed=true', base + '/api/v2/estimatefee/1?conservative=false'])
      for (const { init } of calls) {
        t.equal(init.method, 'GET')
        t.equal(init.signal, signal)
      }
      await assertFailure(t, () => owned.send(built.psbt), false, 'read-only instance cannot fall back to an unowned send')
      t.equal(Reflect.set(owned, 'Signer', {}), false, 'owned builder cannot be changed into an automatic signer')
      t.equal(owned.network.bech32, network.bech32, 'network context is detached')
      t.equal(owned.network.bip32.public, network.bip32.public, 'key version is detached')
      t.throws(() => new SyscoinJSLib({}, backend, network, direct), TypeError, 'owned builder cannot auto-sign or auto-send')
      t.throws(() => new SyscoinJSLib(null, backend, undefined, direct), /explicit output network/, 'owned builder requires a selected network')
    })
  } catch (error) { t.fail(error) } finally { globalThis.fetch = ambient; t.end() }
})

test('owned funding and fee reads stop on cancel and propagate transport errors', async t => {
  try {
    await offline(async () => {
      const transportError = new Error('Synthetic read failure')
      for (const read of [
        transport => utils.fetchBackendUTXOS(backend, source, undefined, transport),
        transport => utils.fetchEstimateFee(backend, 1, undefined, transport)
      ]) {
        await assert.rejects(read({}), TypeError)
        await assert.rejects(read({ async fetch () { throw transportError } }), error => error === transportError)
        for (const stage of ['before', 'response', 'body']) {
          const controller = new AbortController()
          let calls = 0
          let decodes = 0
          if (stage === 'before') controller.abort()
          await assert.rejects(read({
            signal: controller.signal,
            async fetch () {
              calls++
              if (stage === 'response') controller.abort()
              return {
                ok: true,
                async json () { decodes++; controller.abort(); return { result: '0.1' } }
              }
            }
          }), { name: 'AbortError' })
          t.equal(calls, stage === 'before' ? 0 : 1, stage + ' dispatch count')
          t.equal(decodes, stage === 'body' ? 1 : 0, stage + ' decode count')
        }
      }
    })
  } catch (error) { t.fail(error) } finally { t.end() }
})

test('owned legacy funding cannot redirect a prevout GET to another route', async t => {
  try {
    await offline(async () => {
      const raw = signedFixture().extractTransaction().toHex()
      const hostileTxid = '../sendtx/' + raw
      const calls = []
      const transport = {
        async fetch (url) {
          calls.push(url)
          return respond(url, url === fundingUrl ? [{ ...funding()[0], txid: hostileTxid }] : { hex: previous.toHex() })
        }
      }
      await assert.rejects(nativeBuild(new SyscoinJSLib(null, backend, network, transport)))
      t.deepEqual(calls, [fundingUrl], 'reject provider-derived path segments before another GET')
      calls.length = 0
      await assert.rejects(utils.fetchBackendRawTx(backend, hostileTxid, transport))
      await assert.rejects(utils.fetchEstimateFee(backend, hostileTxid, undefined, transport))
      await assert.rejects(utils.fetchBackendUTXOS(backend, '../sendtx/' + raw, undefined, transport))
      t.deepEqual(calls, [], 'invalid owned direct routes never invoke the transport')
    })
  } catch (error) { t.fail(error) } finally { t.end() }
})

test('owned legacy PSBTs require a canonical body with the selected txid and vout', async t => {
  try {
    await offline(async () => {
      const different = previous.clone()
      different.locktime = 1
      for (const [body, vout] of [[{}, 0], [{ hex: '' }, 0], [{ hex: 'xyz' }, 0],
        [{ hex: different.toHex() }, 0], [{ hex: previous.toHex() }, 1]]) {
        const calls = []
        const main = new SyscoinJSLib(null, backend, network, {
          async fetch (url) {
            calls.push(url)
            return respond(url, url === fundingUrl ? [{ ...funding()[0], vout }] : body)
          }
        })
        await assert.rejects(nativeBuild(main), /previous transaction/)
        t.deepEqual(calls, [fundingUrl, rawUrl], 'failure stops after the single owned prevout')
      }
      const normalized = new SyscoinJSLib(null, backend, network, {
        async fetch (url) {
          if (url === fundingUrl) return respond(url, [{ ...funding()[0], txid: previous.getId().toUpperCase() }])
          t.equal(url, rawUrl, 'accepted hexadecimal casing uses the canonical GET route')
          return respond(url, { hex: previous.toHex() })
        }
      })
      t.equal((await nativeBuild(normalized)).psbt.txInputs[0].index, 0)
    })
  } catch (error) { t.fail(error) } finally { t.end() }
})

test('owned legacy PSBTs reject funding values and addresses that contradict the decoded prevout', async t => {
  try {
    await offline(async () => {
      const otherAddress = bitcoin.payments.p2pkh({
        pubkey: bitcoin.ECPair.fromPrivateKey(Buffer.alloc(32, 2), { network }).publicKey,
        network
      }).address
      for (const [name, override, expected] of [
        ['understated value', { value: '70000' }, /previous transaction value/],
        ['different script', { address: otherAddress }, /previous transaction script/]
      ]) {
        const calls = []
        const main = new SyscoinJSLib(null, backend, network, {
          async fetch (url) {
            calls.push(url)
            return respond(url, url === fundingUrl ? [{ ...funding()[0], ...override }] : { hex: previous.toHex() })
          }
        })
        await nativeBuild(main).then(({ psbt, fee }) => {
          if (override.value) {
            finalize(psbt)
            const difference = psbt.getFee() - BigInt(fee.toString(10))
            t.equal(difference, 30000n, 'a signable PSBT consumed the understated atoms as additional fee')
          }
          t.fail(name + ' must not produce a PSBT')
        }, error => {
          assert.match(error.message, expected)
          t.pass(name + ' rejected')
        })
        t.deepEqual(calls, [fundingUrl, rawUrl], 'verification used the selected provider and prevout')
      }
    })
  } catch (error) { t.fail(error) } finally { t.end() }
})

test('owned P2PKH prevout validation works with browser Buffer and BitcoinJS byte arrays', async t => {
  const nodeBuffer = globalThis.Buffer
  const browserBuffer = require('buffer/').Buffer
  globalThis.Buffer = browserBuffer
  try {
    await offline(async () => {
      const script = bitcoin.address.toOutputScript(legacy.address, network)
      t.ok(script instanceof Uint8Array, 'BitcoinJS yields a byte array')
      t.equal(browserBuffer.isBuffer(script), false, 'BitcoinJS script is not a browser Buffer')
      const calls = []
      const main = new SyscoinJSLib(null, backend, network, {
        async fetch (url) {
          calls.push(url)
          if (url === fundingUrl) return respond(url, funding())
          assert.equal(url, rawUrl)
          return respond(url, { hex: previous.toHex() })
        }
      })
      const { psbt, fee } = await nativeBuild(main)
      t.equal(browserBuffer.from(psbt.data.inputs[0].nonWitnessUtxo).toString('hex'), previous.toHex(), 'keeps the exact previous transaction bytes')
      t.equal(finalize(psbt).getFee(), BigInt(fee.toString(10)), 'signing pays the verified fee')
      t.deepEqual(calls, [fundingUrl, rawUrl], 'reads only the scoped source and selected prevout')

      const otherAddress = bitcoin.payments.p2pkh({
        pubkey: bitcoin.ECPair.fromPrivateKey(browserBuffer.alloc(32, 2), { network }).publicKey,
        network
      }).address
      const wrongScript = new SyscoinJSLib(null, backend, network, {
        async fetch (url) {
          if (url === fundingUrl) return respond(url, [{ ...funding()[0], address: otherAddress }])
          assert.equal(url, rawUrl)
          return respond(url, { hex: previous.toHex() })
        }
      })
      await assert.rejects(nativeBuild(wrongScript), /Mismatched owned legacy previous transaction script/)
      t.pass('rejects an address with a different output script under browser Buffer')
    })
  } catch (error) { t.fail(error) } finally {
    globalThis.Buffer = nodeBuffer
    t.end()
  }
})

test('owned legacy prevout values distinguish adjacent atoms above the safe Number range', async t => {
  try {
    await offline(async () => {
      const large = previous.clone()
      large.outs[0].value = 9007199254740993n
      const txid = large.getId()
      const main = new SyscoinJSLib(null, backend, network, {
        async fetch (url) {
          assert.equal(url, base + '/api/v2/tx/' + txid)
          return respond(url, { hex: large.toHex() })
        }
      })
      const build = value => main.createPSBTFromRes({
        txVersion: 2,
        inputs: [{ type: 'LEGACY', txId: txid, vout: 0, address: legacy.address, value: new BN(value) }],
        outputs: [{ address: receive.address, value: new BN(40000) }]
      })
      const psbt = await build('9007199254740993')
      t.equal(Buffer.from(psbt.data.inputs[0].nonWitnessUtxo).toString('hex'), large.toHex(), 'exact admitted bytes retained')
      await assert.rejects(build('9007199254740992'), /previous transaction value/)
      t.pass('one understated atom rejected')
    })
  } catch (error) { t.fail(error) } finally { t.end() }
})

test('owned legacy prevout verification uses the input captured before the fetch', async t => {
  try {
    await offline(async () => {
      const other = bitcoin.payments.p2pkh({
        pubkey: bitcoin.ECPair.fromPrivateKey(Buffer.alloc(32, 2), { network }).publicKey,
        network
      })
      const body = previous.clone()
      body.addOutput(other.output, 70000n)
      const txid = body.getId()
      for (const initialValue of [100000, 70000]) {
        let requested, release
        const started = new Promise(resolve => { requested = resolve })
        const held = new Promise(resolve => { release = resolve })
        const main = new SyscoinJSLib(null, backend, network, {
          async fetch (url) {
            assert.equal(url, base + '/api/v2/tx/' + txid)
            requested()
            await held
            return respond(url, { hex: body.toHex() })
          }
        })
        const input = { type: 'LEGACY', txId: txid, vout: 0, address: legacy.address, value: new BN(initialValue) }
        const pending = main.createPSBTFromRes({
          txVersion: 2,
          inputs: [input],
          outputs: [{ address: receive.address, value: new BN(40000) }]
        })
        await started
        input.vout = 1
        input.address = other.address
        input.value.isubn(initialValue - 70000)
        release()
        if (initialValue === 100000) {
          const psbt = await pending
          t.equal(psbt.txInputs[0].index, 0, 'the committed input keeps the original output index')
          const address = psbt.data.inputs[0].unknownKeyVals.find(pair => Buffer.from(pair.key).toString() === 'address')
          t.equal(Buffer.from(address.value).toString(), legacy.address, 'the committed input keeps its original verified address')
        } else {
          await assert.rejects(pending, /previous transaction value/)
          t.pass('the sibling output cannot authorize a mismatched selected input')
        }
      }
    })
  } catch (error) { t.fail(error) } finally { t.end() }
})

test('owned fee estimates accept only successful positive decimal quotes', async t => {
  try {
    await offline(async () => {
      for (const body of [null, {}, { result: 1 }, { result: '0' }, { result: '-1' },
        { result: '0.001garbage' }, { result: ' 0.001' }, { result: '1e-8' },
        { result: '9'.repeat(309) }, { result: '0.001', error: 'provider failure' }]) {
        await assert.rejects(utils.fetchEstimateFee(backend, 1, undefined, {
          async fetch (url) { return respond(url, body) }
        }), /fee/i)
        t.pass('invalid fee reply rejected')
      }
      let bodyReads = 0
      await assert.rejects(utils.fetchEstimateFee(backend, 1, undefined, {
        async fetch () { return { ok: false, status: 400, async json () { bodyReads++; return { result: '0.001' } } } }
      }), /fee/i)
      t.equal(bodyReads, 0, 'error body is not decoded as a quote')
    })
  } catch (error) { t.fail(error) } finally { t.end() }
})

test('owned retry waits are cancelled promptly across account, funding, fee and prevout reads', async t => {
  const schedule = globalThis.setTimeout
  const clear = globalThis.clearTimeout
  const timers = new Map()
  try {
    await offline(async () => {
      for (const read of [
        transport => utils.fetchBackendAccount(backend, source, undefined, true, undefined, transport),
        transport => utils.fetchBackendUTXOS(backend, source, undefined, transport),
        transport => utils.fetchEstimateFee(backend, 1, undefined, transport),
        transport => utils.fetchBackendRawTx(backend, previous.getId(), transport)
      ]) {
        let enter
        const waiting = new Promise(resolve => { enter = resolve })
        globalThis.setTimeout = (fn, delay) => {
          const timer = {}
          timers.set(timer, fn)
          enter(delay)
          return timer
        }
        globalThis.clearTimeout = timer => timers.delete(timer)
        const controller = new AbortController()
        let calls = 0
        let failure
        const pending = read({
          signal: controller.signal,
          async fetch () { calls++; return { ok: false, status: 429, statusText: 'Rate limited' } }
        }).catch(error => { failure = error })
        t.equal(await waiting, 1000, 'existing retry interval')
        controller.abort()
        await new Promise(resolve => setImmediate(resolve))
        t.equal(failure?.name, 'AbortError', 'settles without waiting for the retry interval')
        t.equal(timers.size, 0, 'abort clears the timer')
        for (const callback of timers.values()) callback()
        timers.clear()
        await pending
        t.equal(calls, 1, 'no retry was dispatched')
      }
    })
  } catch (error) { t.fail(error) } finally {
    globalThis.setTimeout = schedule
    globalThis.clearTimeout = clear
    t.end()
  }
})

function signedFixture () {
  const psbt = new bitcoin.Psbt({ network })
  psbt.addInput({ hash: previous.getId(), index: 0, nonWitnessUtxo: previous.toBuffer() })
  psbt.addOutput({ address: receive.address, value: 99000n })
  return finalize(psbt)
}

test('owned send admits exact signed bytes before one guarded POST and sanitizes a matching ACK', async t => {
  try {
    await offline(async () => {
      const psbt = signedFixture()
      const { raw, txid } = { raw: psbt.extractTransaction().toHex(), txid: psbt.extractTransaction().getId() }
      const calls = []
      let release
      const gate = new Promise(resolve => { release = resolve })
      const firstSignal = new AbortController().signal
      const submission = {
        signal: firstSignal,
        async prepare (request) { calls.push('prepare'); t.deepEqual(request, { url: sendUrl, rawTransaction: raw, txid }); t.ok(Object.isFrozen(request)); await gate },
        assertCurrent () { calls.push('guard') },
        async fetch (url, init) {
          t.equal(calls.at(-1), 'guard', 'final guard is synchronous and immediately precedes fetch')
          calls.push('post')
          t.equal(url, sendUrl)
          t.deepEqual(init, { method: 'POST', body: raw, signal: firstSignal, credentials: 'omit', redirect: 'error' })
          return respond(url, { result: txid, ignored: 'PRIVATE PROVIDER DETAIL' })
        }
      }
      const pending = new SyscoinJSLib(null, backend, network).send(psbt, undefined, submission)
      t.equal(calls.at(-1), 'prepare', 'no POST while durable admission is pending')
      submission.fetch = async () => { throw new Error('Replaced fetch must not run') }
      submission.assertCurrent = () => { throw new Error('Replaced guard must not run') }
      submission.signal = new AbortController().signal
      release()
      t.deepEqual(await pending, { txid }, 'existing send route delivers a sanitized exact ACK')
      t.equal(calls.filter(call => call === 'post').length, 1)
      t.deepEqual(await utils.sendRawTransaction(backend, raw, undefined, begin(async url => respond(url, { result: txid, ignored: 1 }))), { result: txid })
    })
  } catch (error) { t.fail(error) } finally { t.end() }
})

test('owned submission classifications separate refusal from possible dispatch and do not retry', async t => {
  try {
    await offline(async () => {
      const psbt = signedFixture(); const raw = psbt.extractTransaction().toHex(); const txid = psbt.extractTransaction().getId()
      for (const label of ['before', 'prepare failure', 'failed CAS', 'cancel during prepare', 'revoked guard', 'invalid backend', 'incomplete PSBT']) {
        const controller = new AbortController()
        let posts = 0
        let prepared = false
        if (label === 'before') controller.abort()
        const submission = begin(async () => { posts++; throw new Error('PRIVATE PROVIDER DETAIL') }, controller.signal)
        submission.prepare = async () => {
          prepared = true
          if (label === 'prepare failure') throw new Error('PRIVATE PROVIDER DETAIL')
          if (label === 'failed CAS') return false
          if (label === 'cancel during prepare') controller.abort()
        }
        submission.assertCurrent = () => { if (prepared && label === 'revoked guard') throw new Error('PRIVATE PROVIDER DETAIL') }
        const main = new SyscoinJSLib(null, label === 'invalid backend' ? null : backend, network)
        await assertFailure(t, () => main.send(label === 'incomplete PSBT' ? new bitcoin.Psbt({ network }) : psbt, undefined, submission), false, label)
        t.equal(posts, 0, label + ' no network entry')
        if (['before', 'invalid backend', 'incomplete PSBT'].includes(label)) t.notOk(prepared, label + ' no prepare')
      }
      for (const endpoint of [base + '?', base + '#', 'https://user@blockbook.invalid/wallet/', 'file:///blockbook']) {
        let requests = 0
        const submission = begin(async () => { requests++ })
        submission.prepare = async () => { requests++ }
        await assertFailure(t, () => utils.sendRawTransaction(endpoint, raw, undefined, submission), false, 'invalid endpoint')
        t.equal(requests, 0, 'invalid endpoint invokes neither prepare nor fetch')
      }
      for (const label of ['sync throw', 'abort in flight', 'abort during body', '429', '503', 'redirect', 'wrong URL', 'decode failure', 'wrong txid', 'uppercase txid', 'conflicting error', 'missing ACK']) {
        const controller = new AbortController()
        let posts = 0
        const submission = begin((url) => {
          posts++
          if (label === 'sync throw') throw Object.assign(new Error('PRIVATE PROVIDER DETAIL'), { transactionNotBroadcast: true })
          if (label === 'abort in flight') controller.abort()
          const body = {
            'wrong txid': { result: 'ab'.repeat(32) },
            'uppercase txid': { result: txid.toUpperCase() },
            'conflicting error': { result: txid, error: 'PRIVATE PROVIDER DETAIL' },
            'missing ACK': {}
          }[label] || { result: txid }
          return Promise.resolve({
            ...respond(url, body),
            ok: label !== '429' && label !== '503',
            status: Number(label) || 200,
            redirected: label === 'redirect',
            url: label === 'wrong URL' ? base + '/different' : url,
            async json () {
              if (label === 'decode failure') throw new SyntaxError('PRIVATE PROVIDER DETAIL')
              if (label === 'abort during body') controller.abort()
              return body
            }
          })
        }, controller.signal)
        await assertFailure(t, () => utils.sendRawTransaction(backend, raw, undefined, submission), true, label, txid)
        t.equal(posts, 1, label + ' no retry')
      }
    })
  } catch (error) { t.fail(error) } finally { t.end() }
})

test('owned PoDA refuses before preparation or POST and unowned serialization retains its existing shape', async t => {
  try {
    await offline(async () => {
      const main = new SyscoinJSLib(null, backend, network, {
        async fetch (url) {
          t.equal(url, rawUrl)
          return respond(url, { hex: previous.toHex() })
        }
      })
      const built = await main.createPoDA({ blobData: '01020304', rbf: true }, legacy.address, new BN(2), source,
        { utxos: funding() })
      const psbt = finalize(built.psbt)
      const original = psbt.extractTransaction()
      const txid = original.getId()
      const wire = original.clone()
      utils.setPoDA(wire, psbt.blobData)
      const nakedPayload = bitcoin.script.decompile(wire.outs.at(-1).script)[1]
      const framedPayload = syscointx.bufferUtils.serializePoDA({ ...syscointx.getPoDAFromTx(original), blobData: psbt.blobData })
      t.notEqual(Buffer.from(nakedPayload).toString('hex'), framedPayload.toString('hex'), 'legacy blob bytes omit the vector length')
      const rawTransaction = wire.toHex()
      let prepares = 0
      let posts = 0
      const submission = begin(async url => { posts++; return respond(url, { result: txid }) })
      submission.prepare = async () => { prepares++ }
      await assertFailure(t, () => main.send(psbt, undefined, submission), false, 'owned PoDA PSBT')
      t.equal(psbt.extractTransaction().getId(), txid, 'owned serialization does not mutate the extracted PSBT cache')
      await assertFailure(t, () => utils.sendRawTransaction(backend, rawTransaction, undefined, {
        ...submission, expectedTxid: wire.getId()
      }), false, 'direct expanded PoDA requires an authenticated binding')
      t.equal(prepares, 0, 'PoDA refusal precedes the durable hook')
      t.equal(posts, 0, 'PoDA refusal precedes POST')
      globalThis.fetch = async (url, init) => {
        posts++
        t.equal(url, sendUrl)
        t.equal(init.body, rawTransaction, 'default path still uses its original PoDA serialization')
        return respond(url, { result: txid })
      }
      t.equal(await new SyscoinJSLib(null, backend, network).send(psbt), psbt)
      t.equal(posts, 1)
    })
  } catch (error) { t.fail(error) } finally { t.end() }
})

test('scoped read-only builder rejects both implicit sign paths before signer entry', async t => {
  const signWithWIF = utils.signWithWIF
  try {
    await offline(async () => {
      const builder = new SyscoinJSLib(null, backend, network, { async fetch () { throw new Error('Unexpected dispatch') } })
      let signatures = 0
      const psbt = signedFixture()
      await assertFailure(t, () => builder.signAndSend(psbt, { async sign (value) { signatures++; return value } }), false, 'implicit signer')
      utils.signWithWIF = async value => { signatures++; return value }
      await assertFailure(t, () => builder.signAndSendWithWIF(psbt, 'fixture'), false, 'implicit WIF signer')
      t.equal(signatures, 0, 'neither implicit signer was entered')
    })
  } catch (error) { t.fail(error) } finally { utils.signWithWIF = signWithWIF; t.end() }
})

test('unowned sends retain their original PSBT, request, result and missing-backend behavior', async t => {
  const original = globalThis.fetch
  try {
    const psbt = signedFixture()
    const calls = []
    const legacyAck = { result: 'legacy accepted' }
    globalThis.fetch = async (...args) => { calls.push(args); return respond(sendUrl, legacyAck) }
    const main = new SyscoinJSLib(null, backend, network)
    const raw = psbt.extractTransaction().toHex()
    t.equal(await main.send(psbt), psbt)
    t.deepEqual(calls.splice(0), [[sendUrl, { method: 'POST', body: raw }]])
    t.equal(await utils.sendRawTransaction(backend, raw), legacyAck)
    t.deepEqual(calls.splice(0), [[sendUrl, { method: 'POST', body: raw }]])
    t.equal(await new SyscoinJSLib(null, null, network).send(psbt), psbt)
    t.deepEqual(calls, [])
  } catch (error) { t.fail(error) } finally { globalThis.fetch = original; t.end() }
})

test('default Axios routes and retry behavior still work without global fetch', t => {
  const script = `
    const assert = require('node:assert/strict')
    globalThis.fetch = undefined
    const waits = []
    globalThis.setTimeout = (fn, delay) => { waits.push(delay); queueMicrotask(fn) }
    const axios = require('axios')
    const { utils } = require(process.argv[1])
    const [backend, base, sendUrl] = process.argv.slice(2)
    const calls = []
    const rows = []
    axios.get = async (...args) => {
      calls.push(args)
      return { data: args[0].includes('/estimatefee/') ? { result: '0.00001234' } : rows }
    }
    let posts = 0
    axios.post = async (...args) => {
      calls.push(args)
      if (++posts === 1) throw Object.assign(new Error('Rate limited'), { response: { status: 429 } })
      return { data: { result: 'legacy accepted' } }
    }
    ;(async () => {
      assert.equal(await utils.fetchBackendUTXOS(backend, 'source'), rows)
      assert.equal(await utils.fetchEstimateFee(backend, 2), 0.00001234)
      assert.deepEqual(await utils.sendRawTransaction(backend, '0011'), { result: 'legacy accepted' })
      const config = { withCredentials: false }
      assert.deepEqual(calls, [
        [base + '/api/v2/utxo/source', config],
        [base + '/api/v2/estimatefee/2', config],
        [sendUrl, '0011', config],
        [sendUrl, '0011', config],
      ])
      assert.deepEqual(waits, [1000])
      const transport = { fetch: async () => { throw new Error('owned rejection') } }
      await assert.rejects(utils.fetchEstimateFee(backend, 2, undefined, transport), /owned rejection/)
      await assert.rejects(utils.fetchBackendUTXOS(backend, 'source', undefined, transport), /owned rejection/)
      assert.equal(calls.length, 4)
    })().catch(error => { console.error(error); process.exitCode = 1 })
  `
  const child = spawnSync(process.execPath, [
    '--require', path.join(__dirname, 'network-fence.cjs'), '-e', script, require.resolve('..'), backend, base, sendUrl
  ], { encoding: 'utf8', timeout: 10000 })
  t.error(child.error)
  t.equal(child.status, 0, child.stderr || 'legacy Axios and owned fallback assertions pass')
  t.end()
})
