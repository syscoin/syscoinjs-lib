const utils = require('./utils')
const bitcoin = utils.bitcoinjs
const syscointx = require('syscointx-js')
const BN = require('bn.js')
function SyscoinJSLib (HDSigner, blockbookURL, network) {
  if (blockbookURL) {
    this.blockbookURL = blockbookURL
  }
  if (HDSigner) {
    this.HDSigner = HDSigner
    this.HDSigner.blockbookURL = blockbookURL
    this.network = network || this.HDSigner.network
  } else {
    this.HDSigner = null
    this.network = network
  }
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
  const prevTx = new Map()
  // if from address is passed in, we don't sign and pass back unsigned transaction
  if (sign) {
    if (!this.HDSigner) {
      console.log('No HD Signer defined! Cannot derive keys to sign transaction!')
      return null
    }
    if (!res || !res.inputs) {
      console.log('No inputs found! Cannot sign transaction!')
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
      // if legacy address type get previous tx as required by bitcoinjs-lib to sign without witness
      // Note: input.address is only returned by Blockbook XPUB UTXO API and not address UTXO API and this address is used to assign type
      if (input.type === 'LEGACY') {
        if (prevTx.has(input.txId)) {
          input.nonWitnessUtxo = prevTx.get(input.txId)
        } else {
          const hexTx = await utils.fetchBackendRawTx(this.blockbookURL, input.txId)
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
    const inputObj = {
      hash: input.txId,
      index: input.vout,
      sequence: input.sequence,
      bip32Derivation: input.bip32Derivation
    }
    if (input.nonWitnessUtxo) {
      inputObj.nonWitnessUtxo = input.nonWitnessUtxo
    } else {
      inputObj.witnessUtxo = { script: bitcoin.address.toOutputScript(input.address, this.network), value: input.value.toNumber() }
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

SyscoinJSLib.prototype.createTransaction = async function (txOpts, changeAddress, outputsArr, feeRate, fromXpubOrAddress, utxos) {
  if (!utxos) {
    if (fromXpubOrAddress) {
      utxos = await utils.fetchBackendUTXOS(this.blockbookURL, fromXpubOrAddress)
    } else if (this.HDSigner) {
      utxos = await utils.fetchBackendUTXOS(this.blockbookURL, this.HDSigner.getAccountXpub(), this.HDSigner)
    }
  }
  if (this.HDSigner) {
    if (!changeAddress) {
      changeAddress = await this.HDSigner.getNewChangeAddress()
    }
  }
  utxos = utils.sanitizeBlockbookUTXOs(utxos, this.network, txOpts)
  const res = syscointx.createTransaction(txOpts, utxos, changeAddress, outputsArr, feeRate, this.network)
  const psbt = await this.sign(res, !fromXpubOrAddress, utxos.assets)
  return psbt
}

SyscoinJSLib.prototype.assetNew = async function (assetOpts, txOpts, sysChangeAddress, sysReceivingAddress, feeRate, sysFromXpubOrAddress, utxos) {
  if (!utxos) {
    if (sysFromXpubOrAddress) {
      utxos = await utils.fetchBackendUTXOS(this.blockbookURL, sysFromXpubOrAddress)
    } else if (this.HDSigner) {
      utxos = await utils.fetchBackendUTXOS(this.blockbookURL, this.HDSigner.getAccountXpub(), this.HDSigner)
    }
  }
  if (this.HDSigner) {
    if (!sysChangeAddress) {
      sysChangeAddress = await this.HDSigner.getNewChangeAddress()
    }
    if (!sysReceivingAddress) {
      sysReceivingAddress = await this.HDSigner.getNewReceivingAddress()
    }
  }
  // create dummy map where GUID will be replaced by deterministic one based on first input txid, we need this so fees will be accurately determined on first place of coinselect
  const assetMap = new Map([
    [0, { changeAddress: sysChangeAddress, outputs: [{ value: new BN(0), address: sysReceivingAddress }] }]
  ])
  utxos = utils.sanitizeBlockbookUTXOs(utxos, this.network, txOpts, assetMap)
  const res = syscointx.assetNew(assetOpts, txOpts, utxos, assetMap, sysChangeAddress, feeRate)
  const psbt = await this.sign(res, !sysFromXpubOrAddress, utxos.assets)
  return psbt
}

SyscoinJSLib.prototype.assetUpdate = async function (assetGuid, assetOpts, txOpts, sysChangeAddress, feeRate, sysFromXpubOrAddress, utxos) {
  if (!utxos) {
    if (sysFromXpubOrAddress) {
      utxos = await utils.fetchBackendUTXOS(this.blockbookURL, sysFromXpubOrAddress)
    } else if (this.HDSigner) {
      utxos = await utils.fetchBackendUTXOS(this.blockbookURL, this.HDSigner.getAccountXpub(), this.HDSigner)
    }
  }
  if (this.HDSigner) {
    if (!sysChangeAddress) {
      sysChangeAddress = await this.HDSigner.getNewChangeAddress()
    }
  }
  const assetMap = new Map([
    [assetGuid, { changeAddress: sysChangeAddress, outputs: [{ value: new BN(0), address: sysChangeAddress }] }]
  ])
  if (this.HDSigner) {
    for (const valueAssetObj of assetMap.values()) {
      if (!valueAssetObj.changeAddress) {
        valueAssetObj.changeAddress = await this.HDSigner.getNewChangeAddress()
      }
    }
  }
  utxos = utils.sanitizeBlockbookUTXOs(utxos, this.network, txOpts, assetMap)
  const res = syscointx.assetUpdate(assetGuid, assetOpts, txOpts, utxos, assetMap, sysChangeAddress, feeRate)
  const psbt = await this.sign(res, !sysFromXpubOrAddress, utxos.assets)
  return psbt
}

SyscoinJSLib.prototype.assetSend = async function (txOpts, assetMap, sysChangeAddress, feeRate, sysFromXpubOrAddress, utxos) {
  if (!utxos) {
    if (sysFromXpubOrAddress) {
      utxos = await utils.fetchBackendUTXOS(this.blockbookURL, sysFromXpubOrAddress)
    } else if (this.HDSigner) {
      utxos = await utils.fetchBackendUTXOS(this.blockbookURL, this.HDSigner.getAccountXpub(), this.HDSigner)
    }
  }
  if (this.HDSigner) {
    if (!sysChangeAddress) {
      sysChangeAddress = await this.HDSigner.getNewChangeAddress()
    }
  }
  const BN_ZERO = new BN(0)
  for (const valueAssetObj of assetMap.values()) {
    valueAssetObj.outputs.push({ address: sysChangeAddress, value: BN_ZERO })
    valueAssetObj.changeAddress = sysChangeAddress
    break
  }
  if (this.HDSigner) {
    for (const valueAssetObj of assetMap.values()) {
      if (!valueAssetObj.changeAddress) {
        valueAssetObj.changeAddress = await this.HDSigner.getNewChangeAddress()
      }
    }
  }
  utxos = utils.sanitizeBlockbookUTXOs(utxos, this.network, txOpts, assetMap)
  const res = syscointx.assetSend(txOpts, utxos, assetMap, sysChangeAddress, feeRate)
  const psbt = await this.sign(res, !sysFromXpubOrAddress, utxos.assets)
  return psbt
}

SyscoinJSLib.prototype.assetAllocationSend = async function (txOpts, assetMap, sysChangeAddress, feeRate, sysFromXpubOrAddress, utxos) {
  if (!utxos) {
    if (sysFromXpubOrAddress) {
      utxos = await utils.fetchBackendUTXOS(this.blockbookURL, sysFromXpubOrAddress)
    } else if (this.HDSigner) {
      utxos = await utils.fetchBackendUTXOS(this.blockbookURL, this.HDSigner.getAccountXpub(), this.HDSigner)
    }
  }
  if (this.HDSigner) {
    if (!sysChangeAddress) {
      sysChangeAddress = await this.HDSigner.getNewChangeAddress()
    }
    for (const valueAssetObj of assetMap.values()) {
      if (!valueAssetObj.changeAddress) {
        valueAssetObj.changeAddress = await this.HDSigner.getNewChangeAddress()
      }
    }
  }
  utxos = utils.sanitizeBlockbookUTXOs(utxos, this.network, txOpts, assetMap)
  const res = syscointx.assetAllocationSend(txOpts, utxos, assetMap, sysChangeAddress, feeRate)
  const psbt = await this.sign(res, !sysFromXpubOrAddress, utxos.assets)
  return psbt
}

SyscoinJSLib.prototype.assetAllocationBurn = async function (assetOpts, txOpts, assetMap, sysChangeAddress, feeRate, sysFromXpubOrAddress, utxos) {
  if (!utxos) {
    if (sysFromXpubOrAddress) {
      utxos = await utils.fetchBackendUTXOS(this.blockbookURL, sysFromXpubOrAddress)
    } else if (this.HDSigner) {
      utxos = await utils.fetchBackendUTXOS(this.blockbookURL, this.HDSigner.getAccountXpub(), this.HDSigner)
    }
  }
  if (this.HDSigner) {
    if (!sysChangeAddress) {
      sysChangeAddress = await this.HDSigner.getNewChangeAddress()
    }
    for (const valueAssetObj of assetMap.values()) {
      if (!valueAssetObj.changeAddress) {
        valueAssetObj.changeAddress = await this.HDSigner.getNewChangeAddress()
      }
    }
  }
  utxos = utils.sanitizeBlockbookUTXOs(utxos, this.network, txOpts, assetMap)
  const res = syscointx.assetAllocationBurn(assetOpts, txOpts, utxos, assetMap, sysChangeAddress, feeRate)
  const psbt = await this.sign(res, !sysFromXpubOrAddress, utxos.assets)
  return psbt
}

SyscoinJSLib.prototype.assetAllocationMint = async function (assetOpts, txOpts, assetMap, sysChangeAddress, feeRate, sysFromXpubOrAddress, utxos) {
  if (!utxos) {
    if (sysFromXpubOrAddress) {
      utxos = await utils.fetchBackendUTXOS(this.blockbookURL, sysFromXpubOrAddress)
    } else if (this.HDSigner) {
      utxos = await utils.fetchBackendUTXOS(this.blockbookURL, this.HDSigner.getAccountXpub(), this.HDSigner)
    }
  }
  if (this.HDSigner) {
    if (!sysChangeAddress) {
      sysChangeAddress = await this.HDSigner.getNewChangeAddress()
    }
    if (assetMap) {
      for (const valueAssetObj of assetMap.values()) {
        if (!valueAssetObj.changeAddress) {
          valueAssetObj.changeAddress = await this.HDSigner.getNewChangeAddress()
        }
      }
    }
  }
  if (!assetMap) {
    const testnet = (this.HDSigner && this.HDSigner.isTestnet) || false
    const ethProof = await utils.buildEthProof(assetOpts, testnet)
    assetMap = new Map([
      [ethProof.assetguid, { changeAddress: await this.HDSigner.getNewChangeAddress(), outputs: [{ value: ethProof.amount, address: ethProof.destinationaddress }] }]
    ])
    assetOpts = {
      bridgetransferid: ethProof.bridgetransferid,
      blocknumber: ethProof.blocknumber,
      txvalue: ethProof.txvalue,
      txparentnodes: ethProof.txparentnodes,
      txpath: ethProof.txpath,
      receiptvalue: ethProof.receiptvalue,
      receiptparentnodes: ethProof.receiptparentnodes
    }
  }

  utxos = utils.sanitizeBlockbookUTXOs(utxos, this.network, txOpts, assetMap)
  const res = syscointx.assetAllocationMint(assetOpts, txOpts, utxos, assetMap, sysChangeAddress, feeRate)
  const psbt = await this.sign(res, !sysFromXpubOrAddress, utxos.assets)
  return psbt
}

SyscoinJSLib.prototype.syscoinBurnToAssetAllocation = async function (txOpts, assetMap, sysChangeAddress, dataAmount, feeRate, sysFromXpubOrAddress, utxos) {
  if (!utxos) {
    if (sysFromXpubOrAddress) {
      utxos = await utils.fetchBackendUTXOS(this.blockbookURL, sysFromXpubOrAddress)
    } else if (this.HDSigner) {
      utxos = await utils.fetchBackendUTXOS(this.blockbookURL, this.HDSigner.getAccountXpub(), this.HDSigner)
    }
  }
  if (this.HDSigner) {
    if (!sysChangeAddress) {
      sysChangeAddress = await this.HDSigner.getNewChangeAddress()
    }
    for (const valueAssetObj of assetMap.values()) {
      if (!valueAssetObj.changeAddress) {
        valueAssetObj.changeAddress = await this.HDSigner.getNewChangeAddress()
      }
    }
  }
  utxos = utils.sanitizeBlockbookUTXOs(utxos, this.network, txOpts, assetMap)
  const res = syscointx.syscoinBurnToAssetAllocation(txOpts, utxos, assetMap, sysChangeAddress, dataAmount, feeRate)
  const psbt = await this.sign(res, !sysFromXpubOrAddress, utxos.assets)
  return psbt
}

module.exports = {
  SyscoinJSLib: SyscoinJSLib,
  utils: utils
}
