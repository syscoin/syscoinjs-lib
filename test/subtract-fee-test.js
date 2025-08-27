const tape = require('tape')
const sjs = require('../')
const BN = require('bn.js')

tape('subtractFeeFrom functionality', async (t) => {
  // Use the same setup as working tests - HDSigner with mnemonic
  const mnemonic = 'club toss element melody skin ship rifle student reason real interest insane elevator beauty movie'
  const HDSigner = new sjs.utils.HDSigner(mnemonic, null, true)
  // Pass null blockbookURL to avoid network calls
  const syscoinjs = new sjs.SyscoinJSLib(HDSigner, null)

  // Set xpub tokens to avoid network calls
  const xpubTokens = [
    { path: "m/84'/1'/0'/0/0", transfers: 1 },
    { path: "m/84'/1'/0'/1/0", transfers: 1 },
    { path: "m/84'/1'/0'/1/1", transfers: 1 },
    { path: "m/84'/1'/0'/1/2", transfers: 1 },
    { path: "m/84'/1'/0'/1/3", transfers: 1 }
  ]
  HDSigner.setLatestIndexesFromXPubTokens(xpubTokens)

  t.test('single output with subtractFeeFrom', async (t) => {
    try {
      const txOpts = { rbf: true }
      const changeAddress = 'tsys1qcflmge9vann8405ws2y69jwt94sv40kd7rqexs'
      const feeRate = new BN(10)
      const xpub = HDSigner.getAccountXpub()

      // Mock UTXO with proper format using addresses from fixtures
      const rawUtxoObj = {
        utxos: [{
          txid: '3f0536c23125183e99bfd021fb6a7bb279ccc739356985058cfc15b0a0e52946',
          vout: 0,
          value: '100000000', // 1 SYS - note: string format like in fixtures
          address: changeAddress,
          path: "m/84'/1'/0'/1/0",
          confirmations: 100 // Add confirmations to avoid zero-conf issues
        }]
      }

      // Don't pre-sanitize - let fetchAndSanitizeUTXOs handle it
      const utxoObj = rawUtxoObj

      // Output with subtractFeeFrom using address from fixtures
      const outputs = [{
        address: 'tsys1q3hqp7rgcvsphpcy3rxyhjwvyv647mz58peqctz',
        value: new BN(100000000), // 1 SYS
        subtractFeeFrom: true
      }]

      // This should succeed - fee is subtracted from the output

      const res = await syscoinjs.createTransaction(
        txOpts,
        changeAddress,
        outputs,
        feeRate,
        xpub,
        utxoObj
      )

      t.ok(res, 'Transaction created successfully')
      t.ok(res.psbt, 'PSBT created')
      t.ok(res.fee, 'Fee information returned')
      t.ok(res.fee > 0, 'Fee is greater than 0')

      // Verify the output value is reduced by the fee
      const outputValue = Number(res.psbt.txOutputs[0].value)
      const feeNumber = typeof res.fee === 'object' ? res.fee.toNumber() : res.fee
      t.equal(outputValue + feeNumber, 100000000, 'Output value plus fee equals original amount')

      t.end()
    } catch (err) {
      t.fail('Should not throw error: ' + err.message)
      t.end()
    }
  })

  t.test('multiple outputs with subtractFeeFrom', async (t) => {
    try {
      const txOpts = { rbf: true }
      const changeAddress = 'tsys1qcflmge9vann8405ws2y69jwt94sv40kd7rqexs'
      const feeRate = new BN(10)
      const xpub = HDSigner.getAccountXpub()

      // Mock UTXO with proper format using addresses from fixtures
      const rawUtxoObj = {
        utxos: [{
          txid: '3f0536c23125183e99bfd021fb6a7bb279ccc739356985058cfc15b0a0e52946',
          vout: 1,
          value: '100000000', // 1 SYS - note: string format
          address: changeAddress,
          path: "m/84'/1'/0'/1/0"
        }]
      }

      // Don't pre-sanitize - let fetchAndSanitizeUTXOs handle it
      const utxoObj = rawUtxoObj

      // Multiple outputs with subtractFeeFrom - fee deducted sequentially
      const outputs = [
        {
          address: 'tsys1q3hqp7rgcvsphpcy3rxyhjwvyv647mz58peqctz',
          value: new BN(30000000), // 0.3 SYS
          subtractFeeFrom: true
        },
        {
          address: 'tsys1qsgtj3pujwgfgakjjen94j3g9wmw95l837srurc',
          value: new BN(70000000), // 0.7 SYS
          subtractFeeFrom: true
        }
      ]

      const res = await syscoinjs.createTransaction(
        txOpts,
        changeAddress,
        outputs,
        feeRate,
        xpub,
        utxoObj
      )

      t.ok(res, 'Transaction created successfully')
      t.ok(res.psbt, 'PSBT created')
      t.ok(res.fee, 'Fee information returned')

      // Verify total output value is reduced by fee
      const totalOutputValue = res.psbt.txOutputs.reduce((sum, output) => sum + Number(output.value), 0)
      const feeNumber = typeof res.fee === 'object' ? res.fee.toNumber() : res.fee
      t.equal(totalOutputValue + feeNumber, 100000000, 'Total output value plus fee equals input value')

      t.end()
    } catch (err) {
      t.fail('Should not throw error: ' + err.message)
      t.end()
    }
  })

  t.test('structured error response for insufficient funds', async (t) => {
    try {
      const txOpts = { rbf: true }
      const changeAddress = 'tsys1qcflmge9vann8405ws2y69jwt94sv40kd7rqexs'
      const feeRate = new BN(10)
      const xpub = HDSigner.getAccountXpub()

      // Mock UTXO with insufficient funds
      const rawUtxoObj = {
        utxos: [{
          txid: '3f0536c23125183e99bfd021fb6a7bb279ccc739356985058cfc15b0a0e52946',
          vout: 2,
          value: '1000', // Very small amount - note: string format
          address: changeAddress,
          path: "m/84'/1'/0'/1/0"
        }]
      }

      // Don't pre-sanitize - let fetchAndSanitizeUTXOs handle it
      const utxoObj = rawUtxoObj

      // Output requesting more than available
      const outputs = [{
        address: 'tsys1q3hqp7rgcvsphpcy3rxyhjwvyv647mz58peqctz',
        value: new BN(100000000) // 1 SYS
      }]

      await syscoinjs.createTransaction(
        txOpts,
        changeAddress,
        outputs,
        feeRate,
        xpub,
        utxoObj
      )

      t.fail('Should have thrown error for insufficient funds')
      t.end()
    } catch (err) {
      t.ok(err, 'Error thrown as expected')
      t.ok(err.error, 'Error object has error flag')
      t.ok(err.code, 'Error object has code')
      t.ok(err.message, 'Error object has message')
      t.equal(err.code, 'INSUFFICIENT_FUNDS', 'Correct error code for insufficient funds')

      // Check if shortfall is provided
      if (err.shortfall !== undefined) {
        t.ok(err.shortfall > 0, 'Shortfall amount provided')
      }

      t.end()
    }
  })

  t.test('error when fee would create dust output', async (t) => {
    try {
      const txOpts = { rbf: true }
      const changeAddress = 'tsys1qcflmge9vann8405ws2y69jwt94sv40kd7rqexs'
      const feeRate = new BN(1000) // Very high fee rate
      const xpub = HDSigner.getAccountXpub()

      // Mock UTXO with small amount
      const rawUtxoObj = {
        utxos: [{
          txid: '3f0536c23125183e99bfd021fb6a7bb279ccc739356985058cfc15b0a0e52946',
          vout: 3,
          value: '1000', // Very small amount - note: string format
          address: changeAddress,
          path: "m/84'/1'/0'/1/0"
        }]
      }

      // Don't pre-sanitize - let fetchAndSanitizeUTXOs handle it
      const utxoObj = rawUtxoObj

      // Output with subtractFeeFrom that would become dust
      const outputs = [{
        address: 'tsys1q3hqp7rgcvsphpcy3rxyhjwvyv647mz58peqctz',
        value: new BN(1000),
        subtractFeeFrom: true
      }]

      await syscoinjs.createTransaction(
        txOpts,
        changeAddress,
        outputs,
        feeRate,
        xpub,
        utxoObj
      )

      t.fail('Should have thrown error for dust output')
      t.end()
    } catch (err) {
      t.ok(err, 'Error thrown as expected')
      t.ok(err.error, 'Error object has error flag')
      t.ok(err.code, 'Error object has code')
      t.ok(err.message, 'Error object has message')

      // Check if remainingFee is provided for subtractFeeFrom errors
      if (err.remainingFee !== undefined) {
        t.ok(err.remainingFee >= 0, 'Remaining fee information provided')
      }

      t.end()
    }
  })
})
