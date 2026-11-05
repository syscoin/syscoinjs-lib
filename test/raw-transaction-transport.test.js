const test = require('tape')
const { spawnSync } = require('node:child_process')
const path = require('node:path')
const library = require('..')
const { utils } = library
const TXID = 'ab'.repeat(32)
const OTHER_TXID = 'cd'.repeat(32)
const response = { txid: TXID, hex: '010203', fees: '9007199254740993', vin: [], vout: [] }

async function rejects (t, action, check, label) {
  try { await action(); t.fail(label + ': must reject') } catch (error) { t.ok(check(error), label) }
}
function runIsolated (t, source) {
  const child = spawnSync(process.execPath, [
    '--unhandled-rejections=strict', '--require', path.join(__dirname, 'network-fence.cjs'),
    '-e', source, require.resolve('..')
  ], { cwd: path.resolve(__dirname, '..'), encoding: 'utf8', timeout: 10000 })
  t.error(child.error, 'isolated process completes')
  t.equal(child.status, 0, child.stderr || 'isolated assertions pass')
  t.end()
}

test('raw transaction lookup uses its owned transport and preserves the full JSON and hex', async t => {
  const original = globalThis.fetch
  globalThis.fetch = async () => { throw new Error('Unexpected global fetch') }
  try {
    const calls = []; const controller = new AbortController()
    const result = await utils.fetchBackendRawTx('https://blockbook.invalid/', TXID, {
      signal: controller.signal,
      async fetch (url, init) { calls.push({ url, init }); return { ok: true, async json () { return response } } }
    })
    t.equal(calls.length, 1)
    t.equal(calls[0].url, 'https://blockbook.invalid/api/v2/tx/' + TXID)
    t.equal(calls[0].init.method, 'GET')
    t.equal(calls[0].init.signal, controller.signal)
    t.equal(result, response, 'no new transaction parser or projection')
    t.equal(result.hex, '010203', 'legacy consumers still receive .hex')
    t.equal(result.fees, '9007199254740993', 'no amount conversion')
  } catch (error) { t.fail(error) } finally { globalThis.fetch = original; t.end() }
})

test('concurrent raw reads capture independent fetch and signal capabilities before awaiting', async t => {
  const original = globalThis.fetch
  globalThis.fetch = async () => { throw new Error('Unexpected global fetch') }
  try {
    const first = new AbortController(); const second = new AbortController(); const calls = []
    let release
    const wait = new Promise(resolve => { release = resolve })
    const transport = {
      signal: first.signal,
      async fetch (url, init) {
        calls.push({ url, init }); await wait
        return { ok: true, async json () { return response } }
      }
    }
    const pending = Promise.all([
      utils.fetchBackendRawTx('https://first.invalid', TXID, transport),
      utils.fetchBackendRawTx('https://second.invalid', OTHER_TXID, {
        signal: second.signal,
        async fetch (url, init) {
          calls.push({ url, init }); return { ok: true, async json () { return { txid: OTHER_TXID, hex: '04' } } }
        }
      })
    ])
    transport.fetch = async () => { throw new Error('Replaced fetch must not run') }
    transport.signal = second.signal
    release()
    const results = await pending
    t.deepEqual(calls.map(call => call.url), ['https://first.invalid/api/v2/tx/' + TXID, 'https://second.invalid/api/v2/tx/' + OTHER_TXID])
    t.equal(calls[0].init.signal, first.signal)
    t.equal(calls[1].init.signal, second.signal)
    t.equal(results[0], response)
    t.equal(results[1].txid, OTHER_TXID)
  } catch (error) { t.fail(error) } finally { globalThis.fetch = original; t.end() }
})

test('owned raw reads reject abort before dispatch, after response and after JSON decoding', async t => {
  const original = globalThis.fetch
  globalThis.fetch = async () => { throw new Error('Unexpected global fetch') }
  try {
    for (const stage of ['before', 'response', 'decoded']) {
      const controller = new AbortController(); let calls = 0; let decodes = 0
      if (stage === 'before') controller.abort()
      await rejects(t, () => utils.fetchBackendRawTx('https://blockbook.invalid', TXID, {
        signal: controller.signal,
        async fetch () {
          calls++
          if (stage === 'response') controller.abort()
          return { ok: true, async json () { decodes++; controller.abort(); return response } }
        }
      }), error => error.name === 'AbortError', stage)
      t.equal(calls, stage === 'before' ? 0 : 1, stage + ' dispatch count')
      t.equal(decodes, stage === 'decoded' ? 1 : 0, stage + ' decode count')
    }
  } finally { globalThis.fetch = original; t.end() }
})

test('owned raw read forwards abort to an in-flight transport without retrying it', async t => {
  const original = globalThis.fetch
  globalThis.fetch = async () => { throw new Error('Unexpected global fetch') }
  try {
    const controller = new AbortController(); const failure = new Error('Synthetic abort')
    failure.name = 'AbortError'
    let calls = 0
    const pending = utils.fetchBackendRawTx('https://blockbook.invalid', TXID, {
      signal: controller.signal,
      fetch (_url, init) { calls++; return new Promise((_resolve, reject) => init.signal.addEventListener('abort', () => reject(failure), { once: true })) }
    })
    controller.abort()
    await rejects(t, () => pending, error => error === failure, 'original transport abort propagates')
    t.equal(calls, 1)
  } finally { globalThis.fetch = original; t.end() }
})

test('owned raw failures and malformed JSON propagate; non-retryable missing data remains null', async t => {
  const original = globalThis.fetch
  globalThis.fetch = async () => { throw new Error('Unexpected global fetch') }
  try {
    const failure = new Error('Synthetic transport failure'); const malformed = new SyntaxError('Synthetic malformed JSON')
    await rejects(t, () => utils.fetchBackendRawTx('https://blockbook.invalid', TXID, { async fetch () { throw failure } }), error => error === failure, 'transport failure')
    await rejects(t, () => utils.fetchBackendRawTx('https://blockbook.invalid', TXID, { async fetch () { return { ok: true, async json () { throw malformed } } } }), error => error === malformed, 'JSON failure')
    let decodes = 0
    t.equal(await utils.fetchBackendRawTx('https://blockbook.invalid', TXID, { async fetch () { return { ok: false, status: 404, async json () { decodes++; return response } } } }), null)
    t.equal(decodes, 0, 'non-OK body is not decoded')
    t.equal(await utils.fetchBackendRawTx('https://blockbook.invalid', TXID, { async fetch () { return { ok: true, async json () { return null } } } }), null)
  } catch (error) { t.fail(error) } finally { globalThis.fetch = original; t.end() }
})

test('invalid explicit raw transport cannot fall back to a global request', async t => {
  const original = globalThis.fetch; let globalCalls = 0
  globalThis.fetch = async () => { globalCalls++; return { ok: true, async json () { return response } } }
  try {
    for (const transport of [{}, { fetch: null }, { fetch: 1 }]) {
      await rejects(t, () => utils.fetchBackendRawTx('https://blockbook.invalid', TXID, transport), error => error instanceof TypeError, 'invalid transport rejected')
    }
    t.equal(globalCalls, 0)
  } finally { globalThis.fetch = original; t.end() }
})

test('default two-argument raw fetch preserves URL, call shape, result and rejection behavior', async t => {
  const original = globalThis.fetch
  try {
    const calls = []
    globalThis.fetch = async (...args) => { calls.push(args); return { ok: true, async json () { return response } } }
    t.equal(await utils.fetchBackendRawTx('https://blockbook.invalid/', TXID), response)
    t.deepEqual(calls, [['https://blockbook.invalid/api/v2/tx/' + TXID]], 'no new default fetch options')
    globalThis.fetch = async () => ({ ok: false, status: 404 })
    t.equal(await utils.fetchBackendRawTx('https://blockbook.invalid', TXID), null)
    const failure = new Error('Synthetic default failure')
    globalThis.fetch = async () => { throw failure }
    await rejects(t, () => utils.fetchBackendRawTx('https://blockbook.invalid', TXID), error => error === failure, 'existing default rejection retained')
  } finally { globalThis.fetch = original; t.end() }
})

test('owned raw transport also works when global fetch is unavailable', t => {
  runIsolated(t, `
    const assert = require('node:assert/strict')
    globalThis.fetch = undefined
    require('axios').get = async () => { throw new Error('Unexpected axios fallback') }
    const { utils } = require(process.argv[1])
    const controller = new AbortController()
    ;(async () => {
      const result = await utils.fetchBackendRawTx('https://blockbook.invalid', '${TXID}', { signal: controller.signal, async fetch (url, init) {
        assert.equal(url, 'https://blockbook.invalid/api/v2/tx/${TXID}')
        assert.equal(init.method, 'GET'); assert.equal(init.signal, controller.signal)
        return { ok: true, json: async () => ({ txid: '${TXID}', hex: '04' }) }
      } })
      assert.equal(result.hex, '04')
    })().catch(error => { console.error(error); process.exitCode = 1 })
  `)
})

test('default raw axios fallback retains its original URL/config and full JSON contract', t => {
  runIsolated(t, `
    const assert = require('node:assert/strict')
    globalThis.fetch = undefined
    const axios = require('axios')
    const calls = [], response = { txid: '${TXID}', hex: '010203' }
    axios.get = async (...args) => { calls.push(args); return { data: response } }
    const { utils } = require(process.argv[1])
    ;(async () => {
      assert.equal(await utils.fetchBackendRawTx('https://blockbook.invalid/', '${TXID}'), response)
      assert.deepEqual(calls, [['https://blockbook.invalid/api/v2/tx/${TXID}', { withCredentials: false }]])
      axios.get = async () => ({})
      assert.equal(await utils.fetchBackendRawTx('https://blockbook.invalid', '${TXID}'), null)
      const failure = new Error('Synthetic axios failure')
      axios.get = async () => { throw failure }
      await assert.rejects(utils.fetchBackendRawTx('https://blockbook.invalid', '${TXID}'), error => error === failure)
    })().catch(error => { console.error(error); process.exitCode = 1 })
  `)
})

test('raw rate-limit backoff retains default retries and checks owned abort before a retry', t => {
  runIsolated(t, `
    const assert = require('node:assert/strict')
    const delays = []
    globalThis.setTimeout = (fn, delay) => { delays.push(delay); queueMicrotask(fn) }
    let calls = 0
    globalThis.fetch = async () => { calls++; return calls < 3 ? { ok: false, status: calls === 1 ? 503 : 429, statusText: 'Rate limited' } : { ok: true, json: async () => ({ txid: '${TXID}', hex: '00' }) } }
    const { utils } = require(process.argv[1])
    ;(async () => {
      assert.equal((await utils.fetchBackendRawTx('https://blockbook.invalid', '${TXID}')).hex, '00')
      assert.equal(calls, 3); assert.deepEqual(delays, [1000, 2000])
      const controller = new AbortController(); let ownedCalls = 0
      globalThis.fetch = async () => { throw new Error('Unexpected global fetch') }
      globalThis.setTimeout = (fn, delay) => { assert.equal(delay, 1000); controller.abort(); queueMicrotask(fn) }
      await assert.rejects(utils.fetchBackendRawTx('https://blockbook.invalid', '${TXID}', { signal: controller.signal, fetch: async () => { ownedCalls++; return { ok: false, status: 503, statusText: 'Rate limited' } } }), error => error.name === 'AbortError')
      assert.equal(ownedCalls, 1)
    })().catch(error => { console.error(error); process.exitCode = 1 })
  `)
})

test('the existing legacy PSBT caller still receives raw .hex via its unchanged two-argument lookup', async t => {
  const original = globalThis.fetch
  try {
    const bitcoin = utils.bitcoinjs; const previous = new bitcoin.Transaction()
    previous.addInput(Buffer.alloc(32, 7), 0)
    previous.addOutput(Buffer.from([0x51]), 5000n)
    previous.addOutput(Buffer.from([0x51]), 5000n)
    const calls = []
    globalThis.fetch = async (...args) => { calls.push(args); return { ok: true, async json () { return { txid: previous.getId(), hex: previous.toHex() } } } }
    const wallet = new library.SyscoinJSLib(undefined, 'https://blockbook.invalid')
    const psbt = await wallet.createPSBTFromRes({ txVersion: 2, inputs: [0, 1].map(vout => ({ type: 'LEGACY', txId: previous.getId(), vout, sequence: 0xfffffffd })), outputs: [] })
    t.deepEqual(calls, [['https://blockbook.invalid/api/v2/tx/' + previous.getId()]], 'existing per-PSBT previous-tx dedupe retained')
    for (const input of psbt.data.inputs) t.equal(Buffer.from(input.nonWitnessUtxo).toString('hex'), previous.toHex())
    t.equal(psbt.data.inputs.length, 2)
  } catch (error) { t.fail(error) } finally { globalThis.fetch = original; t.end() }
})
