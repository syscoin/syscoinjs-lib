const utils = require('./utils')
const bitcoin = utils.bitcoinjs
const syscointx = require('syscointx-js')
function SyscoinJSLib (HDSigner, blockbookURL, accountIndex, network) {
  if (blockbookURL) {
    this.blockbookURL = blockbookURL
  }
  if (HDSigner) {
    this.HDSigner = HDSigner
    this.network = network || this.HDSigner.network
  } else {
    this.HDSigner = null
    this.network = network
  }
  if (accountIndex) {
    this.accountIndex = accountIndex
  } else {
    this.accountIndex = 0
  }
}

SyscoinJSLib.prototype.setAccountIndex = function (accountIndex) {
  this.accountIndex = accountIndex
}

SyscoinJSLib.prototype.getNotarizationSignatures = async function (assets, res) {
  let notarizationDone = false
  if (!assets) {
    return notarizationDone
  }

  let txHex = null
  for (const valueAssetObj in assets.values()) {
    if (valueAssetObj.notarydetails && valueAssetObj.notarydetails.endpoint && valueAssetObj.notarydetails.endpoint.length > 0) {
      if (!txHex) {
        const psbt = this.createPSBTFromRes(res)
        txHex = psbt.extractTransaction().toHex()
      }
      const decodedEndpoint = utils.decodeFromBase64ToASCII(valueAssetObj.notarydetails.endpoint.toString())
      const responseNotary = await this.fetchNotarizationFromEndPoint(decodedEndpoint, txHex)
      if (responseNotary.sig) {
        valueAssetObj.sig = responseNotary.sig
        notarizationDone = true
      }
    }
  }
  return notarizationDone
}

SyscoinJSLib.prototype.createAndSignPSBTFromRes = function (res, sign, ownedIndexes) {
  const psbt = this.createPSBTFromRes(res)
  if (sign) {
    if (!this.HDSigner) {
      console.log('No HD Signer defined! Cannot sign transaction!')
      return null
    }
    const rootNode = this.HDSigner.getRootNode()
    // sign inputs this xpub key owns
    for (var i = 0; i < res.inputs.length; i++) {
      if (ownedIndexes.has(i)) {
        psbt.signInputHD(i, rootNode)
      }
    }
    if (psbt.validateSignaturesOfAllInputs()) {
      psbt.finalizeAllInputs()
    }
  }
  return psbt
}

SyscoinJSLib.prototype.sign = async function (res, sign, assets) {
  const ownedIndexes = new Map()
  // if from address is passed in, we don't sign and pass back unsigned transaction
  if (sign) {
    if (!this.HDSigner) {
      console.log('No HD Signer defined! Cannot derive keys to sign transaction!')
      return null
    }
    const fp = this.HDSigner.getMasterFingerprint()
    for (var i = 0; i < res.inputs.length; i++) {
      const input = res.inputs[i]
      if (input.path) {
        const pubkey = this.HDSigner.derivePubKey(input.path)
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
    }
  }
  let psbt = this.createAndSignPSBTFromRes(res, sign, ownedIndexes)
  const notarizationDone = await this.getNotarizationSignatures(assets, res)
  // sign again if notarization was added
  if (notarizationDone && syscointx.addNotarizationSignatures(res.txVersion, assets, res.outputs) !== -1) {
    psbt = this.createAndSignPSBTFromRes(res, sign, ownedIndexes)
  }
  return psbt
}

SyscoinJSLib.prototype.createPSBTFromRes = function (res) {
  const psbt = new bitcoin.Psbt({ network: this.network })
  psbt.setVersion(res.txVersion)
  res.inputs.forEach(input => {
    psbt.addInput({
      hash: input.txId,
      index: input.vout,
      sequence: input.sequence,
      witnessUtxo: input.witnessUtxo,
      bip32Derivation: input.bip32Derivation
    })
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

SyscoinJSLib.prototype.createTransaction = async function (txOpts, changeAddress, outputsArr, feeRate, fromXpubOrAddress, utxos) {
  if (!utxos) {
    if (fromXpubOrAddress) {
      utxos = await utils.fetchBackendUTXOS(this.blockbookURL, fromXpubOrAddress)
    } else if (this.HDSigner) {
      utxos = await utils.fetchBackendUTXOS(this.blockbookURL, this.HDSigner.getAccountXpub(this.accountIndex))
    }
  }
  const res = syscointx.createTransaction(txOpts, utxos, changeAddress, outputsArr, feeRate, this.network)
  const psbt = await this.sign(res, !fromXpubOrAddress, utxos.assets)
  return psbt
}

SyscoinJSLib.prototype.assetNew = async function (assetOpts, txOpts, sysChangeAddress, feeRate, sysFromXpubOrAddress, utxos) {
  if (!utxos) {
    if (sysFromXpubOrAddress) {
      utxos = await utils.fetchBackendUTXOS(this.blockbookURL, sysFromXpubOrAddress)
    } else if (this.HDSigner) {
      utxos = await utils.fetchBackendUTXOS(this.blockbookURL, this.HDSigner.getAccountXpub(this.accountIndex))
    }
  }
  const res = syscointx.assetNew(assetOpts, txOpts, utxos, sysChangeAddress, feeRate, this.network)
  const psbt = await this.sign(res, !sysFromXpubOrAddress, utxos.assets)
  return psbt
}

SyscoinJSLib.prototype.assetUpdate = async function (assetGuid, assetOpts, txOpts, assetMap, sysChangeAddress, feeRate, sysFromXpubOrAddress, utxos) {
  if (!utxos) {
    if (sysFromXpubOrAddress) {
      utxos = await utils.fetchBackendUTXOS(this.blockbookURL, sysFromXpubOrAddress)
    } else if (this.HDSigner) {
      utxos = await utils.fetchBackendUTXOS(this.blockbookURL, this.HDSigner.getAccountXpub(this.accountIndex))
    }
  }

  const res = syscointx.assetUpdate(assetGuid, assetOpts, txOpts, utxos, assetMap, sysChangeAddress, feeRate, this.network)
  const psbt = await this.sign(res, !sysFromXpubOrAddress, utxos.assets)
  return psbt
}

SyscoinJSLib.prototype.assetSend = async function (txOpts, assetMap, sysChangeAddress, feeRate, sysFromXpubOrAddress, utxos) {
  if (!utxos) {
    if (sysFromXpubOrAddress) {
      utxos = await utils.fetchBackendUTXOS(this.blockbookURL, sysFromXpubOrAddress)
    } else if (this.HDSigner) {
      utxos = await utils.fetchBackendUTXOS(this.blockbookURL, this.HDSigner.getAccountXpub(this.accountIndex))
    }
  }
  const res = syscointx.assetSend(txOpts, utxos, assetMap, sysChangeAddress, feeRate, this.network)
  const psbt = await this.sign(res, !sysFromXpubOrAddress, utxos.assets)
  return psbt
}

SyscoinJSLib.prototype.assetAllocationSend = async function (txOpts, assetMap, sysChangeAddress, feeRate, sysFromXpubOrAddress, utxos) {
  if (!utxos) {
    if (sysFromXpubOrAddress) {
      utxos = await utils.fetchBackendUTXOS(this.blockbookURL, sysFromXpubOrAddress)
    } else if (this.HDSigner) {
      utxos = await utils.fetchBackendUTXOS(this.blockbookURL, this.HDSigner.getAccountXpub(this.accountIndex))
    }
  }

  const res = syscointx.assetAllocationSend(txOpts, utxos, assetMap, sysChangeAddress, feeRate, this.network)
  const psbt = await this.sign(res, !sysFromXpubOrAddress, utxos.assets)
  return psbt
}

SyscoinJSLib.prototype.assetAllocationBurn = async function (assetOpts, txOpts, assetMap, sysChangeAddress, feeRate, sysFromXpubOrAddress, utxos) {
  if (!utxos) {
    if (sysFromXpubOrAddress) {
      utxos = await utils.fetchBackendUTXOS(this.blockbookURL, sysFromXpubOrAddress)
    } else if (this.HDSigner) {
      utxos = await utils.fetchBackendUTXOS(this.blockbookURL, this.HDSigner.getAccountXpub(this.accountIndex))
    }
  }
  const res = syscointx.assetAllocationBurn(assetOpts, txOpts, utxos, assetMap, sysChangeAddress, feeRate, this.network)
  const psbt = await this.sign(res, !sysFromXpubOrAddress, utxos.assets)
  return psbt
}

SyscoinJSLib.prototype.assetAllocationMint = async function (assetOpts, txOpts, assetMap, sysChangeAddress, feeRate, sysFromXpubOrAddress, utxos) {
  if (!utxos) {
    if (sysFromXpubOrAddress) {
      utxos = await utils.fetchBackendUTXOS(this.blockbookURL, sysFromXpubOrAddress)
    } else if (this.HDSigner) {
      utxos = await utils.fetchBackendUTXOS(this.blockbookURL, this.HDSigner.getAccountXpub(this.accountIndex))
    }
  }
  const res = syscointx.assetAllocationMint(assetOpts, txOpts, utxos, assetMap, sysChangeAddress, feeRate, this.network)
  const psbt = await this.sign(res, !sysFromXpubOrAddress, utxos.assets)
  return psbt
}

SyscoinJSLib.prototype.syscoinBurnToAssetAllocation = async function (txOpts, assetMap, sysChangeAddress, dataAmount, feeRate, sysFromXpubOrAddress, utxos) {
  if (!utxos) {
    if (sysFromXpubOrAddress) {
      utxos = await utils.fetchBackendUTXOS(this.blockbookURL, sysFromXpubOrAddress)
    } else if (this.HDSigner) {
      utxos = await utils.fetchBackendUTXOS(this.blockbookURL, this.HDSigner.getAccountXpub(this.accountIndex))
    }
  }
  const res = syscointx.syscoinBurnToAssetAllocation(txOpts, utxos, assetMap, sysChangeAddress, dataAmount, feeRate, this.network)
  const psbt = await this.sign(res, !sysFromXpubOrAddress, utxos.assets)
  return psbt
}

module.exports = {
  SyscoinJSLib: SyscoinJSLib,
  utils: utils
}
