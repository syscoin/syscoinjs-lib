# SyscoinJS (syscoinjs-lib)
[![Build Status](https://travis-ci.org/syscoin/syscoinjs-lib.png?branch=master)](https://travis-ci.org/syscoin/syscoinjs-lib)
[![NPM](https://img.shields.io/npm/v/syscoinjs-lib.svg)](https://www.npmjs.org/package/syscoinjs-lib)

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

A javascript Syscoin library for node.js and browsers.

Released under the terms of the [MIT LICENSE](LICENSE).

## Should I use this in production?
If you are thinking of using the *master* branch of this library in production, **stop**.
Master is not stable; it is our development branch, and [only tagged releases may be classified as stable](https://github.com/syscoin/syscoinjs-lib/tags).


## Can I trust this code?
> Don't trust. Verify.

We recommend every user of this library and the [syscoin](https://github.com/syscoin) ecosystem audit and verify any underlying code for its validity and suitability,  including reviewing any and all of your project's dependencies.

Mistakes and bugs happen, but with your help in resolving and reporting [issues](https://github.com/syscoin/syscoinjs-lib/issues), together we can produce open source software that is:

- Easy to audit and verify,
- Tested, with test coverage >95%,
- Advanced and feature rich,
- Standardized, using [prettier](https://github.com/prettier/prettier) and Node `Buffer`'s throughout, and
- Friendly, with a strong and helpful community, ready to answer questions.


## Documentation
Presently,  we do not have any formal documentation other than our [examples](#examples), please [ask for help](https://github.com/syscoin/syscoinjs-lib/issues/new) if our examples aren't enough to guide you.


## Installation
``` bash
npm install syscoinjs-lib
```

Typically we support the [Node Maintenance LTS version](https://github.com/nodejs/Release).
If in doubt, see the [.travis.yml](.travis.yml) for what versions are used by our continuous integration tests.

**WARNING**: We presently don't provide any tooling to verify that the release on `npm` matches GitHub.  As such, you should verify anything downloaded by `npm` against your own verified copy.


## Usage
Crypto is hard.

When working with private keys, the random number generator is fundamentally one of the most important parts of any software you write.
For random number generation, we *default* to the [`randombytes`](https://github.com/crypto-browserify/randombytes) module, which uses [`window.crypto.getRandomValues`](https://developer.mozilla.org/en-US/docs/Web/API/window.crypto.getRandomValues) in the browser, or Node js' [`crypto.randomBytes`](https://nodejs.org/api/crypto.html#crypto_crypto_randombytes_size_callback), depending on your build system.
Although this default is ~OK, there is no simple way to detect if the underlying RNG provided is good enough, or if it is **catastrophically bad**.
You should always verify this yourself to your own standards.

This library uses [bitcoinjs-lib](https://github.com/bitcoinjs/bitcoinjs-lib) which uses [tiny-secp256k1](https://github.com/bitcoinjs/tiny-secp256k1), which uses [RFC6979](https://tools.ietf.org/html/rfc6979) to help prevent `k` re-use and exploitation.
Unfortunately, this isn't a silver bullet.
Often, Javascript itself is working against us by bypassing these counter-measures.

Problems in [`Buffer (UInt8Array)`](https://github.com/feross/buffer), for example, can trivially result in **catastrophic fund loss** without any warning.
It can do this through undermining your random number generation, accidentally producing a [duplicate `k` value](https://www.nilsschneider.net/2013/01/28/recovering-bitcoin-private-keys.html), sending Bitcoin to a malformed output script, or any of a million different ways.
Running tests in your target environment is important and a recommended step to verify continuously.

Finally, **adhere to best practice**.
We are not an authorative source of best practice, but, at the very least:

* [Don't re-use addresses](https://en.bitcoin.it/wiki/Address_reuse).
* Don't share BIP32 extended public keys ('xpubs'). [They are a liability](https://bitcoin.stackexchange.com/questions/56916/derivation-of-parent-private-key-from-non-hardened-child), and it only takes 1 misplaced private key (or a buggy implementation!) and you are vulnerable to **catastrophic fund loss**.
* [Don't use `Math.random`](https://security.stackexchange.com/questions/181580/why-is-math-random-not-designed-to-be-cryptographically-secure) - in any way - don't.
* Enforce that users always verify (manually) a freshly-decoded human-readable version of their intended transaction before broadcast.
* [Don't *ask* users to generate mnemonics](https://en.bitcoin.it/wiki/Brainwallet#cite_note-1), or 'brain wallets',  humans are terrible random number generators.


### Browser
The recommended method of using `syscoinjs-lib` in your browser is through [Browserify](https://github.com/substack/node-browserify).
If you're familiar with how to use browserify, ignore this and carry on, otherwise, it is recommended to read the tutorial at https://browserify.org/.

**NOTE**: We use Node Maintenance LTS features, if you need strict ES5, use [`--transform babelify`](https://github.com/babel/babelify) in conjunction with your `browserify` step (using an [`es2015`](https://babeljs.io/docs/plugins/preset-es2015/) preset).

**WARNING**: iOS devices have [problems](https://github.com/feross/buffer/issues/136), use atleast [buffer@5.0.5](https://github.com/feross/buffer/pull/155) or greater,  and enforce the test suites (for `Buffer`, and any other dependency) pass before use.

## SyscoinJS exported functions
These are the functions available on SyscoinJS library with links to the code which has commenting on the function itself:

- [SyscoinJSLib()](https://github.com/syscoin/syscoinjs-lib/blob/master/index.js#L11)
- [getNotarizationSignatures()](https://github.com/syscoin/syscoinjs-lib/blob/master/index.js#L31)
- [createAndSignPSBTFromRes()](https://github.com/syscoin/syscoinjs-lib/blob/master/index.js#L62)
- [sign()](https://github.com/syscoin/syscoinjs-lib/blob/master/index.js#L86)
- [createTransaction()](https://github.com/syscoin/syscoinjs-lib/blob/master/index.js#L181)
- [assetNew()](https://github.com/syscoin/syscoinjs-lib/blob/master/index.js#L238)
- [assetUpdate()](https://github.com/syscoin/syscoinjs-lib/blob/master/index.js#L299)
- [assetSend()](https://github.com/syscoin/syscoinjs-lib/blob/master/index.js#L351)
- [assetAllocationSend()](https://github.com/syscoin/syscoinjs-lib/blob/master/index.js#L406)
- [assetAllocationBurn()](https://github.com/syscoin/syscoinjs-lib/blob/master/index.js#L454)
- [assetAllocationMint()](https://github.com/syscoin/syscoinjs-lib/blob/master/index.js#L512)
- [syscoinBurnToAssetAllocation()](https://github.com/syscoin/syscoinjs-lib/blob/master/index.js#L5832)

These are some supporting functions used to support the library like working with backend providers (Blockbook) and sanitizing data from the providers:

- [fetchNotarizationFromEndPoint()](https://github.com/syscoin/syscoinjs-lib/blob/master/utils.js#L51)
- [fetchBackendAsset()](https://github.com/syscoin/syscoinjs-lib/blob/master/utils.js#L70)
- [fetchBackendUTXOS()](https://github.com/syscoin/syscoinjs-lib/blob/master/utils.js#L90)
- [fetchBackendAccount()](https://github.com/syscoin/syscoinjs-lib/blob/master/utils.js#L116)
- [sendRawTransaction()](https://github.com/syscoin/syscoinjs-lib/blob/master/utils.js#L150)
- [fetchBackendRawTx()](https://github.com/syscoin/syscoinjs-lib/blob/master/utils.js#L172)
- [buildEthProof()](https://github.com/syscoin/syscoinjs-lib/blob/master/utils.js#L190)
- [sanitizeBlockbookUTXOs()](https://github.com/syscoin/syscoinjs-lib/blob/master/utils.js#L277)

These are the HDSigner/TrezorSigner exported functions, HDSigner is used to manage creating addresses and sign transactions internally using your XPUB (HD wallets). TrezorSigner is used to manage creating addresses and signing transactions via Trezor HW Wallet. BIP44/BIP84 are supported. P2WPKH, P2WSH, P2PKH, P2SH:

- [HDSigner()/TrezorSigner()](https://github.com/syscoin/syscoinjs-lib/blob/master/utils.js#L378)
- [getMasterFingerprint()](https://github.com/syscoin/syscoinjs-lib/blob/master/utils.js#L410)
- [deriveAccount()](https://github.com/syscoin/syscoinjs-lib/blob/master/utils.js#L419)
- [setAccountIndex()](https://github.com/syscoin/syscoinjs-lib/blob/master/utils.js#L432)
- [restore()](https://github.com/syscoin/syscoinjs-lib/blob/master/utils.js#L443)
- [backup()](https://github.com/syscoin/syscoinjs-lib/blob/master/utils.js#L473)
- [getNewChangeAddress()](https://github.com/syscoin/syscoinjs-lib/blob/master/utils.js#L487)
- [getNewReceivingAddress()](https://github.com/syscoin/syscoinjs-lib/blob/master/utils.js#L507)
- [createAccount()](https://github.com/syscoin/syscoinjs-lib/blob/master/utils.js#L526)
- [getAccountXpub()](https://github.com/syscoin/syscoinjs-lib/blob/master/utils.js#L541)
- [createPSBTFromRes()](https://github.com/syscoin/syscoinjs-lib/blob/master/index.js#L142)
- [setLatestIndexesFromXPubTokens()](https://github.com/syscoin/syscoinjs-lib/blob/master/utils.js#L549)
- [createKeypair()](https://github.com/syscoin/syscoinjs-lib/blob/master/utils.js#L576)
- [getAddressFromKeypair()](https://github.com/syscoin/syscoinjs-lib/blob/master/utils.js#L585)
- [getAddressFromPubKey()](https://github.com/syscoin/syscoinjs-lib/blob/master/utils.js#L598)
- [deriveKeypair()](https://github.com/syscoin/syscoinjs-lib/blob/master/utils.js#L611)
- [derivePubKey()](https://github.com/syscoin/syscoinjs-lib/blob/master/utils.js#L624)
- [getRootNode()](https://github.com/syscoin/syscoinjs-lib/blob/master/utils.js#L636)


## Examples
If you are looking to generate addresses, use WIFs or anything specific around crafting or doing blockchainy things not related to transaction creation, you may use [bitcoinjs-lib](https://github.com/bitcoinjs/bitcoinjs-lib) and use the Syscoin network parameters (see [utils.js](https://github.com/syscoin/syscoinjs-lib/blob/master/utils.js#L10) for the exported syscoinNetworks parameters).

The below examples are implemented as example tests, they should be very easy to understand.
Otherwise, pull requests are appreciated.

- [Create standard Syscoin transaction](https://github.com/syscoin/syscoinjs-lib-examples/blob/master/index.js#L10)
- [Create new SPT](https://github.com/syscoin/syscoinjs-lib-examples/blob/master/index.js#L34)
- [Updating SPT](https://github.com/syscoin/syscoinjs-lib-examples/blob/master/index.js#L58)
- [Distributing SPT](https://github.com/syscoin/syscoinjs-lib-examples/blob/master/index.js#L82)
- [Sending SPT](https://github.com/syscoin/syscoinjs-lib-examples/blob/master/index.js#L108)
- [Burning SYSX SPT for Syscoin](https://github.com/syscoin/syscoinjs-lib-examples/blob/master/index.js#L135)
- [Burning SYS for SYSX SPT](https://github.com/syscoin/syscoinjs-lib-examples/blob/master/index.js#L164)
- [Burning SPT for SysEtheruem bridge](https://github.com/syscoin/syscoinjs-lib-examples/blob/master/index.js#L193)
- [Minting SPT from SysEthereum bridge (custom proof)](https://github.com/syscoin/syscoinjs-lib-examples/blob/master/index.js#L221)
- [Minting SPT from SysEthereum bridge (automated with txid)](https://github.com/syscoin/syscoinjs-lib-examples/blob/master/index.js#L262)

If you have a use case that you feel could be listed here, please [ask for it](https://github.com/syscoin/syscoinjs-lib/issues/new)!


## Contributing
See [CONTRIBUTING.md](CONTRIBUTING.md).


### Running the test suite

``` bash
npm test
npm run-script coverage
```

## Complementing Libraries

This library consumes [syscointx-js](https://github.com/syscoin/syscointx-js) for raw transaction serializing and deserializing, that library consumes [coinselectsyscoin](https://github.com/syscoin/coinselectsyscoin) for the UTXO selection and transaction funding algorithms. Other supporting libraries are:

- [bn.js](https://github.com/indutny/bn.js/) - BigNum in pure javascript.
- [bitcoinjs-lib](https://github.com/bitcoinjs/bitcoinjs-lib) - A javascript Bitcoin library for node.js and browsers. Configurable with Syscoin network settings to work with Syscoin addresses and message signing.
- [bitcoin-ops](https://github.com/bitcoinjs/bitcoin-ops) - A javascript Bitcoin OP code library for referencing script OP codes for Bitcoin's script
- [varuint-bitcoin](https://github.com/bitcoinjs/varuint-bitcoin) - encode/decode number as bitcoin variable length integer
- [BIP84](https://github.com/Anderson-Juhasc/bip84) - P2WPKH/P2WSH HD wallet derivation library for BECH32 addresses
- [crypto-js](https://github.com/brix/crypto-js) - JavaScript library of crypto standards. Used for AES Encrypt/Decrypt of sensitive HD wallet info to local storage.
- [axios](https://github.com/axios/axios) - Promise based HTTP client for the browser and node.js. Used for backend communication with a Blockbook API as well as notary endpoints where applicable.
- [eth-object](https://github.com/zmitton/eth-object) - Ethereum Trie / LevelDB data from hex, buffers and rpc.
- [eth-proof](https://github.com/zmitton/eth-proof) - Generalized merkle-patricia-proof module that supports ethereum state proofs. Used for Eth SPV proofs.
- [rlp](https://github.com/ethereumjs/rlp) - Recursive Length Prefix Encoding for node.js.
- [web3](https://github.com/ethereum/web3.js/) - Ethereum JavaScript API which connects to the Generic JSON-RPC spec.

## LICENSE [MIT](LICENSE)