const test = require('tape')
const { spawnSync } = require('node:child_process')
const path = require('node:path')

function runIsolated (t, source) {
  const child = spawnSync(process.execPath, [
    '--unhandled-rejections=strict', '-e', source, require.resolve('..')
  ], {
    cwd: path.resolve(__dirname, '..'),
    encoding: 'utf8',
    timeout: 10000
  })
  t.error(child.error, 'isolated process completes')
  t.equal(child.status, 0, child.stderr || 'isolated assertions pass')
  t.end()
}

test('ordinary imports tolerate unavailable proof dependencies until proof use', t => {
  runIsolated(t, `
    const assert = require('node:assert/strict')
    const Module = require('node:module')
    const load = Module._load
    const failure = new Error('proof dependency unavailable')
    const requests = []
    const proofPackages = new Set([
      'eth-proof', 'eth-util-lite', 'eth-object',
      'merkle-patricia-tree', 'ethereumjs-util', 'elliptic'
    ])
    Module._load = function (request) {
      if (proofPackages.has(request)) {
        requests.push(request)
        throw failure
      }
      return load.apply(this, arguments)
    }
    const library = require(process.argv[1])
    assert.equal(typeof library.utils.HDSigner, 'function')
    assert.equal(typeof library.utils.buildEthProof, 'function')
    assert.equal(typeof library.SyscoinJSLib.prototype.assetAllocationMint, 'function')
    assert.deepEqual(requests, [])
    ;(async () => {
      await assert.rejects(library.utils.buildEthProof({}), error => error === failure)
      assert.deepEqual(requests, ['eth-proof'])
    })().catch(error => { console.error(error); process.exitCode = 1 })
  `)
})

test('first proof use loads its dependencies and preserves constructor rejection', t => {
  runIsolated(t, `
    const assert = require('node:assert/strict')
    const Module = require('node:module')
    const load = Module._load
    const requests = []
    const failure = new Error('proof constructor failure')
    const endpoint = 'http://127.0.0.1:1'
    let constructions = 0
    const replacements = {
      'eth-proof': {
        VerifyProof: {},
        GetProof: class {
          constructor (url) {
            assert.equal(url, endpoint)
            constructions++
            throw failure
          }
        }
      },
      'eth-util-lite': { encode () {} },
      'eth-object': { Log: {} }
    }
    Module._load = function (request) {
      if (Object.hasOwn(replacements, request)) {
        requests.push(request)
        return replacements[request]
      }
      return load.apply(this, arguments)
    }
    const library = require(process.argv[1])
    assert.deepEqual(requests, [])
    ;(async () => {
      await assert.rejects(library.utils.buildEthProof({ web3url: endpoint }), error => error === failure)
      assert.deepEqual(requests, ['eth-proof', 'eth-util-lite', 'eth-object'])
      assert.equal(constructions, 1)
    })().catch(error => { console.error(error); process.exitCode = 1 })
  `)
})

test('proof execution failures retain the existing returned-error behavior', t => {
  runIsolated(t, `
    const assert = require('node:assert/strict')
    const Module = require('node:module')
    const load = Module._load
    const failure = new Error('proof request failure')
    const txid = '0x' + '11'.repeat(32)
    let requests = 0
    const replacements = {
      'eth-proof': {
        VerifyProof: {},
        GetProof: class {
          async transactionProof (hash) {
            assert.equal(hash, txid)
            requests++
            throw failure
          }
        }
      },
      'eth-util-lite': { encode () {} },
      'eth-object': { Log: {} }
    }
    Module._load = function (request) {
      if (Object.hasOwn(replacements, request)) return replacements[request]
      return load.apply(this, arguments)
    }
    const library = require(process.argv[1])
    const messages = []
    console.log = message => messages.push(message)
    ;(async () => {
      const result = await library.utils.buildEthProof({ web3url: 'http://127.0.0.1:1', ethtxid: txid })
      assert.equal(result, failure)
      assert.equal(requests, 1)
      assert.deepEqual(messages, ['Exception: proof request failure'])
    })().catch(error => { console.error(error); process.exitCode = 1 })
  `)
})
