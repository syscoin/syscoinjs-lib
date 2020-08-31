
const axios = require('axios')
const BIP84 = require('bip84')
const CryptoJS = require('crypto-js')
const bjs = require('bitcoinjs-lib')
const varuint = require('varuint-bitcoin')
const bitcoinPubTypes = { mainnet: { zprv: '04b2430c', zpub: '04b24746' }, testnet: { vprv: '045f18bc', vpub: '045f1cf6' } }
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
const syscoinPubTypes = { mainnet: { zprv: '04b2430c', zpub: '04b24746' }, testnet: { vprv: '045f18bc', vpub: '045f1cf6' } }
const syscoinSLIP44 = 57
const bitcoinSLIP44 = 0

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
  this.pubTypes = pubTypes || syscoinPubTypes

  this.accounts = []
  this.mnemonic = mnemonic // serialized
  this.changeIndexes = [] // serialized
  this.receivingIndexes = [] // serialized
  this.accountIndex = 0 // serialized

  /* eslint new-cap: ["error", { "newIsCap": false }] */
  this.fromSeed = new BIP84.fromSeed(mnemonic, this.isTestnet, SLIP44, this.pubTypes, this.network)
  // try to restore, if it does not succeed then initialize from scratch
  if (!this.password || !this.restore(this.password)) {
    this.createAccount()
  }
}
HDSigner.prototype.getMasterFingerprint = function () {
  return bjs.bip32.fromSeed(this.fromSeed.seed, this.network).fingerprint
}
// restore on load from local storage and decrypt data to de-serialize objects
HDSigner.prototype.restore = function (password) {
  const browserStorage = (typeof localStorage === 'undefined') ? null : localStorage
  if (!browserStorage) { return }
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
  this.accountIndex = decryptedData.accountIndex
  this.changeIndexes = decryptedData.changeIndexes
  this.receivingIndexes = decryptedData.receivingIndexes
  // sanity checks
  if (this.accountIndex > 1000 || this.changeIndexes.length > 100000 || this.receivingIndexes.length > 100000) {
    return false
  }
  for (var i = 0; i <= this.accountIndex; i++) {
    const child = this.fromSeed.deriveAccount(i)
    /* eslint new-cap: ["error", { "newIsCap": false }] */
    this.accounts.push(new BIP84.fromZPrv(child, this.pubTypes, this.networks))
  }
  return true
}
// encrypt to password and backup to local storage for persistence
HDSigner.prototype.backup = function () {
  const browserStorage = (typeof localStorage === 'undefined') ? null : localStorage
  if (!browserStorage || !this.password) { return }
  const key = this.network.bech32 + '_hdsigner'
  const obj = { mnemonic: this.mnemonic, accountIndex: this.accountIndex, changeIndexes: this.changeIndexes, receivingIndexes: this.receivingIndexes }
  const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(obj), this.password).toString()
  browserStorage.setItem(key, ciphertext)
}

HDSigner.prototype.createAccount = function () {
  const child = this.fromSeed.deriveAccount(this.accountIndex)
  /* eslint new-cap: ["error", { "newIsCap": false }] */
  this.accounts.push(new BIP84.fromZPrv(child, this.pubTypes, this.networks))
  this.accountIndex++
  this.backup()
}

HDSigner.prototype.getAccountXpub = function (index) {
  return this.accounts[index].getAccountPublicKey()
}

HDSigner.prototype.createKeypair = function (accountIndex, isChange) {
  if (isChange) {
    if (accountIndex >= this.changeIndexes.length) {
      this.changeIndexes[accountIndex] = 1
    } else {
      this.changeIndexes[accountIndex]++
    }
    this.backup()
    return this.accounts[accountIndex].getKeypair(this.changeIndexes[accountIndex] - 1, true)
  } else {
    if (accountIndex >= this.receivingIndexes.length) {
      this.receivingIndexes[accountIndex] = 1
    } else {
      this.receivingIndexes[accountIndex]++
    }
    this.backup()
    return this.accounts[accountIndex].getKeypair(this.receivingIndexes[accountIndex] - 1)
  }
}

HDSigner.prototype.getAddressFromKeypair = function (keyPair) {
  const payment = bjs.payments.p2wpkh({
    pubkey: keyPair.publicKey,
    network: this.network
  })
  return payment.address
}

HDSigner.prototype.getAddressFromPubKey = function (pubkey) {
  const payment = bjs.payments.p2wpkh({
    pubkey: pubkey,
    network: this.network
  })
  return payment.address
}

HDSigner.prototype.deriveKeypair = function (keypath) {
  const keyPair = bjs.bip32.fromSeed(this.fromSeed.seed, this.network).derivePath(keypath)
  if (!keyPair) {
    return null
  }
  return keyPair
}

HDSigner.prototype.derivePubKey = function (keypath) {
  const keyPair = bjs.bip32.fromSeed(this.fromSeed.seed, this.network).derivePath(keypath)
  if (!keyPair) {
    return null
  }
  return keyPair.publicKey
}

HDSigner.prototype.getRootNode = function () {
  return bjs.bip32.fromSeed(this.fromSeed.seed, this.network)
}

async function fetchBackendUTXOS (backendURL, addressOrXpub, options) {
  try {
    const request = await axios.get(backendURL + '/api/v2/utxo/' + addressOrXpub + options ? '?' + options : '')
    if (request && request.data) {
      return request.data
    }
    return null
  } catch (e) {
    console.error(e)
    throw e
  }
}

async function fetchNotarizationFromEndPoint (endPoint, txHex) {
  try {
    const request = await axios.post(endPoint, { tx: txHex })
    if (request && request.data) {
      return request.data
    }
    return null
  } catch (e) {
    console.error(e)
    throw e
  }
}

async function fetchBackendTxs (backendURL, addressOrXpub, options, xpub) {
  try {
    const request = await axios.get(backendURL + xpub ? '/api/v2/xpub/' : '/api/v2/address/' + addressOrXpub + options ? '?' + options : '')
    if (request && request.data) {
      return request.data
    }
    return null
  } catch (e) {
    console.error(e)
    throw e
  }
}

async function fetchBackendAsset (backendURL, assetGuid) {
  try {
    const request = await axios.get(backendURL + '/api/v2/asset/' + assetGuid + '?details=basic')
    if (request && request.data && request.data.asset) {
      return request.data.asset
    }
    return null
  } catch (e) {
    console.error(e)
    throw e
  }
}

async function sendRawTransaction (backendURL, txHex) {
  try {
    const request = await axios.post(backendURL + '/api/v2/sendtx', txHex)
    if (request && request.data) {
      return request.data
    }
    return null
  } catch (e) {
    console.error(e)
    throw e
  }
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
bjs.Psbt = SPSBT
module.exports = {
  bitcoinPubTypes: bitcoinPubTypes,
  bitcoinNetworks: bitcoinNetworks,
  syscoinPubTypes: syscoinPubTypes,
  syscoinNetworks: syscoinNetworks,
  syscoinSLIP44: syscoinSLIP44,
  bitcoinSLIP44: bitcoinSLIP44,
  HDSigner: HDSigner,
  fetchBackendUTXOS: fetchBackendUTXOS,
  fetchBackendTxs: fetchBackendTxs,
  fetchBackendAsset: fetchBackendAsset,
  fetchNotarizationFromEndPoint: fetchNotarizationFromEndPoint,
  sendRawTransaction: sendRawTransaction,
  bitcoinjs: bjs
}
