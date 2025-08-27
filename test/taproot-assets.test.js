const tape = require('tape')
const sjs = require('..')
const bitcoin = sjs.utils.bitcoinjs
const BN = sjs.utils.BN

function toXOnly (pubkey) {
  return pubkey.length === 33 ? pubkey.slice(1, 33) : pubkey
}

tape('Taproot asset allocation send - HDSigner', async (t) => {
  try {
    const mnemonic = 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about'
    const HDSigner = new sjs.utils.HDSigner(mnemonic, null, true)
    const sysNet = sjs.utils.syscoinNetworks.testnet

    // Derive taproot addresses
    const path1 = "m/86'/1'/0'/0/0"
    const path2 = "m/86'/1'/0'/0/1"

    const pubkey1 = HDSigner.derivePubKey(path1)
    const xOnly1 = toXOnly(pubkey1)
    const p2tr1 = bitcoin.payments.p2tr({ internalPubkey: xOnly1, network: sysNet })
    const address1 = p2tr1.address

    const pubkey2 = HDSigner.derivePubKey(path2)
    const xOnly2 = toXOnly(pubkey2)
    const p2tr2 = bitcoin.payments.p2tr({ internalPubkey: xOnly2, network: sysNet })
    const address2 = p2tr2.address

    const sys = new sjs.SyscoinJSLib(HDSigner, null, sysNet)

    // Create asset map for sending 100 units of asset 123456
    const assetMap = new Map([
      ['123456', { outputs: [{ value: new BN(100), address: address2 }] }]
    ])

    // Mock UTXOs with asset info on taproot address
    // In a real scenario, the backend provides both utxos and assets arrays
    const utxos = {
      utxos: [
        {
          txid: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          vout: 0,
          address: address1,
          path: path1,
          value: '10000000',
          confirmations: 1,
          assetInfo: {
            assetGuid: '123456',
            value: new BN(1000) // Has 1000 units of asset
          }
        }
      ],
      assets: [
        {
          assetGuid: '123456',
          symbol: 'TEST',
          decimals: 8
          // Other asset metadata that would come from backend
        }
      ]
    }

    const feeRate = new BN(10)
    const { psbt } = await sys.assetAllocationSend({ rbf: true }, assetMap, address1, feeRate, address1, utxos)

    // Check that tapInternalKey and tapBip32Derivation are set for taproot inputs
    t.ok(psbt.data.inputs[0].tapInternalKey, 'Input should have tapInternalKey')
    t.ok(psbt.data.inputs[0].tapBip32Derivation, 'Input should have tapBip32Derivation')

    // Check outputs have proper asset info
    const hasAssetOutput = psbt.data.outputs.some(output => {
      const proprietary = output.unknownKeyVals
      return proprietary && proprietary.some(kv =>
        Buffer.isBuffer(kv.key) && kv.key.toString() === 'assetInfo'
      )
    })
    t.ok(hasAssetOutput, 'Should have asset output with proprietary data')

    // Sign the PSBT
    const signed = await HDSigner.sign(psbt)
    const tx = signed.extractTransaction(true)
    t.ok(typeof tx.hasWitnesses === 'function' ? tx.hasWitnesses() : tx.ins[0].witness.length > 0,
      'Asset tx with taproot should have witness')

    t.end()
  } catch (err) {
    t.fail('Unexpected error: ' + err.message)
    t.end()
  }
})

tape('Taproot asset allocation with multiple inputs - WIF', async (t) => {
  try {
    const mnemonic = 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about'
    const HDSigner = new sjs.utils.HDSigner(mnemonic, null, true)
    const sysNet = sjs.utils.syscoinNetworks.testnet
    const ECPair = sjs.utils.bitcoinjs.ECPair

    // Generate WIF keys from HD paths
    const path1 = "m/86'/1'/0'/0/2"
    const path2 = "m/86'/1'/0'/0/3"
    const hdKeypair1 = HDSigner.deriveKeypair(path1)
    const hdKeypair2 = HDSigner.deriveKeypair(path2)
    const wif1 = hdKeypair1.toWIF()
    const wif2 = hdKeypair2.toWIF()

    // Create ECPair objects from WIF (these won't have fingerprints)
    const keypair1 = ECPair.fromWIF(wif1, sysNet)
    const keypair2 = ECPair.fromWIF(wif2, sysNet)

    // Create taproot addresses
    const xOnly1 = toXOnly(keypair1.publicKey)
    const p2tr1 = bitcoin.payments.p2tr({ internalPubkey: xOnly1, network: sysNet })

    const xOnly2 = toXOnly(keypair2.publicKey)
    const p2tr2 = bitcoin.payments.p2tr({ internalPubkey: xOnly2, network: sysNet })

    const psbt = new bitcoin.Psbt({ network: sysNet })
    psbt.setVersion(2)

    // Add multiple taproot inputs with assets
    psbt.addInput({
      hash: Buffer.from('bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb', 'hex'),
      index: 0,
      sequence: 0xfffffffd,
      witnessUtxo: { script: p2tr1.output, value: BigInt(5000000) },
      tapInternalKey: xOnly1
    })

    psbt.addInput({
      hash: Buffer.from('cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc', 'hex'),
      index: 1,
      sequence: 0xfffffffd,
      witnessUtxo: { script: p2tr2.output, value: BigInt(3000000) },
      tapInternalKey: xOnly2
    })

    // Add asset info as proprietary data to inputs
    psbt.data.inputs[0].unknownKeyVals = [{
      key: Buffer.from('assetInfo'),
      value: Buffer.from(JSON.stringify({
        assetGuid: '789',
        value: '500'
      }))
    }]

    psbt.data.inputs[1].unknownKeyVals = [{
      key: Buffer.from('assetInfo'),
      value: Buffer.from(JSON.stringify({
        assetGuid: '789',
        value: '300'
      }))
    }]

    // Add outputs
    psbt.addOutput({
      script: p2tr1.output,
      value: BigInt(7000000)
    })

    // Add asset info to output
    psbt.data.outputs[0].unknownKeyVals = [{
      key: Buffer.from('assetInfo'),
      value: Buffer.from(JSON.stringify({
        assetGuid: '789',
        value: '750' // Combined assets minus fee
      }))
    }]

    // Sign with multiple WIF keys using the library's built-in functionality
    // The library applies the polyfill internally and handles signing properly
    const signed = await sjs.utils.signWithWIF(psbt, [wif1, wif2], sysNet)
    const tx = signed.extractTransaction(true)

    t.ok(typeof tx.hasWitnesses === 'function' ? tx.hasWitnesses() : tx.ins[0].witness.length > 0,
      'Multi-input taproot asset tx should have witnesses')
    t.ok(tx.ins.every(input => input.witness && input.witness.length > 0),
      'All inputs should have witnesses')

    t.end()
  } catch (err) {
    t.fail('Unexpected error: ' + err.message)
    t.end()
  }
})

tape('Taproot asset burn transaction', async (t) => {
  try {
    const mnemonic = 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about'
    const HDSigner = new sjs.utils.HDSigner(mnemonic, null, true)
    const sysNet = sjs.utils.syscoinNetworks.testnet

    const path = "m/86'/1'/0'/0/4"
    const pubkey = HDSigner.derivePubKey(path)
    const xOnly = toXOnly(pubkey)
    const p2tr = bitcoin.payments.p2tr({ internalPubkey: xOnly, network: sysNet })

    const psbt = new bitcoin.Psbt({ network: sysNet })
    psbt.setVersion(2)

    // Add taproot input with asset
    psbt.addInput({
      hash: Buffer.from('dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd', 'hex'),
      index: 0,
      sequence: 0xfffffffd,
      witnessUtxo: { script: p2tr.output, value: BigInt(1000000) },
      tapInternalKey: xOnly,
      tapBip32Derivation: [{
        masterFingerprint: HDSigner.getRootNode().fingerprint,
        path,
        pubkey: xOnly,
        leafHashes: []
      }]
    })

    // Add asset info to input (1000 units to burn)
    psbt.data.inputs[0].unknownKeyVals = [{
      key: Buffer.from('assetInfo'),
      value: Buffer.from(JSON.stringify({
        assetGuid: '999',
        value: '1000'
      }))
    }]

    // Add OP_RETURN output for burn
    const burnScript = bitcoin.script.compile([
      bitcoin.opcodes.OP_RETURN,
      Buffer.from('burn')
    ])

    psbt.addOutput({
      script: burnScript,
      value: BigInt(0)
    })

    // Add change output (no asset, just SYS)
    psbt.addOutput({
      script: p2tr.output,
      value: BigInt(990000)
    })

    // Add burn info to OP_RETURN output
    psbt.data.outputs[0].unknownKeyVals = [{
      key: Buffer.from('assetInfo'),
      value: Buffer.from(JSON.stringify({
        assetGuid: '999',
        value: '1000',
        burn: true
      }))
    }]

    // Sign the burn transaction
    const signed = await HDSigner.sign(psbt)
    const tx = signed.extractTransaction(true)

    t.ok(typeof tx.hasWitnesses === 'function' ? tx.hasWitnesses() : tx.ins[0].witness.length > 0,
      'Burn tx with taproot should have witness')

    // Verify OP_RETURN output exists
    const hasOpReturn = tx.outs.some(out => {
      const chunks = bitcoin.script.decompile(out.script)
      return chunks && chunks[0] === bitcoin.opcodes.OP_RETURN
    })
    t.ok(hasOpReturn, 'Should have OP_RETURN output for burn')

    t.end()
  } catch (err) {
    t.fail('Unexpected error: ' + err.message)
    t.end()
  }
})

tape('Taproot with asset mint transaction', async (t) => {
  try {
    const mnemonic = 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about'
    const HDSigner = new sjs.utils.HDSigner(mnemonic, null, true)
    const sysNet = sjs.utils.syscoinNetworks.testnet

    // Owner address for minting
    const ownerPath = "m/86'/1'/0'/0/5"
    const ownerPubkey = HDSigner.derivePubKey(ownerPath)
    const ownerXOnly = toXOnly(ownerPubkey)
    const ownerP2tr = bitcoin.payments.p2tr({ internalPubkey: ownerXOnly, network: sysNet })

    // Recipient address
    const recipientPath = "m/86'/1'/0'/0/6"
    const recipientPubkey = HDSigner.derivePubKey(recipientPath)
    const recipientXOnly = toXOnly(recipientPubkey)
    const recipientP2tr = bitcoin.payments.p2tr({ internalPubkey: recipientXOnly, network: sysNet })

    const psbt = new bitcoin.Psbt({ network: sysNet })
    psbt.setVersion(2)

    // Add taproot input from asset owner
    psbt.addInput({
      hash: Buffer.from('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', 'hex'),
      index: 0,
      sequence: 0xfffffffd,
      witnessUtxo: { script: ownerP2tr.output, value: BigInt(10000000) },
      tapInternalKey: ownerXOnly,
      tapBip32Derivation: [{
        masterFingerprint: HDSigner.getRootNode().fingerprint,
        path: ownerPath,
        pubkey: ownerXOnly,
        leafHashes: []
      }]
    })

    // Add output for minted assets
    psbt.addOutput({
      script: recipientP2tr.output,
      value: BigInt(1000000)
    })

    // Add mint info to output
    psbt.data.outputs[0].unknownKeyVals = [{
      key: Buffer.from('assetInfo'),
      value: Buffer.from(JSON.stringify({
        assetGuid: '555',
        value: '10000', // Minting 10000 new units
        mint: true
      }))
    }]

    // Add change output
    psbt.addOutput({
      script: ownerP2tr.output,
      value: BigInt(8990000)
    })

    // Sign the mint transaction
    const signed = await HDSigner.sign(psbt)
    const tx = signed.extractTransaction(true)

    t.ok(typeof tx.hasWitnesses === 'function' ? tx.hasWitnesses() : tx.ins[0].witness.length > 0,
      'Mint tx with taproot should have witness')
    t.equal(tx.outs.length, 2, 'Should have recipient and change outputs')

    t.end()
  } catch (err) {
    t.fail('Unexpected error: ' + err.message)
    t.end()
  }
})

tape('Taproot asset with mixed address types', async (t) => {
  try {
    const mnemonic = 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about'
    const HDSigner = new sjs.utils.HDSigner(mnemonic, null, true)
    const sysNet = sjs.utils.syscoinNetworks.testnet

    // Taproot input
    const taprootPath = "m/86'/1'/0'/0/7"
    const taprootPubkey = HDSigner.derivePubKey(taprootPath)
    const taprootXOnly = toXOnly(taprootPubkey)
    const p2tr = bitcoin.payments.p2tr({ internalPubkey: taprootXOnly, network: sysNet })

    // P2WPKH output
    const segwitPath = "m/84'/1'/0'/0/0"
    const segwitPubkey = HDSigner.derivePubKey(segwitPath)
    const p2wpkh = bitcoin.payments.p2wpkh({ pubkey: segwitPubkey, network: sysNet })

    const psbt = new bitcoin.Psbt({ network: sysNet })
    psbt.setVersion(2)

    // Add taproot input with asset
    psbt.addInput({
      hash: Buffer.from('ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff', 'hex'),
      index: 0,
      sequence: 0xfffffffd,
      witnessUtxo: { script: p2tr.output, value: BigInt(5000000) },
      tapInternalKey: taprootXOnly,
      tapBip32Derivation: [{
        masterFingerprint: HDSigner.getRootNode().fingerprint,
        path: taprootPath,
        pubkey: taprootXOnly,
        leafHashes: []
      }]
    })

    // Add asset info to taproot input
    psbt.data.inputs[0].unknownKeyVals = [{
      key: Buffer.from('assetInfo'),
      value: Buffer.from(JSON.stringify({
        assetGuid: '777',
        value: '2000'
      }))
    }]

    // Send assets to P2WPKH address
    psbt.addOutput({
      script: p2wpkh.output,
      value: BigInt(1000000)
    })

    // Add asset info to P2WPKH output
    psbt.data.outputs[0].unknownKeyVals = [{
      key: Buffer.from('assetInfo'),
      value: Buffer.from(JSON.stringify({
        assetGuid: '777',
        value: '1500'
      }))
    }]

    // Change back to taproot
    psbt.addOutput({
      script: p2tr.output,
      value: BigInt(3990000)
    })

    // Remaining assets go to change
    psbt.data.outputs[1].unknownKeyVals = [{
      key: Buffer.from('assetInfo'),
      value: Buffer.from(JSON.stringify({
        assetGuid: '777',
        value: '500'
      }))
    }]

    // Sign the transaction
    const signed = await HDSigner.sign(psbt)
    const tx = signed.extractTransaction(true)

    t.ok(typeof tx.hasWitnesses === 'function' ? tx.hasWitnesses() : tx.ins[0].witness.length > 0,
      'Mixed address type tx should have witness')

    // Verify outputs are correct types
    const sys = new sjs.SyscoinJSLib(HDSigner, null, sysNet)
    const decoded = sys.decodeRawTransaction(tx)

    t.equal(decoded.vout[0].scriptPubKey.type, 'witness_v0_keyhash', 'First output should be P2WPKH')
    t.equal(decoded.vout[1].scriptPubKey.type, 'witness_v1_taproot', 'Change output should be P2TR')

    t.end()
  } catch (err) {
    t.fail('Unexpected error: ' + err.message)
    t.end()
  }
})
