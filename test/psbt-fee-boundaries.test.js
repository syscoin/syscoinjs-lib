const tape = require('tape')
const syscoin = require('..')
const bitcoin = syscoin.utils.bitcoinjs
const { SYSCOIN_TX_VERSION_ALLOCATION_BURN_TO_SYSCOIN } = require('syscointx-js').utils

// Fixed, synthetic transactions only; no private keys or network access.
const script = Buffer.from([0x51])
const previous = new bitcoin.Transaction()
previous.addInput(Buffer.alloc(32, 7), 0)
previous.addOutput(script, 5000n)

function makePsbt (options = {}) {
  const input = {
    hash: options.hash || previous.getId(),
    index: options.index === undefined ? 0 : options.index
  }
  if (options.witness) {
    input.witnessUtxo = {
      script: options.script || script,
      value: options.value === undefined ? 5000n : options.value
    }
  }
  if (options.nonWitness) input.nonWitnessUtxo = previous.toBuffer()
  if (options.finalized !== false) input.finalScriptSig = Buffer.from([0])
  const psbt = new bitcoin.Psbt()
  if (options.version !== undefined) psbt.setVersion(options.version)
  psbt.addInput(input)
  psbt.addOutput({ script, value: options.output === undefined ? 4000n : options.output })
  return psbt
}

function asImported (psbt) {
  return syscoin.utils.importPsbtFromJson(syscoin.utils.exportPsbtToJson(psbt)).psbt
}

tape('PSBT fee calculation accepts trustworthy previous-output metadata', (t) => {
  for (const [description, options] of [
    ['witness', { witness: true }],
    ['non-witness', { nonWitness: true }],
    ['matching witness and non-witness', { witness: true, nonWitness: true }]
  ]) {
    for (const psbt of [makePsbt(options), asImported(makePsbt(options))]) {
      t.equal(psbt.getFee(), 1000n, description + ' computes the exact fee')
      t.ok(psbt.getFeeRate() >= 0, description + ' computes a fee rate')
      t.doesNotThrow(() => psbt.extractTransaction(), description + ' extracts normally')
    }
  }
  t.end()
})

tape('PSBT fee calculation rejects incomplete or inconsistent metadata', (t) => {
  const cases = [
    ['missing UTXO', {}],
    ['wrong previous transaction', { nonWitness: true, hash: Buffer.alloc(32, 8) }],
    ['both forms with wrong previous transaction', { witness: true, nonWitness: true, hash: Buffer.alloc(32, 8) }],
    ['missing previous output', { nonWitness: true, index: 1 }],
    ['conflicting amounts', { witness: true, nonWitness: true, value: 4999n }],
    ['conflicting scripts', { witness: true, nonWitness: true, script: Buffer.from([0x52]) }]
  ]
  for (const [description, options] of cases) {
    for (const psbt of [makePsbt(options), asImported(makePsbt(options))]) {
      t.throws(() => psbt.getFee(), description + ' cannot produce a fee')
      t.throws(() => psbt.getFeeRate(), description + ' cannot produce a fee rate')
      t.throws(() => psbt.extractTransaction(), description + ' cannot pass normal extraction')
      t.throws(() => psbt.extractTransaction(true), description + ' cannot pass extraction with the fee limit disabled')
    }
  }
  t.end()
})

tape('normal extraction retains the maximum fee-rate safeguard', (t) => {
  const psbt = makePsbt({ witness: true })
  psbt.setMaximumFeeRate(1)
  t.throws(() => psbt.extractTransaction(), /setMaximumFeeRate/, 'high fees are rejected by default')
  t.doesNotThrow(() => psbt.extractTransaction(true), 'explicit fee-limit opt-out remains available')
  t.end()
})

tape('PSBT fee calculations do not reuse stale metadata', (t) => {
  const psbt = makePsbt({ witness: true, nonWitness: true })
  t.equal(psbt.getFee(), 1000n, 'matching metadata initially computes correctly')
  t.ok(psbt.getFeeRate() > 0, 'initial fee rate is available')
  psbt.data.inputs[0].witnessUtxo.value = 4999n
  t.throws(() => psbt.getFee(), 'a later inconsistency invalidates the cached fee')
  t.throws(() => psbt.getFeeRate(), 'a later inconsistency invalidates the cached rate')
  t.throws(() => psbt.extractTransaction(), 'a cached rate cannot bypass extraction checks')
  const nonWitness = makePsbt({ nonWitness: true })
  t.equal(nonWitness.getFee(), 1000n, 'non-witness metadata initially computes correctly')
  const replacement = previous.clone()
  replacement.outs[0].value = 4999n
  nonWitness.data.inputs[0].nonWitnessUtxo = replacement.toBuffer()
  t.throws(() => nonWitness.getFee(), 'replaced previous-transaction bytes are revalidated')
  t.throws(() => nonWitness.extractTransaction(), 'replacement cannot reuse cached extraction')
  t.end()
})

tape('unsigned preview neither requires UTXOs nor caches an unverified fee', (t) => {
  const psbt = makePsbt({ finalized: false })
  const preview = psbt.extractTransaction(true, true)
  t.equal(preview.outs[0].value, 4000n, 'preview exposes the transaction output')
  psbt.updateInput(0, {
    witnessUtxo: { script, value: 5000n },
    finalScriptSig: Buffer.from([0])
  })
  t.equal(psbt.getFee(), 1000n, 'later fee uses subsequently verified input data')
  t.doesNotThrow(() => psbt.extractTransaction(), 'finalized transaction extracts normally')
  const finalized = psbt.extractTransaction()
  t.ok(finalized.ins[0].script.length > 0, 'normal extraction contains the finalized script')
  t.equal(psbt.extractTransaction(true, true).ins[0].script.length, 0, 'preview remains unsigned after normal extraction')
  t.end()
})

tape('Syscoin allocation burns retain negative native-fee semantics', (t) => {
  const psbt = makePsbt({ witness: true, output: 6000n, version: SYSCOIN_TX_VERSION_ALLOCATION_BURN_TO_SYSCOIN })
  t.equal(psbt.getFee(), -1000n, 'native output can exceed input for an allocation burn')
  t.doesNotThrow(() => psbt.extractTransaction(), 'allocation burn still extracts')
  t.end()
})
