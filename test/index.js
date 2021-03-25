
const sjs = require('..')
const fixtures = require('./fixtures')
const tape = require('tape')
const syscointx = require('syscointx-js')
const bitcoin = sjs.utils.bitcoinjs
const bitcoinops = require('bitcoin-ops')
const memoHeader = Buffer.from([0xff, 0xff, 0xaf, 0xaf, 0xaa, 0xaa])
fixtures.forEach(async function (f) {
  tape(f.description, async function (t) {
    const utxos = f.utxoObj
    let txOpts = f.txOpts
    if (!txOpts) {
      txOpts = { rbf: false }
    }
    // 'null' for no password encryption for local storage and 'true' for testnet
    const HDSigner = new sjs.utils.HDSigner(f.mnemonic, null, true)
    const syscoinjs = new sjs.SyscoinJSLib(HDSigner)
    if (f.version === syscointx.utils.SYSCOIN_TX_VERSION_SYSCOIN_BURN_TO_ALLOCATION) {
      const psbt = await syscoinjs.syscoinBurnToAssetAllocation(txOpts, f.assetMap, f.sysChangeAddress, f.feeRate, f.sysFromXpubOrAddress, utxos)
      t.same(psbt.txOutputs.length, f.expected.numOutputs)
      t.same(psbt.version, f.version)
      HDSigner.setLatestIndexesFromXPubTokens(f.xpubTokens)
      t.same(HDSigner.changeIndex, f.expected.changeIndex)
      t.same(HDSigner.receivingIndex, f.expected.receivingIndex)
      t.same(psbt.extractTransaction().toHex(), f.expected.hex)
      psbt.txOutputs.forEach(output => {
        if (output.script) {
          // find opreturn
          const chunks = bitcoin.script.decompile(output.script)
          if (chunks[0] === bitcoinops.OP_RETURN) {
            t.same(output.script, f.expected.script)
            const assetAllocations = syscointx.bufferUtils.deserializeAssetAllocations(chunks[1])
            t.same(assetAllocations, f.expected.asset.allocation)
          }
        }
      })
    } else if (f.version === syscointx.utils.SYSCOIN_TX_VERSION_ASSET_ACTIVATE) {
      const psbt = await syscoinjs.assetNew(f.assetOpts, txOpts, f.sysChangeAddress, f.sysReceivingAddress, f.feeRate, f.sysFromXpubOrAddress, utxos)
      // ensure getAssetsFromTx returns the asset we created as expected
      const tx = bitcoin.Transaction.fromHex(psbt.extractTransaction().toHex())
      const assets = syscointx.getAssetsFromTx(tx)
      t.same(assets.get(f.expected.asset.allocation[0].assetGuid), {})
      t.same(psbt.txOutputs.length, f.expected.numOutputs)
      t.same(psbt.version, f.version)
      HDSigner.setLatestIndexesFromXPubTokens(f.xpubTokens)
      t.same(HDSigner.changeIndex, f.expected.changeIndex)
      t.same(HDSigner.receivingIndex, f.expected.receivingIndex)
      t.same(psbt.extractTransaction().toHex(), f.expected.hex)
      psbt.txOutputs.forEach(output => {
        if (output.script) {
          // find opreturn
          const chunks = bitcoin.script.decompile(output.script)
          if (chunks[0] === bitcoinops.OP_RETURN) {
            t.same(output.script, f.expected.script)
            const asset = syscointx.bufferUtils.deserializeAsset(chunks[1])
            t.same(asset, f.expected.asset)
            t.same(asset.allocation, f.expected.asset.allocation)
          }
        }
      })
    } else if (f.version === syscointx.utils.SYSCOIN_TX_VERSION_ASSET_UPDATE) {
      const psbt = await syscoinjs.assetUpdate(f.assetGuid, f.assetOpts, txOpts, f.assetMap, f.sysChangeAddress, f.feeRate, f.sysFromXpubOrAddress, utxos)
      t.same(psbt.txOutputs.length, f.expected.numOutputs)
      t.same(psbt.version, f.version)
      HDSigner.setLatestIndexesFromXPubTokens(f.xpubTokens)
      t.same(HDSigner.changeIndex, f.expected.changeIndex)
      t.same(HDSigner.receivingIndex, f.expected.receivingIndex)
      t.same(psbt.extractTransaction().toHex(), f.expected.hex)
      psbt.txOutputs.forEach(output => {
        if (output.script) {
          // find opreturn
          const chunks = bitcoin.script.decompile(output.script)
          if (chunks[0] === bitcoinops.OP_RETURN) {
            t.same(output.script, f.expected.script)
            const asset = syscointx.bufferUtils.deserializeAsset(chunks[1])
            t.same(asset, f.expected.asset)
            t.same(asset.allocation, f.expected.asset.allocation)
          }
        }
      })
    } else if (f.version === syscointx.utils.SYSCOIN_TX_VERSION_ASSET_SEND) {
      const psbt = await syscoinjs.assetSend(txOpts, f.assetMap, f.sysChangeAddress, f.feeRate, f.sysFromXpubOrAddress, utxos)
      t.same(psbt.txOutputs.length, f.expected.numOutputs)
      t.same(psbt.version, f.version)
      HDSigner.setLatestIndexesFromXPubTokens(f.xpubTokens)
      t.same(HDSigner.changeIndex, f.expected.changeIndex)
      t.same(HDSigner.receivingIndex, f.expected.receivingIndex)
      t.same(psbt.extractTransaction().toHex(), f.expected.hex)
      psbt.txOutputs.forEach(output => {
        if (output.script) {
          // find opreturn
          const chunks = bitcoin.script.decompile(output.script)
          if (chunks[0] === bitcoinops.OP_RETURN) {
            t.same(output.script, f.expected.script)
            const assetAllocations = syscointx.bufferUtils.deserializeAssetAllocations(chunks[1])
            t.same(assetAllocations, f.expected.asset.allocation)
          }
        }
      })
    } else if (f.version === syscointx.utils.SYSCOIN_TX_VERSION_ALLOCATION_MINT) {
      const psbt = await syscoinjs.assetAllocationMint(f.assetOpts, txOpts, f.assetMap, f.sysChangeAddress, f.feeRate, f.sysFromXpubOrAddress, utxos)
      t.same(psbt.txOutputs.length, f.expected.numOutputs)
      t.same(psbt.version, f.version)
      HDSigner.setLatestIndexesFromXPubTokens(f.xpubTokens)
      t.same(HDSigner.changeIndex, f.expected.changeIndex)
      t.same(HDSigner.receivingIndex, f.expected.receivingIndex)
      t.same(psbt.extractTransaction().toHex(), f.expected.hex)
      psbt.txOutputs.forEach(output => {
        if (output.script) {
          // find opreturn
          const chunks = bitcoin.script.decompile(output.script)
          if (chunks[0] === bitcoinops.OP_RETURN) {
            t.same(output.script, f.expected.script)
            const asset = syscointx.bufferUtils.deserializeMintSyscoin(chunks[1])
            t.same(asset, f.expected.asset)
            t.same(asset.allocation, f.expected.asset.allocation)
          }
        }
      })
    } else if (f.version === syscointx.utils.SYSCOIN_TX_VERSION_ALLOCATION_BURN_TO_ETHEREUM || f.version === syscointx.utils.SYSCOIN_TX_VERSION_ALLOCATION_BURN_TO_SYSCOIN) {
      const psbt = await syscoinjs.assetAllocationBurn(f.assetOpts, txOpts, f.assetMap, f.sysChangeAddress, f.feeRate, f.sysFromXpubOrAddress, utxos)
      t.same(psbt.txOutputs.length, f.expected.numOutputs)
      t.same(psbt.version, f.version)
      HDSigner.setLatestIndexesFromXPubTokens(f.xpubTokens)
      t.same(HDSigner.changeIndex, f.expected.changeIndex)
      t.same(HDSigner.receivingIndex, f.expected.receivingIndex)
      t.same(psbt.extractTransaction().toHex(), f.expected.hex)
      psbt.txOutputs.forEach(output => {
        if (output.script) {
          // find opreturn
          const chunks = bitcoin.script.decompile(output.script)
          if (chunks[0] === bitcoinops.OP_RETURN) {
            t.same(output.script, f.expected.script)
            const asset = syscointx.bufferUtils.deserializeAllocationBurn(chunks[1])
            t.same(asset, f.expected.asset)
            t.same(asset.allocation, f.expected.asset.allocation)
          }
        }
      })
    } else if (f.version === syscointx.utils.SYSCOIN_TX_VERSION_ALLOCATION_SEND) {
      let psbt = await syscoinjs.assetAllocationSend(txOpts, f.assetMap, f.sysChangeAddress, f.feeRate, f.sysFromXpubOrAddress, utxos)
      if (f.sysFromXpubOrAddress) {
        // check for VPUB vs regular address
        if (!f.sysFromXpubOrAddress.startsWith('vpub')) {
          const kp = HDSigner.deriveKeypair(f.utxoObj.utxos[0].path)
          psbt = await syscoinjs.signAndSendWithWIF(psbt.res, kp.toWIF(), psbt.assets)
        } else {
          psbt = await syscoinjs.signAndSendWithHDSigner(psbt.res, HDSigner, psbt.assets)
        }
      }

      t.same(psbt.txOutputs.length, f.expected.numOutputs)
      t.same(psbt.version, f.version)
      HDSigner.setLatestIndexesFromXPubTokens(f.xpubTokens)
      t.same(HDSigner.changeIndex, f.expected.changeIndex)
      t.same(HDSigner.receivingIndex, f.expected.receivingIndex)
      t.same(psbt.extractTransaction().toHex(), f.expected.hex)
      t.assert(sjs.utils.setTransactionMemo(f.expected.hex, memoHeader, Buffer.from('a7bf215279d3f6568dcd17c429d41a35a466f803', 'hex')) != null)
      t.assert(sjs.utils.setTransactionMemo(f.expected.hex, memoHeader, Buffer.from('test memo')) != null)
      psbt.txOutputs.forEach(output => {
        if (output.script) {
          // find opreturn
          const chunks = bitcoin.script.decompile(output.script)
          if (chunks[0] === bitcoinops.OP_RETURN) {
            t.same(output.script, f.expected.script)
            const assetAllocations = syscointx.bufferUtils.deserializeAssetAllocations(chunks[1])
            t.same(assetAllocations, f.expected.asset.allocation)
          }
        }
      })
    } else if (f.version === 2) {
      const psbt = await syscoinjs.createTransaction(txOpts, f.changeAddress, f.outputs, f.feeRate, f.fromXpubOrAddress, utxos)
      t.same(psbt.txOutputs.length, f.expected.numOutputs)
      t.same(psbt.version, f.expected.version)
      HDSigner.setLatestIndexesFromXPubTokens(f.xpubTokens)
      t.same(HDSigner.changeIndex, f.expected.changeIndex)
      t.same(HDSigner.receivingIndex, f.expected.receivingIndex)
      t.same(psbt.extractTransaction().toHex(), f.expected.hex)
      t.assert(sjs.utils.setTransactionMemo(f.expected.hex, memoHeader, Buffer.from('a7bf215279d3f6568dcd17c429d41a35a466f803', 'hex')) != null)
      t.assert(sjs.utils.setTransactionMemo(f.expected.hex, memoHeader, Buffer.from('test memo')) != null)
      psbt.txOutputs.forEach(output => {
        if (output.script) {
          // find opreturn
          const chunks = bitcoin.script.decompile(output.script)
          if (chunks[0] === bitcoinops.OP_RETURN) {
            t.same(output.script, f.expected.script)
            const assetAllocations = syscointx.bufferUtils.deserializeAssetAllocations(chunks[1])
            t.same(assetAllocations, f.expected.asset.allocation)
          }
        }
      })
    }
    t.same(txOpts.rbf, f.expected.rbf)
    t.end()
  })
})
