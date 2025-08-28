/* Polyfill for HD signing (including Taproot) akin to bitcoinjs PR-2137
   Applied per-psbt instance to avoid global prototype changes. */
const bjs = require('bitcoinjs-lib')
// Use @bitcoinerlab/secp256k1 exclusively to avoid native tiny-secp256k1 in browser/Next builds
const ecc = require('@bitcoinerlab/secp256k1')
const { BIP32Factory } = require('bip32')
const bip32 = BIP32Factory(ecc)

function isTaprootInput (input) {
  return !!input.tapInternalKey
}

function normalizeFingerprint (fp) {
  if (!fp) return null
  if (Buffer.isBuffer(fp)) return fp
  const b = Buffer.alloc(4)
  b.writeUInt32BE((fp >>> 0), 0)
  return b
}

function getDerivationForRoot (input, fingerprint) {
  const t = input.tapBip32Derivation || []
  const n = input.bip32Derivation || []
  const arr = t.length > 0 ? t : n
  if (arr.length === 0) return null
  // Prefer matching fingerprint; fallback to first
  const fpBuf = normalizeFingerprint(fingerprint)
  const match = fpBuf ? arr.find(d => Buffer.isBuffer(d.masterFingerprint) && d.masterFingerprint.equals(fpBuf)) : undefined
  return match || arr[0]
}

function tapBranchHash (a, b) {
  return bjs.crypto.taggedHash('TapBranch', Buffer.concat([a, b]))
}

function calculateScriptTreeMerkleRoot (leafHashes) {
  if (!leafHashes || leafHashes.length === 0) return undefined
  const hashes = leafHashes.slice().sort(Buffer.compare)
  let level = hashes
  while (level.length > 1) {
    const next = []
    for (let i = 0; i < level.length; i += 2) {
      const left = level[i]
      const right = i + 1 < level.length ? level[i + 1] : left
      next.push(i + 1 < level.length ? tapBranchHash(left, right) : left)
    }
    level = next
  }
  return level[0]
}

function getTaprootTweak (input) {
  if (!input.tapInternalKey) {
    throw new Error('tapInternalKey is required for taproot inputs')
  }

  const P = input.tapInternalKey // x-only internal key (32 bytes)

  // Determine if this is key-path or script-path spend based on PSBT fields
  let h
  if (input.tapLeafScript && input.tapLeafScript.length > 0) {
    // Script-path spend - calculate merkle root from leaf scripts
    const leafHashes = input.tapLeafScript.map(leaf => {
      const leafVer = leaf.leafVersion || 0xc0
      const script = leaf.script
      return bjs.crypto.taggedHash(
        'TapLeaf',
        Buffer.concat([Buffer.from([leafVer]), Buffer.from([script.length]), script])
      )
    })
    h = calculateScriptTreeMerkleRoot(leafHashes)
  } else if (input.tapMerkleRoot) {
    // If merkle root is provided directly, use it
    h = input.tapMerkleRoot
  } else {
    // Key-path spend - no script tree
    h = undefined
  }

  return bjs.crypto.taggedHash('TapTweak', h ? Buffer.concat([P, h]) : P)
}

function applyPR2137 (psbt) {
  psbt.signInputHD = function (inputIndex, hdKeyPair, sighashTypes) {
    const input = this.data.inputs[inputIndex]

    // Check if this is a non-HD signer (like WIF key)
    if (!hdKeyPair.fingerprint && !hdKeyPair.getMasterFingerprint && !hdKeyPair.getRootNode) {
      // For non-HD signers, handle taproot specially
      if (isTaprootInput(input)) {
        // Determine if this is key-path or script-path spending
        const isScriptPath = input.tapLeafScript && input.tapLeafScript.length > 0

        if (isScriptPath) {
          // Script-path: DON'T tweak
          this.signInput(inputIndex, hdKeyPair, sighashTypes)
        } else {
          // Key-path: DO tweak
          const tweak = getTaprootTweak(input)
          const tweakedSigner = hdKeyPair.tweak(tweak)
          this.signInput(inputIndex, tweakedSigner, sighashTypes)
        }
      } else {
        // Non-taproot, non-HD signing
        this.signInput(inputIndex, hdKeyPair, sighashTypes)
      }
      return this
    }

    // HD signer path (original code)
    // Get fingerprint from various sources
    let fingerprint
    if (hdKeyPair.fingerprint) {
      fingerprint = hdKeyPair.fingerprint
    } else if (hdKeyPair.getMasterFingerprint) {
      fingerprint = hdKeyPair.getMasterFingerprint()
    } else if (hdKeyPair.getRootNode) {
      fingerprint = hdKeyPair.getRootNode().fingerprint
    }

    if (!hdKeyPair || !hdKeyPair.publicKey || !fingerprint) { throw new Error('Need HDSigner to sign input') }

    const deriv = getDerivationForRoot(input, fingerprint)
    if (!deriv || !deriv.path) { throw new Error('Need derivation path to sign with HD') }

    // Support both derivePath and deriveKeypair
    let child
    if (typeof hdKeyPair.derivePath === 'function') {
      child = hdKeyPair.derivePath(deriv.path)
    } else if (typeof hdKeyPair.deriveKeypair === 'function') {
      child = hdKeyPair.deriveKeypair(deriv.path)
    } else {
      // Fallback to using bip32 if available
      child = bip32.fromBase58(hdKeyPair.toBase58(), undefined).derivePath(deriv.path)
    }

    if (!child || !child.privateKey) { throw new Error('Cannot derive child private key') }

    if (isTaprootInput(input)) {
      // Determine if this is key-path or script-path spending
      const isScriptPath = input.tapLeafScript && input.tapLeafScript.length > 0

      if (isScriptPath) {
        // Script-path: DON'T tweak - sign with the original key
        // bitcoinjs-lib will handle creating tapScriptSig
        this.signInput(inputIndex, child, sighashTypes)
      } else {
        // Key-path: DO tweak - sign with the tweaked key
        // bitcoinjs-lib will handle creating tapKeySig
        const tweak = getTaprootTweak(input)
        const tweakedChild = child.tweak(tweak)
        this.signInput(inputIndex, tweakedChild, sighashTypes)
      }
    } else {
      this.signInput(inputIndex, {
        publicKey: child.publicKey,
        sign: (hash) => bip32.sign ? bip32.sign(child.privateKey, hash) : ecc.sign(hash, child.privateKey)
      }, sighashTypes)
    }
    return this
  }

  psbt.signAllInputsHD = function (hdKeyPair, sighashTypes) {
    // Allow non-HD signers (like WIF keys) - they won't have fingerprint
    if (!hdKeyPair || !hdKeyPair.publicKey) { throw new Error('Need signer with public key') }
    const results = []
    const errors = []
    for (let i = 0; i < this.data.inputs.length; i++) {
      try {
        this.signInputHD(i, hdKeyPair, sighashTypes)
        results.push(true)
      } catch (e) {
        results.push(false)
        errors.push(`${e.message}`)
      }
    }
    if (results.every(v => v === false)) {
      throw new Error('No inputs were signed. Errors: ' + errors.join('; '))
    }
    return this
  }

  return psbt
}

module.exports = { applyPR2137 }
