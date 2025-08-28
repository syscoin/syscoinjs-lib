const tape = require('tape')
const sjs = require('..')
const bitcoin = sjs.utils.bitcoinjs

function toXOnly (pubkey) {
  return pubkey.length === 33 ? pubkey.slice(1, 33) : pubkey
}

tape('Taproot script-path signing - HDSigner with leafHashes', async (t) => {
  try {
    const mnemonic = 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about'
    const HDSigner = new sjs.utils.HDSigner(mnemonic, null, true)
    const btcNet = bitcoin.networks.testnet

    // Create two keys for a 2-of-2 multisig in Taproot
    const path1 = "m/86'/1'/0'/0/0"
    const path2 = "m/86'/1'/0'/0/1"

    const pubkey1 = HDSigner.derivePubKey(path1)
    const xOnly1 = toXOnly(pubkey1)

    const pubkey2 = HDSigner.derivePubKey(path2)
    const xOnly2 = toXOnly(pubkey2)

    // Create a simple script that requires both signatures (for demonstration)
    // In a real scenario, this would be a more complex script
    const leafScript = bitcoin.script.compile([
      xOnly1,
      bitcoin.opcodes.OP_CHECKSIG,
      xOnly2,
      bitcoin.opcodes.OP_CHECKSIGADD,
      bitcoin.opcodes.OP_2,
      bitcoin.opcodes.OP_EQUAL
    ])

    // Calculate leaf hash
    const leafVersion = 0xc0
    const leafHash = bitcoin.crypto.taggedHash(
      'TapLeaf',
      Buffer.concat([Buffer.from([leafVersion]), Buffer.from([leafScript.length]), leafScript])
    )

    // Use key1 as internal key for key-path spending
    const p2tr = bitcoin.payments.p2tr({
      internalPubkey: xOnly1,
      scriptTree: {
        output: leafScript,
        version: leafVersion
      },
      redeem: {
        output: leafScript,
        redeemVersion: leafVersion
      },
      network: btcNet
    })

    const script = Buffer.isBuffer(p2tr.output) ? p2tr.output : Buffer.from(p2tr.output)
    const controlBlock = p2tr.witness ? p2tr.witness[p2tr.witness.length - 1] : Buffer.from([])

    // Build PSBT with script-path setup
    const psbt = new bitcoin.Psbt({ network: btcNet })
    psbt.setVersion(2)

    psbt.addInput({
      hash: Buffer.from('1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef', 'hex'),
      index: 0,
      sequence: 0xfffffffd,
      witnessUtxo: { script, value: BigInt(100000000) },
      tapInternalKey: xOnly1,
      tapLeafScript: controlBlock.length > 0
        ? [{
            leafVersion,
            script: leafScript,
            controlBlock
          }]
        : undefined,
      tapBip32Derivation: [
        {
          masterFingerprint: HDSigner.getRootNode().fingerprint,
          path: path1,
          pubkey: xOnly1,
          leafHashes: [leafHash] // Script-path: has leafHashes!
        },
        {
          masterFingerprint: HDSigner.getRootNode().fingerprint,
          path: path2,
          pubkey: xOnly2,
          leafHashes: [leafHash] // Both signers need this script
        }
      ]
    })

    // Add output
    psbt.addOutput({ script, value: BigInt(99000000) })

    // Step 1: Sign without finalization to check intermediate state
    psbt._skipFinalization = true
    const signedNoFinalize = await HDSigner.signPSBT(psbt)

    // Check that we have tapScriptSig before finalization
    t.ok(signedNoFinalize.data.inputs[0].tapScriptSig, 'Should have tapScriptSig after signing (before finalization)')
    t.notOk(signedNoFinalize.data.inputs[0].tapKeySig, 'Should NOT have tapKeySig for script-path')
    t.notOk(signedNoFinalize.data.inputs[0].finalScriptWitness, 'Should NOT have finalScriptWitness before finalization')

    // Verify the signature is for the correct leaf
    const scriptSig = signedNoFinalize.data.inputs[0].tapScriptSig[0]
    t.ok(Buffer.from(scriptSig.leafHash).equals(leafHash), 'Signature should be for the correct leaf hash')
    t.ok(Buffer.from(scriptSig.pubkey).equals(xOnly1), 'Signature should be from the correct pubkey')

    // Step 2: Finalize the PSBT
    signedNoFinalize.finalizeAllInputs()

    // Check that tapScriptSig is converted to finalScriptWitness
    t.notOk(signedNoFinalize.data.inputs[0].tapScriptSig, 'Should NOT have tapScriptSig after finalization')
    t.ok(signedNoFinalize.data.inputs[0].finalScriptWitness, 'Should have finalScriptWitness after finalization')

    t.end()
  } catch (err) {
    t.fail('Unexpected error: ' + err.message)
    t.end()
  }
})

tape('Taproot key-path vs script-path - same PSBT different derivations', async (t) => {
  try {
    const mnemonic = 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about'
    const HDSigner = new sjs.utils.HDSigner(mnemonic, null, true)
    const btcNet = bitcoin.networks.testnet

    const path = "m/86'/1'/0'/0/0"
    const pubkey = HDSigner.derivePubKey(path)
    const xOnly = toXOnly(pubkey)
    const p2tr = bitcoin.payments.p2tr({ internalPubkey: xOnly, network: btcNet })
    const script = Buffer.isBuffer(p2tr.output) ? p2tr.output : Buffer.from(p2tr.output)

    // Test 1: Key-path (leafHashes is empty)
    const psbtKeyPath = new bitcoin.Psbt({ network: btcNet })
    psbtKeyPath.setVersion(2)
    psbtKeyPath.addInput({
      hash: Buffer.from('aaaa567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef', 'hex'),
      index: 0,
      sequence: 0xfffffffd,
      witnessUtxo: { script, value: BigInt(100000000) },
      tapInternalKey: xOnly,
      tapBip32Derivation: [{
        masterFingerprint: HDSigner.getRootNode().fingerprint,
        path,
        pubkey: xOnly,
        leafHashes: [] // Empty = key-path
      }]
    })
    psbtKeyPath.addOutput({ script, value: BigInt(99000000) })

    // Sign key-path without finalization first
    psbtKeyPath._skipFinalization = true
    const signedKeyPathNoFinalize = await HDSigner.signPSBT(psbtKeyPath)

    // Before finalization, key-path should have tapKeySig
    t.ok(signedKeyPathNoFinalize.data.inputs[0].tapKeySig, 'Key-path should have tapKeySig before finalization')
    t.notOk(signedKeyPathNoFinalize.data.inputs[0].tapScriptSig, 'Key-path should NOT have tapScriptSig')
    t.notOk(signedKeyPathNoFinalize.data.inputs[0].finalScriptWitness, 'Key-path should NOT have finalScriptWitness before finalization')

    // Finalize and check conversion
    signedKeyPathNoFinalize.finalizeAllInputs()
    t.notOk(signedKeyPathNoFinalize.data.inputs[0].tapKeySig, 'Key-path should NOT have tapKeySig after finalization')
    t.ok(signedKeyPathNoFinalize.data.inputs[0].finalScriptWitness, 'Key-path should have finalScriptWitness after finalization')

    // Test 2: Script-path (with leafHashes and tapLeafScript)
    const leafScript = bitcoin.script.compile([
      xOnly,
      bitcoin.opcodes.OP_CHECKSIG
    ])
    const leafVersion = 0xc0
    const leafHash = bitcoin.crypto.taggedHash(
      'TapLeaf',
      Buffer.concat([Buffer.from([leafVersion]), Buffer.from([leafScript.length]), leafScript])
    )

    const p2trWithScript = bitcoin.payments.p2tr({
      internalPubkey: xOnly,
      scriptTree: {
        output: leafScript,
        version: leafVersion
      },
      redeem: {
        output: leafScript,
        redeemVersion: leafVersion
      },
      network: btcNet
    })

    const controlBlockScript = p2trWithScript.witness ? p2trWithScript.witness[p2trWithScript.witness.length - 1] : Buffer.from([])

    const psbtScriptPath = new bitcoin.Psbt({ network: btcNet })
    psbtScriptPath.setVersion(2)
    psbtScriptPath.addInput({
      hash: Buffer.from('bbbb567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef', 'hex'),
      index: 0,
      sequence: 0xfffffffd,
      witnessUtxo: { script: p2trWithScript.output, value: BigInt(100000000) },
      tapInternalKey: xOnly,
      tapLeafScript: controlBlockScript.length > 0
        ? [{
            leafVersion,
            script: leafScript,
            controlBlock: controlBlockScript
          }]
        : undefined,
      tapBip32Derivation: [{
        masterFingerprint: HDSigner.getRootNode().fingerprint,
        path,
        pubkey: xOnly,
        leafHashes: [leafHash] // Has leafHash = script-path
      }]
    })
    psbtScriptPath.addOutput({ script: p2trWithScript.output, value: BigInt(99000000) })

    // Sign script-path without finalization first
    psbtScriptPath._skipFinalization = true
    const signedScriptPathNoFinalize = await HDSigner.signPSBT(psbtScriptPath)

    // Before finalization, script-path should have tapScriptSig
    t.ok(signedScriptPathNoFinalize.data.inputs[0].tapScriptSig, 'Script-path should have tapScriptSig before finalization')
    t.notOk(signedScriptPathNoFinalize.data.inputs[0].tapKeySig, 'Script-path should NOT have tapKeySig')
    t.notOk(signedScriptPathNoFinalize.data.inputs[0].finalScriptWitness, 'Script-path should NOT have finalScriptWitness before finalization')

    // Finalize and check conversion
    signedScriptPathNoFinalize.finalizeAllInputs()
    t.notOk(signedScriptPathNoFinalize.data.inputs[0].tapScriptSig, 'Script-path should NOT have tapScriptSig after finalization')
    t.ok(signedScriptPathNoFinalize.data.inputs[0].finalScriptWitness, 'Script-path should have finalScriptWitness after finalization')

    t.end()
  } catch (err) {
    t.fail('Unexpected error: ' + err.message)
    t.end()
  }
})
