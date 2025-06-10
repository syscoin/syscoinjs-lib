const utils = require('./utils')
const syscointx = require('syscointx-js')
const BN = require('bn.js')

/* Syscoin
Purpose: Top level object used by consuming libraries to craft Syscoin/Bitcoin transactions. For Syscoin SPT support is provided
Param Signer: Optional. If you want to manage XPUB keys with this package you would want to use a Signer. With Signer assigned, signing will happen automatically when creating raw transactions.
Param blockbookURL: Optional. A backend blockbook URL that will provide UTXO and required information to sign. User can always provide their own list of UTXO's in the same format as blockbook using utils.sanitizeBlockbookUTXOs to sanitize the UTXO data to acceptable internal format
Param network: Optional. The blockchain network and bip32 settings. The utils file has some examples including Bitcoin and Syscoin, it will default to Syscoin.
*/
function Syscoin (SignerIn, blockbookURL, network) {
  this.blockbookURL = blockbookURL
  if (SignerIn) {
    this.Signer = SignerIn
    this.Signer.blockbookURL = blockbookURL
    this.Signer.Signer.blockbookURL = blockbookURL
    this.network = network || this.Signer.Signer.network
  } else {
    this.Signer = null
    this.network = network || utils.syscoinNetworks.mainnet
  }
}

// proxy to signAndSend
Syscoin.prototype.signAndSendWithSigner = async function (psbt, SignerIn, pathIn) {
  return this.signAndSend(psbt, SignerIn, pathIn)
}

/* Helper function to check if syscointx result is an error
Purpose: Check if the result from syscointx methods contains an error
Param res: The result object from syscointx methods
Returns: true if error, false otherwise
*/
function isErrorResult (res) {
  // Handle error objects with 'error' field (from syscointx-js)
  if (res && res.error) {
    return true
  }
  // Handle explicit success: false
  if (res && res.success === false) {
    return true
  }
  // Handle null/undefined results (from coinselectsyscoin)
  if (!res || (res && !res.inputs && !res.outputs && !res.fee)) {
    return true
  }
  return false
}

/* Helper function to format error response
Purpose: Format error response with structured data for sysweb3
Param res: The result object from syscointx methods
Returns: Formatted error object with code, message, and details
*/
function formatErrorResponse (res) {
  const errorResponse = {
    error: true,
    code: 'TRANSACTION_CREATION_FAILED'
  }

  if (!res) {
    errorResponse.message = 'Transaction creation failed - insufficient funds or invalid inputs'
    errorResponse.code = 'INSUFFICIENT_FUNDS'
    return errorResponse
  }

  // Handle structured errors from syscointx-js
  if (res.error) {
    errorResponse.code = res.error
    errorResponse.message = res.message || res.error

    // Include any additional details
    if (res.details) {
      errorResponse.details = res.details
    }

    // Include fee information if available
    if (res.fee !== undefined) {
      errorResponse.fee = res.fee
    }

    // Include remainingFee for subtractFeeFrom errors
    if (res.remainingFee !== undefined) {
      errorResponse.remainingFee = res.remainingFee
    }

    // Include shortfall for insufficient funds
    if (res.shortfall !== undefined) {
      errorResponse.shortfall = res.shortfall
    }

    return errorResponse
  }

  // Default error response
  errorResponse.message = 'Transaction creation failed'
  return errorResponse
}

/* createPSBTFromRes
Purpose: Craft PSBT from res object. Detects witness/non-witness UTXOs and sets appropriate data required for bitcoinjs-lib to sign properly
Param res: Required. The resulting object passed in which is assigned from syscointx.createTransaction()/syscointx.createAssetTransaction()
Param redeemOrWitnessScript: Optional. redeemScript for P2SH and witnessScript for P2WSH spending conditions.
Param redeemOrWitness: Optional. redeemScript for P2SH and witnessScript for P2WSH spending conditions.
  Field script. Required. redeemScript for P2SH and witnessScript for P2WSH spending conditions.
  Field path. Optional. The HD bip32 path of how the Signer can sign inputs inside of script
Returns: psbt from bitcoinjs-lib
*/
Syscoin.prototype.createPSBTFromRes = async function (res, redeemOrWitnessScript) {
  const psbt = new utils.bitcoinjs.Psbt({ network: this.network })
  const prevTx = new Map()
  psbt.setVersion(res.txVersion)
  for (let i = 0; i < res.inputs.length; i++) {
    const input = res.inputs[i]
    const inputObj = {
      hash: input.txId,
      index: input.vout,
      sequence: input.sequence,
      bip32Derivation: []
    }
    // if legacy address type get previous tx as required by bitcoinjs-lib to sign without witness
    // Note: input.address is only returned by Blockbook XPUB UTXO API and not address UTXO API and this address is used to assign type
    if (input.type === 'LEGACY') {
      if (prevTx.has(input.txId)) {
        inputObj.nonWitnessUtxo = prevTx.get(input.txId)
      } else {
        const hexTx = await utils.fetchBackendRawTx(this.blockbookURL, input.txId)
        if (hexTx) {
          const bufferTx = Buffer.from(hexTx.hex, 'hex')
          prevTx.set(input.txId, bufferTx)
          inputObj.nonWitnessUtxo = bufferTx
        } else {
          console.log('Could not fetch input transaction for legacy UTXO: ' + input.txId)
        }
        if (redeemOrWitnessScript) {
          inputObj.redeemScript = redeemOrWitnessScript
        }
      }
    } else {
      inputObj.witnessUtxo = { script: utils.bitcoinjs.address.toOutputScript(input.address, this.network), value: input.value.toNumber() }
      if (redeemOrWitnessScript) {
        inputObj.witnessScript = redeemOrWitnessScript
      }
    }
    psbt.addInput(inputObj)
    if (input.address) {
      psbt.addUnknownKeyValToInput(i, { key: Buffer.from('address'), value: Buffer.from(input.address) })
    }
    if (input.path) {
      psbt.addUnknownKeyValToInput(i, { key: Buffer.from('path'), value: Buffer.from(input.path) })
    }
  }
  res.outputs.forEach(output => {
    psbt.addOutput({
      script: output.script,
      address: output.script ? null : output.address,
      value: output.value.toNumber()
    })
  })
  return psbt
}
Syscoin.prototype.send = async function (psbt, SignerIn) {
  let bjstx = null
  try {
    // will fail if not complete
    bjstx = psbt.extractTransaction()
  } catch (err) {
    console.log('Transaction incomplete, requires more signatures...')
    return psbt
  }
  if (this.blockbookURL) {
    utils.setPoDA(bjstx, psbt.blobData)
    try {
      const response = await utils.sendRawTransaction(this.blockbookURL, bjstx.toHex(), SignerIn)
      if (response && response.result) {
        console.log('Transaction broadcast successful:', response.result)
        return psbt
      } else if (response && response.error) {
        console.log('Transaction broadcast received error:', response.error)
        throw Object.assign(
          new Error(JSON.stringify(response.error)),
          { code: 402 }
        )
      } else {
        console.log(
          'No valid response from utils.sendRawTransaction, trying direct fetch...'
        )
      }
    } catch (utilsError) {
      console.log('Error using utils.sendRawTransaction:', utilsError.message)
      console.log('Trying direct fetch as fallback...')
    }

    // Fallback to direct fetch with proper headers
    console.log('Broadcasting transaction via direct fetch...')
    console.log(bjstx.toHex())
    // eslint-disable-next-line no-undef
    const response = await fetch(`${this.blockbookURL}/api/v2/sendtx/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain'
      },
      body: bjstx.toHex()
    })

    const responseData = await response.text()
    console.log('Response status:', response.status)
    console.log('Response data:', responseData)

    if (!response.ok) {
      throw new Error(
         `HTTP error! Status: ${response.status}. Details: ${responseData}`
      )
    }

    let data
    try {
      data = JSON.parse(responseData)
    } catch (e) {
      console.log('Response is not JSON, using as-is')
      throw Object.assign(
        new Error(`Transaction broadcast error: ${JSON.stringify(e)}`),
        { code: 402 }
      )
    }

    if (data.error) {
      throw Object.assign(
        new Error(`Transaction broadcast error: ${JSON.stringify(data.error)}`),
        { code: 402 }
      )
    }
  }
  return psbt
}
/* signAndSend
Purpose: Signs if necessary and Sends transaction to network using Signer
Param psbt: Required. The resulting PSBT object passed in which is assigned from syscointx.createTransaction()/syscointx.createAssetTransaction()
Param SignerIn: Optional. Signer used to sign transaction
Returns: PSBT signed success or unsigned if failure
*/
Syscoin.prototype.signAndSend = async function (psbt, SignerIn, pathIn) {
  const Signer = SignerIn || this.Signer
  psbt = await Signer.sign(psbt, pathIn)
  return this.send(psbt, Signer)
}

/* signAndSendWithWIF
Purpose: Signs if necessary and Sends transaction to network using WIF
Param psbt: Required. The resulting PSBT object passed in which is assigned from syscointx.createTransaction()/syscointx.createAssetTransaction()
Param wif: Required. Private key in WIF format to sign inputs of the transaction for
Returns: PSBT signed success or unsigned if failure
*/
Syscoin.prototype.signAndSendWithWIF = async function (psbt, wif) {
  psbt = await utils.signWithWIF(psbt, wif, this.network)
  return this.send(psbt)
}

/* fetchAndSanitizeUTXOs
Purpose: Fetch UTXO's for an address or XPUB from backend Blockbook provider and sanitize them for use by upstream libraries
Param utxos: Optional. Pass in specific utxos to fund a transaction.
Param fromXpubOrAddress: Optional. If wanting to fund from specific XPUB's or addresses specify this field should be set. Can be an array of XPUB or addresses in combination.
Param txOpts: Optional. Transaction options. Fields are described below:
  Field rbf. Optional. True by default. Replace-by-fee functionality allowing one to bump transaction by increasing fee for UTXOs used.
  Field assetWhiteList. Optional. null by default. Allows UTXO's to be added from assets in the whitelist or the asset being sent
Param assetMap: Optional (For asset transactions only). Description of Map:
  Index assetGuid. Required. Numeric Asset GUID you are sending to
  Value is described below:
    Field changeAddress. Optional. Where asset change outputs will be sent to. If it is not there or null a new change address will be created. If Signer is not set, it will send asset change outputs to sysChangeAddress
    Field outputs. Required. Array of objects described below:
      Field value. Required. Big Number representing satoshi's to send. Should be 0 if doing an update.
      Field address. Optional. Destination address for asset.
  Example:
    const assetMap = new Map([
      [assetGuid, { outputs: [{ value: new BN(0), address: 'tsys1qdflre2yd37qtpqe2ykuhwandlhq04r2td2t9ae' }] }]
    ])
    Would update assetGuid asset and send it as change back to 'tsys1qdflre2yd37qtpqe2ykuhwandlhq04r2td2t9ae'. Change is the 0-value UTXO for asset ownership.
Param excludeZeroConf: Optional. False by default. Filtering out 0 conf UTXO, new/update/send asset transactions must use confirmed inputs only as per Syscoin Core mempool policy
Returns: Returns JSON object in response, sanitized UTXO object array in JSON
*/
Syscoin.prototype.fetchAndSanitizeUTXOs = async function (utxos, fromXpubOrAddress, txOpts, assetMap, excludeZeroConf) {
  if (!utxos) {
    if (fromXpubOrAddress) {
      if (!Array.isArray(fromXpubOrAddress)) {
        fromXpubOrAddress = [fromXpubOrAddress]
      }
      const utxoRequests = []
      const concatSanitizedUTXOS = {}
      fromXpubOrAddress.forEach(addressOrXpub => utxoRequests.push(utils.fetchBackendUTXOS(this.blockbookURL, addressOrXpub)))
      const responses = await Promise.all(utxoRequests)
      responses.forEach(response => {
        const utxos = utils.sanitizeBlockbookUTXOs(response.addressOrXpub, response, this.network, txOpts, assetMap, excludeZeroConf)
        if (!concatSanitizedUTXOS.utxos) {
          concatSanitizedUTXOS.utxos = utxos.utxos
        } else {
          concatSanitizedUTXOS.utxos = [...concatSanitizedUTXOS.utxos].concat([...utxos.utxos])
        }
        if (!concatSanitizedUTXOS.assets && utxos.assets) {
          concatSanitizedUTXOS.assets = utxos.assets
        } else if (concatSanitizedUTXOS.assets && utxos.assets) {
          concatSanitizedUTXOS.assets = new Map([...concatSanitizedUTXOS.assets].concat([...utxos.assets]))
        }
      })
      utxos = concatSanitizedUTXOS
      utxos.utxos = Object.values(utxos.utxos).reduce(function (r, k) {
        return r.concat(k)
      }, [])
    } else if (this.Signer) {
      utxos = await utils.fetchBackendUTXOS(this.blockbookURL, this.Signer.getAccountXpub())
      utxos = utils.sanitizeBlockbookUTXOs(fromXpubOrAddress, utxos, this.network, txOpts, assetMap, excludeZeroConf)
    }
  } else {
    utxos = utils.sanitizeBlockbookUTXOs(fromXpubOrAddress, utxos, this.network, txOpts, assetMap, excludeZeroConf)
  }
  return utxos
}

/* createTransaction
Purpose: Send Syscoin or Bitcoin or like coins.
Param txOpts: Optional. Transaction options. Fields are described below:
  Field rbf. Optional. True by default. Replace-by-fee functionality allowing one to bump transaction by increasing fee for UTXOs used.
  Field assetWhiteList. Optional. null by default. Allows UTXO's to be added from assets in the whitelist or the asset being sent
Param changeAddress: Optional. Change address if defined is where change outputs are sent to. If not defined and Signer is defined then a new change address will be automatically created using the next available change address index in the HD path
Param outputsArr: Required. Output array defining tuples to which addresses to send coins to and how much. Outputs can include a 'subtractFeeFrom' boolean field to subtract the transaction fee from that output.
Param feeRate: Optional. Defaults to 10 satoshi per byte. How many satoshi per byte the network fee should be paid out as.
Param fromXpubOrAddress: Optional. If wanting to fund from a specific XPUB or address specify this field should be set
Param utxos: Optional. Pass in specific utxos to fund a transaction.
Param redeemOrWitnessScript: Optional. redeemScript for P2SH and witnessScript for P2WSH spending conditions.
Param inputsArr: Optional. Force these inputs to be included in the transaction, not to be confused with 'utxos' which is optional inputs that *may* be included as part of the funding process.
Returns: PSBT if if Signer is set or result object which is used to create PSBT and sign/send if xpub/address are passed in to fund transaction
*/
Syscoin.prototype.createTransaction = async function (txOpts, changeAddress, outputsArr, feeRate, fromXpubOrAddress, utxos, redeemOrWitnessScript, inputsArr) {
  if (this.Signer) {
    if (!changeAddress) {
      changeAddress = await this.Signer.getNewChangeAddress()
    }
  }
  utxos = await this.fetchAndSanitizeUTXOs(utxos, fromXpubOrAddress, txOpts)
  if (inputsArr) {
    inputsArr = utils.sanitizeBlockbookUTXOs(fromXpubOrAddress, inputsArr, this.network, txOpts).utxos
  }
  const res = syscointx.createTransaction(txOpts, utxos, changeAddress, outputsArr, feeRate, inputsArr)

  // Check if the result is an error
  if (isErrorResult(res)) {
    const errorData = formatErrorResponse(res)
    throw Object.assign(
      new Error(errorData.message),
      { code: 402, ...errorData }
    )
  }

  const psbt = await this.createPSBTFromRes(res, redeemOrWitnessScript)
  if (fromXpubOrAddress || !this.Signer) {
    return { psbt, res: psbt, fee: res.fee }
  }
  const signedPsbt = await this.signAndSend(psbt)
  return { psbt: signedPsbt, fee: res.fee }
}

/* assetAllocationSend
Purpose: Send an asset allocations to other users.
Param txOpts: Optional. Transaction options. Fields are described below:
  Field rbf. Optional. True by default. Replace-by-fee functionality allowing one to bump transaction by increasing fee for UTXOs used.
  Field assetWhiteList. Optional. null by default. Allows UTXO's to be added from assets in the whitelist or the asset being sent
  Field memo. Optional. An optional data carrying byte field to include in the transaction.
  Field memoHeader. Optional. Header that prefixes memo field, memo + memoHeader is max 80 bytes
Param assetMap: Required. Description of Map:
  Index assetGuid. Required. Numeric Asset GUID you are sending to
  Value is described below:
    Field changeAddress. Optional. Where asset change outputs will be sent to. If it is not there or null a new change address will be created. If Signer is not set, it will send asset change outputs to sysChangeAddress
    Field outputs. Required. Array of objects described below:
      Field value. Required. Big Number representing satoshi's to send
      Field address. Required. Destination address for value.
  Example:
    const assetMap = new Map([
      [assetGuid, { outputs: [{ value: new BN(1000), address: 'tsys1qdflre2yd37qtpqe2ykuhwandlhq04r2td2t9ae' }] }]
    ])
    Would send 1000 satoshi to address 'tsys1qdflre2yd37qtpqe2ykuhwandlhq04r2td2t9ae' in asset 'assetGuid'
Param sysChangeAddress: Optional. Change address if defined is where Syscoin only change outputs are sent to. Does not apply to asset change outputs which are definable in the assetOpts object. If not defined and Signer is defined then a new change address will be automatically created using the next available change address index in the HD path
Param feeRate: Optional. Defaults to 10 satoshi per byte. How many satoshi per byte the network fee should be paid out as.
Param sysFromXpubOrAddress: Optional. If wanting to fund from a specific XPUB or address specify this field should be set
Param utxos: Optional. Pass in specific utxos to fund a transaction.
Param res: Required. The resulting object passed in which is assigned from syscointx.createTransaction()/syscointx.createAssetTransaction()
Param redeemOrWitnessScript: Optional. redeemScript for P2SH and witnessScript for P2WSH spending conditions.
Returns: PSBT if if Signer is set or result object which is used to create PSBT and sign/send if xpub/address are passed in to fund transaction
*/
Syscoin.prototype.assetAllocationSend = async function (txOpts, assetMap, sysChangeAddress, feeRate, sysFromXpubOrAddress, utxos, redeemOrWitnessScript) {
  if (this.Signer) {
    for (const valueAssetObj of assetMap.values()) {
      if (!valueAssetObj.changeAddress) {
        valueAssetObj.changeAddress = await this.Signer.getNewChangeAddress()
      }
    }
    if (!sysChangeAddress) {
      sysChangeAddress = await this.Signer.getNewChangeAddress()
    }
  }
  // false last param for filtering out 0 conf UTXO, new/update/send asset transactions must use confirmed inputs only as per Syscoin Core mempool policy
  utxos = await this.fetchAndSanitizeUTXOs(utxos, sysFromXpubOrAddress, txOpts, assetMap, false)
  const res = syscointx.assetAllocationSend(txOpts, utxos, assetMap, sysChangeAddress, feeRate)

  // Check if the result is an error
  if (isErrorResult(res)) {
    const errorData = formatErrorResponse(res)
    throw Object.assign(
      new Error(errorData.message),
      { code: 402, ...errorData }
    )
  }

  const psbt = await this.createPSBTFromRes(res, redeemOrWitnessScript)
  if (sysFromXpubOrAddress || !this.Signer) {
    return { psbt, res: psbt, fee: res.fee }
  }
  const signedPsbt = await this.signAndSend(psbt)
  return { psbt: signedPsbt, fee: res.fee }
}

/* assetAllocationBurn
Purpose: Burn an asset allocation for purpose of provably burning. Could be used to create proof-of-burn for SysEthereum bridge by specifying the ethaddress as destination in assetOpts.
Param assetOpts: Optional. Fields described below:
  Field ethaddress. Optional. If burning for purpose of sending over SysEthereum bridge specify the destination Ethereum address where tokens should be sent to on Ethereum.
Param txOpts: Optional. Transaction options. Fields are described below:
  Field rbf. Optional. True by default. Replace-by-fee functionality allowing one to bump transaction by increasing fee for UTXOs used.
  Field assetWhiteList. Optional. null by default. Allows UTXO's to be added from assets in the whitelist or the asset being sent
Param assetMap: Required. Description of Map:
  Index assetGuid. Required. Numeric Asset GUID you are sending to
  Value is described below:
    Field changeAddress. Optional. Where asset change outputs will be sent to. If it is not there or null a new change address will be created. If Signer is not set, it will send asset change outputs to sysChangeAddress
    Field outputs. Required. Array of objects described below:
      Field value. Required. Big Number representing satoshi's to burn
  Example:
    const assetMap = new Map([
      [assetGuid, { outputs: [{ value: new BN(1000) }] }]
    ])
    Would burn 1000 satoshi in asset 'assetGuid'
Param sysChangeAddress: Optional. Change address if defined is where Syscoin only change outputs are sent to. Does not apply to asset change outputs which are definable in the assetOpts object. If not defined and Signer is defined then a new change address will be automatically created using the next available change address index in the HD path
Param feeRate: Optional. Defaults to 10 satoshi per byte. How many satoshi per byte the network fee should be paid out as.
Param sysFromXpubOrAddress: Optional. If wanting to fund from a specific XPUB or address specify this field should be set
Param utxos: Optional. Pass in specific utxos to fund a transaction.
Param redeemOrWitnessScript: Optional. redeemScript for P2SH and witnessScript for P2WSH spending conditions.
Returns: PSBT if if Signer is set or result object which is used to create PSBT and sign/send if xpub/address are passed in to fund transaction
*/
Syscoin.prototype.assetAllocationBurn = async function (assetOpts, txOpts, assetMap, sysChangeAddress, feeRate, sysFromXpubOrAddress, utxos, redeemOrWitnessScript) {
  if (this.Signer) {
    if (!sysChangeAddress) {
      sysChangeAddress = await this.Signer.getNewChangeAddress()
    }
    for (const valueAssetObj of assetMap.values()) {
      if (!valueAssetObj.changeAddress) {
        valueAssetObj.changeAddress = await this.Signer.getNewChangeAddress()
      }
    }
  }
  // true last param for filtering out 0 conf UTXO, new/update/send asset transactions must use confirmed inputs only as per Syscoin Core mempool policy
  utxos = await this.fetchAndSanitizeUTXOs(utxos, sysFromXpubOrAddress, txOpts, assetMap, false)
  const res = syscointx.assetAllocationBurn(assetOpts, txOpts, utxos, assetMap, sysChangeAddress, feeRate)

  // Check if the result is an error
  if (isErrorResult(res)) {
    const errorData = formatErrorResponse(res)
    throw Object.assign(
      new Error(errorData.message),
      { code: 402, ...errorData }
    )
  }

  const psbt = await this.createPSBTFromRes(res, redeemOrWitnessScript)
  if (sysFromXpubOrAddress || !this.Signer) {
    return { psbt, res: psbt, fee: res.fee }
  }
  const signedPsbt = await this.signAndSend(psbt)
  return { psbt: signedPsbt, fee: res.fee }
}

/* assetAllocationMint
Purpose: Minting new asset using proof-of-lock on Ethereum as a proof to mint tokens on Syscoin.
Param assetOpts: Optional. If you have the Ethereum TXID and want to use eth-proof you can just specify the ethtxid and web3url fields. Fields described below:
  Field ethtxid. Required. The trasaction that calls freezeBurn() on VaultManager contract
  Field web3url. Optional. If using eth-proof fully qualified Web3 HTTP-RPC URL that eth-proof needs to obtain the tx proof and receipt proof information needed by Syscoin to valdiate the mint
  Field blocknumber. Optional if ethtxid/web3url not provided. Block number of transaction including freezeBurn() call
  Field txvalue. Optional if ethtxid/web3url not provided. Buffer value of the transaction hex encoded in RLP format
  Field txroot. Optional if ethtxid/web3url not provided. Buffer value of the transaction merkle root encoded in RLP format
  Field txparentnodes. Optional if ethtxid/web3url not provided. Buffer value of the transaction merkle proof encoded in RLP format
  Field txpath. Optional if ethtxid/web3url not provided. Buffer value of the merkle path for the transaction and receipt proof
  Field receiptvalue. Optional if ethtxid/web3url not provided. Buffer value of the transaction receipt hex encoded in RLP format
  Field receiptroot. Optional if ethtxid/web3url not provided. Buffer value of the receipt merkle root encoded in RLP format
  Field receiptparentnodes. Optional if ethtxid/web3url not provided. Buffer value of the receipt merkle proof encoded in RLP format
Param txOpts: Optional. Transaction options. Fields are described below:
  Field rbf. Optional. True by default. Replace-by-fee functionality allowing one to bump transaction by increasing fee for UTXOs used.
  Field assetWhiteList. Optional. null by default. Allows UTXO's to be added from assets in the whitelist or the asset being sent
Param assetMap: Optional. Auto-filled by eth-proof if it is used (pass ethtxid and web3url in assetOpts). Description of Map:
  Index assetGuid. Required. Numeric Asset GUID you are sending to
  Value is described below:
    Field changeAddress. Optional. Where asset change outputs will be sent to. If it is not there or null a new change address will be created. If Signer is not set, it will send asset change outputs to sysChangeAddress
    Field outputs. Required. Array of objects described below:
      Field value. Required. Big Number representing satoshi's to mint
  Example:
    const assetMap = new Map([
      [assetGuid, { outputs: [{ value: new BN(1000), address: 'tsys1qdflre2yd37qtpqe2ykuhwandlhq04r2td2t9ae' }] }]
    ])
    Would mint 1000 satoshi to address 'tsys1qdflre2yd37qtpqe2ykuhwandlhq04r2td2t9ae' in asset 'assetGuid'
Param sysChangeAddress: Optional. Change address if defined is where Syscoin only change outputs are sent to. Does not apply to asset change outputs which are definable in the assetOpts object. If not defined and Signer is defined then a new change address will be automatically created using the next available change address index in the HD path
Param feeRate: Optional. Defaults to 10 satoshi per byte. How many satoshi per byte the network fee should be paid out as.
Param sysFromXpubOrAddress: Optional. If wanting to fund from a specific XPUB or address specify this field should be set
Param utxos: Optional. Pass in specific utxos to fund a transaction.
Param redeemOrWitnessScript: Optional. redeemScript for P2SH and witnessScript for P2WSH spending conditions.
Returns: PSBT if if Signer is set or result object which is used to create PSBT and sign/send if xpub/address are passed in to fund transaction
*/
Syscoin.prototype.assetAllocationMint = async function (assetOpts, txOpts, assetMap, sysChangeAddress, feeRate, sysFromXpubOrAddress, utxos, redeemOrWitnessScript) {
  if (this.Signer) {
    if (assetMap) {
      for (const valueAssetObj of assetMap.values()) {
        if (!valueAssetObj.changeAddress) {
          valueAssetObj.changeAddress = await this.Signer.getNewChangeAddress()
        }
      }
    }
    if (!sysChangeAddress) {
      sysChangeAddress = await this.Signer.getNewChangeAddress()
    }
  }
  if (!assetMap) {
    const ethProof = await utils.buildEthProof(assetOpts)
    let changeAddress
    if (this.Signer) {
      changeAddress = await this.Signer.getNewChangeAddress()
    }
    if (sysChangeAddress === changeAddress) {
      throw Object.assign(
        new Error('Syscoin and asset change address cannot be the same for assetAllocationMint!'),
        { code: 402 }
      )
    }
    assetMap = new Map([
      [ethProof.assetguid, { changeAddress, outputs: [{ value: new BN(ethProof.amount), address: ethProof.destinationaddress }] }]
    ])
    assetOpts = {
      ethtxid: Buffer.from(ethProof.ethtxid, 'hex'),
      blockhash: Buffer.from(ethProof.blockhash, 'hex'),
      txvalue: Buffer.from(ethProof.txvalue, 'hex'),
      txroot: Buffer.from(ethProof.txroot, 'hex'),
      txparentnodes: Buffer.from(ethProof.txparentnodes, 'hex'),
      txpath: Buffer.from(ethProof.txpath, 'hex'),
      receiptvalue: Buffer.from(ethProof.receiptvalue, 'hex'),
      receiptroot: Buffer.from(ethProof.receiptroot, 'hex'),
      receiptparentnodes: Buffer.from(ethProof.receiptparentnodes, 'hex')
    }
  }

  // false last param for filtering out 0 conf UTXO, new/update/send asset transactions must use confirmed inputs only as per Syscoin Core mempool policy
  utxos = await this.fetchAndSanitizeUTXOs(utxos, sysFromXpubOrAddress, txOpts, assetMap, false)
  const res = syscointx.assetAllocationMint(assetOpts, txOpts, utxos, assetMap, sysChangeAddress, feeRate)

  // Check if the result is an error
  if (isErrorResult(res)) {
    const errorData = formatErrorResponse(res)
    throw Object.assign(
      new Error(errorData.message),
      { code: 402, ...errorData }
    )
  }

  const psbt = await this.createPSBTFromRes(res, redeemOrWitnessScript)
  if (sysFromXpubOrAddress || !this.Signer) {
    return { psbt, res: psbt, fee: res.fee }
  }
  const signedPsbt = await this.signAndSend(psbt)
  return { psbt: signedPsbt, fee: res.fee }
}

/* syscoinBurnToAssetAllocation
Purpose: Burn Syscoin to mint SYSX
Param txOpts: Optional. Transaction options. Fields are described below:
  Field rbf. Optional. True by default. Replace-by-fee functionality allowing one to bump transaction by increasing fee for UTXOs used.
  Field assetWhiteList. Optional. null by default. Allows UTXO's to be added from assets in the whitelist or the asset being sent
Param assetMap: Required. Description of Map:
  Index assetGuid. Required. Numeric Asset GUID you are sending to
  Value is described below:
    Field changeAddress. Optional. Where asset change outputs will be sent to. If it is not there or null a new change address will be created. If Signer is not set, it will send asset change outputs to sysChangeAddress
    Field outputs. Required. Array of objects described below:
      Field value. Required. Big Number representing satoshi's to mint
  Example:
    const assetMap = new Map([
      [assetGuid, { outputs: [{ value: new BN(1000), address: 'tsys1qdflre2yd37qtpqe2ykuhwandlhq04r2td2t9ae' }] }]
    ])
    Would mint 1000 satoshi to address 'tsys1qdflre2yd37qtpqe2ykuhwandlhq04r2td2t9ae' in asset 'assetGuid'.
    Would also end up burning 1000 SYS satoshi to OP_RETURN output
Param sysChangeAddress: Optional. Change address if defined is where Syscoin only change outputs are sent to. Does not apply to asset change outputs which are definable in the assetOpts object. If not defined and Signer is defined then a new change address will be automatically created using the next available change address index in the HD path
Param feeRate: Optional. Defaults to 10 satoshi per byte. How many satoshi per byte the network fee should be paid out as.
Param sysFromXpubOrAddress: Optional. If wanting to fund from a specific XPUB or address specify this field should be set
Param utxos: Optional. Pass in specific utxos to fund a transaction.
Param redeemOrWitnessScript: Optional. redeemScript for P2SH and witnessScript for P2WSH spending conditions.
Returns: PSBT if if Signer is set or result object which is used to create PSBT and sign/send if xpub/address are passed in to fund transaction
*/
Syscoin.prototype.syscoinBurnToAssetAllocation = async function (txOpts, assetMap, sysChangeAddress, feeRate, sysFromXpubOrAddress, utxos, redeemOrWitnessScript) {
  if (this.Signer) {
    for (const valueAssetObj of assetMap.values()) {
      if (!valueAssetObj.changeAddress) {
        valueAssetObj.changeAddress = await this.Signer.getNewChangeAddress()
      }
    }
    if (!sysChangeAddress) {
      sysChangeAddress = await this.Signer.getNewChangeAddress()
    }
  }
  // false last param for filtering out 0 conf UTXO, new/update/send asset transactions must use confirmed inputs only as per Syscoin Core mempool policy
  utxos = await this.fetchAndSanitizeUTXOs(utxos, sysFromXpubOrAddress, txOpts, assetMap, false)
  const res = syscointx.syscoinBurnToAssetAllocation(txOpts, utxos, assetMap, sysChangeAddress, feeRate)

  // Check if the result is an error
  if (isErrorResult(res)) {
    const errorData = formatErrorResponse(res)
    throw Object.assign(
      new Error(errorData.message),
      { code: 402, ...errorData }
    )
  }

  const psbt = await this.createPSBTFromRes(res, redeemOrWitnessScript)
  if (sysFromXpubOrAddress || !this.Signer) {
    return { psbt, res: psbt, fee: res.fee }
  }
  const signedPsbt = await this.signAndSend(psbt)
  return { psbt: signedPsbt, fee: res.fee }
}
/* createPoDA
Purpose: Send Blob to Syscoin
Param txOpts: Required. Transaction options. Fields are described below:
  Field blobData. Required. String representing data
  Field rbf. Optional. True by default. Replace-by-fee functionality allowing one to bump transaction by increasing fee for UTXOs used.
Param changeAddress: Optional. Change address if defined is where change outputs are sent to. If not defined and Signer is defined then a new change address will be automatically created using the next available change address index in the HD path
Param feeRate: Optional. Defaults to 10 satoshi per byte. How many satoshi per byte the network fee should be paid out as.
Param fromXpubOrAddress: Optional. If wanting to fund from a specific XPUB or address specify this field should be set
Param utxos: Optional. Pass in specific utxos to fund a transaction.
Param redeemOrWitnessScript: Optional. redeemScript for P2SH and witnessScript for P2WSH spending conditions.
Returns: PSBT if if Signer is set or result object which is used to create PSBT and sign/send if xpub/address are passed in to fund transaction
*/
Syscoin.prototype.createPoDA = async function (txOpts, changeAddress, feeRate, fromXpubOrAddress, utxos, redeemOrWitnessScript) {
  if (this.Signer) {
    if (!changeAddress) {
      changeAddress = await this.Signer.getNewChangeAddress()
    }
  }
  utxos = await this.fetchAndSanitizeUTXOs(utxos, fromXpubOrAddress, txOpts)
  const strData = '0x' + txOpts.blobData
  txOpts.blobData = Buffer.from(txOpts.blobData, 'hex')
  txOpts.blobHash = Buffer.from(utils.web3.utils.sha3(strData).slice(2), 'hex')
  const res = syscointx.createPoDA(txOpts, utxos, changeAddress, feeRate)

  // Check if the result is an error
  if (isErrorResult(res)) {
    const errorData = formatErrorResponse(res)
    throw Object.assign(
      new Error(errorData.message),
      { code: 402, ...errorData }
    )
  }

  const psbt = await this.createPSBTFromRes(res, redeemOrWitnessScript)
  psbt.blobData = txOpts.blobData
  if (fromXpubOrAddress || !this.Signer) {
    return { psbt, res: psbt, fee: res.fee }
  }
  const signedPsbt = await this.signAndSend(psbt)
  return { psbt: signedPsbt, fee: res.fee }
}

/* decodeRawTransaction
Purpose: Decode a raw transaction or PSBT to extract both Bitcoin and Syscoin-specific information
Param psbtOrTx: Required. Either a PSBT object from bitcoinjs-lib or a raw transaction object
Returns: Comprehensive JSON object with Bitcoin transaction details and Syscoin-specific data
*/
Syscoin.prototype.decodeRawTransaction = function (psbtOrTx) {
  let tx = null

  // Handle PSBT input - check for PSBT properties instead of constructor name
  if (psbtOrTx && psbtOrTx.data && psbtOrTx.data.inputs && psbtOrTx.data.outputs) {
    try {
      // Try to extract complete transaction
      tx = psbtOrTx.extractTransaction(true, true)
    } catch (err) {
      // If we can't extract a complete transaction, use TransactionBuilder to create one
      if (psbtOrTx.data.globalMap && psbtOrTx.data.globalMap.unsignedTx) {
        const bitcoinjs = utils.bitcoinjs
        const txBuilder = new bitcoinjs.TransactionBuilder(this.network)

        // Set version
        txBuilder.setVersion(psbtOrTx.version || 2)

        // Add inputs from PSBT data
        psbtOrTx.data.inputs.forEach((input, index) => {
          const txInput = psbtOrTx.txInputs[index]
          txBuilder.addInput(txInput.hash, txInput.index, txInput.sequence)
        })

        // Add outputs from PSBT data
        psbtOrTx.txOutputs.forEach(output => {
          txBuilder.addOutput(output.script || output.address, output.value)
        })

        // Set locktime if available
        if (psbtOrTx.locktime !== undefined) {
          txBuilder.setLockTime(psbtOrTx.locktime)
        }

        tx = txBuilder.buildIncomplete()
      } else {
        throw new Error('Unable to extract transaction data from PSBT: ' + err.message)
      }
    }
  } else if (psbtOrTx && psbtOrTx.ins && psbtOrTx.outs) {
    // Already a transaction object
    tx = psbtOrTx
  } else {
    throw new Error('Input must be a PSBT or transaction object')
  }

  // Use syscointx to decode the transaction
  return syscointx.decodeRawTransaction(tx, this.network)
}

module.exports = {
  SyscoinJSLib: Syscoin, // Left to be backwards compatible
  syscoin: Syscoin,
  utils
}
