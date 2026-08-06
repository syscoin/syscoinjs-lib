let test
try {
  test = require('tape')
} catch (_) {
  const tests = []
  test = (name, fn) => tests.push({ name, fn })
  setImmediate(() => {
    ;(async () => {
      for (const { name, fn } of tests) {
        const t = {
          equal: (actual, expected, msg) => {
            if (actual !== expected) throw new Error(`${name}: ${msg || 'equal'} expected ${expected}, got ${actual}`)
          },
          ok: (value, msg) => {
            if (!value) throw new Error(`${name}: ${msg || 'ok'} expected truthy value`)
          },
          fail: msg => {
            throw new Error(`${name}: ${msg || 'failed'}`)
          },
          end: () => {}
        }
        await fn(t)
        console.log(`ok - ${name}`)
      }
    })().catch(err => {
      console.error(err)
      process.exitCode = 1
    })
  })
}
const BN = require('bn.js')
const Syscoin = require('../').syscoin
const utils = require('../utils')
const syscointx = require('syscointx-js')

const ADDRESS = 'tsys1qdflre2yd37qtpqe2ykuhwandlhq04r2td2t9ae'
const ETH_ADDRESS = Buffer.from('bf76b51ddfbe584b92d039c95f6444fabc8956a6', 'hex')
const TARGET_ASSET = '123456'
const OTHER_ASSET = '654321'
const NUMERIC_TARGET_ASSET = 123456

function txid (byte) {
  return byte.repeat(64)
}

function assetMapFor (assetGuid = TARGET_ASSET, value = 500) {
  return new Map([[assetGuid, {
    changeAddress: ADDRESS,
    outputs: [{ value: new BN(value) }]
  }]])
}

function bridgeAssetOpts () {
  return { ethaddress: ETH_ADDRESS }
}

function modernBlockbookExactSysxUtxos () {
  return [
    {
      txid: 'bcc5ffea63a4edebe771cbc60713ac9313b006f5dcde5e523028614e1c97a161',
      vout: 1,
      value: '2989998650',
      height: 1790003,
      confirmations: 1,
      address: ADDRESS,
      path: "m/84'/1'/0'/0/0",
      assetInfo: {
        assetGuid: TARGET_ASSET,
        value: '10000000',
        valueStr: '0.1',
        symbol: 'SYSX'
      }
    }
  ]
}

function utxoFixture () {
  return {
    assets: [
      { assetGuid: TARGET_ASSET, maxSupply: '100000000000', decimals: 8 },
      { assetGuid: OTHER_ASSET, maxSupply: '100000000000', decimals: 8 }
    ],
    utxos: [
      {
        txid: txid('1'),
        vout: 0,
        value: '1000',
        address: ADDRESS,
        confirmations: 10,
        assetInfo: { assetGuid: TARGET_ASSET, value: '1000' }
      },
      {
        txid: txid('2'),
        vout: 0,
        value: '1000',
        address: ADDRESS,
        confirmations: 10,
        assetInfo: { assetGuid: OTHER_ASSET, value: '1000' }
      },
      {
        txid: txid('3'),
        vout: 0,
        value: '100000',
        address: ADDRESS,
        confirmations: 10
      }
    ]
  }
}

function typedGuidUtxoFixture (assetGuid) {
  return {
    assets: [
      { assetGuid, maxSupply: '100000000000', decimals: 8 }
    ],
    utxos: [
      {
        txid: txid('1'),
        vout: 0,
        value: '1000',
        address: ADDRESS,
        confirmations: 10,
        assetInfo: { assetGuid, value: '1000' }
      },
      {
        txid: txid('3'),
        vout: 0,
        value: '100000',
        address: ADDRESS,
        confirmations: 10
      }
    ]
  }
}

function opReturnForAllocations (assetAllocations, ethaddress = ETH_ADDRESS) {
  const allocation = syscointx.bufferUtils.serializeAssetAllocations(assetAllocations)
  const burn = syscointx.bufferUtils.serializeAllocationBurn({ ethaddress })
  return utils.bitcoinjs.payments.embed({ data: [Buffer.concat([allocation, burn])] }).output
}

function mintAssetOpts () {
  return {
    ethtxid: Buffer.alloc(32, 1),
    blockhash: Buffer.alloc(32, 2),
    txvalue: Buffer.from('aa', 'hex'),
    txroot: Buffer.alloc(32, 3),
    txparentnodes: Buffer.from('00aa00', 'hex'),
    txpath: Buffer.from('bb', 'hex'),
    receiptvalue: Buffer.from('cc', 'hex'),
    receiptroot: Buffer.alloc(32, 4),
    receiptparentnodes: Buffer.from('00cc00', 'hex'),
    txpos: 1,
    receiptpos: 1
  }
}

function opReturnForMint (assetAllocations, assetOpts = mintAssetOpts(), extraPayload = Buffer.alloc(0)) {
  const allocation = syscointx.bufferUtils.serializeAssetAllocations(assetAllocations)
  const mint = syscointx.bufferUtils.serializeMintSyscoin(assetOpts)
  return utils.bitcoinjs.payments.embed({ data: [Buffer.concat([allocation, mint, extraPayload])] }).output
}

function goodBurnBuilderResult (extraPayload = Buffer.alloc(0)) {
  const balancedAllocation = [{ assetGuid: TARGET_ASSET, values: [{ n: 0, value: new BN(500) }, { n: 1, value: new BN(500) }] }]
  const outputs = [
    {
      type: 'BECH32',
      address: ADDRESS,
      value: new BN(680),
      assetInfo: { assetGuid: TARGET_ASSET, value: new BN(500) }
    },
    {
      script: extraPayload.length
        ? utils.bitcoinjs.payments.embed({
          data: [Buffer.concat([
            syscointx.bufferUtils.serializeAssetAllocations(balancedAllocation),
            syscointx.bufferUtils.serializeAllocationBurn({ ethaddress: ETH_ADDRESS }),
            extraPayload
          ])]
        }).output
        : opReturnForAllocations(balancedAllocation),
      value: new BN(0)
    }
  ]
  return {
    success: true,
    txVersion: 141,
    inputs: [
      { type: 'BECH32', address: ADDRESS, txId: txid('1'), vout: 0, value: new BN(1000), assetInfo: { assetGuid: TARGET_ASSET, value: new BN(1000) } },
      { type: 'BECH32', address: ADDRESS, txId: txid('3'), vout: 0, value: new BN(100000) }
    ],
    outputs,
    fee: new BN(1000),
    feeRate: new BN(10),
    size: 200
  }
}

function goodMintBuilderResult (assetOpts = mintAssetOpts()) {
  const outputs = [
    {
      type: 'BECH32',
      address: ADDRESS,
      value: new BN(680),
      assetInfo: { assetGuid: TARGET_ASSET, value: new BN(500) }
    },
    {
      script: opReturnForMint([{ assetGuid: TARGET_ASSET, values: [{ n: 0, value: new BN(500) }] }], assetOpts),
      value: new BN(0)
    }
  ]
  return {
    success: true,
    txVersion: 140,
    inputs: [
      { type: 'BECH32', address: ADDRESS, txId: txid('3'), vout: 0, value: new BN(100000) }
    ],
    outputs,
    fee: new BN(1000),
    feeRate: new BN(10),
    size: 200
  }
}

async function captureResult (fn) {
  const syscoin = new Syscoin(null, null, utils.syscoinNetworks.testnet)
  let captured
  syscoin.createPSBTFromRes = async function (res) {
    captured = res
    return res
  }
  const result = await fn(syscoin)
  return { captured, result }
}

test('bridge burn rejects multi-asset assetMap', async t => {
  const syscoin = new Syscoin(null, null, utils.syscoinNetworks.testnet)
  const multiAssetMap = assetMapFor()
  multiAssetMap.set(OTHER_ASSET, { changeAddress: ADDRESS, outputs: [{ value: new BN(1) }] })

  try {
    await syscoin.assetAllocationBurn(bridgeAssetOpts(), {}, multiAssetMap, ADDRESS, new BN(10), null, utxoFixture())
    t.fail('expected multi-asset bridge burn to throw')
  } catch (err) {
    t.equal(err.code, 'INVALID_BRIDGE_BURN_ASSET_MAP')
  }
  t.end()
})

test('bridge burn rejects whitelist containing non-target assets', async t => {
  const syscoin = new Syscoin(null, null, utils.syscoinNetworks.testnet)

  try {
    await syscoin.assetAllocationBurn(
      bridgeAssetOpts(),
      { assetWhiteList: new Map([[OTHER_ASSET, true]]) },
      assetMapFor(),
      ADDRESS,
      new BN(10),
      null,
      utxoFixture()
    )
    t.fail('expected non-target whitelist to throw')
  } catch (err) {
    t.equal(err.code, 'INVALID_BRIDGE_BURN_WHITELIST')
  }
  t.end()
})

test('bridge burn ignores non-target asset UTXOs during gas funding', async t => {
  const { captured } = await captureResult(syscoin => syscoin.assetAllocationBurn(
    bridgeAssetOpts(),
    {},
    assetMapFor(),
    ADDRESS,
    new BN(10),
    null,
    utxoFixture()
  ))

  t.ok(captured, 'captured builder result')
  t.equal(captured.inputs.filter(input => input.assetInfo && input.assetInfo.assetGuid === OTHER_ASSET).length, 0)
  t.equal(captured.inputs.filter(input => input.assetInfo && input.assetInfo.assetGuid === TARGET_ASSET).length, 1)
  t.end()
})

test('bridge burn supports numeric asset GUID inputs', async t => {
  const { captured } = await captureResult(syscoin => syscoin.assetAllocationBurn(
    bridgeAssetOpts(),
    {},
    assetMapFor(NUMERIC_TARGET_ASSET),
    ADDRESS,
    new BN(10),
    null,
    typedGuidUtxoFixture(NUMERIC_TARGET_ASSET)
  ))

  t.ok(captured, 'captured builder result')
  t.equal(captured.inputs.filter(input => input.assetInfo && input.assetInfo.assetGuid === TARGET_ASSET).length, 1)
  t.end()
})

test('bridge burn supports BN asset GUID inputs', async t => {
  const bnGuid = new BN(TARGET_ASSET)
  const { captured } = await captureResult(syscoin => syscoin.assetAllocationBurn(
    bridgeAssetOpts(),
    {},
    assetMapFor(bnGuid),
    ADDRESS,
    new BN(10),
    null,
    typedGuidUtxoFixture(bnGuid)
  ))

  t.ok(captured, 'captured builder result')
  t.equal(captured.inputs.filter(input => input.assetInfo && input.assetInfo.assetGuid === TARGET_ASSET).length, 1)
  t.end()
})

test('bridge burn accepts modern Blockbook UTXO arrays without a top-level assets collection', async t => {
  const rawBlockbookUtxos = modernBlockbookExactSysxUtxos()

  const sanitized = utils.sanitizeBlockbookUTXOs(
    null,
    rawBlockbookUtxos,
    utils.syscoinNetworks.testnet,
    {},
    assetMapFor(TARGET_ASSET, 10000000),
    false
  )
  t.ok(sanitized.assets.has(TARGET_ASSET), 'shims the legacy assets Map entry')
  t.equal(Object.keys(sanitized.assets.get(TARGET_ASSET)).length, 0, 'does not invent missing asset properties')

  const { captured } = await captureResult(syscoin => syscoin.assetAllocationBurn(
    bridgeAssetOpts(),
    {},
    assetMapFor(TARGET_ASSET, 10000000),
    ADDRESS,
    new BN(10),
    null,
    rawBlockbookUtxos
  ))

  t.ok(captured, 'captured builder result')
  t.equal(captured.inputs.length, 1, 'uses the mixed SYS/SYSX UTXO')
  t.equal(captured.inputs[0].txId, rawBlockbookUtxos[0].txid)
  t.equal(captured.inputs[0].assetInfo.assetGuid, TARGET_ASSET)

  const decoder = new Syscoin(null, null, utils.syscoinNetworks.testnet)
  const psbt = await decoder.createPSBTFromRes(captured)
  const decoded = decoder.decodeRawTransaction(psbt)
  t.equal(decoded.vin[0].assetInfo.assetGuid, TARGET_ASSET, 'keeps the consumed asset metadata on the input')
  t.equal(decoded.vout.filter(output => output.assetInfo).length, 0, 'does not expose a false asset-bearing output to wallet confirmation UIs')
  t.end()
})

test('asset send accepts an exact modern Blockbook SYSX UTXO', async t => {
  const rawBlockbookUtxos = modernBlockbookExactSysxUtxos()
  const { captured } = await captureResult(syscoin => syscoin.assetAllocationSend(
    {},
    assetMapFor(TARGET_ASSET, 10000000),
    ADDRESS,
    new BN(2),
    null,
    rawBlockbookUtxos
  ))

  t.ok(captured, 'captured builder result')
  t.equal(captured.inputs.length, 1, 'uses the one mixed SYS/SYSX UTXO')
  t.equal(captured.inputs[0].txId, rawBlockbookUtxos[0].txid)
  t.equal(captured.outputs.filter(output => output.assetInfo).length, 1, 'creates one SYSX allocation output')
  t.equal(captured.outputs.find(output => output.assetInfo).assetInfo.value.toString(), '10000000', 'sends the full 0.1 SYSX balance')
  t.end()
})

test('bridge burn post-build validation rejects non-target asset inputs', async t => {
  const original = syscointx.assetAllocationBurn
  syscointx.assetAllocationBurn = function () {
    const res = goodBurnBuilderResult()
    res.inputs.push({ type: 'BECH32', address: ADDRESS, txId: txid('4'), vout: 0, value: new BN(1000), assetInfo: { assetGuid: OTHER_ASSET, value: new BN(1) } })
    return res
  }

  try {
    await captureResult(syscoin => syscoin.assetAllocationBurn(bridgeAssetOpts(), {}, assetMapFor(), ADDRESS, new BN(10), null, utxoFixture()))
    t.fail('expected non-target asset input to throw')
  } catch (err) {
    t.equal(err.code, 'INVALID_BRIDGE_BURN_INPUT_ASSET')
  } finally {
    syscointx.assetAllocationBurn = original
  }
  t.end()
})

test('bridge burn post-build validation rejects missing target asset inputs', async t => {
  const original = syscointx.assetAllocationBurn
  syscointx.assetAllocationBurn = function () {
    const res = goodBurnBuilderResult()
    res.inputs = res.inputs.filter(input => !input.assetInfo)
    return res
  }

  try {
    await captureResult(syscoin => syscoin.assetAllocationBurn(bridgeAssetOpts(), {}, assetMapFor(), ADDRESS, new BN(10), null, utxoFixture()))
    t.fail('expected missing target asset input to throw')
  } catch (err) {
    t.equal(err.code, 'INVALID_BRIDGE_BURN_MISSING_INPUT_ASSET')
  } finally {
    syscointx.assetAllocationBurn = original
  }
  t.end()
})

test('bridge burn post-build validation rejects target asset balance mismatch', async t => {
  const original = syscointx.assetAllocationBurn
  syscointx.assetAllocationBurn = function () {
    const res = goodBurnBuilderResult()
    res.outputs[1].script = opReturnForAllocations([
      { assetGuid: TARGET_ASSET, values: [{ n: 0, value: new BN(500) }, { n: 1, value: new BN(400) }] }
    ])
    return res
  }

  try {
    await captureResult(syscoin => syscoin.assetAllocationBurn(bridgeAssetOpts(), {}, assetMapFor(), ADDRESS, new BN(10), null, utxoFixture()))
    t.fail('expected target asset balance mismatch to throw')
  } catch (err) {
    t.equal(err.code, 'INVALID_BRIDGE_BURN_ASSET_BALANCE')
  } finally {
    syscointx.assetAllocationBurn = original
  }
  t.end()
})

test('bridge burn post-build validation rejects output metadata mismatch', async t => {
  const original = syscointx.assetAllocationBurn
  syscointx.assetAllocationBurn = function () {
    const res = goodBurnBuilderResult()
    res.outputs[0].assetInfo.value = new BN(1)
    return res
  }

  try {
    await captureResult(syscoin => syscoin.assetAllocationBurn(bridgeAssetOpts(), {}, assetMapFor(), ADDRESS, new BN(10), null, utxoFixture()))
    t.fail('expected output metadata mismatch to throw')
  } catch (err) {
    t.equal(err.code, 'INVALID_BRIDGE_BURN_OUTPUT_METADATA')
  } finally {
    syscointx.assetAllocationBurn = original
  }
  t.end()
})

test('bridge burn post-build validation rejects script output asset metadata', async t => {
  const original = syscointx.assetAllocationBurn
  syscointx.assetAllocationBurn = function () {
    const res = goodBurnBuilderResult()
    res.outputs[1].assetInfo = { assetGuid: TARGET_ASSET, value: new BN(500) }
    return res
  }

  try {
    await captureResult(syscoin => syscoin.assetAllocationBurn(bridgeAssetOpts(), {}, assetMapFor(), ADDRESS, new BN(10), null, utxoFixture()))
    t.fail('expected script output asset metadata to throw')
  } catch (err) {
    t.equal(err.code, 'INVALID_BRIDGE_BURN_OUTPUT_METADATA')
  } finally {
    syscointx.assetAllocationBurn = original
  }
  t.end()
})

test('bridge burn post-build validation rejects allocation to non-OP_RETURN script output', async t => {
  const original = syscointx.assetAllocationBurn
  syscointx.assetAllocationBurn = function () {
    const res = goodBurnBuilderResult()
    res.outputs.push({
      script: Buffer.from('00141111111111111111111111111111111111111111', 'hex'),
      value: new BN(680)
    })
    res.outputs[1].script = opReturnForAllocations([
      { assetGuid: TARGET_ASSET, values: [{ n: 0, value: new BN(500) }, { n: 1, value: new BN(500) }, { n: 2, value: new BN(0) }] }
    ])
    return res
  }

  try {
    await captureResult(syscoin => syscoin.assetAllocationBurn(bridgeAssetOpts(), {}, assetMapFor(), ADDRESS, new BN(10), null, utxoFixture()))
    t.fail('expected allocation to non-OP_RETURN script output to throw')
  } catch (err) {
    t.equal(err.code, 'INVALID_BRIDGE_BURN_OUTPUT_METADATA')
  } finally {
    syscointx.assetAllocationBurn = original
  }
  t.end()
})

test('bridge burn post-build validation rejects multiple serialized assets', async t => {
  const original = syscointx.assetAllocationBurn
  syscointx.assetAllocationBurn = function () {
    const res = goodBurnBuilderResult()
    res.outputs[1].script = opReturnForAllocations([
      { assetGuid: TARGET_ASSET, values: [{ n: 1, value: new BN(500) }] },
      { assetGuid: OTHER_ASSET, values: [{ n: 0, value: new BN(1) }] }
    ])
    return res
  }

  try {
    await captureResult(syscoin => syscoin.assetAllocationBurn(bridgeAssetOpts(), {}, assetMapFor(), ADDRESS, new BN(10), null, utxoFixture()))
    t.fail('expected multi-asset allocation to throw')
  } catch (err) {
    t.equal(err.code, 'INVALID_BRIDGE_BURN_ALLOCATION_COUNT')
  } finally {
    syscointx.assetAllocationBurn = original
  }
  t.end()
})

test('bridge burn post-build validation rejects duplicate allocation output indexes', async t => {
  const original = syscointx.assetAllocationBurn
  syscointx.assetAllocationBurn = function () {
    const res = goodBurnBuilderResult()
    res.outputs[1].script = opReturnForAllocations([
      { assetGuid: TARGET_ASSET, values: [{ n: 1, value: new BN(500) }, { n: 1, value: new BN(1) }] }
    ])
    return res
  }

  try {
    await captureResult(syscoin => syscoin.assetAllocationBurn(bridgeAssetOpts(), {}, assetMapFor(), ADDRESS, new BN(10), null, utxoFixture()))
    t.fail('expected duplicate output index to throw')
  } catch (err) {
    t.equal(err.code, 'INVALID_BRIDGE_BURN_DUPLICATE_OUTPUT')
  } finally {
    syscointx.assetAllocationBurn = original
  }
  t.end()
})

test('bridge burn post-build validation rejects trailing payload bytes', async t => {
  const original = syscointx.assetAllocationBurn
  syscointx.assetAllocationBurn = function () {
    return goodBurnBuilderResult(Buffer.from([0x01]))
  }

  try {
    await captureResult(syscoin => syscoin.assetAllocationBurn(bridgeAssetOpts(), {}, assetMapFor(), ADDRESS, new BN(10), null, utxoFixture()))
    t.fail('expected trailing payload to throw')
  } catch (err) {
    t.equal(err.code, 'INVALID_BRIDGE_BURN_PAYLOAD')
  } finally {
    syscointx.assetAllocationBurn = original
  }
  t.end()
})

test('bridge mint rejects multi-asset assetMap', async t => {
  const syscoin = new Syscoin(null, null, utils.syscoinNetworks.testnet)
  const multiAssetMap = assetMapFor()
  multiAssetMap.set(OTHER_ASSET, { changeAddress: ADDRESS, outputs: [{ value: new BN(1), address: ADDRESS }] })

  try {
    await syscoin.assetAllocationMint(mintAssetOpts(), {}, multiAssetMap, ADDRESS, new BN(10), null, utxoFixture())
    t.fail('expected multi-asset bridge mint to throw')
  } catch (err) {
    t.equal(err.code, 'INVALID_BRIDGE_MINT_ASSET_MAP')
  }
  t.end()
})

test('bridge mint ignores all asset UTXOs during funding', async t => {
  const { captured } = await captureResult(syscoin => syscoin.assetAllocationMint(
    mintAssetOpts(),
    {},
    new Map([[TARGET_ASSET, { changeAddress: ADDRESS, outputs: [{ value: new BN(500), address: ADDRESS }] }]]),
    ADDRESS,
    new BN(10),
    null,
    utxoFixture()
  ))

  t.ok(captured, 'captured builder result')
  t.equal(captured.inputs.filter(input => input.assetInfo).length, 0)
  t.end()
})

test('bridge mint post-build validation rejects asset inputs', async t => {
  const original = syscointx.assetAllocationMint
  const assetOpts = mintAssetOpts()
  syscointx.assetAllocationMint = function () {
    const res = goodMintBuilderResult(assetOpts)
    res.inputs.push({ type: 'BECH32', address: ADDRESS, txId: txid('4'), vout: 0, value: new BN(1000), assetInfo: { assetGuid: TARGET_ASSET, value: new BN(1) } })
    return res
  }

  try {
    await captureResult(syscoin => syscoin.assetAllocationMint(assetOpts, {}, assetMapFor(), ADDRESS, new BN(10), null, utxoFixture()))
    t.fail('expected asset input to throw')
  } catch (err) {
    t.equal(err.code, 'INVALID_BRIDGE_MINT_INPUT_ASSET')
  } finally {
    syscointx.assetAllocationMint = original
  }
  t.end()
})

test('bridge mint post-build validation rejects multiple serialized assets', async t => {
  const original = syscointx.assetAllocationMint
  const assetOpts = mintAssetOpts()
  syscointx.assetAllocationMint = function () {
    const res = goodMintBuilderResult(assetOpts)
    res.outputs[1].script = opReturnForMint([
      { assetGuid: TARGET_ASSET, values: [{ n: 0, value: new BN(500) }] },
      { assetGuid: OTHER_ASSET, values: [{ n: 0, value: new BN(1) }] }
    ], assetOpts)
    return res
  }

  try {
    await captureResult(syscoin => syscoin.assetAllocationMint(assetOpts, {}, assetMapFor(), ADDRESS, new BN(10), null, utxoFixture()))
    t.fail('expected multi-asset mint allocation to throw')
  } catch (err) {
    t.equal(err.code, 'INVALID_BRIDGE_MINT_ALLOCATION_COUNT')
  } finally {
    syscointx.assetAllocationMint = original
  }
  t.end()
})

test('bridge mint post-build validation rejects output metadata mismatch', async t => {
  const original = syscointx.assetAllocationMint
  const assetOpts = mintAssetOpts()
  syscointx.assetAllocationMint = function () {
    const res = goodMintBuilderResult(assetOpts)
    res.outputs[0].assetInfo.value = new BN(1)
    return res
  }

  try {
    await captureResult(syscoin => syscoin.assetAllocationMint(assetOpts, {}, assetMapFor(), ADDRESS, new BN(10), null, utxoFixture()))
    t.fail('expected mint output metadata mismatch to throw')
  } catch (err) {
    t.equal(err.code, 'INVALID_BRIDGE_MINT_OUTPUT_METADATA')
  } finally {
    syscointx.assetAllocationMint = original
  }
  t.end()
})

test('bridge mint post-build validation rejects trailing payload bytes', async t => {
  const original = syscointx.assetAllocationMint
  const assetOpts = mintAssetOpts()
  syscointx.assetAllocationMint = function () {
    const res = goodMintBuilderResult(assetOpts)
    res.outputs[1].script = opReturnForMint([
      { assetGuid: TARGET_ASSET, values: [{ n: 0, value: new BN(500) }] }
    ], assetOpts, Buffer.from([0x01]))
    return res
  }

  try {
    await captureResult(syscoin => syscoin.assetAllocationMint(assetOpts, {}, assetMapFor(), ADDRESS, new BN(10), null, utxoFixture()))
    t.fail('expected trailing mint payload to throw')
  } catch (err) {
    t.equal(err.code, 'INVALID_BRIDGE_MINT_PAYLOAD')
  } finally {
    syscointx.assetAllocationMint = original
  }
  t.end()
})
