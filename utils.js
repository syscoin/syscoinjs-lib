
const axios = require('axios')
const BN = require('bn.js')
const BIP84 = require('bip84')
const CryptoJS = require('crypto-js')
const bjs = require('bitcoinjs-lib')
const bitcoinops = require('bitcoin-ops')
const varuint = require('varuint-bitcoin')
const { VerifyProof, GetProof } = require('eth-proof')
const { Log } = require('eth-object')
const rlp = require('rlp')
const Web3 = require('web3')
const syscointx = require('syscointx-js')
const utxoLib = require('@trezor/utxo-lib')
const TrezorConnect = require('trezor-connect').default
const web3 = new Web3()
const bitcoinNetworks = { mainnet: bjs.networks.bitcoin, testnet: bjs.networks.testnet }
/* global localStorage */
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
let trezorInitialized = false
const DEFAULT_TREZOR_DOMAIN = 'https://connect.trezor.io/8/'

/* fetchNotarizationFromEndPoint
Purpose: Fetch notarization signature via axois from an endPoint URL, see spec for more info: https://github.com/syscoin/sips/blob/master/sip-0002.mediawiki
Param endPoint: Required. Fully qualified URL which will take transaction information and respond with a signature or error on denial
Param txHex: Required. Raw transaction hex
Returns: Returns JSON object in response, signature on success and error on denial of notarization
*/
async function fetchNotarizationFromEndPoint (endPoint, txHex) {
  try {
    const request = await axios.post(endPoint, { tx: txHex })
    if (request && request.data) {
      return request.data
    }
    return null
  } catch (e) {
    return e
  }
}

/* fetchBackendAsset
Purpose: Fetch asset information from backend Blockbook provider
Param backendURL: Required. Fully qualified URL for blockbook
Param assetGuid: Required. Asset to fetch
Returns: Returns JSON object in response, asset information object in JSON
*/
async function fetchBackendAsset (backendURL, assetGuid) {
  try {
    let blockbookURL = backendURL.slice()
    if (blockbookURL) {
      blockbookURL = blockbookURL.replace(/\/$/, '')
    }
    const request = await axios.get(blockbookURL + '/api/v2/asset/' + assetGuid + '?details=basic')
    if (request && request.data && request.data.asset) {
      return request.data.asset
    }
    return null
  } catch (e) {
    return e
  }
}

/* fetchBackendListAssets
Purpose: Fetch list of assets from backend Blockbook provider via a filter
Param backendURL: Required. Fully qualified URL for blockbook
Param filter: Required. Asset to fetch via filter, will filter contract or symbol fields
Returns: Returns JSON array in response, asset information objects in JSON
*/
async function fetchBackendListAssets (backendURL, filter) {
  try {
    let blockbookURL = backendURL.slice()
    if (blockbookURL) {
      blockbookURL = blockbookURL.replace(/\/$/, '')
    }
    const request = await axios.get(blockbookURL + '/api/v2/assets/' + filter)
    if (request && request.data && request.data.asset) {
      return request.data.asset
    }
    return null
  } catch (e) {
    return e
  }
}

/* fetchBackendSPVProof
Purpose: Fetch SPV Proof from backend Blockbook provider. To be used to create a proof for the NEVM bridge.
Param backendURL: Required. Fully qualified URL for blockbook
Param addressOrXpub: Required. An address or XPUB to fetch UTXO's for
Param options: Optional. Optional queries based on https://github.com/syscoin/blockbook/blob/master/docs/api.md#get-utxo
Returns: Returns JSON object in response, UTXO object array in JSON
*/
async function fetchBackendSPVProof (backendURL, txid) {
  try {
    let blockbookURL = backendURL.slice()
    if (blockbookURL) {
      blockbookURL = blockbookURL.replace(/\/$/, '')
    }
    const url = blockbookURL + '/api/v2/getspvproof/' + txid
    const request = await axios.get(url)
    if (request && request.data) {
      return request.data
    }
    return null
  } catch (e) {
    return e
  }
}

/* fetchBackendUTXOS
Purpose: Fetch UTXO's for an address or XPUB from backend Blockbook provider
Param backendURL: Required. Fully qualified URL for blockbook
Param addressOrXpub: Required. An address or XPUB to fetch UTXO's for
Param options: Optional. Optional queries based on https://github.com/syscoin/blockbook/blob/master/docs/api.md#get-utxo
Returns: Returns JSON object in response, UTXO object array in JSON
*/
async function fetchBackendUTXOS (backendURL, addressOrXpub, options) {
  try {
    let blockbookURL = backendURL.slice()
    if (blockbookURL) {
      blockbookURL = blockbookURL.replace(/\/$/, '')
    }
    let url = blockbookURL + '/api/v2/utxo/' + addressOrXpub
    if (options) {
      url += '?' + options
    }
    const request = await axios.get(url)
    if (request && request.data) {
      request.data.addressOrXpub = addressOrXpub
      return request.data
    }
    return null
  } catch (e) {
    return e
  }
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
  try {
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
    const request = await axios.get(url)
    if (request && request.data) {
      // if fetching xpub data
      if (xpub && request.data.tokens && mySignerObj) {
        mySignerObj.setLatestIndexesFromXPubTokens(request.data.tokens)
      }
      return request.data
    }
    return null
  } catch (e) {
    return e
  }
}

/* sendRawTransaction
Purpose: Send raw transaction to backend Blockbook provider to send to the network
Param backendURL: Required. Fully qualified URL for blockbook
Param txHex: Required. Raw transaction hex
Param mySignerObj: Optional. Signer object if you wish to update change/receiving indexes from backend provider through fetchBackendAccount()
Returns: Returns txid in response or error
*/
async function sendRawTransaction (backendURL, txHex, mySignerObj) {
  try {
    let blockbookURL = backendURL.slice()
    if (blockbookURL) {
      blockbookURL = blockbookURL.replace(/\/$/, '')
    }
    const request = await axios.post(blockbookURL + '/api/v2/sendtx/', txHex)
    if (request && request.data) {
      if (mySignerObj) {
        await fetchBackendAccount(blockbookURL, mySignerObj.getAccountXpub(), 'tokens=used&details=tokens', true, mySignerObj)
      }
      return request.data
    }
    return null
  } catch (e) {
    return e
  }
}

/* fetchBackendRawTx
Purpose: Get transaction from txid from backend Blockbook provider
Param backendURL: Required. Fully qualified URL for blockbook
Param txid: Required. Transaction ID to get information for
Returns: Returns JSON object in response, transaction object in JSON
*/
async function fetchBackendRawTx (backendURL, txid) {
  try {
    let blockbookURL = backendURL.slice()
    if (blockbookURL) {
      blockbookURL = blockbookURL.replace(/\/$/, '')
    }
    const request = await axios.get(blockbookURL + '/api/v2/tx/' + txid)
    if (request && request.data) {
      return request.data
    }
    return null
  } catch (e) {
    return e
  }
}

/* fetchProviderInfo
Purpose: Get prover info including blockbook and backend data
Returns: Returns JSON object in response, provider object in JSON
*/
async function fetchProviderInfo (backendURL) {
  try {
    let blockbookURL = backendURL.slice()
    if (blockbookURL) {
      blockbookURL = blockbookURL.replace(/\/$/, '')
    }
    const request = await axios.get(blockbookURL + '/api/v2')
    if (request && request.data) {
      return request.data
    }
    return null
  } catch (e) {
    return e
  }
}

/* fetchBackendBlock
Purpose: Get block from backend
Returns: Returns JSON object in response, block object in JSON
*/
async function fetchBackendBlock (backendURL, blockhash) {
  try {
    let blockbookURL = backendURL.slice()
    if (blockbookURL) {
      blockbookURL = blockbookURL.replace(/\/$/, '')
    }
    const request = await axios.get(blockbookURL + '/api/v2/block/' + blockhash)
    if (request && request.data) {
      return request.data
    }
    return null
  } catch (e) {
    return e
  }
}

/* fetchEstimateFee
Purpose: Get estimated fee from backend
Returns: Returns JSON object in response, fee object in JSON
Param blocks: Required. How many blocks to estimate fee for.
Param options: Optional. possible value conservative=true or false for conservative fee. Default is true.
Returns: Returns fee response in integer. Fee rate in satoshi per kilobytes.
*/
async function fetchEstimateFee (backendURL, blocks, options) {
  try {
    let blockbookURL = backendURL.slice()
    if (blockbookURL) {
      blockbookURL = blockbookURL.replace(/\/$/, '')
    }
    let url = blockbookURL + '/api/v2/estimatefee/' + blocks
    if (options) {
      url += '?' + options
    }
    const request = await axios.get(url)
    if (request && request.data && request.data.result) {
      let feeInt = parseInt(request.data.result)
      // if fee is 0 it usually means not enough data, so use min relay fee which is 1000 satoshi per kb in Core by default
      if (feeInt <= 0) {
        feeInt = 1000
      }
      return feeInt
    }
    return null
  } catch (e) {
    return e
  }
}

/* getNotarizationSignatures
Purpose: Get notarization signatures from a notary endpoint defined in the asset object, see spec for more info: https://github.com/syscoin/sips/blob/master/sip-0002.mediawiki
Param notaryAssets: Required. Asset objects that require notarization, fetch signatures via fetchNotarizationFromEndPoint()
Param txHex: Required. Signed transaction hex created from syscointx.createTransaction()/syscointx.createAssetTransaction()
Returns: boolean representing if notarization was done by acquiring a witness signature from notary.
*/
async function getNotarizationSignatures (notaryAssets, txHex) {
  let notarizationDone = false
  if (!notaryAssets) {
    return notarizationDone
  }
  for (const valueAssetObj of notaryAssets.values()) {
    if (!valueAssetObj.notarydetails || !valueAssetObj.notarydetails.endpoint) {
      console.log('getNotarizationSignatures: Invalid notary details: ' + JSON.stringify(valueAssetObj))
      continue
    }
    if (valueAssetObj.notarydone) {
      continue
    }
    const responseNotary = await fetchNotarizationFromEndPoint(valueAssetObj.notarydetails.endpoint.toString(), txHex)
    if (!responseNotary) {
      console.log('No response from notary')
    } else if (responseNotary.error) {
      console.log('could not notarize tx! error: ' + responseNotary.error.message)
    } else if (responseNotary.sigs) {
      for (let i = 0; i < responseNotary.sigs.length; i++) {
        const sigObj = responseNotary.sigs[i]
        const notarysig = Buffer.from(sigObj.sig, 'base64')
        const notaryAssetObj = notaryAssets.get(sigObj.asset)
        if (notaryAssetObj && notarysig.length === 65) {
          notaryAssetObj.notarysig = notarysig
          notaryAssetObj.notarydone = true
          notarizationDone = true
        }
      }
    } else {
      console.log('Unrecognized response from notary backend: ' + responseNotary)
    }
  }
  return notarizationDone
}

/* notarizePSBT
Purpose: Notarize Result object from syscointx.createTransaction()/syscointx.createAssetTransaction() if required by the assets in the inputs of the transaction
Param psbt: Required. The resulting PSBT object passed in which is assigned from syscointx.createTransaction()/syscointx.createAssetTransaction()
Param notaryAssets: Required. Asset objects require notarization, fetch signatures via fetchNotarizationFromEndPoint()
Returns: new result PSBT output notarized along with index
*/
async function notarizePSBT (psbt, notaryAssets, rawTx) {
  const notarizationDone = await getNotarizationSignatures(notaryAssets, rawTx)
  if (notarizationDone) {
    return syscointx.addNotarizationSignatures(psbt.version, notaryAssets, psbt.txOutputs)
  }
  return false
}

/* getAssetsRequiringNotarization
Purpose: Get assets from Result object assigned from syscointx.createTransaction()/syscointx.createAssetTransaction() that require notarization
Param assets: Required. Asset objects that are evaluated for notarization, and if they do require notarization then fetch signatures via fetchNotarizationFromEndPoint()
Returns: Asset map of objects requiring notarization or null if no notarization is required
*/
function getAssetsRequiringNotarization (psbt, assets) {
  if (!assets || !syscointx.utils.isAssetAllocationTx(psbt.version)) {
    return new Map()
  }
  const assetsInTx = syscointx.getAssetsFromOutputs(psbt.txOutputs)
  let foundNotary = false
  const assetsUsedInTxNeedingNotarization = new Map()
  assetsInTx.forEach((value, baseAssetID) => {
    if (assetsUsedInTxNeedingNotarization.has(baseAssetID)) {
      return new Map()
    }
    if (!assets.has(baseAssetID)) {
      console.log('Asset input not found in the UTXO assets map!')
      return new Map()
    }
    const valueAssetObj = assets.get(baseAssetID)
    if (valueAssetObj.notarydetails && valueAssetObj.notarydetails.endpoint && valueAssetObj.notarydetails.endpoint.length > 0) {
      assetsUsedInTxNeedingNotarization.set(baseAssetID, valueAssetObj)
      foundNotary = true
    }
  })
  return foundNotary ? assetsUsedInTxNeedingNotarization : new Map()
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
Param wif: Required. Private key in WIF format to sign inputs with
Param network: Required. bitcoinjs-lib Network object
Returns: psbt from bitcoinjs-lib
*/
async function signWithWIF (psbt, wif, network) {
  return await signPSBTWithWIF(psbt, wif, network)
}
/* buildEthProof
Purpose: Build Ethereum SPV proof using eth-proof library
Param assetOpts: Required. Object containing web3url and ethtxid fields populated
Returns: Returns JSON object in response, SPV proof object in JSON
*/
async function buildEthProof (assetOpts) {
  const ethProof = new GetProof(assetOpts.web3url)
  const ERC20ManagerTestnet = '0xA738a563F9ecb55e0b2245D1e9E380f0fE455ea1'
  const ERC20ManagerMainnet = '0xA738a563F9ecb55e0b2245D1e9E380f0fE455ea1'
  const tokenFreezeFunction = '7ca654cf9212e4c3cf0164a529dd6159fc71113f867d0b09fdeb10aa65780732' // token freeze function signature
  try {
    let result = await ethProof.transactionProof(assetOpts.ethtxid)
    const txObj = await VerifyProof.getTxFromTxProofAt(result.txProof, result.txIndex)
    const txvalue = txObj.hex.substring(2) // remove hex prefix
    const inputData = txObj.data.slice(4).toString('hex') // get only data without function selector
    const paramTxResults = web3.eth.abi.decodeParameters([{
      type: 'uint',
      name: 'value'
    }, {
      type: 'uint32',
      name: 'assetGUID'
    }, {
      type: 'string',
      name: 'syscoinAddress'
    }], inputData)
    const assetguid = paramTxResults.assetGUID
    const destinationaddress = paramTxResults.syscoinAddress
    const txroot = rlp.encode(result.header[4]).toString('hex')
    const txparentnodes = rlp.encode(result.txProof).toString('hex')
    const txpath = rlp.encode(result.txIndex).toString('hex')
    const blocknumber = parseInt(result.header[8].toString('hex'), 16)
    const blockhash = VerifyProof.getBlockHashFromHeader(result.header)
    const receiptroot = rlp.encode(result.header[5]).toString('hex')
    result = await ethProof.receiptProof(assetOpts.ethtxid)
    const receiptparentnodes = rlp.encode(result.receiptProof).toString('hex')
    const testnet = assetOpts.web3url.indexOf('mainnet') === -1
    const ERC20Manager = (testnet ? ERC20ManagerTestnet : ERC20ManagerMainnet).toLowerCase()
    const txReceipt = await VerifyProof.getReceiptFromReceiptProofAt(result.receiptProof, result.txIndex)
    const receiptvalue = txReceipt.hex.substring(2) // remove hex prefix
    let amount = 0
    for (let i = 0; i < txReceipt.setOfLogs.length; i++) {
      const log = Log.fromRaw(txReceipt.setOfLogs[i]).toObject()
      if (log.topics && log.topics.length !== 1) {
        continue
      }
      // event TokenFreeze(address freezer, uint value, uint precisions);
      if (log.topics[0].toString('hex').toLowerCase() === tokenFreezeFunction && log.address.toLowerCase() === ERC20Manager) {
        const paramResults = web3.eth.abi.decodeParameters([{
          type: 'uint32',
          name: 'assetGUID'
        }, {
          type: 'address',
          name: 'freezer'
        }, {
          type: 'uint',
          name: 'value'
        }, {
          type: 'uint',
          name: 'precisions'
        }], log.data)
        const precisions = new web3.utils.BN(paramResults.precisions)
        const value = new web3.utils.BN(paramResults.value)

        // get precision
        const erc20precision = precisions.maskn(32)
        const sptprecision = precisions.shrn(32).maskn(8)
        // local precision can range between 0 and 8 decimal places, so it should fit within a CAmount
        // we pad zero's if erc20's precision is less than ours so we can accurately get the whole value of the amount transferred
        if (sptprecision.gt(erc20precision)) {
          amount = value.mul(new web3.utils.BN(10).pow(sptprecision.sub(erc20precision)))
          // ensure we truncate decimals to fit within int64 if erc20's precision is more than our asset precision
        } else if (sptprecision.lt(erc20precision)) {
          amount = value.div(new web3.utils.BN(10).pow(erc20precision.sub(sptprecision)))
        } else {
          amount = value
        }
        break
      }
    }
    return { ethtxid: assetOpts.ethtxid.substring(2), blockhash, assetguid, destinationaddress, amount, txvalue, txroot, txparentnodes, txpath, blocknumber, receiptvalue, receiptroot, receiptparentnodes }
  } catch (e) {
    return e
  }
}

/* sanitizeBlockbookUTXOs
Purpose: Sanitize backend provider UTXO objects to be useful for this library
Param sysFromXpubOrAddress: Required. The XPUB or address that was called to fetch UTXOs
Param utxoObj: Required. Backend provider UTXO JSON object to be sanitized
Param network: Optional. Defaults to Syscoin Mainnet. Network to be used to create address for notary and auxfee payout address if those features exist for the asset
Param txOpts: Optional. If its passed in we use assetWhiteList field of options to skip over (if assetWhiteList is null) UTXO's if they use notarization for an asset that is not a part of assetMap
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
      if (asset.pubData) {
        assetObj.pubdata = Buffer.from(JSON.stringify(asset.pubData))
      }
      if (asset.notaryKeyID) {
        assetObj.notarykeyid = Buffer.from(asset.notaryKeyID, 'base64')
        network = network || syscoinNetworks.mainnet
        assetObj.notaryaddress = bjs.payments.p2wpkh({ hash: assetObj.notarykeyid, network: network }).address
        // in unit tests notarySig may be provided
        if (asset.notarySig) {
          assetObj.notarysig = Buffer.from(asset.notarySig, 'base64')
        } else {
          // prefill in this likely case where notarySig isn't provided
          assetObj.notarysig = Buffer.alloc(65, 0)
        }
      }
      if (asset.notaryDetails) {
        assetObj.notarydetails = {}
        if (asset.notaryDetails.endPoint) {
          assetObj.notarydetails.endpoint = Buffer.from(asset.notaryDetails.endPoint, 'base64')
        } else {
          assetObj.notarydetails.endpoint = Buffer.from('')
        }
        assetObj.notarydetails.instanttransfers = asset.notaryDetails.instantTransfers
        assetObj.notarydetails.hdrequired = asset.notaryDetails.HDRequired
      }
      if (asset.auxFeeDetails) {
        assetObj.auxfeedetails = {}
        if (asset.auxFeeDetails.auxFeeKeyID) {
          assetObj.auxfeedetails.auxfeekeyid = Buffer.from(asset.auxFeeDetails.auxFeeKeyID, 'base64')
          assetObj.auxfeedetails.auxfeeaddress = bjs.payments.p2wpkh({ hash: assetObj.auxfeedetails.auxfeekeyid, network: syscoinNetworks.testnet }).address
        } else {
          assetObj.auxfeedetails.auxfeekeyid = Buffer.from('')
        }
        assetObj.auxfeedetails.auxfees = asset.auxFeeDetails.auxFees
      }
      if (asset.updateCapabilityFlags) {
        assetObj.updatecapabilityflags = asset.updateCapabilityFlags
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
        const baseAssetID = getBaseAssetID(utxo.assetInfo.assetGuid)
        newUtxo.assetInfo = { assetGuid: utxo.assetInfo.assetGuid, value: new BN(utxo.assetInfo.value) }
        const assetObj = sanitizedUtxos.assets.get(baseAssetID)
        // sanity check to ensure sanitizedUtxos.assets has all of the assets being added to UTXO that are assets
        if (!assetObj) {
          return
        }
        // not sending this asset (assetMap) and assetWhiteList option if set with this asset will skip this check, by default this check is done and inputs will be skipped if they are notary asset inputs and user is not sending those assets (used as gas to fulfill requested output amount of SYS)
        if ((!assetMap || !assetMap.has(utxo.assetInfo.assetGuid)) && (txOpts.assetWhiteList && !txOpts.assetWhiteList.has(utxo.assetInfo.assetGuid) && !txOpts.assetWhiteList.has(getBaseAssetID(utxo.assetInfo.assetGuid)))) {
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

/* isBech32
Purpose: Return a boolean if a given sys address is a bech32 address
Param address: Required. Address to check
*/
function isBech32 (address) {
  try {
    utxoLib.address.fromBech32(address)
    return true
  } catch (e) {
    return false
  }
}

/* isScriptHash
Purpose: Return  a boolean if a given sys address is a script hash accordingly to the syscoinNetwork selected
Param address: Required. Address to verify
Param networkInfo: Required. Network information to verify
*/
function isScriptHash (address, networkInfo) {
  if (!isBech32(address)) {
    const decoded = utxoLib.address.fromBase58Check(address)
    if (decoded.version === networkInfo.pubKeyHash) {
      return false
    }
    if (decoded.version === networkInfo.scriptHash) {
      return true
    }
  } else {
    const decoded = utxoLib.address.fromBech32(address)
    if (decoded.data.length === 20) {
      return false
    }
    if (decoded.data.length === 32) {
      return true
    }
  }
  throw new Error('isScriptHash: Unknown address type')
};

/* convertToAddressNFormat
Purpose: Return path in addressN format
Param path: Required derivation path
*/
function convertToAddressNFormat (path) {
  const pathArray = path.replace(/'/g, '').split('/')

  pathArray.shift()

  const addressN = []

  for (const index in pathArray) {
    if (Number(index) <= 2 && Number(index) >= 0) {
      addressN[Number(index)] = Number(pathArray[index]) | 0x80000000
    } else {
      addressN[Number(index)] = Number(pathArray[index])
    }
  }

  return addressN
};

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
  this.SLIP44 = this.isTestnet ? 1 : SLIP44 || syscoinSLIP44 // 1 is testnet for all coins,
  if (!this.isTestnet) {
    this.network = this.networks.mainnet || syscoinNetworks.mainnet
  } else {
    this.network = this.networks.testnet || syscoinNetworks.testnet
  }

  this.pubTypes = pubTypes || syscoinZPubTypes
  this.accounts = [] // length serialized
  this.changeIndex = -1
  this.receivingIndex = -1
  this.accountIndex = 0
}
function TrezorSigner (password, isTestnet, networks, SLIP44, pubTypes, connectSrc, disableLazyLoad) {
  try {
    if (!trezorInitialized) {
      connectSrc = connectSrc || DEFAULT_TREZOR_DOMAIN
      const lazyLoad = !disableLazyLoad
      TrezorConnect.init({
        connectSrc: connectSrc,
        lazyLoad: lazyLoad, // this param will prevent iframe injection until TrezorConnect.method will be called
        manifest: {
          email: 'jsidhu@blockchainfoundry.co',
          appUrl: 'https://syscoin.org/'
        }
      })
      trezorInitialized = true // Trezor should be initialized on first run only
    }
  } catch (e) {
    throw new Error('TrezorSigner should be called only from browser context: ' + e)
  }
  this.Signer = new Signer(password, isTestnet, networks, SLIP44, pubTypes)
  this.restore(this.Signer.password)
}
function HDSigner (mnemonic, password, isTestnet, networks, SLIP44, pubTypes) {
  this.Signer = new Signer(password, isTestnet, networks, SLIP44, pubTypes)
  this.mnemonic = mnemonic // serialized

  /* eslint new-cap: ["error", { "newIsCap": false }] */
  this.fromSeed = new BIP84.fromSeed(mnemonic, this.Signer.password, this.Signer.isTestnet, this.Signer.SLIP44, this.Signer.pubTypes, this.Signer.network)
  // try to restore, if it does not succeed then initialize from scratch
  if (!this.Signer.password || !this.restore(this.Signer.password)) {
    this.createAccount()
  }
}

/* signPSBT
Purpose: Sign PSBT with XPUB information from HDSigner
Param psbt: Required. Partially signed transaction object
Param pathIn: Optional. Custom HD Bip32 path useful if signing from a specific address like a multisig
Returns: psbt from bitcoinjs-lib
*/
HDSigner.prototype.signPSBT = async function (psbt, pathIn) {
  const txInputs = psbt.txInputs
  const fp = this.getMasterFingerprint()
  for (let i = 0; i < txInputs.length; i++) {
    const dataInput = psbt.data.inputs[i]
    if (pathIn || (dataInput.unknownKeyVals && dataInput.unknownKeyVals.length > 1 && dataInput.unknownKeyVals[1].key.equals(Buffer.from('path')) && (!dataInput.bip32Derivation || dataInput.bip32Derivation.length === 0))) {
      const path = pathIn || dataInput.unknownKeyVals[1].value.toString()
      const pubkey = this.derivePubKey(path)
      const address = this.getAddressFromPubKey(pubkey)
      if (pubkey && (pathIn || dataInput.unknownKeyVals[0].value.toString() === address)) {
        dataInput.bip32Derivation = [
          {
            masterFingerprint: fp,
            path: path,
            pubkey: pubkey
          }]
      }
    }
  }
  await psbt.signAllInputsHDAsync(this.getRootNode())
  try {
    if (psbt.validateSignaturesOfAllInputs()) {
      psbt.finalizeAllInputs()
    }
  } catch (err) {
  }
  return psbt
}

/* convertToTrezorFormat
Purpose: Convert syscoin PSBT to Trezor format
Param psbt: Required. Partially signed transaction object
Returns: trezor params to signTransaction
*/
TrezorSigner.prototype.convertToTrezorFormat = function (psbt, pathIn) {
  const trezortx = {}

  const coin = this.Signer.SLIP44 === syscoinSLIP44 ? 'sys' : 'btc'
  trezortx.coin = coin
  trezortx.version = psbt.version
  trezortx.inputs = []
  trezortx.outputs = []

  for (let i = 0; i < psbt.txInputs.length; i++) {
    const scriptTypes = psbt.getInputType(i)
    const input = psbt.txInputs[i]
    const inputItem = {}
    inputItem.prev_index = input.index
    inputItem.prev_hash = input.hash.reverse().toString('hex')
    if (input.sequence) inputItem.sequence = input.sequence
    const dataInput = psbt.data.inputs[i]
    let path = ''
    if (pathIn || (dataInput.unknownKeyVals && dataInput.unknownKeyVals.length > 1 &&
      dataInput.unknownKeyVals[1].key.equals(Buffer.from('path')) &&
      (!dataInput.bip32Derivation || dataInput.bip32Derivation.length === 0))) {
      path = pathIn || (dataInput.unknownKeyVals[1].value.toString())
      inputItem.address_n = convertToAddressNFormat(path)
    }
    switch (scriptTypes) {
      case 'multisig':
        inputItem.script_type = 'SPENDMULTISIG'
        break
      case 'witnesspubkeyhash':
        inputItem.script_type = 'SPENDWITNESS'
        break
      default:
        inputItem.script_type = isP2WSHScript(psbt.data.inputs[i].witnessUtxo.script) ? 'SPENDP2SHWITNESS' : 'SPENDADDRESS'
        break
    }
    trezortx.inputs.push(inputItem)
  }

  for (let i = 0; i < psbt.txOutputs.length; i++) {
    const output = psbt.txOutputs[i]
    const outputItem = {}
    const chunks = bjs.script.decompile(output.script)
    outputItem.amount = output.value.toString()
    if (chunks[0] === bitcoinops.OP_RETURN) {
      outputItem.script_type = 'PAYTOOPRETURN'
      outputItem.op_return_data = chunks[1].toString('hex')
    } else {
      if (isBech32(output.address)) {
        if (output.script.length === 34 &&
          output.script[0] === 0 &&
          output.script[1] === 0x20) {
          outputItem.script_type = 'PAYTOP2SHWITNESS'
        } else {
          outputItem.script_type = 'PAYTOWITNESS'
        }
      } else {
        outputItem.script_type = isScriptHash(output.address, this.network) ? 'PAYTOSCRIPTHASH' : 'PAYTOADDRESS'
      }
      outputItem.address = output.address
    }
    trezortx.outputs.push(outputItem)
  }
  return trezortx
}

/* sign
Purpose: Create signing information based on Trezor format
Param psbt: Required. PSBT object from bitcoinjs-lib
Returns: trezortx or txid
*/
TrezorSigner.prototype.sign = async function (psbt, pathIn) {
  if (psbt.txInputs.length <= 0 || psbt.txOutputs.length <= 0 || psbt.version === undefined) {
    throw new Error('PSBT object is lacking information')
  }
  const trezorTx = this.convertToTrezorFormat(psbt, pathIn)
  const response = await TrezorConnect.signTransaction(trezorTx)
  if (response.success === true) {
    const tx = bjs.Transaction.fromHex(response.payload.serializedTx)
    for (const i of range(psbt.data.inputs.length)) {
      if (tx.ins[i].witness === (undefined || null)) {
        throw new Error('Please move your funds to a Segwit address: https://wiki.trezor.io/Account')
      }
      const partialSig = [
        {
          pubkey: tx.ins[i].witness[1],
          signature: tx.ins[i].witness[0]
        }
      ]
      psbt.updateInput(i, { partialSig })
    }
    try {
      if (psbt.validateSignaturesOfAllInputs()) {
        psbt.finalizeAllInputs()
      }
    } catch (err) {
      console.log(err)
    }
    return psbt
  } else {
    throw new Error('Trezor sign failed: ' + response.payload.error)
  }
}

/* sign
Purpose: Create signing information based on HDSigner (if set) and call signPSBT() to actually sign, as well as detect notarization and apply it as required.
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
  return bjs.bip32.fromSeed(this.fromSeed.seed, this.Signer.network).fingerprint
}

/* deriveAccount
Purpose: Derive HD account based on index number passed in
Param index: Required. Account number to derive
Returns: bip32 node for derived account
*/
TrezorSigner.prototype.deriveAccount = async function (index) {
  let bipNum = 44
  if (this.Signer.pubTypes === syscoinZPubTypes ||
    this.Signer.pubTypes === bitcoinZPubTypes) {
    bipNum = 84
  }
  const coin = this.Signer.SLIP44 === syscoinSLIP44 ? 'sys' : 'btc'
  const keypath = 'm/' + bipNum + "'/" + this.Signer.SLIP44 + "'/" + index + "'"
  if (this.Signer.isTestnet) {
    throw new Error(
      'Cant use TrezorSigner on testnet .'
    )
  }

  return new Promise((resolve, reject) => {
    TrezorConnect.getAccountInfo({
      path: keypath,
      coin: coin
    })
      .then((response) => {
        if (response.success) {
          resolve(response.payload)
        }
        reject(response.payload.error)
      })
      .catch((error) => {
        console.error('TrezorConnectError', error)
        reject(error)
      })
  })
}

HDSigner.prototype.deriveAccount = function (index) {
  let bipNum = 44
  if (this.Signer.pubTypes === syscoinZPubTypes ||
    this.Signer.pubTypes === bitcoinZPubTypes) {
    bipNum = 84
  }
  return this.fromSeed.deriveAccount(index, bipNum)
}

/* setAccountIndex
Purpose: Set HD account based on accountIndex number passed in so HD indexes (change/receiving) will be updated accordingly to this account
Param accountIndex: Required. Account number to use
*/
Signer.prototype.setAccountIndex = function (accountIndex) {
  if (accountIndex > this.accounts.length) {
    console.log('Account does not exist, use createAccount to create it first...')
    return
  }
  this.accountIndex = accountIndex
  this.changeIndex = -1
  this.receivingIndex = -1
}
TrezorSigner.prototype.setAccountIndex = function (accountIndex) {
  this.Signer.setAccountIndex(accountIndex)
}
HDSigner.prototype.setAccountIndex = function (accountIndex) {
  this.Signer.setAccountIndex(accountIndex)
}

/* restore
Purpose: Restore on load from local storage and decrypt data to de-serialize objects
Param password: Required. Decryption password to unlock seed phrase
Returns: boolean on success for fail of restore
*/
TrezorSigner.prototype.restore = function (password) {
  let browserStorage = (typeof localStorage === 'undefined' || localStorage === null) ? null : localStorage
  if (!browserStorage) {
    const LocalStorage = require('node-localstorage').LocalStorage
    browserStorage = new LocalStorage('./scratch')
  }
  const key = this.Signer.network.bech32 + '_trezorsigner'
  const ciphertext = browserStorage.getItem(key)
  if (ciphertext === null) {
    return false
  }
  const bytes = CryptoJS.AES.decrypt(ciphertext, password)
  if (!bytes || bytes.length === 0) {
    return false
  }
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
  // sanity checks
  if (this.Signer.accountIndex > 1000) {
    return false
  }

  this.Signer.changeIndex = -1
  this.Signer.receivingIndex = -1
  this.Signer.accountIndex = decryptedData.numXpubs
  for (let i = 0; i <= this.Signer.accountIndex; i++) {
    this.Signer.accounts.push(new BIP84.fromZPub(decryptedData.xpubArr[i], this.Signer.pubTypes, this.Signer.networks))
    if (this.Signer.accounts[i].getAccountPublicKey() !== decryptedData.xpubArr[i]) {
      throw new Error('Account public key mismatch,check pubtypes and networks being used')
    }
  }
  return true
}
HDSigner.prototype.restore = function (password) {
  let browserStorage = (typeof localStorage === 'undefined' || localStorage === null) ? null : localStorage
  if (!browserStorage) {
    const LocalStorage = require('node-localstorage').LocalStorage
    browserStorage = new LocalStorage('./scratch')
  }
  const key = this.Signer.network.bech32 + '_hdsigner'
  const ciphertext = browserStorage.getItem(key)
  if (ciphertext === null) {
    return false
  }
  const bytes = CryptoJS.AES.decrypt(ciphertext, password)
  if (!bytes || bytes.length === 0) {
    return false
  }
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
  this.mnemonic = decryptedData.mnemonic
  const numAccounts = decryptedData.numAccounts
  // sanity checks
  if (this.Signer.accountIndex > 1000) {
    return false
  }
  this.Signer.accounts = []
  this.Signer.changeIndex = -1
  this.Signer.receivingIndex = -1
  this.Signer.accountIndex = 0
  for (let i = 0; i <= numAccounts; i++) {
    const child = this.deriveAccount(i)
    /* eslint new-cap: ["error", { "newIsCap": false }] */
    this.Signer.accounts.push(new BIP84.fromZPrv(child, this.Signer.pubTypes, this.Signer.networks))
  }
  return true
}

/* backup
Purpose: Encrypt to password and backup to local storage for persistence
*/
TrezorSigner.prototype.backup = function () {
  let browserStorage = (typeof localStorage === 'undefined' || localStorage === null) ? null : localStorage
  if (!this.Signer.password) { return }
  if (!browserStorage) {
    const LocalStorage = require('node-localstorage').LocalStorage
    browserStorage = new LocalStorage('./scratch')
  }
  const key = this.Signer.network.bech32 + '_trezorsigner'
  const xpubs = []
  for (let i = 0; i < this.Signer.accounts.length; i++) {
    xpubs[i] = this.Signer.accounts[i].getAccountPublicKey()
  }
  const obj = { xpubArr: xpubs, numXpubs: this.Signer.accounts.length }
  const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(obj), this.Signer.password).toString()
  browserStorage.setItem(key, ciphertext)
}
HDSigner.prototype.backup = function () {
  let browserStorage = (typeof localStorage === 'undefined' || localStorage === null) ? null : localStorage
  if (!this.Signer.password) { return }
  if (!browserStorage) {
    const LocalStorage = require('node-localstorage').LocalStorage
    browserStorage = new LocalStorage('./scratch')
  }
  const key = this.Signer.network.bech32 + '_hdsigner'
  const obj = { mnemonic: this.mnemonic, numAccounts: this.Signer.accounts.length }
  const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(obj), this.Signer.password).toString()
  browserStorage.setItem(key, ciphertext)
}

/* getNewChangeAddress
Purpose: Get new address for sending change to
Param skipIncrement: Optional. If we should not count the internal change index counter (if you want to get the same change address in the future)
Returns: string address used for change outputs
*/
TrezorSigner.prototype.getNewChangeAddress = async function (skipIncrement) {
  if (this.Signer.changeIndex === -1 && this.blockbookURL) {
    await fetchBackendAccount(this.blockbookURL, this.getAccountXpub(), 'tokens=used&details=tokens', true, this)
  }
  const address = this.createAddress(this.Signer.changeIndex + 1, true)
  if (address) {
    if (!skipIncrement) {
      this.Signer.changeIndex++
    }
    return address
  }

  return null
}

HDSigner.prototype.getNewChangeAddress = async function (skipIncrement) {
  if (this.Signer.changeIndex === -1 && this.blockbookURL) {
    await fetchBackendAccount(this.blockbookURL, this.getAccountXpub(), 'tokens=used&details=tokens', true, this)
  }
  const address = this.createAddress(this.Signer.changeIndex + 1, true)
  if (address) {
    if (!skipIncrement) {
      this.Signer.changeIndex++
    }
    return address
  }

  return null
}

/* getNewReceivingAddress
Purpose: Get new address for sending coins to
Param skipIncrement: Optional. If we should not count the internal receiving index counter (if you want to get the same address in the future)
Returns: string address used for receiving outputs
*/
TrezorSigner.prototype.getNewReceivingAddress = async function (skipIncrement) {
  if (this.Signer.receivingIndex === -1 && this.blockbookURL) {
    await fetchBackendAccount(this.blockbookURL, this.getAccountXpub(), 'tokens=used&details=tokens', true, this)
  }
  const address = this.createAddress(this.Signer.receivingIndex + 1, false)
  if (address) {
    if (!skipIncrement) {
      this.Signer.receivingIndex++
    }
    return address
  }

  return null
}
HDSigner.prototype.getNewReceivingAddress = async function (skipIncrement) {
  if (this.Signer.receivingIndex === -1 && this.blockbookURL) {
    await fetchBackendAccount(this.blockbookURL, this.getAccountXpub(), 'tokens=used&details=tokens', true, this)
  }
  const address = this.createAddress(this.Signer.receivingIndex + 1, false)
  if (address) {
    if (!skipIncrement) {
      this.Signer.receivingIndex++
    }
    return address
  }

  return null
}

/* createAccount
Purpose: Create and derive a new account
Returns: Account index of new account
*/
TrezorSigner.prototype.createAccount = async function () {
  this.Signer.changeIndex = -1
  this.Signer.receivingIndex = -1
  return new Promise((resolve, reject) => {
    this.deriveAccount(this.Signer.accounts.length).then(child => {
      this.Signer.accountIndex = this.Signer.accounts.length
      this.Signer.accounts.push(new BIP84.fromZPub(child.descriptor, this.Signer.pubTypes, this.Signer.networks))
      this.backup()
      resolve(this.Signer.accountIndex)
    }).catch(err => {
      console.error(err)
      reject(err)
    }
    )
  })
}

HDSigner.prototype.createAccount = function () {
  this.Signer.changeIndex = -1
  this.Signer.receivingIndex = -1
  const child = this.deriveAccount(this.Signer.accounts.length)
  this.Signer.accountIndex = this.Signer.accounts.length
  /* eslint new-cap: ["error", { "newIsCap": false }] */
  this.Signer.accounts.push(new BIP84.fromZPrv(child, this.Signer.pubTypes, this.Signer.networks))
  this.backup()
  return this.Signer.accountIndex
}

/* getAccountXpub
Purpose: Get XPUB for account, useful for public provider lookups based on XPUB accounts
Returns: string representing hex XPUB
*/
TrezorSigner.prototype.getAccountXpub = function () {
  return this.Signer.accounts[this.Signer.accountIndex].getAccountPublicKey()
}
HDSigner.prototype.getAccountXpub = function () {
  return this.Signer.accounts[this.Signer.accountIndex].getAccountPublicKey()
}

/* setLatestIndexesFromXPubTokens
Purpose: Sets the change and receiving indexes from XPUB tokens passed in, from a backend provider response
Param tokens: Required. XPUB tokens from provider response to XPUB account details.
*/
Signer.prototype.setLatestIndexesFromXPubTokens = function (tokens) {
  if (tokens) {
    tokens.forEach(token => {
      if (token.path) {
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
}
TrezorSigner.prototype.setLatestIndexesFromXPubTokens = function (tokens) {
  this.Signer.setLatestIndexesFromXPubTokens(tokens)
}
HDSigner.prototype.setLatestIndexesFromXPubTokens = function (tokens) {
  this.Signer.setLatestIndexesFromXPubTokens(tokens)
}

TrezorSigner.prototype.createAddress = function (addressIndex, isChange) {
  let bipNum = 44
  if (this.Signer.pubTypes === syscoinZPubTypes ||
    this.Signer.pubTypes === bitcoinZPubTypes) {
    bipNum = 84
  }
  return this.Signer.accounts[this.Signer.accountIndex].getAddress(addressIndex, isChange, bipNum)
}
HDSigner.prototype.createAddress = function (addressIndex, isChange) {
  let bipNum = 44
  if (this.Signer.pubTypes === syscoinZPubTypes ||
    this.Signer.pubTypes === bitcoinZPubTypes) {
    bipNum = 84
  }
  return this.Signer.accounts[this.Signer.accountIndex].getAddress(addressIndex, isChange, bipNum)
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
  return this.Signer.accounts[this.Signer.accountIndex].getKeypair(recvIndex, isChange)
}

/* getHDPath
Purpose: Gets current HDPath from signer context
Param addressIndex: Optional. HD path address index. If not provided uses the stored change/recv indexes for the last path prefix
Param isChange: Optional. HD path change marker
Returns: bip32 path string
*/
Signer.prototype.getHDPath = function (addressIndex, isChange) {
  const changeNum = isChange ? '1' : '0'
  let bipNum = 44
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
HDSigner.prototype.getHDPath = function (addressIndex, isChange) {
  return this.Signer.getHDPath(addressIndex, isChange)
}
TrezorSigner.prototype.getHDPath = function (addressIndex, isChange) {
  return this.Signer.getHDPath(addressIndex, isChange)
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
    pubkey: pubkey,
    network: this.network
  })
  return payment.address
}
TrezorSigner.prototype.getAddressFromPubKey = function (pubkey) {
  return this.Signer.getAddressFromPubKey(pubkey)
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
  const keyPair = bjs.bip32.fromSeed(this.fromSeed.seed, this.Signer.network).derivePath(keypath)
  if (!keyPair) {
    return null
  }
  return keyPair
}

/* derivePubKey
Purpose: Takes an HD path and derives keypair from it, returns pubkey
Param keypath: Required. HD BIP32 path of key desired based on internal seed and network
Returns: bitcoinjs-lib pubkey
*/
HDSigner.prototype.derivePubKey = function (keypath) {
  const keyPair = bjs.bip32.fromSeed(this.fromSeed.seed, this.Signer.network).derivePath(keypath)
  if (!keyPair) {
    return null
  }
  return keyPair.publicKey
}

/* getRootNode
Purpose: Returns HDSigner's BIP32 root node
Returns: BIP32 root node representing the seed
*/
HDSigner.prototype.getRootNode = function () {
  return bjs.bip32.fromSeed(this.fromSeed.seed, this.Signer.network)
}

TrezorSigner.prototype.getAccountNode = function () {
  return bjs.bip32.fromBase58(this.Signer.accounts[this.Signer.accountIndex].zpub, this.Signer.network)
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

function isPaymentFactory (payment) {
  return script => {
    try {
      payment({ output: script })
      return true
    } catch (err) {
      return false
    }
  }
}
const isP2WSHScript = isPaymentFactory(bjs.payments.p2wsh)

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

  extractTransaction (disableFeeCheck) {
    if (!this.data.inputs.every(isFinalized)) throw new Error('Not finalized')
    const c = this.__CACHE
    if (!disableFeeCheck) {
      checkFees(this, c, this.opts)
    }
    if (c.__EXTRACTED_TX) return c.__EXTRACTED_TX
    const tx = c.__TX.clone()
    inputFinalizeGetAmts(this.data.inputs, tx, c, true)
    return tx
  }
}

function exportPsbtToJson (psbt, assetsMap) {
  const assetsMapToStringify = assetsMap || new Map()
  return { psbt: psbt.toBase64(), assets: JSON.stringify([...assetsMapToStringify]) }
}

function importPsbtFromJson (jsonData, network) {
  return { psbt: bjs.Psbt.fromBase64(jsonData.psbt, { network: network || syscoinNetworks.mainnet }), assets: new Map(JSON.parse(jsonData.assets)) }
}

function createAssetID (NFTID, assetGuid) {
  const BN_ASSET = new BN(NFTID || 0).shln(32).or(new BN(assetGuid))
  return BN_ASSET.toString(10)
}

function getBaseAssetID (assetGuid) {
  return new BN(assetGuid).and(new BN(0xFFFFFFFF)).toString(10)
}
function range (n) {
  return [...Array(n).keys()]
}

function getAssetIDs (assetGuid) {
  const BN_NFT = new BN(assetGuid).shrn(32)
  return { baseAssetID: getBaseAssetID(assetGuid), NFTID: BN_NFT.toString(10) }
}
bjs.Psbt = SPSBT
module.exports = {
  bitcoinXPubTypes: bitcoinXPubTypes,
  bitcoinZPubTypes: bitcoinZPubTypes,
  bitcoinNetworks: bitcoinNetworks,
  syscoinXPubTypes: syscoinXPubTypes,
  syscoinZPubTypes: syscoinZPubTypes,
  syscoinNetworks: syscoinNetworks,
  syscoinSLIP44: syscoinSLIP44,
  bitcoinSLIP44: bitcoinSLIP44,
  HDSigner: HDSigner,
  TrezorSigner: TrezorSigner,
  fetchBackendUTXOS: fetchBackendUTXOS,
  fetchBackendUTXOs: fetchBackendUTXOS,
  fetchBackendSPVProof: fetchBackendSPVProof,
  sanitizeBlockbookUTXOs: sanitizeBlockbookUTXOs,
  fetchBackendAccount: fetchBackendAccount,
  fetchBackendAsset: fetchBackendAsset,
  fetchBackendListAssets: fetchBackendListAssets,
  fetchBackendRawTx: fetchBackendRawTx,
  fetchNotarizationFromEndPoint: fetchNotarizationFromEndPoint,
  fetchProviderInfo: fetchProviderInfo,
  fetchBackendBlock: fetchBackendBlock,
  fetchEstimateFee: fetchEstimateFee,
  sendRawTransaction: sendRawTransaction,
  buildEthProof: buildEthProof,
  getAssetsRequiringNotarization: getAssetsRequiringNotarization,
  notarizePSBT: notarizePSBT,
  signWithWIF: signWithWIF,
  getMemoFromScript: getMemoFromScript,
  getMemoFromOpReturn: getMemoFromOpReturn,
  getAllocationsFromTx: getAllocationsFromTx,
  bitcoinjs: bjs,
  BN: BN,
  createAssetID: createAssetID,
  getBaseAssetID: getBaseAssetID,
  getAssetIDs: getAssetIDs,
  setTransactionMemo: setTransactionMemo,
  copyPSBT: copyPSBT,
  importPsbtFromJson: importPsbtFromJson,
  exportPsbtToJson: exportPsbtToJson
}
