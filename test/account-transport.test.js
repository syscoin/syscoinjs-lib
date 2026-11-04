const test = require('tape')
const { utils } = require('..')

test('existing Blockbook account path accepts an owned transport without global fetch', async t => {
  const original = globalThis.fetch
  globalThis.fetch = async () => { throw new Error('Unexpected global fetch') }
  try {
    const calls = []
    const identifier = 'wpkh([abcd/84h/57h/0h]zpub-public/0/*)#checksum'
    const controller = new AbortController()
    const tokens = [{ name: 'sys1public', path: 'm/84h/57h/0h/0/0' }]
    let indexed
    const result = await utils.fetchBackendAccount('https://blockbook.invalid/', identifier,
      'details=tokenBalances&tokens=nonzero', true, { setLatestIndexesFromXPubTokens (value) { indexed = value } }, {
        signal: controller.signal,
        async fetch (url, init) {
          calls.push({ url, init })
          return { ok: true, async json () { return { balance: '9007199254740993', unconfirmedBalance: '-1', tokens } } }
        }
      })
    t.equal(calls.length, 1, 'one account request; no address scan')
    t.equal(calls[0].url, 'https://blockbook.invalid/api/v2/xpub/' + encodeURIComponent(identifier) + '?details=tokenBalances&tokens=nonzero')
    t.equal(calls[0].init.method, 'GET')
    t.equal(calls[0].init.signal, controller.signal)
    t.equal(result.balance, '9007199254740993', 'no amount conversion')
    t.equal(result.unconfirmedBalance, '-1')
    t.equal(result.addressOrXpub, identifier)
    t.equal(indexed, tokens, 'existing signer index update is retained')
  } finally { globalThis.fetch = original; t.end() }
})

test('owned account fetch honors cancellation before dispatch and after decoding', async t => {
  for (const when of ['before', 'decoded']) {
    const controller = new AbortController()
    let calls = 0; let indexed = false
    if (when === 'before') controller.abort()
    try {
      await utils.fetchBackendAccount('https://blockbook.invalid', 'public', undefined, true,
        { setLatestIndexesFromXPubTokens () { indexed = true } }, {
          signal: controller.signal,
          async fetch () {
            calls++
            return { ok: true, async json () { controller.abort(); return { tokens: [] } } }
          }
        })
      t.fail('Canceled lookup must reject')
    } catch (error) { t.equal(error.name, 'AbortError', when) }
    t.equal(calls, when === 'before' ? 0 : 1)
    t.equal(indexed, false, 'late data cannot update receive/change indices')
  }
  t.end()
})

test('owned transport failures propagate while the existing default keeps its result contract', async t => {
  const failure = new Error('Synthetic unavailable account')
  try {
    await utils.fetchBackendAccount('https://blockbook.invalid', 'public', undefined, false, undefined,
      { async fetch () { throw failure } })
    t.fail('Owned failure must reject')
  } catch (error) { t.equal(error, failure) }
  const original = globalThis.fetch
  globalThis.fetch = async () => { throw failure }
  try { t.equal(await utils.fetchBackendAccount('https://blockbook.invalid', 'public'), null, 'default callers retain their existing null failure result') } finally { globalThis.fetch = original; t.end() }
})
