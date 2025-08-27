// BIP84 replacement implementation using existing dependencies
// This replaces the bip84 package to avoid pulling in legacy bitcoinjs-lib

const bitcoin = require('bitcoinjs-lib')
const { BIP32Factory } = require('bip32')
const ecc = require('@bitcoinerlab/secp256k1')
const bip32 = BIP32Factory(ecc)
const bip39 = require('bip39')
const bs58Module = require('bs58')
const bs58 = bs58Module.default || bs58Module
const { createHash } = require('crypto')

// Custom bs58check implementation to avoid adding another dependency
const bs58check = {
  decode: function (string) {
    const buffer = Buffer.from(bs58.decode(string))
    const payload = buffer.slice(0, -4)
    const checksum = buffer.slice(-4)
    const newChecksum = createHash('sha256')
      .update(createHash('sha256').update(payload).digest())
      .digest()
      .slice(0, 4)

    if (!Buffer.from(checksum).equals(Buffer.from(newChecksum))) {
      throw new Error('Invalid checksum')
    }

    return payload
  },

  encode: function (payload) {
    const checksum = createHash('sha256')
      .update(createHash('sha256').update(payload).digest())
      .digest()
      .slice(0, 4)

    return bs58.encode(Buffer.concat([payload, checksum]))
  }
}

const bitcoinPubTypes = { mainnet: { zprv: '04b2430c', zpub: '04b24746' }, testnet: { vprv: '045f18bc', vpub: '045f1cf6' } }
const bitcoinNetworks = { mainnet: bitcoin.networks.bitcoin, testnet: bitcoin.networks.testnet }

/**
 * Constructor
 * Derive accounts from a mnemonic.
 * @param {string} mnemonic
 * @param {string} password
 * @param {boolean} isTestnet
 * @param {number} coinType - slip44
 * @param {object} pubTypes
 * @param {object} network
 * @return
 */
function fromMnemonic (mnemonic, password, isTestnet, coinType, pubTypes, network) {
  if (!bip39.validateMnemonic(mnemonic)) throw new Error('could not validate mnemonic words')
  this.seed = bip39.mnemonicToSeedSync(mnemonic, password || '')
  this.isTestnet = isTestnet === true
  this.coinType = this.isTestnet ? 1 : coinType || 0 // 0 is for Bitcoin and 1 is testnet for all coins
  this.pubTypes = pubTypes || bitcoinPubTypes
  this.network = network || (this.isTestnet ? bitcoinNetworks.testnet : bitcoinNetworks.mainnet)
}

/**
 * Get root master private key
 * @return {string}
 */
fromMnemonic.prototype.getRootPrivateKey = function () {
  const prv = bip32.fromSeed(this.seed, this.network).toBase58()
  const masterPrv = this.isTestnet
    ? b58Encode(prv, this.pubTypes.testnet.vprv)
    : b58Encode(prv, this.pubTypes.mainnet.zprv)

  return masterPrv
}

/**
 * Get root master public key
 * @return {string}
 */
fromMnemonic.prototype.getRootPublicKey = function () {
  const pub = bip32.fromSeed(this.seed, this.network).neutered().toBase58()
  const masterPub = this.isTestnet
    ? b58Encode(pub, this.pubTypes.testnet.vpub)
    : b58Encode(pub, this.pubTypes.mainnet.zpub)

  return masterPub
}

/**
 * Derive a new master private key
 * @param {number} number
 * @param {number} changePurpose
 * @return {string}
 */
fromMnemonic.prototype.deriveAccount = function (number, changePurpose) {
  const purpose = changePurpose || 84
  const keypath = 'm/' + purpose + "'/" + this.coinType + "'/" + number + "'"
  const account = bip32.fromSeed(this.seed, this.network).derivePath(keypath).toBase58()
  const masterPrv = this.isTestnet
    ? b58Encode(account, this.pubTypes.testnet.vprv)
    : b58Encode(account, this.pubTypes.mainnet.zprv)

  return masterPrv
}

/**
 * Constructor
 * Create key pairs from a private master key of mainnet and testnet.
 * @param {string} zprv/vprv
 * @param {object} pubTypes
 * @param {object} networks
 */
function fromZPrv (zprv, pubTypes, networks) {
  this.pubTypes = pubTypes || bitcoinPubTypes
  this.networks = networks || bitcoinNetworks
  this.zprv = this.toNode(zprv)
}

const byteToHex = (byte) => {
  const key = '0123456789abcdef'
  const bytes = new Uint8Array(byte)
  let newHex = ''
  let currentChar = 0
  for (let i = 0; i < bytes.length; i++) { // Go over each 8-bit byte
    currentChar = (bytes[i] >> 4) // First 4-bits for first hex char
    newHex += key[currentChar] // Add first hex char to string
    currentChar = (bytes[i] & 15) // Erase first 4-bits, get last 4-bits for second hex char
    newHex += key[currentChar] // Add second hex char to string
  }
  return newHex
}

fromZPrv.prototype.toNode = function (zprv) {
  const payload = bs58check.decode(zprv)
  const prefix = byteToHex(payload.slice(0, 4))
  const key = payload.slice(4)
  let buffer

  if (!Object.values(this.pubTypes.mainnet).includes(prefix) && !Object.values(this.pubTypes.testnet).includes(prefix)) {
    throw new Error('prefix is not supported')
  }

  if (Object.values(this.pubTypes.mainnet).includes(prefix)) {
    const buf = Buffer.allocUnsafe(4)
    buf.writeInt32BE(this.networks.mainnet.bip32.private, 0)
    buffer = Buffer.concat([buf, key]) // zprv
    this.network = this.networks.mainnet
    this.isTestnet = false
  }

  if (Object.values(this.pubTypes.testnet).includes(prefix)) {
    const buf = Buffer.allocUnsafe(4)
    buf.writeInt32BE(this.networks.testnet.bip32.private, 0)
    buffer = Buffer.concat([buf, key]) // vprv
    this.network = this.networks.testnet
    this.isTestnet = true
  }

  return bs58check.encode(buffer)
}

/**
 * Get account master private key
 * @return {string}
 */
fromZPrv.prototype.getAccountPrivateKey = function () {
  const pub = bip32.fromBase58(this.zprv, this.network).toBase58()
  const masterPrv = this.isTestnet
    ? b58Encode(pub, this.pubTypes.testnet.vprv)
    : b58Encode(pub, this.pubTypes.mainnet.zprv)

  return masterPrv
}

/**
 * Get account master public key
 * @return {string}
 */
fromZPrv.prototype.getAccountPublicKey = function () {
  const pub = bip32.fromBase58(this.zprv, this.network).neutered().toBase58()
  const masterPub = this.isTestnet
    ? b58Encode(pub, this.pubTypes.testnet.vpub)
    : b58Encode(pub, this.pubTypes.mainnet.zpub)

  return masterPub
}

/**
 * Get private key
 * @param {number} index
 * @param {boolean} isChange
 * @return {string}
 */
fromZPrv.prototype.getPrivateKey = function (index, isChange) {
  const change = isChange === true ? 1 : 0
  const prvkey = bip32.fromBase58(this.zprv, this.network).derive(change).derive(index)

  return prvkey.toWIF()
}

/**
 * Get public key
 * @param {number} index
 * @param {boolean} isChange
 * @return {string}
 */
fromZPrv.prototype.getPublicKey = function (index, isChange) {
  const change = isChange === true ? 1 : 0
  const prvkey = bip32.fromBase58(this.zprv, this.network).derive(change).derive(index)

  return prvkey.publicKey.toString('hex')
}

/**
 * Get address
 * @param {number} index
 * @param {boolean} isChange
 * @param {number} purpose
 * @return {string}
 */
fromZPrv.prototype.getAddress = function (index, isChange, purpose) {
  const change = isChange === true ? 1 : 0
  const pubkey = bip32.fromBase58(this.zprv, this.network).derive(change).derive(index).publicKey
  let payment = {}

  purpose = purpose || 84

  if (purpose === 44) {
    payment = bitcoin.payments.p2pkh({ pubkey, network: this.network })
  }

  if (purpose === 49) {
    payment = bitcoin.payments.p2sh({
      redeem: bitcoin.payments.p2wpkh({ pubkey, network: this.network }),
      network: this.network
    })
  }

  if (purpose === 84) {
    payment = bitcoin.payments.p2wpkh({ pubkey, network: this.network })
  }

  return payment.address
}

fromZPrv.prototype.getKeypair = function (index, isChange) {
  const change = isChange === true ? 1 : 0
  const prvkey = bip32.fromBase58(this.zprv, this.network).derive(change).derive(index)

  return prvkey
}

/**
 * Constructor
 * Create public keys and addresses from a public master key of mainnet and testnet.
 * @param {string} zpub/vpub
 * @param {object} pubTypes
 * @param {object} networks
 */
function fromZPub (zpub, pubTypes, networks) {
  this.pubTypes = pubTypes || bitcoinPubTypes
  this.networks = networks || bitcoinNetworks
  this.zpub = this.toNode(zpub)
}

fromZPub.prototype.toNode = function (zpub) {
  const payload = bs58check.decode(zpub)
  const prefix = byteToHex(payload.slice(0, 4))
  const key = payload.slice(4)
  let buffer

  if (!Object.values(this.pubTypes.mainnet).includes(prefix) && !Object.values(this.pubTypes.testnet).includes(prefix)) {
    throw new Error('prefix is not supported')
  }

  if (Object.values(this.pubTypes.mainnet).includes(prefix)) {
    const buf = Buffer.allocUnsafe(4)
    buf.writeInt32BE(this.networks.mainnet.bip32.public, 0)
    buffer = Buffer.concat([buf, key]) // zpub
    this.network = this.networks.mainnet
    this.isTestnet = false
  }

  if (Object.values(this.pubTypes.testnet).includes(prefix)) {
    const buf = Buffer.allocUnsafe(4)
    buf.writeInt32BE(this.networks.testnet.bip32.public, 0)
    buffer = Buffer.concat([buf, key]) // vpub
    this.network = this.networks.testnet
    this.isTestnet = true
  }

  return bs58check.encode(buffer)
}

/**
 * Get account master public key
 * @return {string}
 */
fromZPub.prototype.getAccountPublicKey = function () {
  const pub = bip32.fromBase58(this.zpub, this.network).neutered().toBase58()
  const masterPub = this.isTestnet
    ? b58Encode(pub, this.pubTypes.testnet.vpub)
    : b58Encode(pub, this.pubTypes.mainnet.zpub)

  return masterPub
}

/**
 * Get public key
 * @param {number} index
 * @param {boolean} isChange
 * @return {string}
 */
fromZPub.prototype.getPublicKey = function (index, isChange) {
  const change = isChange === true ? 1 : 0
  const zpub = bip32.fromBase58(this.zpub, this.network).derive(change).derive(index)

  return zpub.publicKey.toString('hex')
}

/**
 * Get address
 * @param {number} index
 * @param {boolean} isChange
 * @param {number} purpose
 * @return {string}
 */
fromZPub.prototype.getAddress = function (index, isChange, purpose) {
  const change = isChange === true ? 1 : 0
  const pubkey = bip32.fromBase58(this.zpub, this.network).derive(change).derive(index).publicKey
  let payment = {}

  purpose = purpose || 84

  if (purpose === 44) {
    payment = bitcoin.payments.p2pkh({ pubkey, network: this.network })
  }

  if (purpose === 49) {
    payment = bitcoin.payments.p2sh({
      redeem: bitcoin.payments.p2wpkh({ pubkey, network: this.network }),
      network: this.network
    })
  }

  if (purpose === 84) {
    payment = bitcoin.payments.p2wpkh({ pubkey, network: this.network })
  }

  return payment.address
}

/**
 * Get address
 * @param {number} index
 * @param {boolean} isChange
 * @return {string}
 */
fromZPub.prototype.getPayment = function (index, isChange) {
  const change = isChange === true ? 1 : 0
  const pubkey = bip32.fromBase58(this.zpub, this.network).derive(change).derive(index).publicKey

  const payment = bitcoin.payments.p2wpkh({
    pubkey,
    network: this.network
  })

  return payment
}

function b58Encode (pub, data) {
  const payload = bs58check.decode(pub)
  const key = payload.slice(4)

  return bs58check.encode(Buffer.concat([Buffer.from(data, 'hex'), key]))
}

module.exports = {
  generateMnemonic: bip39.generateMnemonic,
  entropyToMnemonic: bip39.entropyToMnemonic,
  validateMnemonic: bip39.validateMnemonic,
  fromMnemonic,
  fromZPrv,
  fromZPub
}
