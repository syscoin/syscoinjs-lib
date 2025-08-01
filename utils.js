const axios = require('axios')
const BN = require('bn.js')
const BIP84 = require('bip84')
const bjs = require('bitcoinjs-lib')
const bitcoinops = require('bitcoin-ops')
const varuint = require('varuint-bitcoin')
const { VerifyProof, GetProof } = require('eth-proof')
const { encode } = require('eth-util-lite')
const { Log } = require('eth-object')
const ethers = require('ethers')
const syscointx = require('syscointx-js')

// Web3 utility replacements using ethers and BN.js
const web3Utils = {
  BN,
  toBN: (value) => new BN(value),
  hexToNumberString: (hex) => new BN(hex.replace('0x', ''), 16).toString(10),
  sha3: (data) => ethers.utils.keccak256(data)
}

// Web3 ABI replacement using ethers
const web3Eth = {
  abi: {
    decodeParameters: (types, data) => {
      const abiCoder = new ethers.utils.AbiCoder()
      return abiCoder.decode(types, data)
    }
  }
}

// Create web3-compatible object for backward compatibility
const web3 = {
  utils: web3Utils,
  eth: web3Eth
}

const bitcoinNetworks = { mainnet: bjs.networks.bitcoin, testnet: bjs.networks.testnet }
const syscoinNetworks = {
  mainnet: {
    messagePrefix: '\x18Syscoin Signed Message:\n',
    bech32: 'sys',
    bip32: {
      public: 0x0488b21e,
      private: 0x0488ade4
    },
    pubKeyHash: 0x3f,
    scriptHash: 0x05,
    wif: 0x80
  },
  testnet: {
    messagePrefix: '\x18Syscoin Signed Message:\n',
    bech32: 'tsys',
    bip32: {
      public: 0x043587cf,
      private: 0x04358394
    },
    pubKeyHash: 0x41,
    scriptHash: 0xc4,
    wif: 0xef
  }
}
const bitcoinZPubTypes = { mainnet: { zprv: '04b2430c', zpub: '04b24746' }, testnet: { vprv: '045f18bc', vpub: '045f1cf6' } }
const bitcoinXPubTypes = { mainnet: { zprv: bitcoinNetworks.mainnet.bip32.private, zpub: bitcoinNetworks.mainnet.bip32.public }, testnet: { vprv: bitcoinNetworks.testnet.bip32.private, vpub: bitcoinNetworks.testnet.bip32.public } }
const syscoinZPubTypes = { mainnet: { zprv: '04b2430c', zpub: '04b24746' }, testnet: { vprv: '045f18bc', vpub: '045f1cf6' } }
const syscoinXPubTypes = { mainnet: { zprv: syscoinNetworks.mainnet.bip32.private, zpub: syscoinNetworks.mainnet.bip32.public }, testnet: { vprv: syscoinNetworks.testnet.bip32.private, vpub: syscoinNetworks.testnet.bip32.public } }
const syscoinSLIP44 = 57
const bitcoinSLIP44 = 0
const VaultManager = '0x7904299b3D3dC1b03d1DdEb45E9fDF3576aCBd5f'
const tokenFreezeFunction = '0b8914e27c9a6c88836bc5547f82ccf331142c761f84e9f1d36934a6a31eefad' // token freeze function signature
const axiosConfig = {
  withCredentials: true
}

// Retry configuration for blockbook API calls
const MAX_RETRIES = 3
const INITIAL_RETRY_DELAY = 1000 // 1 second

/* retryWithBackoff
Purpose: Generic retry function with exponential backoff for handling rate limiting (503 errors)
Param fn: Required. Function to retry
Param retryCount: Internal. Current retry attempt (starts at 0)
Returns: Returns the result of the function or throws error after max retries
*/
async function retryWithBackoff (fn, retryCount = 0) {
  try {
    return await fn()
  } catch (error) {
    // Check if it's a retryable error (503 Service Unavailable or rate limiting)
    const isRetryableError =
      (error.response && (error.response.status === 503 || error.response.status === 429)) ||
      (error.status === 503 || error.status === 429) ||
      (error.message && (
        error.message.includes('503') ||
        error.message.includes('429') ||
        error.message.includes('Service Unavailable') ||
        error.message.includes('Too many requests') ||
        error.message.includes('rate limit')
      ))

    if (isRetryableError && retryCount < MAX_RETRIES) {
      const delay = INITIAL_RETRY_DELAY * Math.pow(2, retryCount)
      console.log(`[syscoinjs-lib] Blockbook API rate limited, retrying after ${delay}ms... (attempt ${retryCount + 1}/${MAX_RETRIES})`)
      await new Promise(resolve => setTimeout(resolve, delay))
      return retryWithBackoff(fn, retryCount + 1)
    }

    // If not retryable or max retries reached, throw the error
    throw error
  }
}

/* fetchBackendAsset
Purpose: Fetch asset information from backend Blockbook provider
Param backendURL: Required. Fully qualified URL for blockbook
Param assetGuid: Required. Asset to fetch
Returns: Returns JSON object in response, asset information object in JSON
*/
async function fetchBackendAsset (backendURL, assetGuid) {
  return retryWithBackoff(async () => {
    let blockbookURL = backendURL.slice()
    if (blockbookURL) {
      blockbookURL = blockbookURL.replace(/\/$/, '')
    }
    // eslint-disable-next-line no-undef
    if (fetch) {
      // eslint-disable-next-line no-undef
      const response = await fetch(`${blockbookURL}/api/v2/asset/${assetGuid}?details=basic`)
      if (response.ok) {
        const data = await response.json()
        if (data.asset) {
          return data.asset
        }
      } else if (response.status === 503 || response.status === 429) {
        const error = new Error(`HTTP ${response.status}: ${response.statusText}`)
        error.status = response.status
        throw error
      }
    } else {
      const request = await axios.get(blockbookURL + '/api/v2/asset/' + assetGuid + '?details=basic', axiosConfig)
      if (request && request.data && request.data.asset) {
        return request.data.asset
      }
    }
    return null
  })
}

/* fetchBackendListAssets
Purpose: Fetch list of assets from backend Blockbook provider via a filter
Param backendURL: Required. Fully qualified URL for blockbook
Param filter: Required. Asset to fetch via filter, will filter contract or symbol fields
Returns: Returns JSON array in response, asset information objects in JSON
*/
async function fetchBackendListAssets (backendURL, filter) {
  return retryWithBackoff(async () => {
    let blockbookURL = backendURL.slice()
    if (blockbookURL) {
      blockbookURL = blockbookURL.replace(/\/$/, '')
    }
    // eslint-disable-next-line no-undef
    if (fetch) {
      // eslint-disable-next-line no-undef
      const request = await fetch(blockbookURL + '/api/v2/assets/' + filter)
      if (request.ok) {
        const data = await request.json()
        if (data && data.asset) {
          return data.asset
        }
      } else if (request.status === 503 || request.status === 429) {
        const error = new Error(`HTTP ${request.status}: ${request.statusText}`)
        error.status = request.status
        throw error
      }
    } else {
      const request = await axios.get(blockbookURL + '/api/v2/assets/' + filter, axiosConfig)
      if (request && request.data && request.data.asset) {
        return request.data.asset
      }
    }
    return null
  })
}

/* fetchBackendSPVProof
Purpose: Fetch SPV Proof from backend Blockbook provider. To be used to create a proof for the NEVM bridge.
Param backendURL: Required. Fully qualified URL for blockbook
Param addressOrXpub: Required. An address or XPUB to fetch UTXO's for
Param options: Optional. Optional queries based on https://github.com/syscoin/blockbook/blob/master/docs/api.md#get-utxo
Returns: Returns JSON object in response, UTXO object array in JSON
*/
async function fetchBackendSPVProof (backendURL, txid) {
  return retryWithBackoff(async () => {
    let blockbookURL = backendURL.slice()
    if (blockbookURL) {
      blockbookURL = blockbookURL.replace(/\/$/, '')
    }
    const url = blockbookURL + '/api/v2/getspvproof/' + txid
    // eslint-disable-next-line no-undef
    if (fetch) {
      // eslint-disable-next-line no-undef
      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        return data
      } else if (response.status === 503 || response.status === 429) {
        const error = new Error(`HTTP ${response.status}: ${response.statusText}`)
        error.status = response.status
        throw error
      }
    } else {
      const request = await axios.get(url, axiosConfig)
      if (request && request.data) {
        return request.data
      }
    }
    return null
  })
}

/* fetchBackendUTXOS
Purpose: Fetch UTXO's for an address or XPUB from backend Blockbook provider
Param backendURL: Required. Fully qualified URL for blockbook
Param addressOrXpub: Required. An address or XPUB to fetch UTXO's for
Param options: Optional. Optional queries based on https://github.com/syscoin/blockbook/blob/master/docs/api.md#get-utxo
Returns: Returns JSON object in response, UTXO object array in JSON
*/
async function fetchBackendUTXOS (backendURL, addressOrXpub, options) {
  return retryWithBackoff(async () => {
    let blockbookURL = backendURL.slice()
    if (blockbookURL) {
      blockbookURL = blockbookURL.replace(/\/$/, '')
    }
    let url = blockbookURL + '/api/v2/utxo/' + addressOrXpub
    if (options) {
      url += '?' + options
    }
    // eslint-disable-next-line no-undef
    if (fetch) {
      // eslint-disable-next-line no-undef
      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        if (data) {
          data.addressOrXpub = addressOrXpub
          return data
        }
      } else if (response.status === 503 || response.status === 429) {
        const error = new Error(`HTTP ${response.status}: ${response.statusText}`)
        error.status = response.status
        throw error
      }
    } else {
      const request = await axios.get(url, axiosConfig)
      if (request && request.data) {
        request.data.addressOrXpub = addressOrXpub
        return request.data
      }
    }
    return null
  })
}

/* fetchBackendAccount
Purpose: Fetch address or XPUB information including transactions and balance information (based on options) from backend Blockbook provider
Param backendURL: Required. Fully qualified URL for blockbook
Param addressOrXpub: Required. An address or XPUB to fetch UTXO's for
Param options: Optional. Optional queries based on https://github.com/syscoin/blockbook/blob/master/docs/api.md#get-xpub
Param xpub: Optional. If addressOrXpub is an XPUB set to true.
Param mySignerObj: Optional. Signer object if you wish to update change/receiving indexes from backend provider (and XPUB token information is provided in response)
Returns: Returns JSON object in response, account object in JSON
*/
async function fetchBackendAccount (backendURL, addressOrXpub, options, xpub, mySignerObj) {
  return retryWithBackoff(async () => {
    let blockbookURL = backendURL.slice()
    if (blockbookURL) {
      blockbookURL = blockbookURL.replace(/\/$/, '')
    }
    let url = blockbookURL
    if (xpub) {
      url += '/api/v2/xpub/'
    } else {
      url += '/api/v2/address/'
    }
    url += addressOrXpub
    if (options) {
      url += '?' + options
    }
    // eslint-disable-next-line no-undef
    if (fetch) {
      // eslint-disable-next-line no-undef
      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        if (xpub && data.tokens && mySignerObj) {
          mySignerObj.setLatestIndexesFromXPubTokens(data.tokens)
        }
        data.addressOrXpub = addressOrXpub
        return data
      } else if (response.status === 503 || response.status === 429) {
        const error = new Error(`HTTP ${response.status}: ${response.statusText}`)
        error.status = response.status
        throw error
      }
    } else {
      const request = await axios.get(url, axiosConfig)
      if (request && request.data) {
      // if fetching xpub data
        if (xpub && request.data.tokens && mySignerObj) {
          mySignerObj.setLatestIndexesFromXPubTokens(request.data.tokens)
        }
        return request.data
      }
    }
    return null
  }).catch(e => {
    console.log('Exception: ' + e.message)
    return null
  })
}

/* sendRawTransaction
Purpose: Send raw transaction to backend Blockbook provider to send to the network
Param backendURL: Required. Fully qualified URL for blockbook
Param txHex: Required. Raw transaction hex
Param mySignerObj: Optional. Signer object if you wish to update change/receiving indexes from backend provider through fetchBackendAccount()
Returns: Returns txid in response or error
*/
async function sendRawTransaction (backendURL, txHex, mySignerObj) {
  return retryWithBackoff(async () => {
    let blockbookURL = backendURL.slice()
    if (blockbookURL) {
      blockbookURL = blockbookURL.replace(/\/$/, '')
    }
    // eslint-disable-next-line no-undef
    if (fetch) {
      const requestOptions = {
        method: 'POST',
        body: txHex
      }
      // eslint-disable-next-line no-undef
      const response = await fetch(blockbookURL + '/api/v2/sendtx/', requestOptions)

      if (response.ok) {
        const data = await response.json()
        if (mySignerObj) {
          await fetchBackendAccount(blockbookURL, mySignerObj.getAccountXpub(), 'tokens=used&details=tokens', true, mySignerObj)
        }
        return data
      } else if (response.status === 503 || response.status === 429) {
        const error = new Error(`HTTP ${response.status}: ${response.statusText}`)
        error.status = response.status
        throw error
      } else {
        // Handle other error status codes (400, 404, 500, etc.)
        let errorText = response.statusText
        try {
          const errorData = await response.text()
          if (errorData) {
            errorText = errorData
          }
        } catch (e) {
          // If we can't read the response body, use the status text
        }
        const error = new Error(`HTTP error! Status: ${response.status}. Details: ${errorText}`)
        error.status = response.status
        throw error
      }
    } else {
      const request = await axios.post(blockbookURL + '/api/v2/sendtx/', txHex, axiosConfig)
      if (request && request.data) {
        if (mySignerObj) {
          await fetchBackendAccount(blockbookURL, mySignerObj.getAccountXpub(), 'tokens=used&details=tokens', true, mySignerObj)
        }
        return request.data
      }
    }
    return null
  })
}

/* fetchBackendRawTx
Purpose: Get transaction from txid from backend Blockbook provider
Param backendURL: Required. Fully qualified URL for blockbook
Param txid: Required. Transaction ID to get information for
Returns: Returns JSON object in response, transaction object in JSON
*/
async function fetchBackendRawTx (backendURL, txid) {
  return retryWithBackoff(async () => {
    let blockbookURL = backendURL.slice()
    if (blockbookURL) {
      blockbookURL = blockbookURL.replace(/\/$/, '')
    }
    // eslint-disable-next-line no-undef
    if (fetch) {
      // eslint-disable-next-line no-undef
      const response = await fetch(blockbookURL + '/api/v2/tx/' + txid)
      if (response.ok) {
        const data = await response.json()
        if (data) {
          return data
        }
      } else if (response.status === 503 || response.status === 429) {
        const error = new Error(`HTTP ${response.status}: ${response.statusText}`)
        error.status = response.status
        throw error
      }
    } else {
      const request = await axios.get(blockbookURL + '/api/v2/tx/' + txid, axiosConfig)
      if (request && request.data) {
        return request.data
      }
    }
    return null
  })
}

/* fetchProviderInfo
Purpose: Get prover info including blockbook and backend data
Returns: Returns JSON object in response, provider object in JSON
*/
async function fetchProviderInfo (backendURL) {
  return retryWithBackoff(async () => {
    let blockbookURL = backendURL.slice()
    if (blockbookURL) {
      blockbookURL = blockbookURL.replace(/\/$/, '')
    }
    // eslint-disable-next-line no-undef
    if (fetch) {
      // eslint-disable-next-line no-undef
      const response = await fetch(blockbookURL + '/api/v2')
      if (response.ok) {
        const data = await response.json()
        if (data) {
          return data
        }
      } else if (response.status === 503 || response.status === 429) {
        const error = new Error(`HTTP ${response.status}: ${response.statusText}`)
        error.status = response.status
        throw error
      }
    } else {
      const request = await axios.get(blockbookURL + '/api/v2', axiosConfig)
      if (request && request.data) {
        return request.data
      }
    }
    return null
  })
}

/* fetchBackendBlock
Purpose: Get block from backend
Returns: Returns JSON object in response, block object in JSON
*/
async function fetchBackendBlock (backendURL, blockhash) {
  return retryWithBackoff(async () => {
    let blockbookURL = backendURL.slice()
    if (blockbookURL) {
      blockbookURL = blockbookURL.replace(/\/$/, '')
    }
    // eslint-disable-next-line no-undef
    if (fetch) {
      // eslint-disable-next-line no-undef
      const response = await fetch(blockbookURL + '/api/v2/block/' + blockhash)
      if (response.ok) {
        const data = await response.json()
        if (data) {
          return data
        }
      } else if (response.status === 503 || response.status === 429) {
        const error = new Error(`HTTP ${response.status}: ${response.statusText}`)
        error.status = response.status
        throw error
      }
    } else {
      const request = await axios.get(blockbookURL + '/api/v2/block/' + blockhash, axiosConfig)
      if (request && request.data) {
        return request.data
      }
    }
    return null
  })
}

/* fetchEstimateFee
Purpose: Get estimated fee from backend
Returns: Returns JSON object in response, fee object in JSON
Param blocks: Required. How many blocks to estimate fee for.
Param options: Optional. possible value conservative=true or false for conservative fee. Default is true.
Returns: Returns fee response in integer. Fee rate in coins per kilobytes.
*/
async function fetchEstimateFee (backendURL, blocks, options) {
  return retryWithBackoff(async () => {
    let blockbookURL = backendURL.slice()
    if (blockbookURL) {
      blockbookURL = blockbookURL.replace(/\/$/, '')
    }
    let url = blockbookURL + '/api/v2/estimatefee/' + blocks
    if (options) {
      url += '?' + options
    }
    // eslint-disable-next-line no-undef
    if (fetch) {
      // eslint-disable-next-line no-undef
      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        if (data && data.result) {
          // Parse as float since API returns coins per KB, not satoshis per KB
          let feeInSysPerKB = parseFloat(data.result)
          // if fee is 0 or negative, use minimum
          if (feeInSysPerKB <= 0) {
            feeInSysPerKB = 0.001 // 0.001 SYS/KB minimum
          }
          // Return coins(SYS) per KB as-is (the existing code will divide by 1024)
          return feeInSysPerKB
        }
      } else if (response.status === 503 || response.status === 429) {
        const error = new Error(`HTTP ${response.status}: ${response.statusText}`)
        error.status = response.status
        throw error
      }
    } else {
      const request = await axios.get(url, axiosConfig)
      if (request && request.data && request.data.result) {
        let feeInSysPerKB = parseFloat(request.data.result)
        if (feeInSysPerKB <= 0) {
          feeInSysPerKB = 0.001
        }
        return feeInSysPerKB
      }
    }
    return 0.001 // Default fallback: 0.001 SYS/KB
  }).catch(e => {
    return 0.001
  })
}

/* signPSBTWithWIF
Purpose: Sign PSBT with WiF
Param psbt: Required. Partially signed transaction object
Param wif: Required. Private key in WIF format to sign inputs with
Param network: Required. bitcoinjs-lib Network object
Returns: psbt from bitcoinjs-lib
*/
async function signPSBTWithWIF (psbt, wif, network) {
  const wifObject = bjs.ECPair.fromWIF(
    wif,
    network
  )
  // sign inputs with wif
  await psbt.signAllInputsAsync(wifObject)
  try {
    if (psbt.validateSignaturesOfAllInputs()) {
      psbt.finalizeAllInputs()
    }
  } catch (err) {
  }
  return psbt
}

/* signWithWIF
Purpose: Sign Result object with WiF
Param res: Required. The resulting object passed in which is assigned from syscointx.createTransaction()/syscointx.createAssetTransaction()
Param wif: Required. Private key in WIF format to sign inputs with, can be array of keys
Param network: Required. bitcoinjs-lib Network object
Returns: psbt from bitcoinjs-lib
*/
async function signWithWIF (psbt, wif, network) {
  if (Array.isArray(wif)) {
    for (const wifKey of wif) {
      psbt = await signPSBTWithWIF(psbt, wifKey, network)
    }
    return psbt
  } else {
    return await signPSBTWithWIF(psbt, wif, network)
  }
}
/* buildEthProof
Purpose: Build Ethereum SPV proof using eth-proof library
Param assetOpts: Required. Object containing web3url and ethtxid fields populated
Returns: Returns JSON object in response, SPV proof object in JSON
*/
async function buildEthProof (assetOpts) {
  const ethProof = new GetProof(assetOpts.web3url)
  const web3Provider = new ethers.providers.JsonRpcProvider(assetOpts.web3url)
  try {
    const txHash = assetOpts.ethtxid.startsWith('0x') ? assetOpts.ethtxid : `0x${assetOpts.ethtxid}`
    let result = await ethProof.transactionProof(txHash)
    const txObj = await VerifyProof.getTxFromTxProofAt(result.txProof, result.txIndex)
    const txvalue = txObj.hex.substring(2) // remove hex prefix
    let destinationaddress
    const txroot = result.header[4].toString('hex')
    const txRootFromProof = VerifyProof.getRootFromProof(result.txProof)
    if (txroot !== txRootFromProof.toString('hex')) {
      throw new Error('TxRoot mismatch')
    }
    const txparentnodes = encode(result.txProof).toString('hex')
    const txpath = encode(result.txIndex).toString('hex')
    const blocknumber = parseInt(result.header[8].toString('hex'), 16)
    const block = await web3Provider.getBlock(blocknumber)
    const blockhash = block.hash.substring(2) // remove hex prefix
    const receiptroot = result.header[5].toString('hex')
    result = await ethProof.receiptProof(txHash)
    const txReceipt = await VerifyProof.getReceiptFromReceiptProofAt(result.receiptProof, result.txIndex)
    const receiptRootFromProof = VerifyProof.getRootFromProof(result.receiptProof)
    if (receiptroot !== receiptRootFromProof.toString('hex')) {
      throw new Error('ReceiptRoot mismatch')
    }
    const receiptparentnodes = encode(result.receiptProof).toString('hex')
    const blockHashFromHeader = VerifyProof.getBlockHashFromHeader(result.header)
    if (blockhash !== blockHashFromHeader.toString('hex')) {
      throw new Error('BlockHash mismatch')
    }
    const receiptvalue = txReceipt.hex.substring(2) // remove hex prefix
    let amount = new web3.utils.BN(0)
    let assetguid
    for (let i = 0; i < txReceipt.setOfLogs.length; i++) {
      const log = Log.fromRaw(txReceipt.setOfLogs[i]).toObject()

      if (!log.topics || log.topics.length !== 3) {
        continue
      }

      if (
        log.topics[0].toString('hex').toLowerCase() === tokenFreezeFunction.toLowerCase() &&
        log.address.toLowerCase() === VaultManager.toLowerCase()
      ) {
        // Decode indexed parameters from topics
        assetguid = web3.utils.hexToNumberString('0x' + log.topics[1].toString('hex'))
        // Decode non-indexed parameters from data
        const paramResults = web3.eth.abi.decodeParameters(
          ['uint', 'string'],
          log.data
        )
        amount = web3.utils.toBN(paramResults[0]).toString()
        destinationaddress = paramResults[1].trim()
        break
      }
    }

    const ethtxid = web3.utils.sha3(Buffer.from(txvalue, 'hex')).substring(2) // not txid but txhash of the tx object used for calculating tx commitment without requiring transaction deserialization
    return { ethtxid, blockhash, assetguid, destinationaddress, amount, txvalue, txroot, txparentnodes, txpath, blocknumber, receiptvalue, receiptroot, receiptparentnodes }
  } catch (e) {
    console.log('Exception: ' + e.message)
    return e
  }
}

/* sanitizeBlockbookUTXOs
Purpose: Sanitize backend provider UTXO objects to be useful for this library
Param sysFromXpubOrAddress: Required. The XPUB or address that was called to fetch UTXOs
Param utxoObj: Required. Backend provider UTXO JSON object to be sanitized
Param network: Optional. Defaults to Syscoin Mainnet.
Param txOpts: Optional. If its passed in we use assetWhiteList field of options to skip over (if assetWhiteList is null) UTXO's
Param assetMap: Optional. Destination outputs for transaction requiring UTXO sanitizing, used in assetWhiteList check described above
Param excludeZeroConf: Optional. False by default. Filtering out 0 conf UTXO, new/update/send asset transactions must use confirmed inputs only as per Syscoin Core mempool policy
Returns: Returns sanitized UTXO object for use internally in this library
*/
function sanitizeBlockbookUTXOs (sysFromXpubOrAddress, utxoObj, network, txOpts, assetMap, excludeZeroConf) {
  if (!txOpts) {
    txOpts = { rbf: false }
  }
  const sanitizedUtxos = { utxos: [] }
  if (Array.isArray(utxoObj)) {
    utxoObj.utxos = utxoObj
  }
  if (utxoObj.assets) {
    sanitizedUtxos.assets = new Map()
    utxoObj.assets.forEach(asset => {
      const assetObj = {}
      if (asset.contract) {
        asset.contract = asset.contract.replace(/^0x/, '')
        assetObj.contract = Buffer.from(asset.contract, 'hex')
      }
      assetObj.maxsupply = new BN(asset.maxSupply)
      assetObj.precision = asset.decimals

      sanitizedUtxos.assets.set(asset.assetGuid, assetObj)
    })
  }
  if (utxoObj.utxos) {
    utxoObj.utxos.forEach(utxo => {
      // xpub queries will return utxo.address and address queries should use sysFromXpubOrAddress as address is not provided
      utxo.address = utxo.address || sysFromXpubOrAddress
      if (excludeZeroConf && utxo.confirmations <= 0) {
        return
      }
      const newUtxo = { type: 'LEGACY', address: utxo.address, txId: utxo.txid, path: utxo.path, vout: utxo.vout, value: new BN(utxo.value), locktime: utxo.locktime }
      if (newUtxo.address.startsWith(network.bech32)) {
        newUtxo.type = 'BECH32'
      }
      if (utxo.assetInfo) {
        newUtxo.assetInfo = { assetGuid: utxo.assetInfo.assetGuid, value: new BN(utxo.assetInfo.value) }
        const assetObj = sanitizedUtxos.assets.get(utxo.assetInfo.assetGuid)
        // sanity check to ensure sanitizedUtxos.assets has all of the assets being added to UTXO that are assets
        if (!assetObj) {
          return
        }
        // not sending this asset (assetMap) and assetWhiteList option if set with this asset will skip this check, by default this check is done and inputs will be skipped
        if ((!assetMap || !assetMap.has(utxo.assetInfo.assetGuid)) && (txOpts.assetWhiteList && !txOpts.assetWhiteList.has(utxo.assetInfo.assetGuid))) {
          console.log('SKIPPING utxo')
          return
        }
      }
      sanitizedUtxos.utxos.push(newUtxo)
    })
  }

  return sanitizedUtxos
}

/* getMemoFromScript
Purpose: Return memo from a script, null otherwise
Param script: Required. OP_RETURN script output
Param memoHeader: Required. Memo prefix, application specific
*/
function getMemoFromScript (script, memoHeader) {
  const pos = script.indexOf(memoHeader)
  if (pos >= 0) {
    return script.slice(pos + memoHeader.length)
  }
  return null
}

/* getMemoFromOpReturn
Purpose: Return memo from an array of outputs by finding the OP_RETURN output and extracting the memo from the script, return null if not found
Param outputs: Required. Tx output array
Param memoHeader: Optional. Memo prefix, application specific. If not passed in just return the raw opreturn script if found.
*/
function getMemoFromOpReturn (outputs, memoHeader) {
  for (let i = 0; i < outputs.length; i++) {
    const output = outputs[i]
    if (output.script) {
      // find opreturn
      const chunks = bjs.script.decompile(output.script)
      if (chunks[0] === bitcoinops.OP_RETURN) {
        if (memoHeader) {
          return getMemoFromScript(chunks[1], memoHeader)
        } else {
          return chunks[1]
        }
      }
    }
  }
  return null
}

/* getAllocationsFromTx
Purpose: Return allocation information for an asset transaction. Pass through to syscointx-js
Param tx: Required. bitcoinjs transaction
*/
function getAllocationsFromTx (tx) {
  return syscointx.getAllocationsFromTx(tx) || []
}

/* setTransactionMemo
Purpose: Return transaction with memo appended to the inside of the OP_RETURN output, return null if not found
Param rawHex: Required. Raw transaction hex
Param memoHeader: Required. Memo prefix, application specific
Param buffMemo: Required. Buffer memo to put into the transaction
*/
function setTransactionMemo (rawHex, memoHeader, buffMemo) {
  const txn = bjs.Transaction.fromHex(rawHex)
  let processed = false
  if (!buffMemo) {
    return txn
  }
  for (let key = 0; key < txn.outs.length; key++) {
    const out = txn.outs[key]
    const chunksIn = bjs.script.decompile(out.script)
    if (chunksIn[0] !== bjs.opcodes.OP_RETURN) {
      continue
    }
    txn.outs.splice(key, 1)
    const updatedData = [chunksIn[1], memoHeader, buffMemo]
    txn.addOutput(bjs.payments.embed({ data: [Buffer.concat(updatedData)] }).output, 0)
    processed = true
    break
  }
  if (processed) {
    const memoRet = getMemoFromOpReturn(txn.outs, memoHeader)
    if (!memoRet || !memoRet.equals(buffMemo)) {
      return null
    }
    return txn
  }
  const updatedData = [memoHeader, buffMemo]
  txn.addOutput(bjs.payments.embed({ data: [Buffer.concat(updatedData)] }).output, 0)
  const memoRet = getMemoFromOpReturn(txn.outs, memoHeader)
  if (!memoRet || !memoRet.equals(buffMemo)) {
    return null
  }
  return txn
}
function setPoDA (bjstx, blobData) {
  if (!blobData) {
    return
  }
  for (let key = 0; key < bjstx.outs.length; key++) {
    const out = bjstx.outs[key]
    const chunksIn = bjs.script.decompile(out.script)
    if (chunksIn[0] !== bjs.opcodes.OP_RETURN) {
      continue
    }
    bjstx.outs.splice(key, 1)
    const updatedData = [chunksIn[1], blobData]
    bjstx.addOutput(bjs.payments.embed({ data: [Buffer.concat(updatedData)] }).output, 0)
  }
}
function copyPSBT (psbt, networkIn, outputIndexToModify, outputScript) {
  const psbtNew = new bjs.Psbt({ network: networkIn })
  psbtNew.setVersion(psbt.version)
  const txInputs = psbt.txInputs
  for (let i = 0; i < txInputs.length; i++) {
    const input = txInputs[i]
    const dataInput = psbt.data.inputs[i]
    const inputObj = {
      hash: input.hash,
      index: input.index,
      sequence: input.sequence,
      bip32Derivation: dataInput.bip32Derivation || []
    }
    if (dataInput.nonWitnessUtxo) {
      inputObj.nonWitnessUtxo = dataInput.nonWitnessUtxo
    } else if (dataInput.witnessUtxo) {
      inputObj.witnessUtxo = dataInput.witnessUtxo
    }
    psbtNew.addInput(inputObj)
    dataInput.unknownKeyVals.forEach(unknownKeyVal => {
      psbtNew.addUnknownKeyValToInput(i, unknownKeyVal)
    })
  }
  const txOutputs = psbt.txOutputs
  for (let i = 0; i < txOutputs.length; i++) {
    const output = txOutputs[i]
    if (i === outputIndexToModify) {
      psbtNew.addOutput({
        script: outputScript,
        address: outputScript,
        value: output.value
      })
    } else {
      psbtNew.addOutput(output)
    }
  }
  return psbtNew
}

/* HDSigner
Purpose: Manage HD wallet and accounts, connects to SyscoinJS object
Param mnemonic: Required. Bip32 seed phrase
Param password: Optional. Encryption password for local storage on web clients
Param isTestnet: Optional. Is using testnet network?
Param networks: Optional. Defaults to Syscoin network. bitcoinjs-lib network settings for coin being used.
Param SLIP44: Optional. SLIP44 value for the coin, see: https://github.com/satoshilabs/slips/blob/master/slip-0044.md
Param pubTypes: Optional. Defaults to Syscoin ZPub/VPub types. Specific ZPub for bip84 and VPub for testnet
*/
function Signer (password, isTestnet, networks, SLIP44, pubTypes) {
  this.isTestnet = isTestnet || false
  this.networks = networks || syscoinNetworks
  this.password = password
  this.SLIP44 = this.isTestnet ? 1 : (SLIP44 !== undefined ? SLIP44 : syscoinSLIP44)
  if (!this.isTestnet) {
    this.network = this.networks.mainnet || syscoinNetworks.mainnet
  } else {
    this.network = this.networks.testnet || syscoinNetworks.testnet
  }

  this.pubTypes = pubTypes || syscoinZPubTypes
  this.accounts = new Map() // Map<number, BIP84Account>
  this.changeIndex = -1
  this.receivingIndex = -1
  this.accountIndex = 0
  this.setIndexFlag = 0
}

function HDSigner (mnemonicOrZprv, password, isTestnet, networks, SLIP44, pubTypes, bipNum) {
  this.Signer = new Signer(password, isTestnet, networks, SLIP44, pubTypes)
  this.mnemonicOrZprv = mnemonicOrZprv // can be mnemonic or zprv
  this.changeIndex = -1
  this.receivingIndex = -1
  this.importMethod = 'fromSeed'

  // Check if input is an extended private key (zprv/tprv/vprv/xprv)
  const isZprv = mnemonicOrZprv.startsWith('zprv') || mnemonicOrZprv.startsWith('tprv') ||
                 mnemonicOrZprv.startsWith('vprv') || mnemonicOrZprv.startsWith('xprv')

  if (isZprv) {
    this.importMethod = 'fromBase58'
    /* eslint new-cap: ["error", { "newIsCap": false }] */
    this.fromMnemonic = new BIP84.fromZPrv(
      mnemonicOrZprv,
      this.Signer.pubTypes,
      this.Signer.networks || syscoinNetworks
    )
  } else {
    /* eslint new-cap: ["error", { "newIsCap": false }] */
    this.fromMnemonic = new BIP84.fromMnemonic(mnemonicOrZprv, this.Signer.password, this.Signer.isTestnet, this.Signer.SLIP44, this.Signer.pubTypes, this.Signer.network)
  }

  // Always initialize with account 0 - state management handled by parent application
  this.createAccountAtIndex(0, bipNum, isZprv ? mnemonicOrZprv : undefined)
}

/* signPSBT
Purpose: Sign PSBT with XPUB information from HDSigner
Param psbt: Required. Partially signed transaction object
Param pathIn: Optional. Custom HD Bip32 path useful if signing from a specific address like a multisig
Returns: psbt from bitcoinjs-lib
*/
HDSigner.prototype.signPSBT = async function (psbt, pathIn) {
  const txInputs = psbt.txInputs
  const rootNode = this.getRootNode()

  for (let i = 0; i < txInputs.length; i++) {
    const dataInput = psbt.data.inputs[i]
    if (pathIn || (dataInput.unknownKeyVals && dataInput.unknownKeyVals.length > 1 && dataInput.unknownKeyVals[1].key.equals(Buffer.from('path')) && (!dataInput.bip32Derivation || dataInput.bip32Derivation.length === 0))) {
      const keyPath = pathIn || dataInput.unknownKeyVals[1].value.toString()
      // For zprv imports, we need to adjust the path by removing the account-level prefix
      const path = this.importMethod === 'fromBase58' ? keyPath.slice(13) : keyPath

      const pubkey = this.derivePubKey(path)
      const address = this.getAddressFromPubKey(pubkey)
      if (pubkey && (pathIn || dataInput.unknownKeyVals[0].value.toString() === address)) {
        dataInput.bip32Derivation = [
          {
            masterFingerprint: rootNode.fingerprint,
            path,
            pubkey
          }]
      }
    }
  }
  await psbt.signAllInputsHDAsync(rootNode)
  try {
    if (psbt.validateSignaturesOfAllInputs()) {
      psbt.finalizeAllInputs()
    }
  } catch (err) {
    console.log({ err })
  }
  return psbt
}

/* sign
Purpose: Create signing information based on HDSigner (if set) and call signPSBT() to actually sign
Param psbt: Required. PSBT object from bitcoinjs-lib
Returns: psbt from bitcoinjs-lib
*/
HDSigner.prototype.sign = async function (psbt, pathIn) {
  return await this.signPSBT(psbt, pathIn)
}

/* getMasterFingerprint
Purpose: Get master seed fingerprint used for signing with bitcoinjs-lib PSBT's
Returns: bip32 root master fingerprint
*/
HDSigner.prototype.getMasterFingerprint = function () {
  return this.getRootNode().fingerprint
}

HDSigner.prototype.deriveAccount = function (index, bipNum) {
  if (bipNum === undefined) {
    bipNum = 44
  }
  if (this.Signer.pubTypes === syscoinZPubTypes ||
    this.Signer.pubTypes === bitcoinZPubTypes) {
    bipNum = 84
  }
  return this.fromMnemonic.deriveAccount(index, bipNum)
}

/* setAccountIndex
Purpose: Set HD account based on accountIndex number passed in so HD indexes (change/receiving) will be updated accordingly to this account
Param accountIndex: Required. Account number to use
*/
Signer.prototype.setAccountIndex = function (accountIndex) {
  if (!this.accounts.has(accountIndex)) {
    console.log('Account does not exist, use createAccountAtIndex to create it first...')
    return
  }
  if (this.accountIndex !== accountIndex) {
    this.changeIndex = -1
    this.receivingIndex = -1
    this.accountIndex = accountIndex
  }
}

HDSigner.prototype.setAccountIndex = function (accountIndex) {
  this.Signer.setAccountIndex(accountIndex)
}

/* restore method removed - state management handled by parent application */

/* backup method removed - state management handled by parent application */

/* getNewChangeAddress
Purpose: Get new address for sending change to
Param skipIncrement: Optional. If we should not count the internal change index counter (if you want to get the same change address in the future)
Param bipNum: Optional. If you want the address derivated in regard of an specific bip number
Returns: string address used for change outputs
*/
Signer.prototype.getNewChangeAddress = async function (skipIncrement, bipNum) {
  if (this.changeIndex === -1 && this.blockbookURL) {
    let res = await fetchBackendAccount(this.blockbookURL, this.getAccountXpub(), 'tokens=used&details=tokens', true, this)
    if (res === null) {
      // try once more in case it fails for some reason
      res = await fetchBackendAccount(this.blockbookURL, this.getAccountXpub(), 'tokens=used&details=tokens', true, this)
      if (res === null) {
        throw new Error('Could not update XPUB change index')
      }
    }
  }
  const address = this.createAddress(this.changeIndex + 1, true, bipNum)
  if (address) {
    if (!skipIncrement) {
      this.changeIndex++
    }
    return address
  }

  return null
}
HDSigner.prototype.getNewChangeAddress = async function (skipIncrement, bipNum) {
  return this.Signer.getNewChangeAddress(skipIncrement, bipNum)
}

/* getNewReceivingAddress
Purpose: Get new address for sending coins to
Param skipIncrement: Optional. If we should not count the internal receiving index counter (if you want to get the same address in the future)
Param bipNum: Optional. If you want the address derivated in regard of an specific bip number
Returns: string address used for receiving outputs
*/
Signer.prototype.getNewReceivingAddress = async function (skipIncrement, bipNum) {
  if (this.receivingIndex === -1 && this.blockbookURL) {
    let res = await fetchBackendAccount(this.blockbookURL, this.getAccountXpub(), 'tokens=used&details=tokens', true, this)
    if (res === null) {
      // try once more in case it fails for some reason
      res = await fetchBackendAccount(this.blockbookURL, this.getAccountXpub(), 'tokens=used&details=tokens', true, this)
      if (res === null) {
        throw new Error('Could not update XPUB receiving index')
      }
    }
  }
  const address = this.createAddress(this.receivingIndex + 1, false, bipNum)
  if (address) {
    if (!skipIncrement) {
      this.receivingIndex++
    }
    return address
  }

  return null
}

HDSigner.prototype.getNewReceivingAddress = async function (skipIncrement, bipNum) {
  return this.Signer.getNewReceivingAddress(skipIncrement, bipNum)
}

HDSigner.prototype.createAccountAtIndex = function (index, bipNum, zprv) {
  if (index < 0 || index > 2147483647) { // BIP32 limit
    throw new Error('Invalid account index')
  }

  this.Signer.changeIndex = -1
  this.Signer.receivingIndex = -1

  const zPrivate = zprv || (this.mnemonicOrZprv.startsWith('zprv') || this.mnemonicOrZprv.startsWith('tprv') ||
                           this.mnemonicOrZprv.startsWith('vprv') || this.mnemonicOrZprv.startsWith('xprv'))
    ? this.mnemonicOrZprv
    : null

  const child = zPrivate || this.deriveAccount(index, bipNum)
  this.Signer.accountIndex = index
  /* eslint new-cap: ["error", { "newIsCap": false }] */
  this.Signer.accounts.set(index, new BIP84.fromZPrv(child, this.Signer.pubTypes, this.Signer.networks || syscoinNetworks))
  return index
}

HDSigner.prototype.createAccount = function (bipNum, zprv) {
  // Find the next index after the highest existing index
  let nextIndex = 0
  if (this.Signer.accounts.size > 0) {
    const maxIndex = Math.max(...this.Signer.accounts.keys())
    nextIndex = maxIndex + 1
  }
  return this.createAccountAtIndex(nextIndex, bipNum, zprv)
}

/* getAccountXpub
Purpose: Get XPUB for account, useful for public provider lookups based on XPUB accounts
Returns: string representing hex XPUB
*/
Signer.prototype.getAccountXpub = function () {
  const account = this.accounts.get(this.accountIndex)
  if (!account) {
    throw new Error(`Account ${this.accountIndex} not found`)
  }
  return account.getAccountPublicKey()
}
HDSigner.prototype.getAccountXpub = function () {
  return this.Signer.getAccountXpub()
}

/* setLatestIndexesFromXPubTokens
Purpose: Sets the change and receiving indexes from XPUB tokens passed in, from a backend provider response
Param tokens: Required. XPUB tokens from provider response to XPUB account details.
*/
Signer.prototype.setLatestIndexesFromXPubTokens = function (tokens) {
  this.setIndexFlag++
  // concurrency check make sure you don't execute this logic while it is already running as signer state is updated here
  // also in case there is some bug in the code that prevents it ever from being called because this.setIndexFlag = 0 doesn't happen we
  // stop worrying about the flag after it reached 100 attempts
  if (this.setIndexFlag > 1 && this.setIndexFlag < 100) {
    return
  }
  if (tokens) {
    tokens.forEach(token => {
      if (!token.transfers || !token.path) {
        return
      }
      const transfers = parseInt(token.transfers, 10)
      if (token.path && transfers > 0) {
        const splitPath = token.path.split('/')
        if (splitPath.length >= 6) {
          const change = parseInt(splitPath[4], 10)
          const index = parseInt(splitPath[5], 10)
          if (change === 1) {
            if (index > this.changeIndex) {
              this.changeIndex = index
            }
          } else if (index > this.receivingIndex) {
            this.receivingIndex = index
          }
        }
      }
    })
  }
  this.setIndexFlag = 0
}
HDSigner.prototype.setLatestIndexesFromXPubTokens = function (tokens) {
  this.Signer.setLatestIndexesFromXPubTokens(tokens)
}

/* getAccountIndexes
Purpose: Get all account indexes that have been created
Returns: Array of account indexes sorted numerically
*/
Signer.prototype.getAccountIndexes = function () {
  return Array.from(this.accounts.keys()).sort((a, b) => a - b)
}
HDSigner.prototype.getAccountIndexes = function () {
  return this.Signer.getAccountIndexes()
}
Signer.prototype.createAddress = function (addressIndex, isChange, bipNum) {
  if (bipNum === undefined) {
    bipNum = 44
  }
  if (this.pubTypes === syscoinZPubTypes ||
    this.pubTypes === bitcoinZPubTypes) {
    bipNum = 84
  }
  const account = this.accounts.get(this.accountIndex)
  if (!account) {
    throw new Error(`Account ${this.accountIndex} not found`)
  }
  return account.getAddress(addressIndex, isChange, bipNum)
}
HDSigner.prototype.createAddress = function (addressIndex, isChange, bipNum) {
  return this.Signer.createAddress(addressIndex, isChange, bipNum)
}
/* createKeypair
Purpose: Sets the change and receiving indexes from XPUB tokens passed in, from a backend provider response
Param addressIndex: Optional. HD path address index. If not provided uses the stored change/recv indexes for the last path prefix
Param isChange: Optional. HD path change marker
Returns: bitcoinjs-lib keypair derived from address index and change market
*/
HDSigner.prototype.createKeypair = function (addressIndex, isChange) {
  let recvIndex = isChange ? this.changeIndex : this.receivingIndex
  if (addressIndex) {
    recvIndex = addressIndex
  }
  const account = this.Signer.accounts.get(this.Signer.accountIndex)
  if (!account) {
    throw new Error(`Account ${this.Signer.accountIndex} not found`)
  }
  return account.getKeypair(recvIndex, isChange)
}

/* getHDPath
Purpose: Gets current HDPath from signer context
Param addressIndex: Optional. HD path address index. If not provided uses the stored change/recv indexes for the last path prefix
Param isChange: Optional. HD path change marker
Param bipNum: Optional. BIP number to use for HD path. Defaults to 44
Returns: bip32 path string
*/
Signer.prototype.getHDPath = function (addressIndex, isChange, bipNum) {
  const changeNum = isChange ? '1' : '0'
  if (bipNum === undefined) {
    bipNum = 44
  }
  if (this.pubTypes === syscoinZPubTypes ||
    this.pubTypes === bitcoinZPubTypes) {
    bipNum = 84
  }
  let recvIndex = isChange ? this.changeIndex : this.receivingIndex
  if (addressIndex) {
    recvIndex = addressIndex
  }
  const keypath = 'm/' + bipNum + "'/" + this.SLIP44 + "'/" + this.accountIndex + "'/" + changeNum + '/' + recvIndex
  return keypath
}
HDSigner.prototype.getHDPath = function (addressIndex, isChange, bipNum) {
  return this.Signer.getHDPath(addressIndex, isChange, bipNum)
}
/* getAddressFromKeypair
Purpose: Takes keypair and gives back a p2wpkh address
Param keyPair: Required. bitcoinjs-lib keypair
Returns: string p2wpkh address
*/
HDSigner.prototype.getAddressFromKeypair = function (keyPair) {
  const payment = bjs.payments.p2wpkh({
    pubkey: keyPair.publicKey,
    network: this.Signer.network
  })
  return payment.address
}
/* getAddressFromPubKey
Purpose: Takes pubkey and gives back a p2wpkh address
Param pubkey: Required. bitcoinjs-lib public key
Returns: string p2wpkh address
*/
Signer.prototype.getAddressFromPubKey = function (pubkey) {
  const payment = bjs.payments.p2wpkh({
    pubkey,
    network: this.network
  })
  return payment.address
}
HDSigner.prototype.getAddressFromPubKey = function (pubkey) {
  return this.Signer.getAddressFromPubKey(pubkey)
}

/* deriveKeypair
Purpose: Takes an HD path and derives keypair from it
Param keypath: Required. HD BIP32 path of key desired based on internal seed and network
Returns: bitcoinjs-lib keypair
*/
HDSigner.prototype.deriveKeypair = function (keypath) {
  const rootNode = this.getRootNode()
  const keyPair = rootNode.derivePath(keypath)
  return !keyPair ? null : keyPair
}

/* derivePubKey
Purpose: Takes an HD path and derives keypair from it, returns pubkey
Param keypath: Required. HD BIP32 path of key desired based on internal seed and network
Returns: bitcoinjs-lib pubkey
*/
HDSigner.prototype.derivePubKey = function (keypath) {
  const rootNode = this.getRootNode()
  const keyPair = rootNode.derivePath(keypath)
  return !keyPair ? null : keyPair.publicKey
}

/* getRootNode
Purpose: Returns HDSigner's BIP32 root node
Returns: BIP32 root node representing the seed
*/
HDSigner.prototype.getRootNode = function () {
  // For fromBase58 (extended private keys), create network with appropriate version bytes
  let network = this.Signer.network

  if (this.importMethod === 'fromBase58') {
    // Create a custom network with the zprv/zpub version bytes for parsing
    const baseNetwork = this.Signer.isTestnet ? bitcoinNetworks.testnet : bitcoinNetworks.mainnet
    const pubTypesAll = this.Signer.pubTypes || bitcoinZPubTypes
    const pubTypes = this.Signer.isTestnet ? pubTypesAll.testnet : pubTypesAll.mainnet

    network = {
      ...baseNetwork,
      bip32: {
        public: parseInt(pubTypes.vpub || pubTypes.zpub, 16),
        private: parseInt(pubTypes.vprv || pubTypes.zprv, 16)
      }
    }
  }

  return bjs.bip32[this.importMethod](
    this.fromMnemonic.seed || this.mnemonicOrZprv,
    network
  )
}
/* Override PSBT stuff so fee check isn't done as Syscoin Allocation burns outputs > inputs */
function scriptWitnessToWitnessStack (buffer) {
  let offset = 0
  function readSlice (n) {
    offset += n
    return buffer.slice(offset - n, offset)
  }
  function readVarInt () {
    const vi = varuint.decode(buffer, offset)
    offset += varuint.decode.bytes
    return vi
  }
  function readVarSlice () {
    return readSlice(readVarInt())
  }
  function readVector () {
    const count = readVarInt()
    const vector = []
    for (let i = 0; i < count; i++) vector.push(readVarSlice())
    return vector
  }
  return readVector()
}

function addNonWitnessTxCache (cache, input, inputIndex) {
  cache.__NON_WITNESS_UTXO_BUF_CACHE[inputIndex] = input.nonWitnessUtxo
  const tx = bjs.Transaction.fromBuffer(input.nonWitnessUtxo)
  cache.__NON_WITNESS_UTXO_TX_CACHE[inputIndex] = tx
  const self = cache
  const selfIndex = inputIndex
  delete input.nonWitnessUtxo
  Object.defineProperty(input, 'nonWitnessUtxo', {
    enumerable: true,
    get () {
      const buf = self.__NON_WITNESS_UTXO_BUF_CACHE[selfIndex]
      const txCache = self.__NON_WITNESS_UTXO_TX_CACHE[selfIndex]
      if (buf !== undefined) {
        return buf
      } else {
        const newBuf = txCache.toBuffer()
        self.__NON_WITNESS_UTXO_BUF_CACHE[selfIndex] = newBuf
        return newBuf
      }
    },
    set (data) {
      self.__NON_WITNESS_UTXO_BUF_CACHE[selfIndex] = data
    }
  })
}

function nonWitnessUtxoTxFromCache (cache, input, inputIndex) {
  const c = cache.__NON_WITNESS_UTXO_TX_CACHE
  if (!c[inputIndex]) {
    addNonWitnessTxCache(cache, input, inputIndex)
  }
  return c[inputIndex]
}

// override of psbt.js inputFinalizeGetAmts without fee < 0 check
function inputFinalizeGetAmts (inputs, tx, cache, mustFinalize) {
  let inputAmount = 0
  inputs.forEach((input, idx) => {
    if (mustFinalize && input.finalScriptSig) { tx.ins[idx].script = input.finalScriptSig }
    if (mustFinalize && input.finalScriptWitness) {
      tx.ins[idx].witness = scriptWitnessToWitnessStack(
        input.finalScriptWitness
      )
    }
    if (input.witnessUtxo) {
      inputAmount += input.witnessUtxo.value
    } else if (input.nonWitnessUtxo) {
      const nwTx = nonWitnessUtxoTxFromCache(cache, input, idx)
      const vout = tx.ins[idx].index
      const out = nwTx.outs[vout]
      inputAmount += out.value
    }
  })
  const outputAmount = tx.outs.reduce((total, o) => total + o.value, 0)
  const fee = inputAmount - outputAmount
  // SYSCOIN for burn allocations, this will be negative
  // if (fee < 0) {
  //  throw new Error('Outputs are spending more than Inputs');
  // }
  const bytes = tx.virtualSize()
  cache.__FEE = fee
  cache.__EXTRACTED_TX = tx
  cache.__FEE_RATE = Math.floor(fee / bytes)
}

function isFinalized (input) {
  return !!input.finalScriptSig || !!input.finalScriptWitness
}

function checkFees (psbt, cache, opts) {
  const feeRate = cache.__FEE_RATE || psbt.getFeeRate()
  const vsize = cache.__EXTRACTED_TX.virtualSize()
  const satoshis = feeRate * vsize
  if (feeRate >= opts.maximumFeeRate) {
    throw new Error(
      `Warning: You are paying around ${(satoshis / 1e8).toFixed(8)} in ` +
      `fees, which is ${feeRate} satoshi per byte for a transaction ` +
      `with a VSize of ${vsize} bytes (segwit counted as 0.25 byte per ` +
      'byte). Use setMaximumFeeRate method to raise your threshold, or ' +
      'pass true to the first arg of extractTransaction.'
    )
  }
}

function getTxCacheValue (key, name, inputs, c) {
  if (!inputs.every(isFinalized)) { throw new Error(`PSBT must be finalized to calculate ${name}`) }
  if (key === '__FEE_RATE' && c.__FEE_RATE) return c.__FEE_RATE
  if (key === '__FEE' && c.__FEE) return c.__FEE
  let tx
  let mustFinalize = true
  if (c.__EXTRACTED_TX) {
    tx = c.__EXTRACTED_TX
    mustFinalize = false
  } else {
    tx = c.__TX.clone()
  }
  inputFinalizeGetAmts(inputs, tx, c, mustFinalize)
  if (key === '__FEE_RATE') return c.__FEE_RATE
  else if (key === '__FEE') return c.__FEE
}

class SPSBT extends bjs.Psbt {
  getFeeRate () {
    return getTxCacheValue(
      '__FEE_RATE',
      'fee rate',
      this.data.inputs,
      this.__CACHE
    )
  }

  getFee () {
    return getTxCacheValue('__FEE', 'fee', this.data.inputs, this.__CACHE)
  }

  extractTransaction (disableFeeCheck, disableFinalize) {
    if (!disableFinalize && !this.data.inputs.every(isFinalized)) throw new Error('Not finalized')
    const c = this.__CACHE
    if (!disableFeeCheck) {
      checkFees(this, c, this.opts)
    }
    if (c.__EXTRACTED_TX) return c.__EXTRACTED_TX
    const tx = c.__TX.clone()
    inputFinalizeGetAmts(this.data.inputs, tx, c, true)
    return tx
  }

  static fromBase64 (data, opts = {}) {
    const buffer = Buffer.from(data, 'base64')
    const psbt = this.fromBuffer(buffer, opts)
    psbt.getFeeRate = SPSBT.prototype.getFeeRate
    psbt.getFee = SPSBT.prototype.getFee
    psbt.extractTransaction = SPSBT.prototype.extractTransaction
    return psbt
  }
}

function exportPsbtToJson (psbt, assetsMap) {
  const assetsMapToStringify = assetsMap || new Map()
  return { psbt: psbt.toBase64(), assets: JSON.stringify([...assetsMapToStringify]) }
}
function isBase64 (string) {
  try {
    const b = Buffer.from(string, 'base64')
    return b.toString('base64') === string
  } catch (err) {
    return false
  }
};

function repairBase64 (base64Str) {
  return base64Str.replace(/ /g, '+')
};

function importPsbtFromJson (jsonData, network) {
  // Validate JSON structure
  if (!jsonData || typeof jsonData !== 'object') {
    throw new Error('Invalid PSBT JSON: Expected object format from exportPsbtToJson()')
  }

  // Extract and validate the nested PSBT
  const { psbt: psbtBase64 } = jsonData
  if (!psbtBase64) {
    throw new Error('Invalid PSBT JSON: Missing psbt field')
  }

  // Apply base64 validation and repair here
  let repairedPsbt = psbtBase64
  if (!isBase64(repairedPsbt)) {
    // Try to repair common base64 issues
    repairedPsbt = repairBase64(repairedPsbt)
  }

  if (!isBase64(repairedPsbt)) {
    throw new Error('Invalid PSBT: Base64 encoding is corrupted and cannot be repaired')
  }

  return { psbt: SPSBT.fromBase64(jsonData.psbt, { network: network || syscoinNetworks.mainnet }), assets: new Map(JSON.parse(jsonData.assets)) }
}

bjs.Psbt = SPSBT
module.exports = {
  bitcoinXPubTypes,
  bitcoinZPubTypes,
  bitcoinNetworks,
  syscoinXPubTypes,
  syscoinZPubTypes,
  syscoinNetworks,
  syscoinSLIP44,
  bitcoinSLIP44,
  web3,
  HDSigner,
  fetchBackendUTXOS,
  fetchBackendUTXOs: fetchBackendUTXOS,
  fetchBackendSPVProof,
  sanitizeBlockbookUTXOs,
  fetchBackendAccount,
  fetchBackendAsset,
  fetchBackendListAssets,
  fetchBackendRawTx,
  fetchProviderInfo,
  fetchBackendBlock,
  fetchEstimateFee,
  sendRawTransaction,
  buildEthProof,
  signWithWIF,
  getMemoFromScript,
  getMemoFromOpReturn,
  getAllocationsFromTx,
  bitcoinjs: bjs,
  BN,
  setTransactionMemo,
  setPoDA,
  copyPSBT,
  importPsbtFromJson,
  exportPsbtToJson,
  retryWithBackoff
}
