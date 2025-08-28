const tape = require('tape')
const sjs = require('../index.js')
const bitcoin = require('bitcoinjs-lib')

tape('checkPubkeyInScript - multisig script', (t) => {
  try {
    const network = sjs.utils.syscoinNetworks.testnet
    const mnemonic = 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about'
    const HDSigner = new sjs.utils.HDSigner(mnemonic, null, true)

    // Create multiple pubkeys
    const pubkey1 = HDSigner.derivePubKey("m/84'/1'/0'/0/0")
    const pubkey2 = HDSigner.derivePubKey("m/84'/1'/0'/0/1")
    const pubkey3 = HDSigner.derivePubKey("m/84'/1'/0'/0/2")

    // Create a 2-of-3 multisig script
    const multisig = bitcoin.payments.p2ms({
      m: 2,
      pubkeys: [pubkey1, pubkey2, pubkey3],
      network
    })

    // Test that each pubkey is found in the script
    t.ok(sjs.utils.checkPubkeyInScript(multisig.output, pubkey1), 'Should find pubkey1 in multisig script')
    t.ok(sjs.utils.checkPubkeyInScript(multisig.output, pubkey2), 'Should find pubkey2 in multisig script')
    t.ok(sjs.utils.checkPubkeyInScript(multisig.output, pubkey3), 'Should find pubkey3 in multisig script')

    // Test that a random pubkey is not found
    const randomPubkey = HDSigner.derivePubKey("m/84'/1'/0'/0/99")
    t.notOk(sjs.utils.checkPubkeyInScript(multisig.output, randomPubkey), 'Should not find random pubkey in multisig script')

    t.end()
  } catch (err) {
    t.fail('Unexpected error: ' + err.message)
    t.end()
  }
})

tape('checkSimpleScriptOwnership - P2PKH', (t) => {
  try {
    const network = sjs.utils.syscoinNetworks.testnet
    const mnemonic = 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about'
    const HDSigner = new sjs.utils.HDSigner(mnemonic, null, true)

    const pubkey = HDSigner.derivePubKey("m/44'/1'/0'/0/0")
    const p2pkh = bitcoin.payments.p2pkh({ pubkey, network })

    // Create a mock PSBT for testing
    // For P2PKH we typically use nonWitnessUtxo, but for this test we can use witnessUtxo
    const psbt = new bitcoin.Psbt({ network })
    psbt.addInput({
      hash: Buffer.from('a'.repeat(64), 'hex'),
      index: 0,
      sequence: 0xfffffffd,
      witnessUtxo: {
        script: p2pkh.output,
        value: BigInt(100000)
      }
    })

    // Test ownership check
    t.ok(sjs.utils.checkSimpleScriptOwnership(p2pkh.output, pubkey, network, psbt, 0),
      'Should recognize P2PKH ownership')

    // Test with wrong pubkey
    const wrongPubkey = HDSigner.derivePubKey("m/44'/1'/0'/0/1")
    t.notOk(sjs.utils.checkSimpleScriptOwnership(p2pkh.output, wrongPubkey, network, psbt, 0),
      'Should not recognize P2PKH with wrong pubkey')

    t.end()
  } catch (err) {
    t.fail('Unexpected error: ' + err.message)
    t.end()
  }
})

tape('checkSimpleScriptOwnership - P2WPKH', (t) => {
  try {
    const network = sjs.utils.syscoinNetworks.testnet
    const mnemonic = 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about'
    const HDSigner = new sjs.utils.HDSigner(mnemonic, null, true)

    const pubkey = HDSigner.derivePubKey("m/84'/1'/0'/0/0")
    const p2wpkh = bitcoin.payments.p2wpkh({ pubkey, network })

    // Create a mock PSBT for testing
    const psbt = new bitcoin.Psbt({ network })
    psbt.addInput({
      hash: Buffer.from('a'.repeat(64), 'hex'),
      index: 0,
      sequence: 0xfffffffd,
      witnessUtxo: {
        script: p2wpkh.output,
        value: BigInt(100000)
      }
    })

    // Test ownership check
    t.ok(sjs.utils.checkSimpleScriptOwnership(p2wpkh.output, pubkey, network, psbt, 0),
      'Should recognize P2WPKH ownership')

    // Test with wrong pubkey
    const wrongPubkey = HDSigner.derivePubKey("m/84'/1'/0'/0/1")
    t.notOk(sjs.utils.checkSimpleScriptOwnership(p2wpkh.output, wrongPubkey, network, psbt, 0),
      'Should not recognize P2WPKH with wrong pubkey')

    t.end()
  } catch (err) {
    t.fail('Unexpected error: ' + err.message)
    t.end()
  }
})

tape('checkSimpleScriptOwnership - P2SH-P2WPKH', (t) => {
  try {
    const network = sjs.utils.syscoinNetworks.testnet
    const mnemonic = 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about'
    const HDSigner = new sjs.utils.HDSigner(mnemonic, null, true)

    const pubkey = HDSigner.derivePubKey("m/49'/1'/0'/0/0")
    const p2wpkh = bitcoin.payments.p2wpkh({ pubkey, network })
    const p2sh = bitcoin.payments.p2sh({ redeem: p2wpkh, network })

    // Create a mock PSBT for testing
    const psbt = new bitcoin.Psbt({ network })
    psbt.addInput({
      hash: Buffer.from('a'.repeat(64), 'hex'),
      index: 0,
      sequence: 0xfffffffd,
      witnessUtxo: {
        script: p2sh.output,
        value: BigInt(100000)
      }
    })

    // Test ownership check
    t.ok(sjs.utils.checkSimpleScriptOwnership(p2sh.output, pubkey, network, psbt, 0),
      'Should recognize P2SH-P2WPKH ownership')

    // Check that redeemScript was set
    t.ok(psbt.data.inputs[0].redeemScript, 'Should set redeemScript for P2SH-P2WPKH')
    t.ok(psbt.data.inputs[0].redeemScript.equals(p2wpkh.output), 'RedeemScript should match P2WPKH output')

    // Test with wrong pubkey
    const wrongPubkey = HDSigner.derivePubKey("m/49'/1'/0'/0/1")
    const psbt2 = new bitcoin.Psbt({ network })
    psbt2.addInput({
      hash: Buffer.from('b'.repeat(64), 'hex'),
      index: 0,
      sequence: 0xfffffffd,
      witnessUtxo: {
        script: p2sh.output,
        value: BigInt(100000)
      }
    })
    t.notOk(sjs.utils.checkSimpleScriptOwnership(p2sh.output, wrongPubkey, network, psbt2, 0),
      'Should not recognize P2SH-P2WPKH with wrong pubkey')

    t.end()
  } catch (err) {
    t.fail('Unexpected error: ' + err.message)
    t.end()
  }
})

tape('shouldAddBip32Derivation - multisig with witnessScript', (t) => {
  try {
    const network = sjs.utils.syscoinNetworks.testnet
    const mnemonic = 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about'
    const HDSigner = new sjs.utils.HDSigner(mnemonic, null, true)

    const pubkey1 = HDSigner.derivePubKey("m/84'/1'/0'/0/0")
    const pubkey2 = HDSigner.derivePubKey("m/84'/1'/0'/0/1")
    const pubkey3 = HDSigner.derivePubKey("m/84'/1'/0'/0/2")
    const pubkeyNotInScript = HDSigner.derivePubKey("m/84'/1'/0'/0/99")

    // Create a 2-of-3 multisig P2WSH
    const multisig = bitcoin.payments.p2ms({
      m: 2,
      pubkeys: [pubkey1, pubkey2, pubkey3],
      network
    })
    const p2wsh = bitcoin.payments.p2wsh({
      redeem: multisig,
      network
    })

    // Create mock PSBT with witnessScript
    const psbt = new bitcoin.Psbt({ network })
    psbt.addInput({
      hash: Buffer.from('c'.repeat(64), 'hex'),
      index: 0,
      sequence: 0xfffffffd,
      witnessUtxo: {
        script: p2wsh.output,
        value: BigInt(100000)
      },
      witnessScript: multisig.output
    })

    const dataInput = psbt.data.inputs[0]

    // Test that pubkeys in the script should have derivation added
    t.ok(sjs.utils.shouldAddBip32Derivation(dataInput, p2wsh.output, pubkey1, network, psbt, 0),
      'Should add derivation for pubkey1 in multisig')
    t.ok(sjs.utils.shouldAddBip32Derivation(dataInput, p2wsh.output, pubkey2, network, psbt, 0),
      'Should add derivation for pubkey2 in multisig')
    t.ok(sjs.utils.shouldAddBip32Derivation(dataInput, p2wsh.output, pubkey3, network, psbt, 0),
      'Should add derivation for pubkey3 in multisig')

    // Test that pubkey not in script should not have derivation added
    t.notOk(sjs.utils.shouldAddBip32Derivation(dataInput, p2wsh.output, pubkeyNotInScript, network, psbt, 0),
      'Should not add derivation for pubkey not in multisig')

    t.end()
  } catch (err) {
    t.fail('Unexpected error: ' + err.message)
    t.end()
  }
})

tape('shouldAddBip32Derivation - simple scripts', (t) => {
  try {
    const network = sjs.utils.syscoinNetworks.testnet
    const mnemonic = 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about'
    const HDSigner = new sjs.utils.HDSigner(mnemonic, null, true)

    const pubkey = HDSigner.derivePubKey("m/84'/1'/0'/0/0")
    const wrongPubkey = HDSigner.derivePubKey("m/84'/1'/0'/0/1")

    // Test P2WPKH
    const p2wpkh = bitcoin.payments.p2wpkh({ pubkey, network })
    const psbt = new bitcoin.Psbt({ network })
    psbt.addInput({
      hash: Buffer.from('d'.repeat(64), 'hex'),
      index: 0,
      sequence: 0xfffffffd,
      witnessUtxo: {
        script: p2wpkh.output,
        value: BigInt(100000)
      }
    })

    t.ok(sjs.utils.shouldAddBip32Derivation(psbt.data.inputs[0], p2wpkh.output, pubkey, network, psbt, 0),
      'Should add derivation for correct pubkey in P2WPKH')
    t.notOk(sjs.utils.shouldAddBip32Derivation(psbt.data.inputs[0], p2wpkh.output, wrongPubkey, network, psbt, 0),
      'Should not add derivation for wrong pubkey in P2WPKH')

    t.end()
  } catch (err) {
    t.fail('Unexpected error: ' + err.message)
    t.end()
  }
})

tape('Integration: Full signing with derivation verification', (t) => {
  try {
    const network = sjs.utils.syscoinNetworks.testnet
    const mnemonic = 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about'
    const HDSigner = new sjs.utils.HDSigner(mnemonic, null, true)

    // Create a P2WPKH input with path in proprietary data
    const path = "m/84'/1'/0'/0/5"
    const pubkey = HDSigner.derivePubKey(path)
    const p2wpkh = bitcoin.payments.p2wpkh({ pubkey, network })

    const psbt = new bitcoin.Psbt({ network })
    psbt.addInput({
      hash: Buffer.from('e'.repeat(64), 'hex'),
      index: 0,
      sequence: 0xfffffffd,
      witnessUtxo: {
        script: p2wpkh.output,
        value: BigInt(100000)
      }
    })

    // Add path as proprietary data (like the real flow)
    psbt.addUnknownKeyValToInput(0, {
      key: Buffer.from('path'),
      value: Buffer.from(path)
    })

    psbt.addOutput({
      script: p2wpkh.output,
      value: BigInt(90000)
    })

    // Before signing - no derivation
    t.notOk(psbt.data.inputs[0].bip32Derivation, 'Should not have derivation before signing')

    // Sign with skip finalization to check metadata
    psbt._skipFinalization = true
    HDSigner.sign(psbt).then(signed => {
      // After signing - derivation should be set
      t.ok(signed.data.inputs[0].bip32Derivation, 'Should have derivation after signing')
      t.equals(signed.data.inputs[0].bip32Derivation[0].path, path, 'Path should match')
      const derivedPubkey = Buffer.from(signed.data.inputs[0].bip32Derivation[0].pubkey)
      const expectedPubkey = Buffer.from(pubkey)
      t.ok(derivedPubkey.equals(expectedPubkey), 'Pubkey should match')

      t.end()
    }).catch(err => {
      t.fail('Signing failed: ' + err.message)
      t.end()
    })
  } catch (err) {
    t.fail('Unexpected error: ' + err.message)
    t.end()
  }
})
