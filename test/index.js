
var sjs = require('..')
var fixtures = require('./fixtures')
var tape = require('tape')
var utils = require('../utils')

fixtures.forEach(function (f) {
  tape(f.description, function (t) {
    var utxos = f.utxoObj
    // no backend, we will provide all UTXOs manually for the tests
    const blockbookURL = null
    const HDSigner = new utils.HDSigner(f.mnemonic)
    const syscoinjs = new sjs.SyscoinJSLib(blockbookURL, HDSigner)
    if (f.version === utils.SYSCOIN_TX_VERSION_SYSCOIN_BURN_TO_ALLOCATION) {
      const res = syscoinjs.assetAllocationSend( f.assetMap, f.sysChangeAddress, f.dataAmount, f.feeRate, f.sysFromXpubOrAddress, utxos)
      const psbt = await syscoinjs.sign(res, !!f.sysFromXpubOrAddress, utxos.assets)
      t.same(psbt.extractTransaction().toHex(), f.expected.hex)
    } else if (f.version === utils.SYSCOIN_TX_VERSION_ASSET_ACTIVATE) {
      const res = syscoinjs.assetNew(f.assetOpts, f.sysChangeAddress, f.feeRate, f.sysFromXpubOrAddress, utxos )
      const psbt = await syscoinjs.sign(res, !!f.sysFromXpubOrAddress, utxos.assets)
      t.same(psbt.extractTransaction().toHex(), f.expected.hex)
    } else if (f.version === utils.SYSCOIN_TX_VERSION_ASSET_UPDATE) {
      const res = syscoinjs.assetUpdate(f.assetGuid, f.assetOpts, f.assetMap, f.sysChangeAddress, f.sysFromXpubOrAddress, f.feeRate, utxos)
      const psbt = await syscoinjs.sign(res, !!f.sysFromXpubOrAddress, utxos.assets)
      t.same(psbt.extractTransaction().toHex(), f.expected.hex)
    } else if (f.version === utils.SYSCOIN_TX_VERSION_ASSET_SEND) {
      const res = syscointx.assetSend(f.assetMap, f.sysChangeAddress, f.feeRate, f.sysFromXpubOrAddress, utxos)
      const psbt = await syscoinjs.sign(res, !!f.sysFromXpubOrAddress, utxos.assets)
      t.same(psbt.extractTransaction().toHex(), f.expected.hex)
    } else if (f.version === utils.SYSCOIN_TX_VERSION_ALLOCATION_MINT) {
      const res = syscoinjs.assetAllocationMint(f.assetOpts, f.assetMap, f.sysChangeAddress, f.feeRate, f.sysFromXpubOrAddress, utxos)
      const psbt = await syscoinjs.sign(res, !!f.sysFromXpubOrAddress, utxos.assets)
      t.same(psbt.extractTransaction().toHex(), f.expected.hex)
    } else if (f.version === utils.SYSCOIN_TX_VERSION_ALLOCATION_BURN_TO_ETHEREUM || f.version === utils.SYSCOIN_TX_VERSION_ALLOCATION_BURN_TO_SYSCOIN) {
      const res = syscoinjs.assetAllocationBurn(f.assetOpts, f.assetMap, f.sysChangeAddress, f.feeRate, f.sysFromXpubOrAddress, utxos)
      const psbt = await syscoinjs.sign(res, !!f.sysFromXpubOrAddress, utxos.assets)
      t.same(psbt.extractTransaction().toHex(), f.expected.hex)
    } else if (f.version === utils.SYSCOIN_TX_VERSION_ALLOCATION_SEND) {
      const res = syscoinjs.assetAllocationSend( f.assetMap, f.sysChangeAddress, f.feeRate, f.sysFromXpubOrAddress, utxos)
      const psbt = await syscoinjs.sign(res, !!f.sysFromXpubOrAddress, utxos.assets)
      t.same(psbt.extractTransaction().toHex(), f.expected.hex)
    } else if (f.version === 2) {
      const res = syscoinjs.createTransaction(utxos, f.changeAddress, f.outputs, f.feeRate, f.fromXpubOrAddress, utxos)
      const psbt = await syscoinjs.sign(res, !!f.fromXpubOrAddress, utxos.assets)
      t.same(psbt.extractTransaction().toHex(), f.expected.hex)
    }
    t.end()
  })
})
