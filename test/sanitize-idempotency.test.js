const test = require('tape')
const { utils } = require('..')
const { BN } = utils

const NETWORK = utils.syscoinNetworks.mainnet
const ADDRESS = 'sys1qhs4tuxsp6zdqvpqhrwc9xdlyzhtsqmdvqjyz6q'
const TARGET_ASSET = '1234'
const OTHER_ASSET = '9999'

const txid = seed => seed.repeat(64).slice(0, 64)

function rawUtxo (seed, opts = {}) {
  const utxo = {
    txid: txid(seed),
    vout: opts.vout === undefined ? 0 : opts.vout,
    value: opts.value || '100000',
    confirmations: opts.confirmations === undefined ? 10 : opts.confirmations,
    path: "m/84'/57'/0'/0/0"
  }
  if (opts.assetGuid) {
    utxo.assetInfo = { assetGuid: opts.assetGuid, value: opts.assetValue || '50' }
  }
  return utxo
}

const sanitize = (utxoObj, txOpts, assetMap, excludeZeroConf) =>
  utils.sanitizeBlockbookUTXOs(ADDRESS, utxoObj, NETWORK, txOpts, assetMap, excludeZeroConf)

// Pass a sanitized result back in the way a caller would: as an explicit utxos
// argument, with the utxo objects shallow-copied so the first result is untouched.
const reSanitize = (sanitized, txOpts, assetMap, excludeZeroConf) =>
  sanitize({ utxos: sanitized.utxos.map(u => ({ ...u })), assets: sanitized.assets }, txOpts, assetMap, excludeZeroConf)

const comparable = obj => JSON.stringify({
  utxos: obj.utxos.map(u => ({
    ...u,
    value: u.value.toString(),
    assetInfo: u.assetInfo && { ...u.assetInfo, value: u.assetInfo.value.toString() }
  })),
  assets: [...obj.assets].map(([guid, meta]) => [guid, {
    ...meta,
    maxsupply: meta.maxsupply && meta.maxsupply.toString(),
    contract: meta.contract && meta.contract.toString('hex')
  }])
})

test('sanitizeBlockbookUTXOs normalizes raw Blockbook UTXOs', t => {
  const sanitized = sanitize({ utxos: [rawUtxo('a')] })

  t.equal(sanitized.utxos.length, 1, 'keeps the utxo')
  t.equal(sanitized.utxos[0].txId, txid('a'), 'maps txid to txId')
  t.ok(BN.isBN(sanitized.utxos[0].value), 'converts value to BN')
  t.equal(sanitized.utxos[0].type, 'BECH32', 'derives the address type')
  t.end()
})

test('sanitizeBlockbookUTXOs is idempotent for already-sanitized UTXOs', t => {
  const once = sanitize({ utxos: [rawUtxo('a')] })
  const twice = reSanitize(once)

  t.equal(twice.utxos.length, 1, 'does not drop the utxo')
  t.equal(twice.utxos[0].txId, txid('a'), 'preserves txId instead of reading undefined utxo.txid')
  t.ok(BN.isBN(twice.utxos[0].value), 'keeps value a BN')
  t.equal(comparable(once), comparable(twice), 'second pass equals the first')
  t.end()
})

test('sanitizeBlockbookUTXOs normalizes a mixed sanitized/raw list', t => {
  const once = sanitize({ utxos: [rawUtxo('a')] })
  const mixed = sanitize({ utxos: [once.utxos[0], rawUtxo('b')] })

  t.equal(mixed.utxos.length, 2, 'keeps both utxos')
  t.ok(mixed.utxos.every(u => typeof u.txId === 'string' && u.txId.length === 64), 'every entry has a txId')
  t.ok(mixed.utxos.every(u => BN.isBN(u.value)), 'every entry has a BN value')
  t.end()
})

test('sanitizeBlockbookUTXOs normalizes a mixed list in raw-first order', t => {
  const once = sanitize({ utxos: [rawUtxo('a')] })
  const mixed = sanitize({ utxos: [rawUtxo('b'), once.utxos[0]] })

  t.equal(mixed.utxos.length, 2, 'keeps both utxos')
  t.equal(mixed.utxos[0].txId, txid('b'), 'normalizes the leading raw entry')
  t.equal(mixed.utxos[1].txId, txid('a'), 'preserves the trailing sanitized entry')
  t.ok(mixed.utxos.every(u => BN.isBN(u.value)), 'every entry has a BN value')
  t.end()
})

test('sanitizeBlockbookUTXOs handles partial and empty inputs', t => {
  const empty = sanitize({ utxos: [] })
  t.equal(empty.utxos.length, 0, 'empty utxos array yields no utxos')
  t.equal(empty.assets.size, 0, 'empty utxos array yields no assets')

  const noUtxosKey = sanitize({})
  t.equal(noUtxosKey.utxos.length, 0, 'missing utxos key is tolerated')

  const reEmpty = reSanitize(empty)
  t.equal(reEmpty.utxos.length, 0, 're-sanitizing an empty result stays empty')

  const bareArray = sanitize([rawUtxo('a')])
  t.equal(bareArray.utxos.length, 1, 'accepts a bare array of raw utxos')
  t.equal(bareArray.utxos[0].txId, txid('a'), 'normalizes a bare array entry')
  t.end()
})

test('sanitizeBlockbookUTXOs applies excludeZeroConf to every entry', t => {
  const confirmed = sanitize({ utxos: [rawUtxo('a')] })
  const mixed = sanitize(
    { utxos: [confirmed.utxos[0], rawUtxo('b', { confirmations: 0 })] },
    null, null, true
  )

  t.equal(mixed.utxos.length, 1, 'filters the zero-conf entry behind a sanitized one')
  t.equal(mixed.utxos[0].txId, txid('a'), 'keeps the confirmed entry')

  const sanitizedZeroConf = sanitize({ utxos: [rawUtxo('b', { confirmations: 0 })] })
  t.equal(sanitizedZeroConf.utxos.length, 1, 'zero-conf survives when the policy is off')
  const refiltered = reSanitize(sanitizedZeroConf, null, null, true)
  t.equal(refiltered.utxos.length, 0, 'an already-sanitized zero-conf utxo is still filtered')
  t.end()
})

test('sanitizeBlockbookUTXOs applies the asset whitelist to every entry', t => {
  const plain = sanitize({ utxos: [rawUtxo('a')] })
  const txOpts = { rbf: false, assetWhiteList: new Map([[OTHER_ASSET, {}]]) }

  const mixed = sanitize(
    { utxos: [plain.utxos[0], rawUtxo('b', { assetGuid: TARGET_ASSET })] },
    txOpts, null, false
  )
  t.equal(mixed.utxos.length, 1, 'filters the non-whitelisted asset utxo behind a sanitized one')
  t.equal(mixed.utxos[0].txId, txid('a'), 'keeps the plain SYS entry')

  const assetSanitized = sanitize({ utxos: [rawUtxo('b', { assetGuid: TARGET_ASSET })] })
  t.equal(assetSanitized.utxos.length, 1, 'asset utxo survives with no whitelist')
  const refiltered = reSanitize(assetSanitized, txOpts, null, false)
  t.equal(refiltered.utxos.length, 0, 'an already-sanitized asset utxo is still whitelist-filtered')
  t.end()
})

test('sanitizeBlockbookUTXOs preserves legacy asset metadata across passes', t => {
  const legacy = {
    utxos: [rawUtxo('a', { assetGuid: TARGET_ASSET })],
    assets: [{ assetGuid: TARGET_ASSET, maxSupply: '100000000000', decimals: 8 }]
  }
  const assetMap = new Map([[TARGET_ASSET, {}]])

  const once = sanitize(legacy, {}, assetMap, false)
  const twice = reSanitize(once, {}, assetMap, false)

  t.ok(twice.assets.has(TARGET_ASSET), 'keeps the asset entry keyed by guid')
  t.equal(twice.assets.get(TARGET_ASSET).maxsupply.toString(), '100000000000', 'keeps maxsupply')
  t.equal(twice.assets.get(TARGET_ASSET).precision, 8, 'keeps precision')
  t.equal(twice.utxos.length, 1, 'keeps the asset utxo')
  t.equal(comparable(once), comparable(twice), 'second pass equals the first')
  t.end()
})

test('sanitizeBlockbookUTXOs re-sanitizes modern asset UTXOs with no legacy assets collection', t => {
  const assetMap = new Map([[TARGET_ASSET, {}]])
  const once = sanitize({ utxos: [rawUtxo('a', { assetGuid: TARGET_ASSET })] }, {}, assetMap, false)
  const twice = reSanitize(once, {}, assetMap, false)

  t.equal(twice.utxos.length, 1, 'keeps the modern asset utxo')
  t.equal(twice.utxos[0].assetInfo.assetGuid, TARGET_ASSET, 'keeps the asset guid')
  t.ok(BN.isBN(twice.utxos[0].assetInfo.value), 'keeps the asset value a BN')
  t.equal(twice.utxos[0].assetInfo.value.toString(), '50', 'keeps the asset amount')
  t.end()
})

test('sanitizeBlockbookUTXOs accepts a new raw asset beside a nonempty sanitized assets Map', t => {
  const bothAssets = new Map([[TARGET_ASSET, {}], [OTHER_ASSET, {}]])
  const once = sanitize(
    { utxos: [rawUtxo('a', { assetGuid: TARGET_ASSET })] },
    {},
    bothAssets,
    false
  )
  const mixed = sanitize(
    {
      utxos: [once.utxos[0], rawUtxo('b', { assetGuid: OTHER_ASSET })],
      assets: once.assets
    },
    {},
    bothAssets,
    false
  )

  t.equal(mixed.utxos.length, 2, 'keeps both the sanitized and newly appended raw asset UTXOs')
  t.deepEqual(
    mixed.utxos.map(u => u.assetInfo.assetGuid),
    [TARGET_ASSET, OTHER_ASSET],
    'keeps both asset GUIDs'
  )
  t.ok(mixed.assets.has(TARGET_ASSET), 'keeps the existing sanitized asset metadata')
  t.ok(mixed.assets.has(OTHER_ASSET), 'adds metadata for the newly encountered modern asset')
  t.end()
})
