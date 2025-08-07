const sjs = require('..')
const fixtures = require('./fixtures')
const tape = require('tape')
const syscointx = require('syscointx-js')
const bitcoin = sjs.utils.bitcoinjs
const bitcoinops = require('bitcoin-ops')
const memoHeader = Buffer.from([0xff, 0xff, 0xaf, 0xaf, 0xaa, 0xaa])
tape.test('test deserialize PoDA.', (assert) => {
  // Real PoDA transaction from the network
  const txHex = '8900000000010148b3487329df6f15632f5b2f6966f6b16eec156cda4a515e3b4124ab36fbb5970100000000fdffffff020000000000000000236a212083115464e443b7e50ad72ce74c2f19e8994142f486a6f04f0b4e9f4ca9c7fd496ae2cc7801000000160014e5f8326f905653d56d0bea68fc709ab6bb59539802473044022005768e9a2bc6b5d10fc4eded2ed63903848121537a373ee105a56ac51096c7f30220555745425714cab87eb30ed6764beafedafd36efc37b519ae67547b2ddaad54e012102bf95c9f320f617b44abdc84c25d57fcb3a413e124097d7eae2c9c16f31059bc02d311f00'
  const tx = bitcoin.Transaction.fromHex(txHex)
  assert.equal(syscointx.utils.isPoDATx(tx.version), true)
  const poda = syscointx.getPoDAFromTx(tx)
  assert.equal(poda.blobHash.toString('hex'), '83115464e443b7e50ad72ce74c2f19e8994142f486a6f04f0b4e9f4ca9c7fd49')
  assert.end()
})
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
      const result = await syscoinjs.syscoinBurnToAssetAllocation(txOpts, f.assetMap, f.sysChangeAddress, f.feeRate, f.sysFromXpubOrAddress, utxos)
      const psbt = result.psbt
      t.same(psbt.txOutputs.length, f.expected.numOutputs)
      t.same(psbt.version, f.version)
      HDSigner.setLatestIndexesFromXPubTokens(f.xpubTokens)
      t.same(HDSigner.Signer.changeIndex, f.expected.changeIndex)
      t.same(HDSigner.Signer.receivingIndex, f.expected.receivingIndex)
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
      const result = await syscoinjs.assetAllocationMint(f.assetOpts, txOpts, f.assetMap, f.sysChangeAddress, f.feeRate, f.sysFromXpubOrAddress, utxos)
      const psbt = result.psbt
      t.same(psbt.txOutputs.length, f.expected.numOutputs)
      t.same(psbt.version, f.version)
      HDSigner.setLatestIndexesFromXPubTokens(f.xpubTokens)
      t.same(HDSigner.Signer.changeIndex, f.expected.changeIndex)
      t.same(HDSigner.Signer.receivingIndex, f.expected.receivingIndex)
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
      const result = await syscoinjs.assetAllocationBurn(f.assetOpts, txOpts, f.assetMap, f.sysChangeAddress, f.feeRate, f.sysFromXpubOrAddress, utxos)
      const psbt = result.psbt
      t.same(psbt.txOutputs.length, f.expected.numOutputs)
      t.same(psbt.version, f.version)
      HDSigner.setLatestIndexesFromXPubTokens(f.xpubTokens)
      t.same(HDSigner.Signer.changeIndex, f.expected.changeIndex)
      t.same(HDSigner.Signer.receivingIndex, f.expected.receivingIndex)
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
      const result = await syscoinjs.assetAllocationSend(txOpts, f.assetMap, f.sysChangeAddress, f.feeRate, f.sysFromXpubOrAddress, utxos)
      let psbt = result.psbt
      if (f.sysFromXpubOrAddress) {
        // check for VPUB vs regular address
        if (!f.sysFromXpubOrAddress.startsWith('vpub')) {
          const kp = HDSigner.deriveKeypair(f.utxoObj.utxos[0].path)
          psbt = await syscoinjs.signAndSendWithWIF(psbt, kp.toWIF(), result.assets)
        } else {
          psbt = await syscoinjs.signAndSend(psbt, result.assets)
        }
      }

      t.same(psbt.txOutputs.length, f.expected.numOutputs)
      t.same(psbt.version, f.version)
      HDSigner.setLatestIndexesFromXPubTokens(f.xpubTokens)
      t.same(HDSigner.Signer.changeIndex, f.expected.changeIndex)
      t.same(HDSigner.Signer.receivingIndex, f.expected.receivingIndex)
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
      const result = await syscoinjs.createTransaction(txOpts, f.changeAddress, f.outputs, f.feeRate, f.fromXpubOrAddress, utxos)
      const psbt = result.psbt
      t.same(psbt.txOutputs.length, f.expected.numOutputs)
      t.same(psbt.version, f.expected.version)
      HDSigner.setLatestIndexesFromXPubTokens(f.xpubTokens)
      t.same(HDSigner.Signer.changeIndex, f.expected.changeIndex)
      t.same(HDSigner.Signer.receivingIndex, f.expected.receivingIndex)
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
    } else if (f.version === 133) {
      const result = await syscoinjs.syscoinBurnToAssetAllocation(txOpts, f.assetMap, f.sysChangeAddress, f.feeRate, f.sysFromXpubOrAddress, utxos)
      const psbt = result.psbt
      t.same(psbt.txOutputs.length, f.expected.numOutputs)
      t.same(psbt.version, f.version)
      HDSigner.setLatestIndexesFromXPubTokens(f.xpubTokens)
      t.same(HDSigner.Signer.changeIndex, f.expected.changeIndex)
      t.same(HDSigner.Signer.receivingIndex, f.expected.receivingIndex)
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
    }
    t.same(txOpts.rbf, f.expected.rbf)
    t.end()
  })
})

tape.test('decodeRawTransaction - PSBT input', (assert) => {
  const HDSigner = new sjs.utils.HDSigner('abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about', null, true)
  const syscoinjs = new sjs.SyscoinJSLib(HDSigner)

  // Create a PSBT
  const psbt = new bitcoin.Psbt({ network: syscoinjs.network })
  psbt.setVersion(syscointx.utils.SYSCOIN_TX_VERSION_ALLOCATION_SEND)

  // Add input
  psbt.addInput({
    hash: Buffer.from('1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef', 'hex'),
    index: 0,
    sequence: 0xfffffffd,
    witnessUtxo: {
      script: Buffer.from('0014' + '1234567890abcdef1234567890abcdef12345678', 'hex'),
      value: 100000000
    }
  })

  // Add outputs including OP_RETURN with asset allocation data
  const assetAllocations = [{
    assetGuid: '2369540453',
    values: [{ n: 0, value: new sjs.utils.BN(50000000) }]
  }]
  const assetAllocationsBuffer = syscointx.bufferUtils.serializeAssetAllocations(assetAllocations)
  const dataScript = bitcoin.payments.embed({ data: [assetAllocationsBuffer] }).output

  psbt.addOutput({
    script: dataScript,
    value: 0
  })

  // Add a regular output with script directly
  psbt.addOutput({
    script: Buffer.from('0014' + '2229e6e87a1d24072c54c222b07cd318c0920c2a', 'hex'),
    value: 49990000
  })

  const decoded = syscoinjs.decodeRawTransaction(psbt)

  assert.ok(decoded.txid, 'Should have txid')
  assert.ok(decoded.hash, 'Should have hash')
  assert.equal(decoded.version, syscointx.utils.SYSCOIN_TX_VERSION_ALLOCATION_SEND, 'Should have correct version')
  assert.equal(decoded.syscoin.txtype, 'assetallocation_send', 'Should have correct transaction type')
  assert.ok(decoded.syscoin.allocations, 'Should have allocation data')
  assert.equal(decoded.syscoin.allocations.assets[0].assetGuid, '2369540453', 'Should have correct asset GUID')
  assert.end()
})

tape.test('decodeRawTransaction - Transaction object input', (assert) => {
  // Create a valid transaction from hex (simple Bitcoin v2 transaction)
  const txHex = '02000000010000000000000000000000000000000000000000000000000000000000000000ffffffff00ffffffff0100f2052a010000001976a914389ffce9cd9ae88dcc0631e88a821ffdbe9bfe2688ac00000000'

  const tx = bitcoin.Transaction.fromHex(txHex)
  const HDSigner = new sjs.utils.HDSigner('abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about', null, true)
  const syscoinjs = new sjs.SyscoinJSLib(HDSigner)

  const decoded = syscoinjs.decodeRawTransaction(tx)

  assert.ok(decoded.txid, 'Should have txid')
  assert.ok(decoded.hash, 'Should have hash')
  assert.equal(decoded.version, 2, 'Should have correct version')
  assert.equal(decoded.vin.length, 1, 'Should have 1 input')
  assert.equal(decoded.vout.length, 1, 'Should have 1 output')
  assert.equal(decoded.syscoin.txtype, 'bitcoin', 'Should have bitcoin transaction type')
  assert.end()
})

tape.test('decodeRawTransaction - Basic Bitcoin transaction', (assert) => {
  // Test with a simple Bitcoin transaction (version 2)
  const HDSigner = new sjs.utils.HDSigner('abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about', null, true)
  const syscoinjs = new sjs.SyscoinJSLib(HDSigner)

  // Create a simple transaction for testing
  const tx = new bitcoin.Transaction()
  tx.version = 2
  tx.addInput(Buffer.from('1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef', 'hex'), 0, 0xfffffffd)
  tx.addOutput(Buffer.from('0014' + '1234567890abcdef1234567890abcdef12345678', 'hex'), 990000)

  const decoded = syscoinjs.decodeRawTransaction(tx)

  assert.equal(decoded.version, 2, 'Should have Bitcoin version 2')
  assert.equal(decoded.vin.length, 1, 'Should have 1 input')
  assert.equal(decoded.vout.length, 1, 'Should have 1 output')
  assert.equal(decoded.syscoin.txtype, 'bitcoin', 'Should have bitcoin transaction type')
  assert.end()
})

tape.test('decodeRawTransaction - PoDA transaction', (assert) => {
  // Test with real PoDA transaction from the network
  const txHex = '8900000000010148b3487329df6f15632f5b2f6966f6b16eec156cda4a515e3b4124ab36fbb5970100000000fdffffff020000000000000000236a212083115464e443b7e50ad72ce74c2f19e8994142f486a6f04f0b4e9f4ca9c7fd496ae2cc7801000000160014e5f8326f905653d56d0bea68fc709ab6bb59539802473044022005768e9a2bc6b5d10fc4eded2ed63903848121537a373ee105a56ac51096c7f30220555745425714cab87eb30ed6764beafedafd36efc37b519ae67547b2ddaad54e012102bf95c9f320f617b44abdc84c25d57fcb3a413e124097d7eae2c9c16f31059bc02d311f00'

  try {
    const tx = bitcoin.Transaction.fromHex(txHex)
    const HDSigner = new sjs.utils.HDSigner('abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about', null, true)
    const syscoinjs = new sjs.SyscoinJSLib(HDSigner)

    const decoded = syscoinjs.decodeRawTransaction(tx)

    assert.equal(decoded.version, syscointx.utils.SYSCOIN_TX_VERSION_NEVM_DATA, 'Should have PoDA version (137)')
    assert.equal(decoded.txid, '302b2563547ca8b9843fa99ebfeb4290770e39bf16f6eaf35fa5fbbcb0f79ca5', 'Should have correct txid')
    assert.ok(decoded.syscoin, 'Should have syscoin-specific data')
    assert.equal(decoded.syscoin.txtype, 'nevm_data', 'Should have correct transaction type')
    assert.ok(decoded.syscoin.poda, 'Should have PoDA data')
    assert.equal(decoded.syscoin.poda.blobHash, '83115464e443b7e50ad72ce74c2f19e8994142f486a6f04f0b4e9f4ca9c7fd49', 'Should have correct blob hash')
    assert.equal(decoded.syscoin.poda.blobData, null, 'Should not have blob data (only hash is stored on-chain)')
    assert.equal(decoded.vout.length, 2, 'Should have 2 outputs')
    assert.equal(decoded.vout[0].scriptPubKey.type, 'nulldata', 'First output should be OP_RETURN')
    assert.equal(decoded.vout[1].value, 63.21660522, 'Second output should have correct value')
    assert.end()
  } catch (err) {
    assert.fail('Should not throw error for valid PoDA transaction: ' + err.message)
    assert.end()
  }
})

tape.test('decodeRawTransaction - Transaction with witness data', (assert) => {
  const HDSigner = new sjs.utils.HDSigner('abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about', null, true)
  const syscoinjs = new sjs.SyscoinJSLib(HDSigner)

  // Create a transaction with witness data
  const tx = new bitcoin.Transaction()
  tx.version = 2
  tx.addInput(Buffer.from('abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890', 'hex'), 1, 0xfffffffd)
  tx.addOutput(Buffer.from('0014' + '1234567890abcdef1234567890abcdef12345678', 'hex'), 1990000)

  // Add witness data to the input
  tx.ins[0].witness = [
    Buffer.from('304402203e4f285df7e3e5db85c4e2fe4bce3e3e8b4e8e4e4e4e4e4e4e4e4e4e4e4e4e4e02207e4f285df7e3e5db85c4e2fe4bce3e3e8b4e8e4e4e4e4e4e4e4e4e4e4e4e4e4e01', 'hex'),
    Buffer.from('02ed51ac306fccf740f5b108afd569df35a8d380313370d8df851ba0a057b4f72123', 'hex')
  ]

  const decoded = syscoinjs.decodeRawTransaction(tx)

  assert.equal(decoded.vin.length, 1, 'Should have 1 input')
  assert.ok(decoded.vin[0].txinwitness, 'Should have witness data')
  assert.equal(decoded.vin[0].txinwitness.length, 2, 'Should have 2 witness elements')
  assert.end()
})

tape.test('decodeRawTransaction - Syscoin Asset Allocation Send', (assert) => {
  const HDSigner = new sjs.utils.HDSigner('abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about', null, true)
  const syscoinjs = new sjs.SyscoinJSLib(HDSigner)

  // Use actual hex from fixtures for asset allocation send (version 142)
  const txHex = '8e00000000010235addfbfd1abfcb55234f51b1ecf8e967df9353b87a9bacdba63a5358803f1440000000000fdffffff4629e5a0b015fc8c0585693539c7cc79b27b6afb21d0bf993e182531c236053f0000000000fdffffff03a8020000000000001600148dc01f0d18640370e091198979398466abed8a8700000000000000000d6a0b0188b5aa803802003b022726dd64ca13000000160014c27fb464acece67abe8e8289a2c9cb2d60cabecd02483045022100a34a7760a9d5d615f792b1216bbf59865a06fe7f088d3765781d9836d64418a502202c158f3f4a6bbbc1618f0482859748038ae2a5b29dd80a7921393b4e0f6bb1e1012103e493f90c55de11c1b3aa3fc13b337807c7c1e121a2767856cfd6946e18c7fcc102483045022100b3da33d80c8b73e5f4b57d211c41861acef4dfa415b9df4ce280f9cfdf2bf83102205686dadd9c424841bdfdd2d381480ec3a583c0466d182eb6bcfdeed30adb4e49012102e58139f9d633d5d1d76feb87fc2c44705cc317e83ade1a812f8d2a4ae7be9cb500000000'

  const tx = bitcoin.Transaction.fromHex(txHex)
  const decoded = syscoinjs.decodeRawTransaction(tx)

  assert.equal(decoded.version, syscointx.utils.SYSCOIN_TX_VERSION_ALLOCATION_SEND, 'Should have asset allocation send version')
  assert.ok(decoded.syscoin, 'Should have syscoin-specific data')
  assert.equal(decoded.syscoin.txtype, 'assetallocation_send', 'Should have correct transaction type')
  assert.ok(decoded.syscoin.allocations, 'Should have allocation data')
  assert.equal(decoded.syscoin.allocations.assets[0].assetGuid, '2529870008', 'Should have correct asset GUID')
  assert.end()
})

tape.test('decodeRawTransaction - Syscoin Asset Allocation Burn to Syscoin', (assert) => {
  const HDSigner = new sjs.utils.HDSigner('abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about', null, true)
  const syscoinjs = new sjs.SyscoinJSLib(HDSigner)

  // Create a proper allocation burn to syscoin transaction
  const tx = new bitcoin.Transaction()
  tx.version = syscointx.utils.SYSCOIN_TX_VERSION_ALLOCATION_BURN_TO_SYSCOIN
  tx.addInput(Buffer.from('1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef', 'hex'), 0, 0xfffffffd)

  // Create allocation data
  const assetAllocations = [{
    assetGuid: '12345',
    values: [{ n: 0, value: new sjs.utils.BN(100000000) }]
  }]

  // Create burn data (empty ethereum address for burn to syscoin)
  const burnData = {
    ethaddress: Buffer.from('', 'hex')
  }

  // Serialize allocations and burn data separately
  const assetAllocationsBuffer = syscointx.bufferUtils.serializeAssetAllocations(assetAllocations)
  const burnBuffer = syscointx.bufferUtils.serializeAllocationBurn(burnData)

  // Combine them like createAssetTransaction does: [allocations][burnData]
  const combinedBuffer = Buffer.concat([assetAllocationsBuffer, burnBuffer])

  // Create OP_RETURN output with the combined data
  const dataScript = bitcoin.payments.embed({ data: [combinedBuffer] }).output
  tx.addOutput(dataScript, 0)

  // Add a regular output
  tx.addOutput(Buffer.from('0014' + '1234567890abcdef1234567890abcdef12345678', 'hex'), 50000000)

  const decoded = syscoinjs.decodeRawTransaction(tx)

  assert.equal(decoded.version, syscointx.utils.SYSCOIN_TX_VERSION_ALLOCATION_BURN_TO_SYSCOIN, 'Should have burn to syscoin version')
  assert.ok(decoded.syscoin, 'Should have syscoin-specific data')
  assert.equal(decoded.syscoin.txtype, 'assetallocationburn_to_syscoin', 'Should have correct transaction type')
  assert.ok(decoded.syscoin.allocations, 'Should have allocation data')
  assert.equal(decoded.syscoin.allocations.assets.length, 1, 'Should have 1 asset allocation')
  assert.equal(decoded.syscoin.allocations.assets[0].assetGuid, '12345', 'Should have correct asset GUID')
  assert.equal(decoded.syscoin.allocations.assets[0].values[0].value, '100000000', 'Should have correct value')
  assert.end()
})

tape.test('decodeRawTransaction - Syscoin Asset Allocation Burn to Ethereum', (assert) => {
  const HDSigner = new sjs.utils.HDSigner('abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about', null, true)
  const syscoinjs = new sjs.SyscoinJSLib(HDSigner)

  // Create a proper burn to ethereum transaction
  const tx = new bitcoin.Transaction()
  tx.version = syscointx.utils.SYSCOIN_TX_VERSION_ALLOCATION_BURN_TO_ETHEREUM
  tx.addInput(Buffer.from('1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef', 'hex'), 0, 0xfffffffd)

  // Create allocation data
  const assetAllocations = [{
    assetGuid: '67890',
    values: [{ n: 0, value: new sjs.utils.BN(200000000) }]
  }]

  // Create burn data (just ethereum address)
  const burnData = {
    ethaddress: Buffer.from('742d35Cc6634C0532925a3b844Bc9e7595f8b5d0', 'hex')
  }

  // Serialize allocations and burn data separately
  const assetAllocationsBuffer = syscointx.bufferUtils.serializeAssetAllocations(assetAllocations)
  const burnBuffer = syscointx.bufferUtils.serializeAllocationBurn(burnData)

  // Combine them like createAssetTransaction does: [allocations][burnData]
  const combinedBuffer = Buffer.concat([assetAllocationsBuffer, burnBuffer])

  // Create OP_RETURN output with the combined data
  const dataScript = bitcoin.payments.embed({ data: [combinedBuffer] }).output
  tx.addOutput(dataScript, 0)

  const decoded = syscoinjs.decodeRawTransaction(tx)

  assert.equal(decoded.version, syscointx.utils.SYSCOIN_TX_VERSION_ALLOCATION_BURN_TO_ETHEREUM, 'Should have burn to ethereum version')
  assert.ok(decoded.syscoin, 'Should have syscoin-specific data')
  assert.equal(decoded.syscoin.txtype, 'assetallocationburn_to_ethereum', 'Should have correct transaction type')
  assert.ok(decoded.syscoin.burn, 'Should have burn data')
  assert.equal(decoded.syscoin.burn.ethaddress, '742d35cc6634c0532925a3b844bc9e7595f8b5d0', 'Should have correct ethereum address')
  assert.ok(decoded.syscoin.burn.allocation, 'Should have allocation data in burn')
  assert.equal(decoded.syscoin.burn.allocation[0].assetGuid, '67890', 'Should have correct asset GUID in burn')
  assert.equal(decoded.syscoin.burn.allocation[0].values[0].value, '200000000', 'Should have correct value in burn')
  assert.end()
})

tape.test('decodeRawTransaction - Syscoin Asset Allocation Mint', (assert) => {
  const HDSigner = new sjs.utils.HDSigner('abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about', null, true)
  const syscoinjs = new sjs.SyscoinJSLib(HDSigner)

  // Create a proper asset allocation mint transaction
  const tx = new bitcoin.Transaction()
  tx.version = syscointx.utils.SYSCOIN_TX_VERSION_ALLOCATION_MINT
  tx.addInput(Buffer.from('1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef', 'hex'), 0, 0xfffffffd)

  // Create allocation data
  const assetAllocations = [{
    assetGuid: '12345',
    values: [{ n: 0, value: new sjs.utils.BN(300000000) }]
  }]

  // Create mint data with Ethereum proof (without allocations, they're added separately)
  const mintData = {
    ethtxid: Buffer.from('abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890', 'hex'),
    blockhash: Buffer.from('1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef', 'hex'),
    txpos: 42,
    txparentnodes: Buffer.from('deadbeef', 'hex'),
    txpath: Buffer.from('cafebabe', 'hex'),
    receiptpos: 1,
    receiptparentnodes: Buffer.from('feedface', 'hex'),
    txroot: Buffer.from('0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef', 'hex'),
    receiptroot: Buffer.from('fedcba9876543210fedcba9876543210fedcba9876543210fedcba9876543210', 'hex')
  }

  // Serialize allocations and mint data separately
  const assetAllocationsBuffer = syscointx.bufferUtils.serializeAssetAllocations(assetAllocations)
  const mintBuffer = syscointx.bufferUtils.serializeMintSyscoin(mintData)

  // Combine them like createAssetTransaction does: [allocations][mintData]
  const combinedBuffer = Buffer.concat([assetAllocationsBuffer, mintBuffer])

  // Create OP_RETURN output with the combined data
  const dataScript = bitcoin.payments.embed({ data: [combinedBuffer] }).output
  tx.addOutput(dataScript, 0)

  const decoded = syscoinjs.decodeRawTransaction(tx)

  assert.equal(decoded.version, syscointx.utils.SYSCOIN_TX_VERSION_ALLOCATION_MINT, 'Should have allocation mint version')
  assert.ok(decoded.syscoin, 'Should have syscoin-specific data')
  assert.equal(decoded.syscoin.txtype, 'assetallocation_mint', 'Should have correct transaction type')
  assert.ok(decoded.syscoin.mint, 'Should have mint data')
  assert.ok(decoded.syscoin.mint.allocation, 'Should have allocation data in mint')
  assert.equal(decoded.syscoin.mint.allocation[0].assetGuid, '12345', 'Should have correct asset GUID')
  assert.equal(decoded.syscoin.mint.allocation[0].values[0].value, '300000000', 'Should have correct value')
  assert.equal(decoded.syscoin.mint.ethtxid, 'abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890', 'Should have correct ethtxid')
  assert.equal(decoded.syscoin.mint.blockhash, '1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef', 'Should have correct blockhash')
  assert.equal(decoded.syscoin.mint.txpos, 42, 'Should have correct txpos')
  assert.end()
})

tape.test('decodeRawTransaction - Syscoin Burn to Asset Allocation', (assert) => {
  const HDSigner = new sjs.utils.HDSigner('abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about', null, true)
  const syscoinjs = new sjs.SyscoinJSLib(HDSigner)

  // Create a proper syscoin burn to allocation transaction
  const tx = new bitcoin.Transaction()
  tx.version = syscointx.utils.SYSCOIN_TX_VERSION_SYSCOIN_BURN_TO_ALLOCATION
  tx.addInput(Buffer.from('1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef', 'hex'), 0, 0xfffffffd)

  // Create allocation data
  const assetAllocations = [{
    assetGuid: '98765',
    values: [{ n: 0, value: new sjs.utils.BN(150000000) }]
  }]

  // For burn to allocation, there's no additional data buffer, just allocations
  const assetAllocationsBuffer = syscointx.bufferUtils.serializeAssetAllocations(assetAllocations)

  // Create OP_RETURN output with just the allocation data
  const dataScript = bitcoin.payments.embed({ data: [assetAllocationsBuffer] }).output
  tx.addOutput(dataScript, 0)

  const decoded = syscoinjs.decodeRawTransaction(tx)

  assert.equal(decoded.version, syscointx.utils.SYSCOIN_TX_VERSION_SYSCOIN_BURN_TO_ALLOCATION, 'Should have syscoin burn to allocation version')
  assert.ok(decoded.syscoin, 'Should have syscoin-specific data')
  assert.equal(decoded.syscoin.txtype, 'syscoinburn_to_allocation', 'Should have correct transaction type')
  assert.ok(decoded.syscoin.allocations, 'Should have allocation data')
  assert.equal(decoded.syscoin.allocations.assets.length, 1, 'Should have 1 asset allocation')
  assert.equal(decoded.syscoin.allocations.assets[0].assetGuid, '98765', 'Should have correct asset GUID')
  assert.equal(decoded.syscoin.allocations.assets[0].values[0].value, '150000000', 'Should have correct value')
  assert.end()
})

tape.test('decodeRawTransaction - Error handling', (assert) => {
  const HDSigner = new sjs.utils.HDSigner('abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about', null, true)
  const syscoinjs = new sjs.SyscoinJSLib(HDSigner)

  // Test with invalid input
  try {
    syscoinjs.decodeRawTransaction({})
    assert.fail('Should throw error for invalid input')
  } catch (err) {
    assert.ok(err.message.includes('Input must be a PSBT or transaction object'), 'Should throw appropriate error message')
  }

  // Test with null input
  try {
    syscoinjs.decodeRawTransaction(null)
    assert.fail('Should throw error for null input')
  } catch (err) {
    assert.ok(err.message, 'Should throw error for null input')
  }

  assert.end()
})

tape.test('decodeRawTransaction - Create and decode PoDA transaction', async (assert) => {
  const HDSigner = new sjs.utils.HDSigner('abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about', null, true)
  const syscoinjs = new sjs.SyscoinJSLib(HDSigner, null, syscointx.utils.syscoinNetworks.testnet)

  // Generate a proper testnet address
  const changeAddress = await HDSigner.getNewReceivingAddress()

  // Create a simple UTXO for funding
  const p2wpkh = bitcoin.payments.p2wpkh({ address: changeAddress, network: syscoinjs.network })
  const rawUtxos = {
    utxos: [{
      txid: 'abcd1234567890abcdef1234567890abcdef1234567890abcdef1234567890ef',
      vout: 0,
      address: changeAddress,
      value: '5000000', // 0.05 SYS
      path: "m/84'/1'/0'/0/0",
      script: p2wpkh.output.toString('hex')
    }]
  }
  // Create PoDA transaction options - blobData should be hex string
  const blobData = '64dbfb02268b642f6a32a266bdd54add8989a1fa913b7414a642b5d85e964c68aa' // From fixture
  const expectedBlobHash = sjs.utils.web3.utils.sha3('0x' + blobData).slice(2) // Remove '0x' prefix
  const txOpts = {
    blobData, // Pass as hex string, createPoDA will handle conversion
    rbf: true
  }

  const feeRate = new sjs.utils.BN(10)

  try {
    // Create the PoDA transaction using syscoinjs library
    const result = await syscoinjs.createPoDA(txOpts, changeAddress, feeRate, changeAddress, rawUtxos)
    const psbt = result.psbt || result // Handle either PSBT or result object

    assert.ok(psbt, 'Should create PoDA PSBT')
    assert.equal(psbt.version, syscointx.utils.SYSCOIN_TX_VERSION_NEVM_DATA, 'Should have PoDA version')

    // Extract the transaction from PSBT to decode it
    const tx = psbt.extractTransaction(true, true)

    // Now decode the transaction
    const decoded = syscoinjs.decodeRawTransaction(tx)

    assert.ok(decoded, 'Should decode the transaction')
    assert.equal(decoded.version, syscointx.utils.SYSCOIN_TX_VERSION_NEVM_DATA, 'Decoded should have PoDA version')
    assert.equal(decoded.syscoin.txtype, 'nevm_data', 'Should have correct transaction type')
    assert.ok(decoded.syscoin.poda, 'Should have PoDA data')

    // Verify the blob hash matches what we expect

    assert.equal(decoded.syscoin.poda.blobHash, expectedBlobHash, 'Should have correct blob hash')
    assert.equal(decoded.syscoin.poda.blobData, null, 'Should not have blob data in decoded tx')

    // Verify OP_RETURN output exists
    let hasOpReturn = false
    decoded.vout.forEach(vout => {
      if (vout.scriptPubKey.type === 'nulldata') {
        hasOpReturn = true
        assert.ok(vout.scriptPubKey.hex.includes(expectedBlobHash), 'OP_RETURN should contain blob hash')
      }
    })
    assert.ok(hasOpReturn, 'Should have OP_RETURN output')

    assert.end()
  } catch (err) {
    assert.fail('Should not throw error: ' + err.message)
    assert.end()
  }
})

tape.test('decodeRawTransaction - Asset allocation with assetInfo metadata', async (assert) => {
  const HDSigner = new sjs.utils.HDSigner('abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about', null, true)
  const syscoinjs = new sjs.SyscoinJSLib(HDSigner, null, syscointx.utils.syscoinNetworks.testnet)

  // Generate addresses
  const changeAddress = await HDSigner.getNewReceivingAddress()
  const receivingAddress = await HDSigner.getNewReceivingAddress()

  // Create asset map for SYSX (guid: 123456)
  const assetMap = new Map()
  const assetGuid = '123456'
  assetMap.set(assetGuid, {
    changeAddress,
    outputs: [{
      value: new sjs.utils.BN(200000000), // 2 SYSX
      address: receivingAddress
    }]
  })

  // Mock the createAssetTransaction to return a result with inputs/outputs that have assetInfo
  const mockRes = {
    txVersion: syscointx.utils.SYSCOIN_TX_VERSION_ALLOCATION_SEND,
    inputs: [{
      txId: Buffer.from('efabcd1234567890abcdef1234567890abcdef1234567890abcdef1234567890', 'hex').reverse(),
      vout: 0,
      value: new sjs.utils.BN(1000),
      address: changeAddress,
      assetInfo: {
        assetGuid,
        value: new sjs.utils.BN(500000000)
      }
    }],
    outputs: [
      {
        address: receivingAddress,
        value: new sjs.utils.BN(1000),
        assetInfo: {
          assetGuid,
          value: new sjs.utils.BN(200000000)
        }
      },
      {
        address: changeAddress,
        value: new sjs.utils.BN(1000),
        assetInfo: {
          assetGuid,
          value: new sjs.utils.BN(300000000) // 3 SYSX change
        }
      },
      {
        script: bitcoin.payments.embed({ data: [Buffer.from('74657374', 'hex')] }).output, // 'test' in hex
        value: new sjs.utils.BN(0)
      }
    ],
    fee: new sjs.utils.BN(1000)
  }

  try {
    // Create PSBT from the mock result
    const psbt = await syscoinjs.createPSBTFromRes(mockRes)

    // Check that assetInfo was added to PSBT metadata
    assert.ok(psbt.data.inputs[0].unknownKeyVals, 'Input should have unknown key vals')

    // Find assetInfo in metadata
    let inputAssetInfo = null
    psbt.data.inputs[0].unknownKeyVals.forEach(kv => {
      if (kv.key.toString() === 'assetInfo') {
        inputAssetInfo = JSON.parse(kv.value.toString())
      }
    })
    assert.ok(inputAssetInfo, 'Input should have assetInfo metadata')
    assert.equal(inputAssetInfo.assetGuid, assetGuid, 'Input assetInfo should have correct guid')
    assert.equal(inputAssetInfo.value.toString(), '500000000', 'Input assetInfo should have correct value')

    // Check output metadata
    assert.ok(psbt.data.outputs[0].unknownKeyVals, 'Output 0 should have unknown key vals')
    let outputAssetInfo = null
    psbt.data.outputs[0].unknownKeyVals.forEach(kv => {
      if (kv.key.toString() === 'assetInfo') {
        outputAssetInfo = JSON.parse(kv.value.toString())
      }
    })
    assert.ok(outputAssetInfo, 'Output should have assetInfo metadata')
    assert.equal(outputAssetInfo.assetGuid, assetGuid, 'Output assetInfo should have correct guid')

    // Now decode the PSBT and verify assetInfo appears on vin/vout
    const decoded = syscoinjs.decodeRawTransaction(psbt)

    assert.ok(decoded, 'Should decode the PSBT')
    assert.equal(decoded.version, syscointx.utils.SYSCOIN_TX_VERSION_ALLOCATION_SEND, 'Should have correct version')
    assert.equal(decoded.syscoin.txtype, 'assetallocation_send', 'Should have correct transaction type')

    // Check that assetInfo appears on inputs
    assert.ok(decoded.vin[0].assetInfo, 'Input should have assetInfo')
    assert.equal(decoded.vin[0].assetInfo.assetGuid, assetGuid, 'Input assetInfo should have correct guid')
    assert.equal(decoded.vin[0].assetInfo.value.toString(), '500000000', 'Input assetInfo should have correct value')

    // Check that assetInfo appears on outputs
    assert.ok(decoded.vout[0].assetInfo, 'Output 0 should have assetInfo')
    assert.equal(decoded.vout[0].assetInfo.assetGuid, assetGuid, 'Output 0 assetInfo should have correct guid')
    assert.equal(decoded.vout[0].assetInfo.value.toString(), '200000000', 'Output 0 assetInfo should have correct value')

    assert.ok(decoded.vout[1].assetInfo, 'Output 1 (change) should have assetInfo')
    assert.equal(decoded.vout[1].assetInfo.assetGuid, assetGuid, 'Output 1 assetInfo should have correct guid')
    assert.equal(decoded.vout[1].assetInfo.value.toString(), '300000000', 'Output 1 assetInfo should have correct value')

    // Output 2 (OP_RETURN) should not have assetInfo
    assert.equal(decoded.vout[2].assetInfo, undefined, 'OP_RETURN output should not have assetInfo')

    assert.end()
  } catch (err) {
    assert.fail('Should not throw error: ' + err.message)
    assert.end()
  }
})

tape.test('Full flow: Create asset transaction from UTXOs with assetInfo', async (assert) => {
  const HDSigner = new sjs.utils.HDSigner('abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about', null, true)
  const syscoinjs = new sjs.SyscoinJSLib(HDSigner, null, syscointx.utils.syscoinNetworks.testnet)

  // Generate addresses
  const changeAddress = await HDSigner.getNewReceivingAddress()
  const receivingAddress = await HDSigner.getNewReceivingAddress()

  // Create UTXOs with asset info - simulating what comes from the backend
  const p2wpkh = bitcoin.payments.p2wpkh({ address: changeAddress, network: syscoinjs.network })
  const utxos = {
    utxos: [{
      txid: 'abcd1234567890abcdef1234567890abcdef1234567890abcdef1234567890ef',
      vout: 0,
      address: changeAddress,
      value: new sjs.utils.BN(100000), // 0.001 SYS for gas
      path: "m/84'/1'/0'/0/0",
      script: p2wpkh.output.toString('hex'),
      type: 'BECH32',
      assetInfo: {
        assetGuid: '123456',
        value: new sjs.utils.BN(500000000) // 5 SYSX input
      }
    }],
    assets: [{
      assetGuid: '123456',
      symbol: 'SYSX',
      decimals: 8
    }]
  }

  // Create asset map for the transaction
  const assetMap = new Map()
  assetMap.set('123456', {
    changeAddress,
    outputs: [{
      value: new sjs.utils.BN(200000000), // 2 SYSX to send
      address: receivingAddress
    }]
  })

  const txOpts = { rbf: true }
  const feeRate = new sjs.utils.BN(10)

  // Step 1: Use syscointx to create the transaction
  const result = syscointx.assetAllocationSend(txOpts, utxos, assetMap, changeAddress, feeRate)
  assert.ok(result.success, 'Transaction creation should succeed')
  assert.equal(result.txVersion, syscointx.utils.SYSCOIN_TX_VERSION_ALLOCATION_SEND, 'Should be asset allocation send')

  // Step 2: Fix the format difference between syscointx output and syscoinjs input
  // syscointx returns { txid: string, ... } but createPSBTFromRes expects { txId: Buffer, ... }
  const formattedResult = {
    ...result,
    inputs: result.inputs.map(input => ({
      ...input,
      txId: Buffer.from(input.txid, 'hex').reverse(), // Convert string to Buffer and reverse
      assetInfo: input.assetInfo // This should already be present from syscointx
    }))
  }

  // Step 3: Create PSBT from the result
  const psbt = await syscoinjs.createPSBTFromRes(formattedResult)

  // Step 4: Verify assetInfo was added to PSBT metadata
  assert.ok(psbt.data.inputs[0].unknownKeyVals, 'Input should have unknownKeyVals')
  const inputAssetInfo = psbt.data.inputs[0].unknownKeyVals.find(kv => kv.key.toString() === 'assetInfo')
  assert.ok(inputAssetInfo, 'Input should have assetInfo metadata')
  const inputData = JSON.parse(inputAssetInfo.value.toString())
  assert.equal(inputData.assetGuid, '123456', 'Input assetInfo should have correct assetGuid')
  assert.equal(inputData.value, '500000000', 'Input assetInfo should have correct value')

  // Check output assetInfo metadata
  assert.ok(psbt.data.outputs[0].unknownKeyVals, 'Output 0 should have unknownKeyVals')
  const outputAssetInfo = psbt.data.outputs[0].unknownKeyVals.find(kv => kv.key.toString() === 'assetInfo')
  assert.ok(outputAssetInfo, 'Output 0 should have assetInfo metadata')
  const outputData = JSON.parse(outputAssetInfo.value.toString())
  assert.equal(outputData.assetGuid, '123456', 'Output 0 assetInfo should have correct assetGuid')
  assert.equal(outputData.value, '200000000', 'Output 0 assetInfo should have correct value')

  // Step 5: Decode the PSBT to verify assetInfo is attached to vin/vout
  const decoded = syscoinjs.decodeRawTransaction(psbt)

  assert.equal(decoded.version, syscointx.utils.SYSCOIN_TX_VERSION_ALLOCATION_SEND, 'Should be asset allocation send')
  assert.equal(decoded.syscoin.txtype, 'assetallocation_send', 'Should have correct txtype')

  // Verify assetInfo is attached to inputs
  assert.ok(decoded.vin[0].assetInfo, 'Input should have assetInfo attached from PSBT metadata')
  assert.equal(decoded.vin[0].assetInfo.assetGuid, '123456', 'Input assetInfo should have correct assetGuid')
  assert.equal(decoded.vin[0].assetInfo.value, '500000000', 'Input assetInfo should have correct value')

  // Verify assetInfo is attached to outputs
  assert.ok(decoded.vout[0].assetInfo, 'Output 0 should have assetInfo attached')
  assert.equal(decoded.vout[0].assetInfo.assetGuid, '123456', 'Output 0 assetInfo should have correct assetGuid')
  assert.equal(decoded.vout[0].assetInfo.value, '200000000', 'Output 0 assetInfo should have correct value')

  // Change output should also have assetInfo
  assert.ok(decoded.vout[2].assetInfo, 'Output 2 (change) should have assetInfo attached')
  assert.equal(decoded.vout[2].assetInfo.assetGuid, '123456', 'Output 2 assetInfo should have correct assetGuid')
  assert.equal(decoded.vout[2].assetInfo.value, '300000000', 'Output 2 assetInfo should have correct value')

  assert.end()
})

tape.test('decodeRawTransaction - Create and decode PoDA PSBT with sjs library', async (assert) => {
  const HDSigner = new sjs.utils.HDSigner('abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about', null, true)
  const syscoinjs = new sjs.SyscoinJSLib(HDSigner, null, syscointx.utils.syscoinNetworks.testnet)

  // Generate a proper testnet address
  const changeAddress = await HDSigner.getNewReceivingAddress()

  // Create PoDA transaction options
  const blobData = 'cafebabe00112233445566778899aabbccddeeff' // Example blob data (hex)
  const txOpts = {
    blobData, // Pass as hex string, createPoDA will handle conversion
    rbf: false
  }

  const feeRate = new sjs.utils.BN(10)
  const sysFromXpubOrAddress = changeAddress

  // Create a simple UTXO for funding
  const p2wpkh = bitcoin.payments.p2wpkh({ address: changeAddress, network: syscoinjs.network })
  const rawUtxos = {
    utxos: [{
      txid: 'abcd1234567890abcdef1234567890abcdef1234567890abcdef1234567890ef',
      vout: 0,
      address: changeAddress,
      value: '5000000', // 0.05 SYS
      path: "m/84'/1'/0'/0/0",
      script: p2wpkh.output.toString('hex')
    }]
  }

  try {
    // Create the PoDA PSBT using the full syscoinjs library
    const result = await syscoinjs.createPoDA(txOpts, changeAddress, feeRate, sysFromXpubOrAddress, rawUtxos)
    const psbt = result.psbt || result // Handle either PSBT or result object

    assert.ok(psbt, 'Should create PoDA PSBT')
    assert.equal(psbt.version, syscointx.utils.SYSCOIN_TX_VERSION_NEVM_DATA, 'PSBT should have PoDA version')
    assert.equal(psbt.txInputs.length, 1, 'Should have 1 input')
    assert.ok(psbt.txOutputs.length >= 1, 'Should have at least 1 output')

    // Now decode the PSBT
    const decoded = syscoinjs.decodeRawTransaction(psbt)

    assert.ok(decoded, 'Should decode the PSBT')
    assert.equal(decoded.version, syscointx.utils.SYSCOIN_TX_VERSION_NEVM_DATA, 'Decoded should have PoDA version')
    assert.equal(decoded.syscoin.txtype, 'nevm_data', 'Should have correct transaction type')
    assert.ok(decoded.syscoin.poda, 'Should have PoDA data')

    // Verify the blob hash
    const expectedBlobHash = sjs.utils.web3.utils.sha3('0x' + blobData).slice(2) // Remove '0x' prefix
    assert.equal(decoded.syscoin.poda.blobHash, expectedBlobHash, 'Should have correct blob hash')

    // When decoding a PSBT, it should not include the blobData
    assert.equal(decoded.syscoin.poda.blobData, null, 'Should not have blob data in PSBT decode')

    // Verify OP_RETURN output exists
    let hasOpReturn = false
    decoded.vout.forEach(vout => {
      if (vout.scriptPubKey.type === 'nulldata') {
        hasOpReturn = true
        assert.ok(vout.scriptPubKey.hex.includes(expectedBlobHash), 'OP_RETURN should contain blob hash')
      }
    })
    assert.ok(hasOpReturn, 'Should have OP_RETURN output')

    // Verify RBF setting
    assert.equal(decoded.locktime, 0, 'Should have locktime 0')
    decoded.vin.forEach(vin => {
      assert.equal(vin.sequence, 0xffffffff, 'Should have max sequence (RBF disabled)')
    })

    assert.end()
  } catch (err) {
    assert.fail('Should not throw error: ' + err.message)
    assert.end()
  }
})

tape.test('Blockbook API retry mechanism', (assert) => {
  const utils = require('../utils.js')

  // Store original fetch
  const originalFetch = global.fetch
  let attemptCount = 0

  // Test 1: Successful retry after 503 errors
  global.fetch = async (url, options) => {
    attemptCount++
    if (attemptCount <= 2) {
      // Return 503 for first 2 attempts
      return {
        ok: false,
        status: 503,
        statusText: 'Service Unavailable',
        json: async () => ({ error: 'Service temporarily unavailable' })
      }
    } else {
      // Success on 3rd attempt
      return {
        ok: true,
        status: 200,
        statusText: 'OK',
        json: async () => ({
          blockbook: { coin: 'Syscoin' },
          backend: { chain: 'syscoin' }
        })
      }
    }
  }

  utils.fetchProviderInfo('https://test-blockbook.example.com').then(result => {
    assert.ok(result, 'Should succeed after retries')
    assert.equal(result.blockbook.coin, 'Syscoin', 'Should return correct data')
    assert.equal(attemptCount, 3, 'Should have made 3 attempts')

    // Reset for next test
    attemptCount = 0

    // Test 2: Max retries exceeded
    global.fetch = async (url, options) => {
      attemptCount++
      return {
        ok: false,
        status: 503,
        statusText: 'Service Unavailable',
        json: async () => ({ error: 'Service permanently unavailable' })
      }
    }

    utils.fetchProviderInfo('https://always-503.example.com').then(result => {
      assert.fail('Should not succeed when always returning 503')
      assert.end()
    }).catch(error => {
      assert.ok(error, 'Should fail after max retries')
      assert.ok(error.message.includes('503'), 'Should include 503 in error message')
      assert.equal(attemptCount, 4, 'Should have made 4 attempts (1 initial + 3 retries)')

      // Test 3: 429 (Too Many Requests) should also trigger retry
      attemptCount = 0
      global.fetch = async (url, options) => {
        attemptCount++
        if (attemptCount <= 1) {
          return {
            ok: false,
            status: 429,
            statusText: 'Too Many Requests',
            json: async () => ({ error: 'Rate limited' })
          }
        } else {
          return {
            ok: true,
            status: 200,
            statusText: 'OK',
            json: async () => ({
              blockbook: { coin: 'Bitcoin' },
              backend: { chain: 'bitcoin' }
            })
          }
        }
      }

      utils.fetchProviderInfo('https://rate-limited.example.com').then(result => {
        assert.ok(result, 'Should succeed after 429 retry')
        assert.equal(result.blockbook.coin, 'Bitcoin', 'Should return correct data')
        assert.equal(attemptCount, 2, 'Should have made 2 attempts for 429')

        // Test 4: Non-retryable errors should not retry
        attemptCount = 0
        global.fetch = async (url, options) => {
          attemptCount++
          return {
            ok: false,
            status: 404,
            statusText: 'Not Found',
            json: async () => ({ error: 'Not found' })
          }
        }

        utils.fetchProviderInfo('https://not-found.example.com').then(result => {
          assert.equal(result, null, 'Should return null for non-retryable errors')
          assert.equal(attemptCount, 1, 'Should have made only 1 attempt for 404')

          // Restore original fetch and end test
          global.fetch = originalFetch
          assert.end()
        }).catch(error => {
          // Restore original fetch and end test
          global.fetch = originalFetch
          assert.fail('Unexpected error in non-retryable test: ' + error.message)
          assert.end()
        })
      }).catch(error => {
        global.fetch = originalFetch
        assert.fail('Should not fail for 429 retry: ' + error.message)
        assert.end()
      })
    })
  }).catch(error => {
    global.fetch = originalFetch
    assert.fail('Should not fail for successful retry: ' + error.message)
    assert.end()
  })
})
