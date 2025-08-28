/* Polyfill for HD signing (including Taproot) akin to bitcoinjs PR-2137
   Applied per-psbt instance to avoid global prototype changes. */
const bjs = require('bitcoinjs-lib')
let ecc
try { ecc = require('@bitcoinerlab/secp256k1') } catch (e) { try { ecc = require('tiny-secp256k1') } catch (_) {} }
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

function applyPR2137 (psbt) {
  psbt.signInputHD = function (inputIndex, hdKeyPair, sighashTypes) {
    const input = this.data.inputs[inputIndex]

    // Check if this is a non-HD signer (like WIF key)
    if (!hdKeyPair.fingerprint && !hdKeyPair.getMasterFingerprint && !hdKeyPair.getRootNode) {
      // For non-HD signers, handle taproot specially
      if (isTaprootInput(input) && hdKeyPair.privateKey) {
        const P = input.tapInternalKey // x-only internal key (32 bytes)

        // Check if this signer's public key matches the tapInternalKey
        const signerXOnly = hdKeyPair.publicKey.length === 33 ? hdKeyPair.publicKey.slice(1, 33) : hdKeyPair.publicKey
        // Convert both to Buffer for comparison (handle Uint8Array vs Buffer)
        const signerBuf = Buffer.from(signerXOnly)
        const tapKeyBuf = Buffer.from(P)
        if (!tapKeyBuf.equals(signerBuf)) {
          throw new Error('Signer public key does not match tapInternalKey')
        }

        // For non-HD signers, determine if this is key-path or script-path
        let h
        if (input.tapLeafScript && input.tapLeafScript.length > 0) {
          // Script-path spend - calculate merkle root from leaf scripts
          // Extract leaf hashes from tapLeafScript entries
          const leafHashes = input.tapLeafScript.map(leaf => {
            // Each leaf script needs to be hashed according to BIP341
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
        const tweak = bjs.crypto.taggedHash('TapTweak', h ? Buffer.concat([P, h]) : P)
        const addTweak = ecc.xOnlyPointAddTweak(P, tweak)
        if (!addTweak) throw new Error('Failed to add taproot tweak')
        const Qx = addTweak.xOnlyPubkey
        const parity = addTweak.parity
        let k = ecc.privateAdd(hdKeyPair.privateKey, tweak)
        if (!k) throw new Error('Failed to tweak private key')
        if (parity === 1) {
          k = ecc.privateNegate(k)
        }
        const signer = {
          publicKey: Qx, // x-only tweaked pubkey
          signSchnorr: (hash) => {
            // Ensure hash is a Buffer for consistent handling
            const hashBuffer = Buffer.isBuffer(hash) ? hash : Buffer.from(hash)
            // bitcoinjs-lib should already handle the epoch byte (0x00) in the sighash
            // but we need to ensure the signature is created correctly
            return ecc.signSchnorr(hashBuffer, k)
          }
        }
        this.signInput(inputIndex, signer, sighashTypes)
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
      const P = input.tapInternalKey // x-only internal key (32 bytes)
      const h = calculateScriptTreeMerkleRoot((deriv && deriv.leafHashes) || [])
      const tweak = bjs.crypto.taggedHash('TapTweak', h ? Buffer.concat([P, h]) : P)
      const addTweak = ecc.xOnlyPointAddTweak(P, tweak)
      if (!addTweak) throw new Error('Failed to add taproot tweak')
      const Qx = addTweak.xOnlyPubkey
      const parity = addTweak.parity
      let k = ecc.privateAdd(child.privateKey, tweak)
      if (!k) throw new Error('Failed to tweak private key')
      if (parity === 1) {
        k = ecc.privateNegate(k)
      }
      const signer = {
        publicKey: Qx, // x-only tweaked pubkey
        signSchnorr: (hash) => {
          // Ensure hash is a Buffer for consistent handling
          const hashBuffer = Buffer.isBuffer(hash) ? hash : Buffer.from(hash)
          // bitcoinjs-lib should already handle the epoch byte (0x00) in the sighash
          // but we need to ensure the signature is created correctly
          return ecc.signSchnorr(hashBuffer, k)
        }
      }
      this.signInput(inputIndex, signer, sighashTypes)
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
    for (let i = 0; i < this.data.inputs.length; i++) {
      try { this.signInputHD(i, hdKeyPair, sighashTypes); results.push(true) } catch (e) { results.push(false) }
    }
    if (results.every(v => v === false)) { throw new Error('No inputs were signed') }
    return this
  }

  return psbt
}

module.exports = { applyPR2137 }
