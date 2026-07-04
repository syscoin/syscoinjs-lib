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
Syscoin.prototype.signAndSendWithSigner = async function (psbt, SignerIn) {
  return this.signAndSend(psbt, SignerIn)
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

function bridgeBurnError (code, message, details) {
  return Object.assign(
    new Error(message),
    { code, error: true, details }
  )
}

function normalizeAssetGuid (assetGuid) {
  if (assetGuid && assetGuid.toString) {
    return assetGuid.toString(10)
  }
  return String(assetGuid)
}

function isBridgeBurn (assetOpts) {
  return assetOpts && assetOpts.ethaddress && assetOpts.ethaddress.length > 0
}

function getOpReturnPayloadFromOutputs (outputs) {
  for (const output of outputs) {
    if (!output.script) {
      continue
    }
    const chunks = utils.bitcoinjs.script.decompile(output.script)
    if (chunks && chunks[0] === utils.bitcoinjs.opcodes.OP_RETURN && chunks[1]) {
      return Buffer.isBuffer(chunks[1]) ? chunks[1] : Buffer.from(chunks[1])
    }
  }
  return null
}

function prepareBridgeBurnOptions (txOpts, assetMap) {
  if (!(assetMap instanceof Map) || assetMap.size !== 1) {
    throw bridgeBurnError(
      'INVALID_BRIDGE_BURN_ASSET_MAP',
      'Bridge burns must target exactly one asset'
    )
  }

  const [[assetGuid, valueAssetObj]] = assetMap.entries()
  const targetAssetGuid = normalizeAssetGuid(assetGuid)
  if (!valueAssetObj || !Array.isArray(valueAssetObj.outputs) || valueAssetObj.outputs.length !== 1) {
    throw bridgeBurnError(
      'INVALID_BRIDGE_BURN_OUTPUTS',
      'Bridge burns must contain exactly one burn output for the target asset'
    )
  }

  const hardenedTxOpts = { ...(txOpts || {}) }
  if (hardenedTxOpts.assetWhiteList) {
    for (const whitelistedGuid of hardenedTxOpts.assetWhiteList.keys()) {
      if (normalizeAssetGuid(whitelistedGuid) !== targetAssetGuid) {
        throw bridgeBurnError(
          'INVALID_BRIDGE_BURN_WHITELIST',
          'Bridge burn assetWhiteList may not include non-target assets',
          { targetAssetGuid, whitelistedGuid: normalizeAssetGuid(whitelistedGuid) }
        )
      }
    }
  }
  // Empty whitelist means sanitizer accepts only assetMap assets and rejects every other asset UTXO.
  hardenedTxOpts.assetWhiteList = new Map()

  return {
    txOpts: hardenedTxOpts,
    assetMap: new Map([[targetAssetGuid, valueAssetObj]]),
    targetAssetGuid
  }
}

function prepareBridgeMintOptions (assetMap) {
  if (!(assetMap instanceof Map) || assetMap.size !== 1) {
    throw bridgeBurnError(
      'INVALID_BRIDGE_MINT_ASSET_MAP',
      'Bridge mints must create exactly one asset'
    )
  }

  const [[assetGuid, valueAssetObj]] = assetMap.entries()
  const targetAssetGuid = normalizeAssetGuid(assetGuid)
  if (!valueAssetObj || !Array.isArray(valueAssetObj.outputs) || valueAssetObj.outputs.length !== 1) {
    throw bridgeBurnError(
      'INVALID_BRIDGE_MINT_OUTPUTS',
      'Bridge mints must contain exactly one output for the minted asset'
    )
  }

  return {
    assetMap: new Map([[targetAssetGuid, valueAssetObj]]),
    targetAssetGuid
  }
}

function normalizeBridgeUtxos (utxos) {
  const normalizeUtxo = utxo => {
    if (!utxo || !utxo.assetInfo) {
      return utxo
    }
    return {
      ...utxo,
      assetInfo: {
        ...utxo.assetInfo,
        assetGuid: normalizeAssetGuid(utxo.assetInfo.assetGuid)
      }
    }
  }

  if (Array.isArray(utxos)) {
    return utxos.map(normalizeUtxo)
  }
  if (!utxos || typeof utxos !== 'object') {
    return utxos
  }

  return {
    ...utxos,
    assets: Array.isArray(utxos.assets)
      ? utxos.assets.map(asset => ({
        ...asset,
        assetGuid: normalizeAssetGuid(asset.assetGuid)
      }))
      : utxos.assets,
    utxos: Array.isArray(utxos.utxos) ? utxos.utxos.map(normalizeUtxo) : utxos.utxos
  }
}

function removeAssetUtxos (utxos) {
  if (!utxos || !Array.isArray(utxos.utxos)) {
    return utxos
  }
  return {
    ...utxos,
    utxos: utxos.utxos.filter(utxo => !utxo.assetInfo)
  }
}

function validateSingleAssetAllocation (res, targetAssetGuid, errorPrefix) {
  const target = normalizeAssetGuid(targetAssetGuid)
  const allocations = syscointx.getAllocationsFromOutputs(res.outputs)
  if (!allocations || allocations.length !== 1) {
    throw bridgeBurnError(
      `INVALID_${errorPrefix}_ALLOCATION_COUNT`,
      'Bridge transaction must serialize exactly one asset allocation'
    )
  }

  const allocation = allocations[0]
  if (normalizeAssetGuid(allocation.assetGuid) !== target) {
    throw bridgeBurnError(
      `INVALID_${errorPrefix}_ALLOCATION_ASSET`,
      'Bridge transaction allocation asset does not match the target asset',
      { targetAssetGuid: target, allocationAssetGuid: normalizeAssetGuid(allocation.assetGuid) }
    )
  }

  const assignedOutputs = new Set()
  for (const value of allocation.values) {
    if (assignedOutputs.has(value.n)) {
      throw bridgeBurnError(
        `INVALID_${errorPrefix}_DUPLICATE_OUTPUT`,
        'Bridge transaction allocation contains a duplicate output index'
      )
    }
    assignedOutputs.add(value.n)
  }

  return { allocation, allocations, target }
}

function validateAssetOutputMetadataMatchesAllocation (res, allocation, target, errorPrefix, allowedScriptAllocationIndex) {
  const valuesByIndex = new Map()
  for (const value of allocation.values) {
    valuesByIndex.set(value.n, value.value)
  }

  for (const [index, output] of res.outputs.entries()) {
    if (output.script && output.assetInfo) {
      throw bridgeBurnError(
        `INVALID_${errorPrefix}_OUTPUT_METADATA`,
        'Bridge transaction script outputs may not carry asset metadata',
        { outputIndex: index }
      )
    }
    if (!output.assetInfo) {
      continue
    }
    const expectedValue = valuesByIndex.get(index)
    if (!expectedValue) {
      throw bridgeBurnError(
        `INVALID_${errorPrefix}_OUTPUT_METADATA`,
        'Bridge transaction output asset metadata is not committed by the serialized allocation',
        { outputIndex: index }
      )
    }
    if (normalizeAssetGuid(output.assetInfo.assetGuid) !== target || !new BN(output.assetInfo.value).eq(new BN(expectedValue))) {
      throw bridgeBurnError(
        `INVALID_${errorPrefix}_OUTPUT_METADATA`,
        'Bridge transaction output asset metadata does not match the serialized allocation',
        {
          outputIndex: index,
          targetAssetGuid: target,
          metadataAssetGuid: normalizeAssetGuid(output.assetInfo.assetGuid),
          metadataValue: new BN(output.assetInfo.value).toString(10),
          allocationValue: new BN(expectedValue).toString(10)
        }
      )
    }
  }

  for (const [index, expectedValue] of valuesByIndex.entries()) {
    const output = res.outputs[index]
    if (!output) {
      throw bridgeBurnError(
        `INVALID_${errorPrefix}_OUTPUT_METADATA`,
        'Bridge transaction allocation references a missing output',
        { outputIndex: index }
      )
    }
    if (output.script && index === allowedScriptAllocationIndex) {
      continue
    }
    if (!output.assetInfo || normalizeAssetGuid(output.assetInfo.assetGuid) !== target || !new BN(output.assetInfo.value).eq(new BN(expectedValue))) {
      throw bridgeBurnError(
        `INVALID_${errorPrefix}_OUTPUT_METADATA`,
        'Bridge transaction serialized allocation is not mirrored by output asset metadata',
        { outputIndex: index, targetAssetGuid: target, allocationValue: new BN(expectedValue).toString(10) }
      )
    }
  }
}

function validateBridgeBurnResultShape (res, targetAssetGuid, assetOpts) {
  if (!res || !Array.isArray(res.inputs) || !Array.isArray(res.outputs)) {
    throw bridgeBurnError('INVALID_BRIDGE_BURN_RESULT', 'Bridge burn transaction creation failed')
  }
  if (res.inputs.length >= 100) {
    throw bridgeBurnError('INVALID_BRIDGE_BURN_INPUT_COUNT', 'Bridge burn has too many inputs for relay parsing')
  }
  if (res.outputs.length >= 10) {
    throw bridgeBurnError('INVALID_BRIDGE_BURN_OUTPUT_COUNT', 'Bridge burn has too many outputs for relay parsing')
  }

  const { allocation, allocations, target } = validateSingleAssetAllocation(res, targetAssetGuid, 'BRIDGE_BURN')
  const opReturnIndex = res.outputs.findIndex(output => output.script && Buffer.from(output.script)[0] === 0x6a)
  if (opReturnIndex < 0 || !allocation.values.some(value => value.n === opReturnIndex)) {
    throw bridgeBurnError(
      'INVALID_BRIDGE_BURN_MISSING_BURN_OUTPUT',
      'Bridge burn allocation does not commit the OP_RETURN burn output'
    )
  }

  let targetInputTotal = new BN(0)
  for (const input of res.inputs) {
    if (!input.assetInfo) {
      continue
    }
    if (normalizeAssetGuid(input.assetInfo.assetGuid) !== target) {
      throw bridgeBurnError(
        'INVALID_BRIDGE_BURN_INPUT_ASSET',
        'Bridge burn selected a non-target asset input',
        { targetAssetGuid: target, inputAssetGuid: normalizeAssetGuid(input.assetInfo.assetGuid) }
      )
    }
    targetInputTotal = targetInputTotal.add(new BN(input.assetInfo.value))
  }
  if (targetInputTotal.isZero()) {
    throw bridgeBurnError(
      'INVALID_BRIDGE_BURN_MISSING_INPUT_ASSET',
      'Bridge burn must spend at least one target asset input',
      { targetAssetGuid: target }
    )
  }
  for (const output of res.outputs) {
    if (output.assetInfo && normalizeAssetGuid(output.assetInfo.assetGuid) !== target) {
      throw bridgeBurnError(
        'INVALID_BRIDGE_BURN_OUTPUT_ASSET',
        'Bridge burn created a non-target asset output',
        { targetAssetGuid: target, outputAssetGuid: normalizeAssetGuid(output.assetInfo.assetGuid) }
      )
    }
  }
  validateAssetOutputMetadataMatchesAllocation(res, allocation, target, 'BRIDGE_BURN', opReturnIndex)
  const allocationTotal = allocation.values.reduce((total, value) => total.add(new BN(value.value)), new BN(0))
  if (!targetInputTotal.eq(allocationTotal)) {
    throw bridgeBurnError(
      'INVALID_BRIDGE_BURN_ASSET_BALANCE',
      'Bridge burn target asset inputs must equal the serialized allocation total',
      { targetAssetGuid: target, inputTotal: targetInputTotal.toString(10), allocationTotal: allocationTotal.toString(10) }
    )
  }

  const payload = getOpReturnPayloadFromOutputs(res.outputs)
  const expectedPayload = Buffer.concat([
    syscointx.bufferUtils.serializeAssetAllocations(allocations),
    syscointx.bufferUtils.serializeAllocationBurn(assetOpts)
  ])
  if (!payload || payload.length !== expectedPayload.length || !payload.equals(expectedPayload)) {
    throw bridgeBurnError(
      'INVALID_BRIDGE_BURN_PAYLOAD',
      'Bridge burn OP_RETURN payload must contain only the asset allocation and Ethereum address'
    )
  }
}

function validateBridgeMintResultShape (res, targetAssetGuid, assetOpts) {
  if (!res || !Array.isArray(res.inputs) || !Array.isArray(res.outputs)) {
    throw bridgeBurnError('INVALID_BRIDGE_MINT_RESULT', 'Bridge mint transaction creation failed')
  }

  const { allocations, target } = validateSingleAssetAllocation(res, targetAssetGuid, 'BRIDGE_MINT')

  for (const input of res.inputs) {
    if (input.assetInfo) {
      throw bridgeBurnError(
        'INVALID_BRIDGE_MINT_INPUT_ASSET',
        'Bridge mint selected an asset input',
        { inputAssetGuid: normalizeAssetGuid(input.assetInfo.assetGuid) }
      )
    }
  }
  for (const output of res.outputs) {
    if (output.assetInfo && normalizeAssetGuid(output.assetInfo.assetGuid) !== target) {
      throw bridgeBurnError(
        'INVALID_BRIDGE_MINT_OUTPUT_ASSET',
        'Bridge mint created a non-target asset output',
        { targetAssetGuid: target, outputAssetGuid: normalizeAssetGuid(output.assetInfo.assetGuid) }
      )
    }
  }
  validateAssetOutputMetadataMatchesAllocation(res, allocations[0], target, 'BRIDGE_MINT')

  const payload = getOpReturnPayloadFromOutputs(res.outputs)
  const expectedPayload = Buffer.concat([
    syscointx.bufferUtils.serializeAssetAllocations(allocations),
    syscointx.bufferUtils.serializeMintSyscoin(assetOpts)
  ])
  if (!payload || payload.length !== expectedPayload.length || !payload.equals(expectedPayload)) {
    throw bridgeBurnError(
      'INVALID_BRIDGE_MINT_PAYLOAD',
      'Bridge mint OP_RETURN payload must contain only the asset allocation and mint proof'
    )
  }
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
      bip32Derivation: [],
      tapBip32Derivation: []
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
      // bitcoinjs-lib v7 requires BigInt for witnessUtxo.value
      inputObj.witnessUtxo = { script: utils.bitcoinjs.address.toOutputScript(input.address, this.network), value: BigInt(input.value.toNumber()) }
      if (redeemOrWitnessScript) {
        inputObj.witnessScript = redeemOrWitnessScript
      }
    }
    psbt.addInput(inputObj)

    // Store the HD path as proprietary data for all inputs
    // All BIP-32 derivations (regular and taproot) will be set during signing
    // This removes the need for the signer during PSBT creation
    if (input.path) {
      psbt.addUnknownKeyValToInput(i, {
        key: Buffer.from('path'),
        value: Buffer.from(input.path)
      })
    }
    // Add asset information if available
    if (input.assetInfo) {
      // Convert BN values to strings for JSON serialization
      const assetData = {
        ...input.assetInfo,
        value: input.assetInfo.value?.toString ? input.assetInfo.value.toString() : input.assetInfo.value
      }
      psbt.addUnknownKeyValToInput(i, {
        key: Buffer.from('assetInfo'),
        value: Buffer.from(JSON.stringify(assetData))
      })
    }

    if (input.address) {
      psbt.addUnknownKeyValToInput(i, {
        key: Buffer.from('address'),
        value: Buffer.from(input.address)
      })
    }
  }
  res.outputs.forEach((output, index) => {
    psbt.addOutput({
      script: output.script,
      address: output.script ? null : output.address,
      value: BigInt(output.value.toNumber())
    })
    // Add asset information if available
    if (output.assetInfo) {
      // Convert BN values to strings for JSON serialization
      const assetData = {
        ...output.assetInfo,
        value: output.assetInfo.value?.toString ? output.assetInfo.value.toString() : output.assetInfo.value
      }
      psbt.addUnknownKeyValToOutput(index, {
        key: Buffer.from('assetInfo'),
        value: Buffer.from(JSON.stringify(assetData))
      })
    }
    // Add address for Pali wallet popup detection
    if (output.address) {
      psbt.addUnknownKeyValToOutput(index, {
        key: Buffer.from('address'),
        value: Buffer.from(output.address)
      })
    }
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
      // No valid response from sendRawTransaction
      throw Object.assign(
        new Error('No valid response from transaction broadcast'),
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
Syscoin.prototype.signAndSend = async function (psbt, SignerIn) {
  const Signer = SignerIn || this.Signer
  psbt = await Signer.sign(psbt)
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
  let bridgeBurnTargetAssetGuid
  if (isBridgeBurn(assetOpts)) {
    const bridgeBurnOptions = prepareBridgeBurnOptions(txOpts, assetMap)
    txOpts = bridgeBurnOptions.txOpts
    assetMap = bridgeBurnOptions.assetMap
    bridgeBurnTargetAssetGuid = bridgeBurnOptions.targetAssetGuid
  }
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
  if (bridgeBurnTargetAssetGuid) {
    utxos = normalizeBridgeUtxos(utxos)
  }
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
  if (bridgeBurnTargetAssetGuid) {
    validateBridgeBurnResultShape(res, bridgeBurnTargetAssetGuid, assetOpts)
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
  const bridgeMintOptions = prepareBridgeMintOptions(assetMap)
  assetMap = bridgeMintOptions.assetMap

  // false last param for filtering out 0 conf UTXO, new/update/send asset transactions must use confirmed inputs only as per Syscoin Core mempool policy
  utxos = normalizeBridgeUtxos(utxos)
  utxos = await this.fetchAndSanitizeUTXOs(utxos, sysFromXpubOrAddress, txOpts, assetMap, false)
  utxos = removeAssetUtxos(utxos)
  const res = syscointx.assetAllocationMint(assetOpts, txOpts, utxos, assetMap, sysChangeAddress, feeRate)

  // Check if the result is an error
  if (isErrorResult(res)) {
    const errorData = formatErrorResponse(res)
    throw Object.assign(
      new Error(errorData.message),
      { code: 402, ...errorData }
    )
  }
  validateBridgeMintResultShape(res, bridgeMintOptions.targetAssetGuid, assetOpts)

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
  const inputAssetInfo = []
  const outputAssetInfo = []

  // Handle PSBT input - check for PSBT properties instead of constructor name
  if (psbtOrTx && psbtOrTx.data && psbtOrTx.data.inputs && psbtOrTx.data.outputs) {
    // Extract asset metadata from PSBT proprietary fields
    psbtOrTx.data.inputs.forEach((input, index) => {
      if (input.unknownKeyVals) {
        input.unknownKeyVals.forEach(kv => {
          if (kv.key.toString() === 'assetInfo') {
            try {
              inputAssetInfo[index] = JSON.parse(kv.value.toString())
            } catch (e) {
              // Ignore parse errors
            }
          }
        })
      }
    })

    psbtOrTx.data.outputs.forEach((output, index) => {
      if (output.unknownKeyVals) {
        output.unknownKeyVals.forEach(kv => {
          if (kv.key.toString() === 'assetInfo') {
            try {
              outputAssetInfo[index] = JSON.parse(kv.value.toString())
            } catch (e) {
              // Ignore parse errors
            }
          }
        })
      }
    })
    try {
      // Try to extract complete transaction
      tx = psbtOrTx.extractTransaction(true, true)
    } catch (err) {
      // If we can't extract, reconstruct a minimal Transaction from PSBT
      if (psbtOrTx.data.globalMap && psbtOrTx.data.globalMap.unsignedTx) {
        const bitcoinjs = utils.bitcoinjs
        const txTmp = new bitcoinjs.Transaction()
        txTmp.version = psbtOrTx.version || 2

        // Inputs
        psbtOrTx.data.inputs.forEach((input, index) => {
          const txInput = psbtOrTx.txInputs[index]
          const hashBuf = Buffer.isBuffer(txInput.hash) ? txInput.hash : Buffer.from(txInput.hash)
          txTmp.addInput(hashBuf, txInput.index, txInput.sequence)
        })

        // Outputs
        psbtOrTx.txOutputs.forEach(output => {
          const script = output.script || (output.address ? bitcoinjs.address.toOutputScript(output.address, this.network) : Buffer.alloc(0))
          const value = typeof output.value === 'bigint' ? output.value : BigInt(output.value)
          txTmp.addOutput(script, value)
        })

        if (psbtOrTx.locktime !== undefined) {
          txTmp.locktime = psbtOrTx.locktime
        }

        tx = txTmp
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

  // Use syscointx to decode the transaction with asset info
  const decoded = syscointx.decodeRawTransaction(tx, this.network)

  // Add input asset info from PSBT metadata if available
  if (inputAssetInfo.length > 0) {
    decoded.vin.forEach((vin, index) => {
      if (inputAssetInfo[index]) {
        vin.assetInfo = inputAssetInfo[index]
      }
    })
  }

  // Add output asset info from PSBT metadata if available
  if (outputAssetInfo.length > 0) {
    decoded.vout.forEach((vout, index) => {
      if (outputAssetInfo[index]) {
        vout.assetInfo = outputAssetInfo[index]
      }
    })
  }

  return decoded
}

module.exports = {
  SyscoinJSLib: Syscoin, // Left to be backwards compatible
  syscoin: Syscoin,
  utils
}
