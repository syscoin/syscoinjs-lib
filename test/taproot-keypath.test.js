const tape = require('tape')
const sjs = require('..')
const bitcoin = sjs.utils.bitcoinjs

function toXOnly (pubkey) {
  return pubkey.length === 33 ? pubkey.slice(1, 33) : pubkey
}

tape('Taproot key-path signing - HDSigner (manual PSBT with derivations, one-shot)', async (t) => {
  try {
    const mnemonic = 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about'
    const HDSigner = new sjs.utils.HDSigner(mnemonic, null, true)

    // Derive internal key and p2tr script
    const path = "m/86'/1'/0'/0/0"
    const pubkey = HDSigner.derivePubKey(path)
    const xOnly = toXOnly(pubkey)
    const btcNet = bitcoin.networks.testnet
    const p2tr = bitcoin.payments.p2tr({ internalPubkey: xOnly, network: btcNet })
    const script = Buffer.isBuffer(p2tr.output) ? p2tr.output : Buffer.from(p2tr.output)

    // Build PSBT with one taproot input and attach BIP-371 derivation
    const psbt = new bitcoin.Psbt({ network: btcNet })
    psbt.setVersion(2)
    psbt.addInput({
      hash: Buffer.from('1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef', 'hex'),
      index: 0,
      sequence: 0xfffffffd,
      witnessUtxo: { script, value: BigInt(100000000) },
      tapInternalKey: xOnly,
      tapBip32Derivation: [{ masterFingerprint: HDSigner.getRootNode().fingerprint, path, pubkey: xOnly, leafHashes: [] }]
    })

    // Output (any valid script). Send to same p2tr script
    psbt.addOutput({ script, value: BigInt(99000000) })
    // Try one-shot HD signing
    const signed = await HDSigner.signPSBT(psbt)

    // Pass true to bypass fee rate warning for test
    const tx = signed.extractTransaction(true)
    t.ok(typeof tx.hasWitnesses === 'function' ? tx.hasWitnesses() : tx.ins[0].witness.length > 0, 'Signed tx should have witness')
    // Decode and ensure taproot output type
    const sys = new sjs.SyscoinJSLib(HDSigner)
    const decoded = sys.decodeRawTransaction(tx)
    t.equal(decoded.vout[0].scriptPubKey.type, 'witness_v1_taproot', 'Output should be P2TR')
    t.end()
  } catch (err) {
    t.fail('Unexpected error: ' + err.message)
    t.end()
  }
})

tape('Taproot key-path signing - imported WIF', async (t) => {
  try {
    const mnemonic = 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about'
    const HDSigner = new sjs.utils.HDSigner(mnemonic, null, true)
    const path = "m/86'/1'/0'/0/1"
    const keypair = HDSigner.deriveKeypair(path)
    const pubkey = keypair.publicKey
    const xOnly = toXOnly(pubkey)
    const btcNet = bitcoin.networks.testnet
    const p2tr = bitcoin.payments.p2tr({ internalPubkey: xOnly, network: btcNet })
    const script = Buffer.isBuffer(p2tr.output) ? p2tr.output : Buffer.from(p2tr.output)

    const psbt = new bitcoin.Psbt({ network: btcNet })
    psbt.setVersion(2)
    psbt.addInput({
      hash: Buffer.from('abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890', 'hex'),
      index: 1,
      sequence: 0xfffffffd,
      witnessUtxo: { script, value: BigInt(200000000) },
      tapInternalKey: xOnly
    })
    psbt.addOutput({ script, value: BigInt(199000000) })

    // Sign with imported WIF (uses taproot path in utils)
    const signed = await sjs.utils.signWithWIF(psbt, keypair.toWIF(), btcNet)
    // Pass true to bypass fee rate warning for test
    const tx = signed.extractTransaction(true)
    t.ok(typeof tx.hasWitnesses === 'function' ? tx.hasWitnesses() : tx.ins[0].witness.length > 0, 'Signed tx (WIF) should have witness')
    t.end()
  } catch (err) {
    t.fail('Unexpected error: ' + err.message)
    t.end()
  }
})

tape('Taproot key-path signing - createTransaction (one-shot HD)', async (t) => {
  try {
    const mnemonic = 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about'
    const HDSigner = new sjs.utils.HDSigner(mnemonic, null, true)

    // Use bitcoin testnet network to build valid tb1p... addresses for scripts
    const btcNet = sjs.utils.bitcoinjs.networks.testnet
    const bitcoin = sjs.utils.bitcoinjs
    const path = "m/86'/1'/0'/0/0"
    const pubkey = HDSigner.derivePubKey(path)
    const xOnly = pubkey.length === 33 ? pubkey.slice(1, 33) : pubkey
    const p2tr = bitcoin.payments.p2tr({ internalPubkey: xOnly, network: btcNet })
    const address = p2tr.address

    const sys = new sjs.SyscoinJSLib(HDSigner, null, btcNet)

    const utxos = {
      utxos: [
        { txid: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb', vout: 0, address, path, value: '200000', confirmations: 1 }
      ]
    }

    const BN = sjs.utils.BN
    const outputs = [{ address, value: new BN(100000) }]
    const feeRate = new BN(10)
    const { psbt } = await sys.createTransaction({ rbf: true }, address, outputs, feeRate, address, utxos)

    // One-shot HD sign (polyfill applied internally)
    const signed = await HDSigner.sign(psbt)
    const tx = signed.extractTransaction(true)
    t.ok(typeof tx.hasWitnesses === 'function' ? tx.hasWitnesses() : tx.ins[0].witness.length > 0, 'Signed tx (createTransaction Taproot) should have witness')
    t.end()
  } catch (err) {
    t.fail('Unexpected error: ' + err.message)
    t.end()
  }
})
