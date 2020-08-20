
const axios = require('axios')
const BIP84 = require('bip84')
const CryptoJS = require('crypto-js')
const bjs = require('bitcoinjs-lib')
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

function HDSigner (mnemonic, password, networks, SLIP44, pubTypes, isTestnet) {
  if (isTestnet) {
    this.network = networks.mainnet || bitcoinNetworks.mainnet
  } else {
    this.network = networks.testnet || bitcoinNetworks.testnet
  }
  this.networks = networks
  this.password = password
  this.pubTypes = pubTypes
  this.isTestnet = isTestnet
  this.accounts = []
  // try to restore, if it does not succeed then initialize from scratch
  if (!this.restore(password, pubTypes, networks, isTestnet)) {
    this.fromSeed = BIP84.fromSeed(mnemonic, isTestnet, SLIP44, pubTypes, this.network)
    this.createAccount(networks)
    this.mnemonic = mnemonic // serialized
    this.changeIndexes = [] // serialized
    this.receivingIndexes = [] // serialized
    this.accountIndex = 0 // serialized
  }
}
// restore on load from local storage and decrypt data to de-serialize objects
HDSigner.prototype.restore = function (password, pubTypes, networks, isTestnet) {
  if (!localStorage) { return }
  let key = networks.mainnet.bech32 + '_hdsigner'
  if (isTestnet) {
    key = networks.testnet.bech32 + '_hdsigner'
  }
  const ciphertext = localStorage.getItem(key)
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
    this.accounts.push(BIP84.fromZPrv(child, pubTypes, networks))
  }
  return true
}
// encrypt to password and backup to local storage for persistence
HDSigner.prototype.backup = function () {
  if (!localStorage) { return }
  let key = 'syscoin_hdsigner'
  if (this.isTestnet) {
    key += '_testnet'
  }
  const obj = { mnemonic: this.mnemonic, accountIndex: this.accountIndex, changeIndexes: this.changeIndexes, receivingIndexes: this.receivingIndexes }
  const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(obj), this.password).toString()
  localStorage.setItem(key, ciphertext)
}

HDSigner.prototype.createAccount = function () {
  const child = this.fromSeed.deriveAccount(this.accountIndex)
  this.accounts.push(BIP84.fromZPrv(child, this.pubTypes, this.networks))
  this.accountIndex++
  this.backup()
}

HDSigner.prototype.getAccountXpub = function (index) {
  return this.accounts[index].getAccountPublicKey()
}

HDSigner.prototype.createAddress = function (accountIndex, isChange) {
  if (isChange) {
    if (accountIndex >= this.changeIndex.length) {
      this.changeIndex[accountIndex] = 1
    } else {
      this.changeIndex[accountIndex]++
    }
    this.backup()
    return this.accounts[accountIndex].getAddress(this.changeIndex[accountIndex] - 1, true)
  } else {
    if (accountIndex >= this.receivingIndex.length) {
      this.receivingIndex[accountIndex] = 1
    } else {
      this.receivingIndex[accountIndex]++
    }
    this.backup()
    return this.accounts[accountIndex].getAddress(this.receivingIndex[accountIndex] - 1)
  }
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

function decodeFromBase64 (input) {
  return Buffer.from(input, 'base64').toString()
}

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
  decodeFromBase64: decodeFromBase64,
}
