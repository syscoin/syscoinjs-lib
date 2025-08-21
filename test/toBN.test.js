const test = require('tape')
const { utils } = require('..')
const { web3, BN } = utils
const { AbiCoder } = require('@ethersproject/abi')

test('toBN handles ethers BigNumber from AbiCoder.decode', t => {
  const abi = new AbiCoder()
  const encoded = abi.encode(['uint256', 'string'], ['123456', 'sys1xyz'])
  const decoded = abi.decode(['uint256', 'string'], encoded)

  const bn = web3.utils.toBN(decoded[0])
  t.ok(BN.isBN(bn), 'returns BN instance')
  t.equal(bn.toString(), '123456', 'correct decimal value')
  t.end()
})

test('toBN passthrough BN instance', t => {
  const orig = new BN('42')
  const bn = web3.utils.toBN(orig)
  t.ok(BN.isBN(bn), 'returns BN')
  t.equal(bn.toString(), '42', 'value preserved')
  t.equal(bn, orig, 'same instance passthrough')
  t.end()
})

test('toBN supports hex and decimal strings', t => {
  t.equal(web3.utils.toBN('0x10').toString(), '16', 'hex string parsed')
  t.equal(web3.utils.toBN('255').toString(), '255', 'decimal string parsed')
  t.end()
})

test('toBN supports numbers and BigInt', t => {
  t.equal(web3.utils.toBN(1000).toString(), '1000', 'number parsed')
  // BigInt support (Node >=10.4)
  t.equal(web3.utils.toBN(1000n).toString(), '1000', 'bigint parsed')
  t.end()
})

test('toBN supports Buffer and Uint8Array', t => {
  const buf = Buffer.from('0f4240', 'hex') // 1000000
  t.equal(web3.utils.toBN(buf).toString(), '1000000', 'buffer parsed as hex')

  const u8 = new Uint8Array([0x0f, 0x42, 0x40])
  t.equal(web3.utils.toBN(u8).toString(), '1000000', 'Uint8Array parsed as hex')
  t.end()
})

test('hexToNumberString supports 0x/0X', t => {
  t.equal(web3.utils.hexToNumberString('0x0f'), '15')
  t.equal(web3.utils.hexToNumberString('0X0f'), '15')
  t.end()
})

test('toBN handles null/undefined as zero', t => {
  t.equal(web3.utils.toBN(null).toString(), '0')
  t.equal(web3.utils.toBN(undefined).toString(), '0')
  t.end()
})
