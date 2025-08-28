const { ECPairFactory } = require('ecpair')
const ecc = require('@bitcoinerlab/secp256k1')
const sjs = require('syscoinjs-lib')

const syscoinjs = new sjs.SyscoinJSLib(
  undefined,
  undefined,
  sjs.utils.syscoinNetworks.mainnet
)

const ECPair = ECPairFactory(ecc)
const utxos = [
  {
    txid: '8ff929825167675d346bb3d0b67987fc844b4d256ca989efbd8f804b0ed0e36f',
    vout: 0,
    value: '5998190',
    address: 'sys1qn7t8r8r36e7z3c7x83ye2n8v346ny26e3xhnzz'
  }
]

const outputs = [
  {
    address: 'sys1q6f2053q2fnlqpxrwrrqpkhnutwemu984p4vjzm',
    value: '100000'
  },
  {
    address: 'sys1qn7t8r8r36e7z3c7x83ye2n8v346ny26e3xhnzz',
    value: '5897060'
  }
]

async function signMultiInputs (
  wifs,
  inputs,
  outputs,
  changeAddress,
  rate = 10
) {
  // complete sign offline here and return transaction id & raw transaction hex string
  const feeRate = new sjs.utils.BN(rate)
  const txOpts = { rbf: true }
  const result = await syscoinjs.createTransaction(
    txOpts,
    changeAddress,
    outputs,
    feeRate,
    null /* no custom addresses passed in */,
    inputs /* custom utxos passed in with blockbook format */
  )
  if (!result) {
    console.log('Could not create transaction, not enough funds?')
  }

  // Log the transaction fee
  console.log('Transaction fee:', result.fee, 'satoshis')

  let tx
  try {
    const psbt = await syscoinjs.signAndSendWithWIF(
      result.psbt,
      wifs,
      result.assets
    )
    if (!psbt) {
      console.log('Could not sign transaction')
    }
    // will fail if PSBT is not completely signed
    tx = psbt.extractTransaction()
  } catch (e) {
    console.log('Could not sign/send transaction: ' + e.stack)

    // Check for structured error data
    if (e.error && e.code) {
      console.log('Error code:', e.code)
      if (e.shortfall) {
        console.log('Insufficient funds, short by:', e.shortfall, 'satoshis')
      }
      if (e.remainingFee) {
        console.log('Remaining fee that could not be deducted:', e.remainingFee, 'satoshis')
      }
    }
  }
  return {
    id: tx.getId(),
    raw: tx.toHex()
  }
}

(async () => {
  // account1
  const wif1 = ECPair.fromPrivateKey(
    Buffer.from(
      '9be988ba3ab8809876ee77a26065c563a338a1694eb876637cea84b7b2b76fff',
      'hex'
    )
  ).toWIF()
  // signTransaction offline
  const signedInformation = await signMultiInputs(
    [wif1],
    utxos,
    outputs,
    utxos[0].address
  )
  console.log(signedInformation)
})().catch((err) => {
  console.log(err)
  process.exit(1)
})
