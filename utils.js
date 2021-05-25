
const axios = require('axios')
const BN = require('bn.js')
const BIP84 = require('bip84')
const CryptoJS = require('crypto-js')
const bjs = require('bitcoinjs-lib')
const bitcoinops = require('bitcoin-ops')
const varuint = require('varuint-bitcoin')
const { GetProof } = require('eth-proof')
const { Log, Receipt, Transaction } = require('eth-object')
const rlp = require('rlp')
const Web3 = require('web3')
const syscointx = require('syscointx-js')
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
Param myHDSignerObj: Optional. HDSigner object if you wish to update change/receiving indexes from backend provider (and XPUB token information is provided in response)
Returns: Returns JSON object in response, account object in JSON
*/
async function fetchBackendAccount (backendURL, addressOrXpub, options, xpub, myHDSignerObj) {
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
      if (xpub && request.data.tokens && myHDSignerObj) {
        myHDSignerObj.setLatestIndexesFromXPubTokens(request.data.tokens)
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
Param myHDSignerObj: Optional. HDSigner object if you wish to update change/receiving indexes from backend provider through fetchBackendAccount()
Returns: Returns txid in response or error
*/
async function sendRawTransaction (backendURL, txHex, myHDSignerObj) {
  try {
    let blockbookURL = backendURL.slice()
    if (blockbookURL) {
      blockbookURL = blockbookURL.replace(/\/$/, '')
    }
    const request = await axios.post(blockbookURL + '/api/v2/sendtx/', txHex)
    if (request && request.data) {
      if (myHDSignerObj) {
        await fetchBackendAccount(blockbookURL, myHDSignerObj.getAccountXpub(), 'tokens=used&details=tokens', true, myHDSignerObj)
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

/* createPSBTFromRes
Purpose: Craft PSBT from res object. Detects witness/non-witness UTXOs and sets appropriate data required for bitcoinjs-lib to sign properly
Param res: Required. The resulting object passed in which is assigned from syscointx.createTransaction()/syscointx.createAssetTransaction()
Returns: psbt from bitcoinjs-lib
*/
function createPSBTFromRes (res, network) {
  const psbt = new bjs.Psbt({ network: network })
  psbt.setVersion(res.txVersion)
  res.inputs.forEach(input => {
    const inputObj = {
      hash: input.txId,
      index: input.vout,
      sequence: input.sequence,
      bip32Derivation: input.bip32Derivation || []
    }
    if (input.nonWitnessUtxo) {
      inputObj.nonWitnessUtxo = input.nonWitnessUtxo
    } else {
      inputObj.witnessUtxo = { script: bjs.address.toOutputScript(input.address, network), value: input.value.toNumber() }
    }
    psbt.addInput(inputObj)
  })
  res.outputs.forEach(output => {
    psbt.addOutput({
      script: output.script,
      address: output.script ? null : output.address,
      value: output.value.toNumber()
    })
  })

  return psbt
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

/* notarizeRes
Purpose: Notarize Result object from syscointx.createTransaction()/syscointx.createAssetTransaction() if required by the assets in the inputs of the transaction
Param res: Required. The resulting object passed in which is assigned from syscointx.createTransaction()/syscointx.createAssetTransaction()
Param notaryAssets: Required. Asset objects require notarization, fetch signatures via fetchNotarizationFromEndPoint()
Returns: new result object notarized, you will need to create PSBT and sign it after this call
*/
async function notarizeRes (res, notaryAssets, rawTx) {
  const notarizationDone = await getNotarizationSignatures(notaryAssets, rawTx)
  if (notarizationDone) {
    return syscointx.addNotarizationSignatures(res.txVersion, notaryAssets, res.outputs) !== -1
  }
  return false
}

/* getAssetsRequiringNotarizationFromRes
Purpose: Get assets from Result object assigned from syscointx.createTransaction()/syscointx.createAssetTransaction() that require notarization
Param assets: Required. Asset objects that are evaluated for notarization, and if they do require notarization then fetch signatures via fetchNotarizationFromEndPoint()
Returns: Asset map of objects requiring notarization or null if no notarization is required
*/
function getAssetsRequiringNotarizationFromRes (res, assets) {
  if (!syscointx.utils.isAssetAllocationTx(res.txVersion)) {
    return null
  }
  let foundNotary = false
  const assetsUsedInTxNeedingNotarization = new Map()
  if (!res || !res.inputs) {
    console.log('No inputs found! Cannot decode transaction!')
    return null
  }
  for (let i = 0; i < res.inputs.length; i++) {
    const input = res.inputs[i]
    if (input.assetInfo) {
      const baseAssetID = getBaseAssetID(input.assetInfo.assetGuid)
      if (assetsUsedInTxNeedingNotarization.has(baseAssetID)) {
        continue
      }
      if (!assets.has(baseAssetID)) {
        console.log('Asset input not found in the UTXO assets map!')
        return null
      }
      const valueAssetObj = assets.get(baseAssetID)
      if (valueAssetObj.notarydetails && valueAssetObj.notarydetails.endpoint && valueAssetObj.notarydetails.endpoint.length > 0) {
        assetsUsedInTxNeedingNotarization.set(baseAssetID, valueAssetObj)
        foundNotary = true
      }
    }
  }
  return foundNotary ? assetsUsedInTxNeedingNotarization : null
}
/* signPSBTWithHDSigner
Purpose: Sign PSBT with XPUB information from external HDSigner
Param psbt: Required. Partially signed transaction object
Param HDSigner: Required. External HDSigner that has information required to sign the PSBT
Param ownedIndexes: Optional. If sign is set and HDSigner exists then this variable is relevant. It will confirm which inputs are owned by this HDSigner xpub so it can sign the input, ownedIndexes is set in sign()
Returns: psbt from bitcoinjs-lib
*/
function signPSBTWithHDSigner (psbt, HDSigner, ownedIndexes) {
  const rootNode = HDSigner.getRootNode()
  // sign inputs this xpub key owns
  for (let i = 0; i < psbt.inputCount; i++) {
    if (ownedIndexes.has(i)) {
      psbt.signInputHD(i, rootNode)
    }
  }
  if (psbt.validateSignaturesOfAllInputs()) {
    psbt.finalizeAllInputs()
  }
  return psbt
}
/* signWithHDSigner
Purpose: Sign Result object with XPUB information from external HDSigner
Param res: Required. The resulting object passed in which is assigned from syscointx.createTransaction()/syscointx.createAssetTransaction()
Param HDSigner: Required. External HDSigner that has information required to sign the PSBT
Returns: psbt from bitcoinjs-lib
*/
async function signWithHDSigner (res, HDSigner) {
  const ownedIndexes = new Map()
  const prevTx = new Map()
  if (!res || !res.inputs) {
    console.log('No inputs found! Cannot sign transaction!')
    return null
  }
  const fp = HDSigner.getMasterFingerprint()
  for (let i = 0; i < res.inputs.length; i++) {
    const input = res.inputs[i]
    if (input.path) {
      const pubkey = HDSigner.derivePubKey(input.path)
      if (pubkey) {
        ownedIndexes.set(i, true)
        input.bip32Derivation = [
          {
            masterFingerprint: fp,
            path: input.path,
            pubkey: pubkey
          }]
      }
    }
    // if legacy address type get previous tx as required by bitcoinjs-lib to sign without witness
    // Note: input.address is only returned by Blockbook XPUB UTXO API and not address UTXO API and this address is used to assign type
    if (input.type === 'LEGACY') {
      if (prevTx.has(input.txId)) {
        input.nonWitnessUtxo = prevTx.get(input.txId)
      } else {
        const hexTx = await fetchBackendRawTx(this.blockbookURL, input.txId)
        if (hexTx) {
          const bufferTx = Buffer.from(hexTx.hex, 'hex')
          prevTx.set(input.txId, bufferTx)
          input.nonWitnessUtxo = bufferTx
        } else {
          console.log('Could not fetch input transaction for legacy UTXO: ' + input.txId)
        }
      }
    }
  }
  return signPSBTWithHDSigner(createPSBTFromRes(res, HDSigner.network), HDSigner, ownedIndexes)
}

/* signPSBTWithWIF
Purpose: Sign PSBT with WiF
Param psbt: Required. Partially signed transaction object
Param wif: Required. Private key in WIF format to sign inputs with
Param network: Required. bitcoinjs-lib Network object
Returns: psbt from bitcoinjs-lib
*/
function signPSBTWithWIF (psbt, wif, network) {
  const wifObject = bjs.ECPair.fromWIF(
    wif,
    network
  )
  // sign inputs with wif
  for (let i = 0; i < psbt.inputCount; i++) {
    psbt.signInput(i, wifObject)
  }
  if (psbt.validateSignaturesOfAllInputs()) {
    psbt.finalizeAllInputs()
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
function signWithWIF (res, wif, network) {
  return signPSBTWithWIF(createPSBTFromRes(res, network), wif, network)
}
/* buildEthProof
Purpose: Build Ethereum SPV proof using eth-proof library
Param assetOpts: Required. Object containing infuraurl and ethtxid fields populated
Returns: Returns JSON object in response, SPV proof object in JSON
*/
async function buildEthProof (assetOpts) {
  const ethProof = new GetProof(assetOpts.infuraurl)
  try {
    let result = await ethProof.transactionProof(assetOpts.ethtxid)
    const txvalue = rlp.encode(rlp.decode(result.txProof[2][1])).toString('hex')
    const txObj = Transaction.fromHex(result.txProof[2][1]).toObject()
    txObj.data = txObj.data.substring(10)
    const paramTxResults = web3.eth.abi.decodeParameters([{
      type: 'uint',
      name: 'value'
    }, {
      type: 'uint32',
      name: 'assetGUID'
    }, {
      type: 'string',
      name: 'syscoinAddress'
    }], txObj.data)
    const assetguid = paramTxResults.assetGUID
    const destinationaddress = paramTxResults.syscoinAddress
    const txroot = rlp.encode(result.header[4]).toString('hex')
    const txparentnodes = rlp.encode(result.txProof).toString('hex')
    const txpath = rlp.encode(result.txIndex).toString('hex')
    const blocknumber = parseInt(result.header[8].toString('hex'), 16)

    result = await ethProof.receiptProof(assetOpts.ethtxid)
    const receiptvalue = rlp.encode(rlp.decode(result.receiptProof[2][1])).toString('hex')
    const receiptroot = rlp.encode(result.header[5]).toString('hex')
    const receiptparentnodes = rlp.encode(result.receiptProof).toString('hex')
    const tokenFreezeFunction = ('9c6dea23fe3b510bb5d170df49dc74e387692eaa3258c691918cd3aa94f5fb74').toLowerCase() // token freeze function signature
    const testnet = assetOpts.infuraurl.indexOf('mainnet') === -1
    const ERC20Manager = (testnet ? '0x0765efb302d504751c652c5b1d65e8e9edf2e70f' : '0xFF957eA28b537b34E0c6E6B50c6c938668DD28a0').toLowerCase()
    let bridgetransferid = 0
    const txReceipt = Receipt.fromHex(result.receiptProof[2][1]).toObject()
    let amount = 0
    for (let i = 0; i < txReceipt.setOfLogs.length; i++) {
      const log = Log.fromRaw(txReceipt.setOfLogs[i]).toObject()
      if (log.topics && log.topics.length !== 1) {
        continue
      }

      // event TokenFreeze(address freezer, uint value, uint transferIdAndPrecisions);
      if (log.topics[0].toString('hex').toLowerCase() === tokenFreezeFunction && log.address.toLowerCase() === ERC20Manager) {
        const paramResults = web3.eth.abi.decodeParameters([{
          type: 'address',
          name: 'freezer'
        }, {
          type: 'uint',
          name: 'value'
        }, {
          type: 'uint',
          name: 'transferIdAndPrecisions'
        }], log.data)
        const transferIdAndPrecisions = new web3.utils.BN(paramResults.transferIdAndPrecisions)
        bridgetransferid = transferIdAndPrecisions.maskn(32).toNumber()
        const value = new web3.utils.BN(paramResults.value)

        // get precision
        const erc20precision = transferIdAndPrecisions.shrn(32).maskn(8)
        const sptprecision = transferIdAndPrecisions.shrn(40)
        // local precision can range between 0 and 8 decimal places, so it should fit within a CAmount
        // we pad zero's if erc20's precision is less than ours so we can accurately get the whole value of the amount transferred
        if (sptprecision > erc20precision) {
          amount = value.mul(new web3.utils.BN(10).pow(sptprecision.sub(erc20precision))).toNumber()
          // ensure we truncate decimals to fit within int64 if erc20's precision is more than our asset precision
        } else if (sptprecision < erc20precision) {
          amount = value.div(new web3.utils.BN(10).pow(erc20precision.sub(sptprecision))).toNumber()
        } else {
          amount = value.toNumber()
        }
        break
      }
    }
    return { assetguid, destinationaddress, amount, txvalue, txroot, txparentnodes, txpath, blocknumber, receiptvalue, receiptroot, receiptparentnodes, bridgetransferid }
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
  return syscointx.getAllocationsFromTx(tx)
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

/* HDSigner
Purpose: Manage HD wallet and accounts, connects to SyscoinJS object
Param mnemonic: Required. Bip32 seed phrase
Param password: Optional. Encryption password for local storage on web clients
Param isTestnet: Optional. Is using testnet network?
Param networks: Optional. Defaults to Syscoin network. bitcoinjs-lib network settings for coin being used.
Param SLIP44: Optional. SLIP44 value for the coin, see: https://github.com/satoshilabs/slips/blob/master/slip-0044.md
Param pubTypes: Optional. Defaults to Syscoin ZPub/VPub types. Specific ZPub for bip84 and VPub for testnet
*/
function HDSigner (mnemonic, password, isTestnet, networks, SLIP44, pubTypes) {
  this.isTestnet = isTestnet || false
  SLIP44 = this.isTestnet ? 1 : SLIP44 || syscoinSLIP44 // 1 is testnet for all coins,
  this.networks = networks || syscoinNetworks

  if (!this.isTestnet) {
    this.network = this.networks.mainnet || syscoinNetworks.mainnet
  } else {
    this.network = this.networks.testnet || syscoinNetworks.testnet
  }

  this.password = password
  this.pubTypes = pubTypes || syscoinZPubTypes

  this.accounts = [] // length serialized
  this.changeIndex = -1
  this.receivingIndex = -1
  this.mnemonic = mnemonic // serialized
  this.accountIndex = 0

  /* eslint new-cap: ["error", { "newIsCap": false }] */
  this.fromSeed = new BIP84.fromSeed(mnemonic, password, this.isTestnet, SLIP44, this.pubTypes, this.network)
  // try to restore, if it does not succeed then initialize from scratch
  if (!this.password || !this.restore(this.password)) {
    this.createAccount()
  }
}

/* signPSBT
Purpose: Sign PSBT with XPUB information from HDSigner
Param psbt: Required. Partially signed transaction object
Param ownedIndexes: Optional. If sign is set and HDSigner exists then this variable is relevant. It will confirm which inputs are owned by this HDSigner xpub so it can sign the input, ownedIndexes is set in sign()
Returns: psbt from bitcoinjs-lib
*/
HDSigner.prototype.signPSBT = function (psbt, ownedIndexes) {
  const rootNode = this.getRootNode()
  // sign inputs this xpub key owns
  for (let i = 0; i < psbt.inputCount; i++) {
    if (ownedIndexes.has(i)) {
      psbt.signInputHD(i, rootNode)
    }
  }
  if (psbt.validateSignaturesOfAllInputs()) {
    psbt.finalizeAllInputs()
  }
  return psbt
}

/* sign
Purpose: Create signing information based on HDSigner (if set) and call createAndSignPSBTFromRes() to actually sign, as well as detect notarization and apply it as required.
Param res: Required. The resulting object passed in which is assigned from syscointx.createTransaction()/syscointx.createAssetTransaction()
Returns: psbt from bitcoinjs-lib
*/
HDSigner.prototype.sign = async function (res) {
  const ownedIndexes = new Map()
  const prevTx = new Map()
  if (!res || !res.inputs) {
    console.log('No inputs found! Cannot sign transaction!')
    return null
  }
  const fp = this.getMasterFingerprint()
  for (let i = 0; i < res.inputs.length; i++) {
    const input = res.inputs[i]
    if (input.path) {
      const pubkey = this.derivePubKey(input.path)
      if (pubkey) {
        ownedIndexes.set(i, true)
        input.bip32Derivation = [
          {
            masterFingerprint: fp,
            path: input.path,
            pubkey: pubkey
          }]
      }
    }
    // if legacy address type get previous tx as required by bitcoinjs-lib to sign without witness
    // Note: input.address is only returned by Blockbook XPUB UTXO API and not address UTXO API and this address is used to assign type
    if (input.type === 'LEGACY') {
      if (prevTx.has(input.txId)) {
        input.nonWitnessUtxo = prevTx.get(input.txId)
      } else {
        const hexTx = await fetchBackendRawTx(this.blockbookURL, input.txId)
        if (hexTx) {
          const bufferTx = Buffer.from(hexTx.hex, 'hex')
          prevTx.set(input.txId, bufferTx)
          input.nonWitnessUtxo = bufferTx
        } else {
          console.log('Could not fetch input transaction for legacy UTXO: ' + input.txId)
        }
      }
    }
  }
  return this.signPSBT(createPSBTFromRes(res, this.network), ownedIndexes)
}

/* getMasterFingerprint
Purpose: Get master seed fingerprint used for signing with bitcoinjs-lib PSBT's
Returns: bip32 root master fingerprint
*/
HDSigner.prototype.getMasterFingerprint = function () {
  return bjs.bip32.fromSeed(this.fromSeed.seed, this.network).fingerprint
}

/* deriveAccount
Purpose: Derive HD account based on index number passed in
Param index: Required. Account number to derive
Returns: bip32 node for derived account
*/
HDSigner.prototype.deriveAccount = function (index) {
  let bipNum = '44'
  if (this.pubTypes === syscoinZPubTypes ||
    this.pubTypes === bitcoinZPubTypes) {
    bipNum = '84'
  }
  return this.fromSeed.deriveAccount(index, bipNum)
}

/* setAccountIndex
Purpose: Set HD account based on accountIndex number passed in so HD indexes (change/receiving) will be updated accordingly to this account
Param accountIndex: Required. Account number to use
*/
HDSigner.prototype.setAccountIndex = function (accountIndex) {
  if (accountIndex > this.accounts.length) {
    console.log('Account does not exist, use createAccount to create it first...')
    return
  }
  this.accountIndex = accountIndex
  this.changeIndex = -1
  this.receivingIndex = -1
}

/* restore
Purpose: Restore on load from local storage and decrypt data to de-serialize objects
Param password: Required. Decryption password to unlock seed phrase
Returns: boolean on success for fail of restore
*/
HDSigner.prototype.restore = function (password) {
  let browserStorage = (typeof localStorage === 'undefined' || localStorage === null) ? null : localStorage
  if (!browserStorage) {
    const LocalStorage = require('node-localstorage').LocalStorage
    browserStorage = new LocalStorage('./scratch')
  }
  const key = this.network.bech32 + '_hdsigner'
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
  if (this.accountIndex > 1000) {
    return false
  }
  this.accounts = []
  this.changeIndex = -1
  this.receivingIndex = -1
  this.accountIndex = 0
  for (let i = 0; i <= numAccounts; i++) {
    const child = this.deriveAccount(i)
    /* eslint new-cap: ["error", { "newIsCap": false }] */
    this.accounts.push(new BIP84.fromZPrv(child, this.pubTypes, this.networks))
  }
  return true
}

/* backup
Purpose: Encrypt to password and backup to local storage for persistence
*/
HDSigner.prototype.backup = function () {
  let browserStorage = (typeof localStorage === 'undefined' || localStorage === null) ? null : localStorage
  if (!this.password) { return }
  if (!browserStorage) {
    const LocalStorage = require('node-localstorage').LocalStorage
    browserStorage = new LocalStorage('./scratch')
  }
  const key = this.network.bech32 + '_hdsigner'
  const obj = { mnemonic: this.mnemonic, numAccounts: this.accounts.length }
  const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(obj), this.password).toString()
  browserStorage.setItem(key, ciphertext)
}

/* getNewChangeAddress
Purpose: Get new address for sending change to
Param skipIncrement: Optional. If we should not count the internal change index counter (if you want to get the same change address in the future)
Returns: string address used for change outputs
*/
HDSigner.prototype.getNewChangeAddress = async function (skipIncrement) {
  if (this.changeIndex === -1 && this.blockbookURL) {
    await fetchBackendAccount(this.blockbookURL, this.getAccountXpub(), 'tokens=used&details=tokens', true, this)
  }
  const keyPair = this.createKeypair(this.changeIndex + 1, true)
  if (keyPair) {
    if (!skipIncrement) {
      this.changeIndex++
    }
    return this.getAddressFromKeypair(keyPair)
  }

  return null
}

/* getNewReceivingAddress
Purpose: Get new address for sending coins to
Param skipIncrement: Optional. If we should not count the internal receiving index counter (if you want to get the same address in the future)
Returns: string address used for receiving outputs
*/
HDSigner.prototype.getNewReceivingAddress = async function (skipIncrement) {
  if (this.receivingIndex === -1 && this.blockbookURL) {
    await fetchBackendAccount(this.blockbookURL, this.getAccountXpub(), 'tokens=used&details=tokens', true, this)
  }
  const keyPair = this.createKeypair(this.receivingIndex + 1, false)
  if (keyPair) {
    if (!skipIncrement) {
      this.receivingIndex++
    }
    return this.getAddressFromKeypair(keyPair)
  }

  return null
}

/* createAccount
Purpose: Create and derive a new account
Returns: Account index of new account
*/
HDSigner.prototype.createAccount = function () {
  this.changeIndex = -1
  this.receivingIndex = -1
  const child = this.deriveAccount(this.accounts.length)
  this.accountIndex = this.accounts.length
  /* eslint new-cap: ["error", { "newIsCap": false }] */
  this.accounts.push(new BIP84.fromZPrv(child, this.pubTypes, this.networks))
  this.backup()
  return this.accountIndex
}

/* getAccountXpub
Purpose: Get XPUB for account, useful for public provider lookups based on XPUB accounts
Returns: string representing hex XPUB
*/
HDSigner.prototype.getAccountXpub = function () {
  return this.accounts[this.accountIndex].getAccountPublicKey()
}

/* setLatestIndexesFromXPubTokens
Purpose: Sets the change and receiving indexes from XPUB tokens passed in, from a backend provider response
Param tokens: Required. XPUB tokens from provider response to XPUB account details.
*/
HDSigner.prototype.setLatestIndexesFromXPubTokens = function (tokens) {
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

/* createKeypair
Purpose: Sets the change and receiving indexes from XPUB tokens passed in, from a backend provider response
Param addressIndex: Required. HD path address index
Param isChange: Required. HD path change marker
Returns: bitcoinjs-lib keypair derived from address index and change market
*/
HDSigner.prototype.createKeypair = function (addressIndex, isChange) {
  return this.accounts[this.accountIndex].getKeypair(addressIndex, isChange)
}

/* getAddressFromKeypair
Purpose: Takes keypair and gives back a p2wpkh address
Param keyPair: Required. bitcoinjs-lib keypair
Returns: string p2wpkh address
*/
HDSigner.prototype.getAddressFromKeypair = function (keyPair) {
  const payment = bjs.payments.p2wpkh({
    pubkey: keyPair.publicKey,
    network: this.network
  })
  return payment.address
}

/* getAddressFromPubKey
Purpose: Takes pubkey and gives back a p2wpkh address
Param pubkey: Required. bitcoinjs-lib public key
Returns: string p2wpkh address
*/
HDSigner.prototype.getAddressFromPubKey = function (pubkey) {
  const payment = bjs.payments.p2wpkh({
    pubkey: pubkey,
    network: this.network
  })
  return payment.address
}

/* deriveKeypair
Purpose: Takes an HD path and derives keypair from it
Param keypath: Required. HD BIP32 path of key desired based on internal seed and network
Returns: bitcoinjs-lib keypair
*/
HDSigner.prototype.deriveKeypair = function (keypath) {
  const keyPair = bjs.bip32.fromSeed(this.fromSeed.seed, this.network).derivePath(keypath)
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
  const keyPair = bjs.bip32.fromSeed(this.fromSeed.seed, this.network).derivePath(keypath)
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
  return bjs.bip32.fromSeed(this.fromSeed.seed, this.network)
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

function createAssetID (NFTID, assetGuid) {
  const BN_ASSET = new BN(NFTID || 0).shln(32).or(new BN(assetGuid))
  return BN_ASSET.toString(10)
}

function getBaseAssetID (assetGuid) {
  return new BN(assetGuid).and(new BN(0xFFFFFFFF)).toString(10)
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
  fetchBackendUTXOS: fetchBackendUTXOS,
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
  createPSBTFromRes: createPSBTFromRes,
  getAssetsRequiringNotarizationFromRes: getAssetsRequiringNotarizationFromRes,
  notarizeRes: notarizeRes,
  signWithHDSigner: signWithHDSigner,
  signWithWIF: signWithWIF,
  getMemoFromScript: getMemoFromScript,
  getMemoFromOpReturn: getMemoFromOpReturn,
  getAllocationsFromTx: getAllocationsFromTx,
  bitcoinjs: bjs,
  BN: BN,
  createAssetID: createAssetID,
  getBaseAssetID: getBaseAssetID,
  setTransactionMemo: setTransactionMemo
}
