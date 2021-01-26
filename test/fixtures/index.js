const BN = require('bn.js')
const syscointx = require('syscointx-js')
const scalarPct = 1000
const COIN = 100000000
module.exports = [{
  description: 'new asset',
  version: syscointx.utils.SYSCOIN_TX_VERSION_ASSET_ACTIVATE,
  txOpts: {
    rbf: false
  },
  mnemonic: 'club toss element melody skin ship rifle student reason real interest insane elevator beauty movie',
  feeRate: new BN(10),
  utxoObj: {
    utxos: [
      { txid: 'b61045108705d2a65774238174bfa9110ccaad43a98a9b289a79da0696cac0b8', vout: 0, address: 'tsys1qmedwf9saql9r6r3wzqfk7f7wns5z9ala3m7qmy', path: "m/84'/1'/0'/0/0", value: '100000000000' }
    ]
  },
  assetOpts: { precision: 8, symbol: 'CAT', updatecapabilityflags: 127, maxsupply: new BN(100000000000), description: 'publicvalue' },
  sysChangeAddress: 'tsys1qq43tjdd753rct3jj39yvr855gytwf3y8p5kuf9',
  sysReceivingAddress: 'tsys1qq43tjdd753rct3jj39yvr855gytwf3y8p5kuf9',
  xpubTokens: [{ path: "m/84'/1'/0'/0/0" }],
  expected: {
    hex: '82000000000101b8c0ca9606da799a289b8aa943adca0c11a9bf7481237457a6d20587104510b60000000000ffffffff0200d6117e03000000346a320188b5aa80380101000008c1045130465586681b7b2264657363223a226348566962476c6a646d46736457553d227d007f003e0b65ca130000001600140562b935bea44785c6528948c19e944116e4c48702483045022100dabe897eca8365affbd45864a1712e10f4392a13ad7fd54a6a7803a2d9f39f3e0220673e13a86a46b048a5b8910bb1ecf4b6c2e321296ed065f6e6ca2e56d04fa0430121032563fbbbbe4d1e551f12d01e213d14830db0ae15a781b9c9ebf7f2fe5786eb2100000000',
    rbf: false,
    numOutputs: 2,
    script: Buffer.from('6a320188b5aa80380101000008c1045130465586681b7b2264657363223a226348566962476c6a646d46736457553d227d007f00', 'hex'),
    asset: {
      allocation: [{ assetGuid: '2529870008', values: [{ n: 1, value: new BN(0) }], notarysig: Buffer.from('') }],
      precision: 8,
      updateflags: 193,
      symbol: Buffer.from(syscointx.utils.encodeToBase64('CAT')),
      maxsupply: new BN(100000000000),
      pubdata: syscointx.utils.encodePubDataFromFields({ desc: 'publicvalue' }),
      prevpubdata: Buffer.from(''),
      updatecapabilityflags: 127,
      prevupdatecapabilityflags: 0
    },
    receivingIndex: 0,
    changeIndex: -1
  }
},
{
  description: 'update asset',
  version: syscointx.utils.SYSCOIN_TX_VERSION_ASSET_UPDATE,
  txOpts: {
    rbf: true
  },
  mnemonic: 'club toss element melody skin ship rifle student reason real interest insane elevator beauty movie',
  feeRate: new BN(10),
  utxoObj: {
    utxos: [
      { txid: 'a7f5c979d8fc80f05d8434e04cb9e46cdaa56551d23dd790ba5d7f2c15f529fd', vout: 1, address: 'tsys1qq43tjdd753rct3jj39yvr855gytwf3y8p5kuf9', path: "m/84'/1'/0'/1/0", value: '84999996550', assetInfo: { assetGuid: '2529870008', value: '0' } }
    ],
    assets: [
      {
        assetGuid: '2529870008',
        decimals: 8,
        pubData: { desc: syscointx.utils.encodeToBase64('publicvalue') },
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 127,
        totalSupply: '10000000000',
        maxSupply: '100000000000'
      }
    ]
  },
  assetGuid: '2529870008',
  assetOpts: { updatecapabilityflags: 123, contract: Buffer.from('2b1e58b979e4b2d72d8bca5bb4646ccc032ddbfc', 'hex'), description: 'new publicvalue' },
  sysChangeAddress: 'tsys1qt8aq6hrrlc6ueps4wqc6ynfckrxxrw20ydamc9',
  assetMap: new Map([
    ['2529870008', { changeAddress: 'tsys1qt8aq6hrrlc6ueps4wqc6ynfckrxxrw20ydamc9', outputs: [{ value: new BN(0), address: 'tsys1qt8aq6hrrlc6ueps4wqc6ynfckrxxrw20ydamc9' }] }]
  ]),
  xpubTokens: [
    { path: "m/84'/1'/0'/0/0" },
    { path: "m/84'/1'/0'/1/0" }
  ],
  expected: {
    hex: '83000000000101fd29f5152c7f5dba90d73dd25165a5da6ce4b94ce034845df080fcd879c9f5a70100000000fdffffff020000000000000000636a4c600188b5aa8038010100000843142b1e58b979e4b2d72d8bca5bb4646ccc032ddbfc001f7b2264657363223a22626d563349484231596d787059335a686248566c227d1b7b2264657363223a226348566962476c6a646d46736457553d227d7b7feefb64ca1300000016001459fa0d5c63fe35cc86157031a24d38b0cc61b94f02483045022100cda0cdea85eb92b9e3be778b0bd76fef89178aa8985e834e0cc8a587c125d62e022078f0a5ec6375381c85abc2d38b7f84b8af8e6e7e389e1b35b8154f856f1bd43b012103e4d8568a37e0afb8f220178b640454e91c9e9e7e2425be9e43142a7c3140e2e900000000',
    rbf: true,
    numOutputs: 2,
    script: Buffer.from('6a4c600188b5aa8038010100000843142b1e58b979e4b2d72d8bca5bb4646ccc032ddbfc001f7b2264657363223a22626d563349484231596d787059335a686248566c227d1b7b2264657363223a226348566962476c6a646d46736457553d227d7b7f', 'hex'),
    asset: {
      allocation: [{ assetGuid: '2529870008', values: [{ n: 1, value: new BN(0) }], notarysig: Buffer.from('') }],
      precision: 8,
      updateflags: 67,
      contract: Buffer.from('2b1e58b979e4b2d72d8bca5bb4646ccc032ddbfc', 'hex'),
      prevcontract: Buffer.from(''),
      pubdata: syscointx.utils.encodePubDataFromFields({ desc: 'new publicvalue' }),
      prevpubdata: syscointx.utils.encodePubDataFromFields({ desc: 'publicvalue' }),
      updatecapabilityflags: 123,
      prevupdatecapabilityflags: 127
    },
    receivingIndex: 0,
    changeIndex: 0
  }
},
{
  description: 'transfer asset',
  version: syscointx.utils.SYSCOIN_TX_VERSION_ASSET_UPDATE,
  txOpts: {
    rbf: true
  },
  mnemonic: 'club toss element melody skin ship rifle student reason real interest insane elevator beauty movie',
  feeRate: new BN(10),
  utxoObj: {
    utxos: [
      { txid: 'a7f5c979d8fc80f05d8434e04cb9e46cdaa56551d23dd790ba5d7f2c15f529fd', vout: 1, address: 'tsys1qq43tjdd753rct3jj39yvr855gytwf3y8p5kuf9', path: "m/84'/1'/0'/1/0", value: '84999996550', assetInfo: { assetGuid: '2529870008', value: '0' } }
    ],
    assets: [
      {
        assetGuid: '2529870008',
        decimals: 8,
        pubData: { desc: syscointx.utils.encodeToBase64('publicvalue') },
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 127,
        totalSupply: '10000000000',
        maxSupply: '100000000000'
      }
    ]
  },
  assetGuid: '2529870008',
  assetOpts: { updatecapabilityflags: 123, contract: Buffer.from('2b1e58b979e4b2d72d8bca5bb4646ccc032ddbfc', 'hex'), description: 'new publicvalue' },
  sysChangeAddress: 'tsys1qt8aq6hrrlc6ueps4wqc6ynfckrxxrw20ydamc9',
  assetMap: new Map([
    ['2529870008', { changeAddress: 'tsys1qt8aq6hrrlc6ueps4wqc6ynfckrxxrw20ydamc9', outputs: [{ value: new BN(0), address: 'tsys1qq43tjdd753rct3jj39yvr855gytwf3y8p5kuf9' }] }]
  ]),
  xpubTokens: [
    { path: "m/84'/1'/0'/0/0" },
    { path: "m/84'/1'/0'/1/0" }
  ],
  expected: {
    hex: '83000000000101fd29f5152c7f5dba90d73dd25165a5da6ce4b94ce034845df080fcd879c9f5a70100000000fdffffff03b2020000000000001600140562b935bea44785c6528948c19e944116e4c4870000000000000000636a4c600188b5aa8038010000000843142b1e58b979e4b2d72d8bca5bb4646ccc032ddbfc001f7b2264657363223a22626d563349484231596d787059335a686248566c227d1b7b2264657363223a226348566962476c6a646d46736457553d227d7b7f06f864ca1300000016001459fa0d5c63fe35cc86157031a24d38b0cc61b94f0247304402205b4e80576a6d1ce863c5c3f882b00ef5de018b90b20cac873eadd44705a8336d02203fbf9d2ec0f2f86860282a0f906a2a4beebd8cd62f888c95b3cabfdc44fee0c9012103e4d8568a37e0afb8f220178b640454e91c9e9e7e2425be9e43142a7c3140e2e900000000',
    rbf: true,
    numOutputs: 3,
    script: Buffer.from('6a4c600188b5aa8038010000000843142b1e58b979e4b2d72d8bca5bb4646ccc032ddbfc001f7b2264657363223a22626d563349484231596d787059335a686248566c227d1b7b2264657363223a226348566962476c6a646d46736457553d227d7b7f', 'hex'),
    asset: {
      allocation: [{ assetGuid: '2529870008', values: [{ n: 0, value: new BN(0) }], notarysig: Buffer.from('') }],
      precision: 8,
      updateflags: 67,
      contract: Buffer.from('2b1e58b979e4b2d72d8bca5bb4646ccc032ddbfc', 'hex'),
      prevcontract: Buffer.from(''),
      pubdata: syscointx.utils.encodePubDataFromFields({ desc: 'new publicvalue' }),
      prevpubdata: syscointx.utils.encodePubDataFromFields({ desc: 'publicvalue' }),
      updatecapabilityflags: 123,
      prevupdatecapabilityflags: 127
    },
    receivingIndex: 0,
    changeIndex: 0
  }
},
{
  description: 'transfer asset with SYS change to new output',
  version: syscointx.utils.SYSCOIN_TX_VERSION_ASSET_UPDATE,
  txOpts: {
    rbf: true
  },
  mnemonic: 'club toss element melody skin ship rifle student reason real interest insane elevator beauty movie',
  feeRate: new BN(10),
  utxoObj: {
    utxos: [
      { txid: 'a7f5c979d8fc80f05d8434e04cb9e46cdaa56551d23dd790ba5d7f2c15f529fd', vout: 1, address: 'tsys1qq43tjdd753rct3jj39yvr855gytwf3y8p5kuf9', path: "m/84'/1'/0'/1/0", value: '84999996550', assetInfo: { assetGuid: '2529870008', value: '0' } }
    ],
    assets: [
      {
        assetGuid: '2529870008',
        decimals: 8,
        pubData: { desc: syscointx.utils.encodeToBase64('publicvalue') },
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 127,
        totalSupply: '10000000000',
        maxSupply: '100000000000'
      }
    ]
  },
  assetGuid: '2529870008',
  assetOpts: { updatecapabilityflags: 123, contract: Buffer.from('2b1e58b979e4b2d72d8bca5bb4646ccc032ddbfc', 'hex'), description: 'new publicvalue' },
  sysChangeAddress: 'tsys1qp7qn0t0t6ymwhdwne9uku7v3dhw07a7tra8hzl',
  assetMap: new Map([
    ['2529870008', { outputs: [{ value: new BN(0), address: 'tsys1qcflmge9vann8405ws2y69jwt94sv40kd7rqexs' }] }]
  ]),
  xpubTokens: [
    { path: "m/84'/1'/0'/0/0" },
    { path: "m/84'/1'/0'/1/0" }
  ],
  expected: {
    hex: '83000000000101fd29f5152c7f5dba90d73dd25165a5da6ce4b94ce034845df080fcd879c9f5a70100000000fdffffff03b202000000000000160014c27fb464acece67abe8e8289a2c9cb2d60cabecd0000000000000000636a4c600188b5aa8038010000000843142b1e58b979e4b2d72d8bca5bb4646ccc032ddbfc001f7b2264657363223a22626d563349484231596d787059335a686248566c227d1b7b2264657363223a226348566962476c6a646d46736457553d227d7b7f06f864ca130000001600140f8137adebd136ebb5d3c9796e79916ddcff77cb0248304502210095b96abaf37958e49db7c320876b0474580a20f427819ea1ce4e201d75cd3a9f0220308711a469227b20bd3cca991ab06d1ffb309a6645eaf2599c1c4af433a10ea0012103e4d8568a37e0afb8f220178b640454e91c9e9e7e2425be9e43142a7c3140e2e900000000',
    rbf: true,
    numOutputs: 3,
    script: Buffer.from('6a4c600188b5aa8038010000000843142b1e58b979e4b2d72d8bca5bb4646ccc032ddbfc001f7b2264657363223a22626d563349484231596d787059335a686248566c227d1b7b2264657363223a226348566962476c6a646d46736457553d227d7b7f', 'hex'),
    asset: {
      allocation: [{ assetGuid: '2529870008', values: [{ n: 0, value: new BN(0) }], notarysig: Buffer.from('') }],
      precision: 8,
      updateflags: 67,
      contract: Buffer.from('2b1e58b979e4b2d72d8bca5bb4646ccc032ddbfc', 'hex'),
      prevcontract: Buffer.from(''),
      pubdata: syscointx.utils.encodePubDataFromFields({ desc: 'new publicvalue' }),
      prevpubdata: syscointx.utils.encodePubDataFromFields({ desc: 'publicvalue' }),
      updatecapabilityflags: 123,
      prevupdatecapabilityflags: 127
    },
    receivingIndex: 0,
    changeIndex: 0
  }
},
{
  description: 'send asset',
  version: syscointx.utils.SYSCOIN_TX_VERSION_ASSET_SEND,
  txOpts: {
    rbf: false // use zdag
  },
  mnemonic: 'club toss element melody skin ship rifle student reason real interest insane elevator beauty movie',
  feeRate: new BN(10),
  utxoObj: {
    utxos: [
      { txid: '90652f37eeb24374d8cfef5b73ac4c10e31fb54ac864e0d9f8250af76985eb9d', vout: 1, address: 'tsys1qt8aq6hrrlc6ueps4wqc6ynfckrxxrw20ydamc9', path: "m/84'/1'/0'/1/2", value: '84999992600', assetInfo: { assetGuid: '2529870008', value: '0' } }
    ],
    assets: [
      {
        assetGuid: '2529870008',
        decimals: 8,
        pubData: { desc: syscointx.utils.encodeToBase64('new publicvalue') },
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 127,
        totalSupply: '10000000000',
        maxSupply: '100000000000'
      }
    ]
  },
  sysChangeAddress: 'tsys1qp7qn0t0t6ymwhdwne9uku7v3dhw07a7tra8hzl',
  assetMap: new Map([
    ['2529870008', { outputs: [{ value: new BN(1000000000), address: 'tsys1qsvcfskmtg0rlh03v2aazvhqj3r7gkqnzaej258' }] }]
  ]),
  xpubTokens: [
    { path: "m/84'/1'/0'/0/0" },
    { path: "m/84'/1'/0'/1/0" },
    { path: "m/84'/1'/0'/1/2" }
  ],
  expected: {
    hex: '840000000001019deb8569f70a25f8d9e064c84ab51fe3104cac735befcfd87443b2ee372f65900100000000ffffffff03b2020000000000001600148330985b6b43c7fbbe2c577a265c1288fc8b026200000000000000000e6a0c0188b5aa803802000a020000eaeb64ca130000001600140f8137adebd136ebb5d3c9796e79916ddcff77cb0247304402204efa4b5886ad6efa559bad2d582e5270b8f296246421e03039a540586aaaa16e0220772edaa6d4cb468ae5f8de547b6e27f06af3338e99a0ad54ba3e0c2a35ac2994012102f249cb8576b8d9c6f0d45bb3ab3b73654911b724f229ec0a5a2f45785e1e47c900000000',
    rbf: false,
    numOutputs: 3,
    script: Buffer.from('6a0c0188b5aa803802000a020000', 'hex'),
    asset: {
      allocation: [{ assetGuid: '2529870008', values: [{ n: 0, value: new BN(1000000000) }, { n: 2, value: new BN(0) }], notarysig: Buffer.from('') }]
    },
    receivingIndex: 0,
    changeIndex: 2
  }
},
{
  description: 'send asset with zero val input',
  version: syscointx.utils.SYSCOIN_TX_VERSION_ASSET_SEND,
  txOpts: {
    rbf: true
  },
  mnemonic: 'club toss element melody skin ship rifle student reason real interest insane elevator beauty movie',
  feeRate: new BN(10),
  utxoObj: {
    utxos: [
      { txid: '5e9c72abf1d3df7ac5f673de603cd7946b25e58de8e8f87a852ba291790a5181', vout: 0, address: 'tsys1qt8aq6hrrlc6ueps4wqc6ynfckrxxrw20ydamc9', path: "m/84'/1'/0'/1/2", value: '5000', assetInfo: { assetGuid: '1635229536', value: '886' } },
      { txid: '5e9c72abf1d3df7ac5f673de603cd7946b25e58de8e8f87a852ba291790a5181', vout: 1, address: 'tsys1qt8aq6hrrlc6ueps4wqc6ynfckrxxrw20ydamc9', path: "m/84'/1'/0'/1/2", value: '690', assetInfo: { assetGuid: '1635229536', value: '0' } }
    ],
    assets: [
      {
        assetGuid: '1635229536',
        decimals: 8,
        pubData: { desc: syscointx.utils.encodeToBase64('publicvalue') },
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 127,
        totalSupply: '0',
        maxSupply: '100000000000'
      }
    ]
  },
  sysChangeAddress: 'tsys1qcflmge9vann8405ws2y69jwt94sv40kd7rqexs',
  assetMap: new Map([
    ['1635229536', { outputs: [{ value: new BN(1000000000), address: 'tsys1qp7qn0t0t6ymwhdwne9uku7v3dhw07a7tra8hzl' }] }]
  ]),
  xpubTokens: [
    { path: "m/84'/1'/0'/0/0" },
    { path: "m/84'/1'/0'/1/0" },
    { path: "m/84'/1'/0'/1/2" }
  ],
  expected: {
    hex: '8400000000010281510a7991a22b857af8e8e88de5256b94d73c60de73f6c57adfd3f1ab729c5e0100000000fdffffff81510a7991a22b857af8e8e88de5256b94d73c60de73f6c57adfd3f1ab729c5e0000000000fdffffff04b2020000000000001600140f8137adebd136ebb5d3c9796e79916ddcff77cbb202000000000000160014c27fb464acece67abe8e8289a2c9cb2d60cabecd0000000000000000116a0f01858addbd6003000a010003bd2300b202000000000000160014c27fb464acece67abe8e8289a2c9cb2d60cabecd02483045022100f76a8842210aa6f5a5e92ec6cb34bc954ccca0e92bd564ff5f30467649a36ffa0220572e6ba3744c597f1762762742d36afe77d420fb345296b16c83370277699397012102f249cb8576b8d9c6f0d45bb3ab3b73654911b724f229ec0a5a2f45785e1e47c902483045022100e4ef71fd3993127ac5d57711a5c13bf628755b551d0ae552ce5b67edd10d3d75022026cd8801f2de305bdc84336ea67050ac1edb63bcede7daeaffe06fc94fff1823012102f249cb8576b8d9c6f0d45bb3ab3b73654911b724f229ec0a5a2f45785e1e47c900000000',
    rbf: true,
    numOutputs: 4,
    script: Buffer.from('6a0f01858addbd6003000a010003bd2300', 'hex'),
    asset: {
      allocation: [{ assetGuid: '1635229536', values: [{ n: 0, value: new BN(1000000000) }, { n: 1, value: new BN(0) }, { n: 3, value: new BN(886) }], notarysig: Buffer.from('') }]
    },
    receivingIndex: 0,
    changeIndex: 2
  }
},
{
  description: 'send asset allocation',
  version: syscointx.utils.SYSCOIN_TX_VERSION_ALLOCATION_SEND,
  txOpts: {
    rbf: true
  },
  mnemonic: 'club toss element melody skin ship rifle student reason real interest insane elevator beauty movie',
  feeRate: new BN(10),
  utxoObj: {
    utxos: [
      { txid: '44f1038835a563bacdbaa9873b35f97d968ecf1e1bf53452b5fcabd1bfdfad35', vout: 0, address: 'tsys1qsgtj3pujwgfgakjjen94j3g9wmw95l837srurc', path: "m/84'/1'/0'/1/3", value: '980', assetInfo: { assetGuid: '2529870008', value: '1000000000' } },
      { txid: '3f0536c23125183e99bfd021fb6a7bb279ccc739356985058cfc15b0a0e52946', vout: 0, address: 'tsys1qp7qn0t0t6ymwhdwne9uku7v3dhw07a7tra8hzl', path: "m/84'/1'/0'/1/1", value: '84999988550' }
    ],
    assets: [
      {
        assetGuid: '2529870008',
        decimals: 8,
        pubData: { desc: syscointx.utils.encodeToBase64('new publicvalue') },
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 127,
        totalSupply: '10000000000',
        maxSupply: '100000000000'
      }
    ]
  },
  sysChangeAddress: 'tsys1qcflmge9vann8405ws2y69jwt94sv40kd7rqexs',
  assetMap: new Map([
    ['2529870008', { changeAddress: 'tsys1qcflmge9vann8405ws2y69jwt94sv40kd7rqexs', outputs: [{ value: new BN(600000000), address: 'tsys1q3hqp7rgcvsphpcy3rxyhjwvyv647mz58peqctz' }] }]
  ]),
  xpubTokens: [
    { path: "m/84'/1'/0'/0/0" },
    { path: "m/84'/1'/0'/1/0" },
    { path: "m/84'/1'/0'/1/2" },
    { path: "m/84'/1'/0'/1/3" },
    { path: "m/84'/1'/0'/1/1" }
  ],
  expected: {
    hex: '8700000000010235addfbfd1abfcb55234f51b1ecf8e967df9353b87a9bacdba63a5358803f1440000000000fdffffff4629e5a0b015fc8c0585693539c7cc79b27b6afb21d0bf993e182531c236053f0000000000fdffffff03b2020000000000001600148dc01f0d18640370e091198979398466abed8a8700000000000000000e6a0c0188b5aa803802003b0227003add64ca13000000160014c27fb464acece67abe8e8289a2c9cb2d60cabecd0247304402201940dd0f4abdba846641a25f94a907741bb6b57c97f1f29d8ad001b4b00701e402202ab6235c7ae8fb50c7f309a61e65465a62c2092908975513cb96d779ddddd1fc012103e493f90c55de11c1b3aa3fc13b337807c7c1e121a2767856cfd6946e18c7fcc102483045022100a653af6d02be32ecd2d3c7c430aa9295bef1ce295d24ec7031df49c5a0af677302201d544929de4a2761f8a5694d07a56e1b2e004a064f90e4fd8a8715b2b66e13f1012102e58139f9d633d5d1d76feb87fc2c44705cc317e83ade1a812f8d2a4ae7be9cb500000000',
    rbf: true,
    numOutputs: 3,
    script: Buffer.from('6a0c0188b5aa803802003b022700', 'hex'),
    asset: {
      allocation: [{ assetGuid: '2529870008', values: [{ n: 0, value: new BN(600000000) }, { n: 2, value: new BN(400000000) }], notarysig: Buffer.from('') }]
    },
    receivingIndex: 0,
    changeIndex: 3
  }
},
{
  description: 'send asset allocation with zero val input',
  version: syscointx.utils.SYSCOIN_TX_VERSION_ALLOCATION_SEND,
  txOpts: {
    rbf: true
  },
  mnemonic: 'club toss element melody skin ship rifle student reason real interest insane elevator beauty movie',
  feeRate: new BN(10),
  utxoObj: {
    utxos: [
      { txid: '61b28c96c9e02a63206799c7928f0a10da7f32196a0105f5a414a223db674c23', vout: 0, address: 'tsys1qdflre2yd37qtpqe2ykuhwandlhq04r2td2t9ae', path: "m/84'/1'/0'/1/13", value: '690', assetInfo: { assetGuid: '1521018962', value: '1000' } },
      { txid: '61b28c96c9e02a63206799c7928f0a10da7f32196a0105f5a414a223db674c23', vout: 2, address: 'tsys1qt8aq6hrrlc6ueps4wqc6ynfckrxxrw20ydamc9', path: "m/84'/1'/0'/1/2", value: '11984999987590', assetInfo: { assetGuid: '1521018962', value: '0' } }
    ],
    assets: [
      {
        assetGuid: '1521018962',
        decimals: 8,
        pubData: { desc: syscointx.utils.encodeToBase64('new publicvalue') },
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 127,
        totalSupply: '10000000000',
        maxSupply: '100000000000'
      }
    ]
  },
  sysChangeAddress: 'tsys1ql97jxj6fr3jd85e50423ava3495nhzwe4axyad',
  assetMap: new Map([
    ['1521018962', { changeAddress: 'tsys1ql97jxj6fr3jd85e50423ava3495nhzwe4axyad', outputs: [{ value: new BN(10), address: 'tsys1qdflre2yd37qtpqe2ykuhwandlhq04r2td2t9ae' }] }]
  ]),
  xpubTokens: [
    { path: "m/84'/1'/0'/0/0" },
    { path: "m/84'/1'/0'/1/0" },
    { path: "m/84'/1'/0'/1/2" },
    { path: "m/84'/1'/0'/1/13" },
    { path: "m/84'/1'/0'/1/1" }
  ],
  expected: {
    hex: '87000000000102234c67db23a214a4f505016a19327fda100a8f92c7996720632ae0c9968cb2610000000000fdffffff234c67db23a214a4f505016a19327fda100a8f92c7996720632ae0c9968cb2610200000000fdffffff04b2020000000000001600146a7e3ca88d8f80b0832a25b977766dfdc0fa8d4b0000000000000000116a0f0184d4a2cf5203000202857c03000052acaa79e60a0000160014f97d234b491c64d3d3347d551eb3b1a9693b89d9b202000000000000160014f97d234b491c64d3d3347d551eb3b1a9693b89d90247304402204963aa365c4a177d0cd81daed1ef4a9e43418286f8450cd87e268e6d774eb4c6022024535ff9a3265872d8c052a2b8b91e0e1ff2903d02b870e144485f355bfe0bdf01210341e88f7fd83e582b8c673149b25d3879926e0490df8cd9c530560feb536a7fa20247304402202333ab8937c78f00f7b540cf5b838f68854a7f6bca10a77fe3a2fb9fd9a322a8022004cd14ddc88dbc655a37ecb70b7a400b3c7dcfe8bfe79820cf484c02e5c3c837012102f249cb8576b8d9c6f0d45bb3ab3b73654911b724f229ec0a5a2f45785e1e47c900000000',
    rbf: true,
    numOutputs: 4,
    script: Buffer.from('6a0f0184d4a2cf5203000202857c030000', 'hex'),
    asset: {
      allocation: [{ assetGuid: '1521018962', values: [{ n: 0, value: new BN(10) }, { n: 2, value: new BN(990) }, { n: 3, value: new BN(0) }], notarysig: Buffer.from('') }]
    },
    receivingIndex: 0,
    changeIndex: 13
  }
},
{
  description: 'send multi asset allocations with notarization',
  version: syscointx.utils.SYSCOIN_TX_VERSION_ALLOCATION_SEND,
  txOpts: {
    rbf: true // don't use zdag as size of tx is large
  },
  mnemonic: 'club toss element melody skin ship rifle student reason real interest insane elevator beauty movie',
  feeRate: new BN(10),
  utxoObj: {
    utxos: [
      { txid: 'c5c2af64e6f8d0732b2250416eecc063f22161b9cd14eda802c97ed518d173e0', vout: 0, address: 'tsys1qarxqg2nuja4tqp5v7rj0etjggh2pwa98ur30gw', path: "m/84'/1'/0'/0/4", value: '980', assetInfo: { assetGuid: '2369540753', value: '100000000' } },
      { txid: '4fdab120b984f7bcf0c9458f9783ec0b3169a292de7e40a2612db1f7d4fd6efb', vout: 0, address: 'tsys1qjfcltq5yljfzkljxdnlc0ffmhqudz8ltq0z695', path: "m/84'/1'/0'/0/5", value: '980', assetInfo: { assetGuid: '650700076', value: '200000000' } },
      { txid: '931dbdcd8098918e306c43c2f9ee9a6c2fac4c06190a669809c83f3a48f7b522', vout: 0, address: 'tsys1qyj99y8u9vxhc7u6apa0x6yl5z9m7ggaanqlmzk', path: "m/84'/1'/0'/0/6", value: '980', assetInfo: { assetGuid: '2699372871', value: '300000000' } },
      { txid: '66d6841bef92b91344f793bbd43b2cd139e9da4b82b6f13e9e967cf793c384e1', vout: 0, address: 'tsys1qwmwuw69e4c3wyez76xskrjlpek0v2thmkf6584', path: "m/84'/1'/0'/0/11", value: '294', assetInfo: { assetGuid: '402223530', value: '400000000' } }, // m/84'/1'/0'/0/7 had some kind of collision the pub/priv key didn't match between js and core
      { txid: '212680579797d8bf19a2c4bbde5fb7f35296b82ed02c7d0a22281d1d2a47edf2', vout: 0, address: 'tsys1qwvn92ygjm5ff73utfgl7f74cp8rlktgvhtxmgm', path: "m/84'/1'/0'/0/8", value: '980', assetInfo: { assetGuid: '1537060536', value: '500000000' } },
      { txid: '57219dc0fd292caa06c54e1af6125323181a4c86921442e6d508275b30086682', vout: 0, address: 'tsys1qgylgl55m9an3kczce86shagml9cjwnjny3slu5', path: "m/84'/1'/0'/0/9", value: '980', assetInfo: { assetGuid: '2305793883', value: '600000000' } },
      { txid: 'c8a2159c47a5af4251b0576ce22d859996f9e9fbfffc804a9bd745848fe3d642', vout: 0, address: 'tsys1qh4k0mpx4xqju3zgcvtkynvqrd5ryqhg0yr9uk8', path: "m/84'/1'/0'/0/10", value: '100000000' }
    ],
    assets: [
      {
        assetGuid: '2369540753',
        decimals: 8,
        pubData: { desc: syscointx.utils.encodeToBase64('publicvalue') },
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 127,
        totalSupply: '0',
        maxSupply: '100000000000',
        notaryKeyID: 'X1egKJRfW1uirvT9K1EgY+eF3PU=', // base64 of keyid for tsys1qtat6q2y5tad4hg4w7n7jk5fqv0ncth84puexca (m/84’/1’/0’/0/3)
        notaryDetails: {
          endPoint: 'https://test.com',
          instantTransfers: 0,
          HDRequired: 1
        },
        // for unit test only, this normally wouldn't come in payload
        notarySig: 'H5ZrZe8aCarhYzmgkvqoCilr1x4sbqTkpkD45uSaYbafb73oGnd/MaoLZxfGFz7DdSU25TH77raRxflWOGKTUTo='
      },
      {
        assetGuid: '650700076',
        decimals: 8,
        pubData: { desc: syscointx.utils.encodeToBase64('publicvalue') },
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 127,
        totalSupply: '0',
        maxSupply: '100000000000',
        notaryKeyID: 'X1egKJRfW1uirvT9K1EgY+eF3PU=',
        notaryDetails: {
          endPoint: 'https://test.com',
          instantTransfers: 0,
          HDRequired: 1
        },
        notarySig: 'IBdEHC3NeRiitPNXO0kXNauwzeLL/HK3VvusKanpx/PENy22LOzi/cLAKyZIL0N96ffCAmkePVkxnw0pS4nuAbM='
      },
      {
        assetGuid: '2699372871',
        decimals: 8,
        pubData: { desc: syscointx.utils.encodeToBase64('publicvalue') },
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 127,
        totalSupply: '0',
        maxSupply: '100000000000',
        notaryKeyID: 'X1egKJRfW1uirvT9K1EgY+eF3PU=',
        notaryDetails: {
          endPoint: 'https://test.com',
          instantTransfers: 0,
          HDRequired: 1
        },
        notarySig: 'H2N6qBi/BZgS1FyvYMvIYekeyabZCk2xwQbIf7SCQRYkf+YLAKEu/aY9oiVlihuGIBNVZXeL/nduYzCTpmA7XgE='
      },
      {
        assetGuid: '402223530',
        decimals: 8,
        pubData: { desc: syscointx.utils.encodeToBase64('publicvalue') },
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 127,
        totalSupply: '0',
        maxSupply: '100000000000',
        notaryKeyID: 'X1egKJRfW1uirvT9K1EgY+eF3PU=',
        notaryDetails: {
          endPoint: 'https://test.com',
          instantTransfers: 0,
          HDRequired: 1
        },
        notarySig: 'IOKXQEHh4+jz6zICP5KA4g54wL1Tx+6UpY0SoMwtO4glL3jVYsRMWas92OP0pVRQ2Qa5lBlxLqCEeCAqdc+wsz0='
      },
      {
        assetGuid: '1537060536',
        decimals: 8,
        pubData: { desc: syscointx.utils.encodeToBase64('publicvalue') },
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 127,
        totalSupply: '0',
        maxSupply: '100000000000',
        notaryKeyID: 'X1egKJRfW1uirvT9K1EgY+eF3PU=',
        notaryDetails: {
          endPoint: 'https://test.com',
          instantTransfers: 0,
          HDRequired: 1
        },
        notarySig: 'H5zJsmzAuqY8czH2yx4viw2jQjapfgY/8gO4mQroB4e/Y8DWEBerH1CRnNbefPNPt0RwU22D8rzMx13irZpA1xw='
      },
      {
        assetGuid: '2305793883',
        decimals: 8,
        pubData: { desc: syscointx.utils.encodeToBase64('publicvalue') },
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 127,
        totalSupply: '0',
        maxSupply: '100000000000'
      }
    ]
  },
  sysChangeAddress: 'tsys1qh4k0mpx4xqju3zgcvtkynvqrd5ryqhg0yr9uk8',
  assetMap: new Map([
    ['2369540753', { changeAddress: 'tsys1qarxqg2nuja4tqp5v7rj0etjggh2pwa98ur30gw', outputs: [{ value: new BN(50000000), address: 'tsys1qarxqg2nuja4tqp5v7rj0etjggh2pwa98ur30gw' }, { value: new BN(50000000), address: 'tsys1qarxqg2nuja4tqp5v7rj0etjggh2pwa98ur30gw' }] }],
    ['650700076', { changeAddress: 'tsys1qjfcltq5yljfzkljxdnlc0ffmhqudz8ltq0z695', outputs: [{ value: new BN(200000000), address: 'tsys1qjfcltq5yljfzkljxdnlc0ffmhqudz8ltq0z695' }] }],
    ['2699372871', { changeAddress: 'tsys1qyj99y8u9vxhc7u6apa0x6yl5z9m7ggaanqlmzk', outputs: [{ value: new BN(250000000), address: 'tsys1qyj99y8u9vxhc7u6apa0x6yl5z9m7ggaanqlmzk' }] }],
    ['402223530', { changeAddress: 'tsys1qtqwylszrnxrtwcd4zy8ws6nqlrzk8a7282uehx', outputs: [{ value: new BN(300000000), address: 'tsys1qtqwylszrnxrtwcd4zy8ws6nqlrzk8a7282uehx' }] }],
    ['1537060536', { changeAddress: 'tsys1qwvn92ygjm5ff73utfgl7f74cp8rlktgvhtxmgm', outputs: [{ value: new BN(350000000), address: 'tsys1qwvn92ygjm5ff73utfgl7f74cp8rlktgvhtxmgm' }] }],
    ['2305793883', { changeAddress: 'tsys1qgylgl55m9an3kczce86shagml9cjwnjny3slu5', outputs: [{ value: new BN(500000000), address: 'tsys1qgylgl55m9an3kczce86shagml9cjwnjny3slu5' }] }]
  ]),
  xpubTokens: [
    { path: "m/84'/1'/0'/0/0" },
    { path: "m/84'/1'/0'/1/0" },
    { path: "m/84'/1'/0'/1/2" },
    { path: "m/84'/1'/0'/1/3" },
    { path: "m/84'/1'/0'/1/1" },
    { path: "m/84'/1'/0'/0/4" },
    { path: "m/84'/1'/0'/0/5" },
    { path: "m/84'/1'/0'/0/6" },
    { path: "m/84'/1'/0'/0/8" },
    { path: "m/84'/1'/0'/0/9" },
    { path: "m/84'/1'/0'/0/10" },
    { path: "m/84'/1'/0'/0/11" }
  ],
  expected: {
    hex: '87000000000107e073d118d57ec902a8ed14cdb96121f263c0ec6e4150222b73d0f8e664afc2c50000000000fdfffffffb6efdd4f7b12d61a2407ede92a269310bec83978f45c9f0bcf784b920b1da4f0000000000fdffffff22b5f7483a3fc80998660a19064cac2f6c9aeef9c2436c308e919880cdbd1d930000000000fdffffffe184c393f77c969e3ef1b6824bdae939d12c3bd4bb93f74413b992ef1b84d6660000000000fdfffffff2ed472a1d1d28220a7d2cd02eb89652f3b75fdebbc4a219bfd89797578026210000000000fdffffff826608305b2708d5e6421492864c1a18235312f61a4ec506aa2c29fdc09d21570000000000fdffffff42d6e38f8445d79b4a80fcfffbe9f99699852de26c57b05142afa5479c15a2c80000000000fdffffff0cb202000000000000160014e8cc042a7c976ab0068cf0e4fcae4845d41774a7b2020000000000001600149271f58284fc922b7e466cff87a53bb838d11febb202000000000000160014248a521f8561af8f735d0f5e6d13f41177e423bdb202000000000000160014248a521f8561af8f735d0f5e6d13f41177e423bdb202000000000000160014581c4fc0439986b761b5110ee86a60f8c563f7cab202000000000000160014581c4fc0439986b761b5110ee86a60f8c563f7cab2020000000000001600147326551112dd129f478b4a3fe4fab809c7fb2d0cb2020000000000001600147326551112dd129f478b4a3fe4fab809c7fb2d0cb202000000000000160014413e8fd29b2f671b6058c9f50bf51bf971274e53b202000000000000160014413e8fd29b2f671b6058c9f50bf51bf971274e530000000000000000fd8d016a4d89010687e8f0a411020b300030411f966b65ef1a09aae16339a092faa80a296bd71e2c6ea4e4a640f8e6e49a61b69f6fbde81a777f31aa0b6717c6173ec3752536e531fbeeb691c5f956386293513a81b5a2c92c010113412017441c2dcd7918a2b4f3573b491735abb0cde2cbfc72b756fbac29a9e9c7f3c4372db62cece2fdc2c02b26482f437de9f7c202691e3d59319f0d294b89ee01b3898693d147020280640330411f637aa818bf059812d45caf60cbc861e91ec9a6d90a4db1c106c87fb4824116247fe60b00a12efda63da225658a1b8620135565778bfe776e633093a6603b5e0180bee4e22a02041d05094120e2974041e1e3e8f3eb32023f9280e20e78c0bd53c7ee94a58d12a0cc2d3b88252f78d562c44c59ab3dd8e3f4a55450d906b99419712ea08478202a75cfb0b33d84dbf5dc380206813e07800a411f9cc9b26cc0baa63c7331f6cb1e2f8b0da34236a97e063ff203b8990ae80787bf63c0d61017ab1f50919cd6de7cf34fb74470536d83f2bcccc75de2ad9a40d71c87cabdbd5b020831090900d2a9f50500000000160014e8cc042a7c976ab0068cf0e4fcae4845d41774a70247304402203b3423a52e10fec216c37018cc2920cabc086467505b8bebe7aa762353a3410902200741459db1796f9081fd244682cb1021f067d3a7e6412f6ad2e76e7303dc1cb001210281c11974da83e7d9ff9f47a3c32e3baa7975b5127eb447b86a2f7fd4c9d12fec02483045022100913fb2e248a349f45df8e6b8cd451d326be85b8e9b751f49efbe33eee1bd1a6602206f9b12061264ecdda80965317778066f958c4320c6c312618ffeb68b8b010b98012103c86473f098d9bb69d31a7851372f9ded7b11691a77c253279e987373164b2ad202483045022100f0bfc4e5349052878db0d1bbcf32f76652ee297a5e7d16e0d7757bfac0a93725022000af0ff624eda3fa91e96272c0567b8c2aa9592c95dcd879e6b5159a94c09e95012102f165ced59862353282a8fd32ac10d018c4bc449e6dabc77a7d810ca2be6f69fd02473044022079f59114fb3f5b7690501cbdd02e2c112a040e5d9412bc085520a48a02de981102202736ae4d9e3e25d96e1ec5b136b6a76d583d94f4cc70f3b6d3e67dd3e45c18080121025eea502cd2da208247cdd27701a2efea1e64aebf7c476362c1a6c0d1416c25f30247304402200a987ab9962a013e5d9d191408afdac8e05a4e666d589bcf6ad757c003350893022046c35eda8cd85e36561170f95b0482db8a783055274c446eecaf233a4a86c18f012102ccb8a1b346388ff9691d6ee1b2019956e93e5550130cbfe2e866477193b22a3f0247304402201c7fa36ad7e83af3a883eafe99827c1cdf6990f75bfd66e6254632401b783abe02205678b7a877eb5cfa18a2e3ee7d8d8f7a4241d153ad5d1d65214f346e742585ea012102b7d4e03f4230eb2406328be6bf9dbd400083b929c07a4b0b3601589b32430674024730440220722cf67ff2c0cb104d953641b16d33e673fc512ed59cc1b74f076e85773f8d78022063226380d170accbd62225f4ec5c2d53f2a6b0aa35663b0c764d6596ad909cb0012103b7eeb47fdd1c2084ef795fac22bf24185e7295d2efa3178b69b6eca409810fba00000000',
    rbf: true,
    numOutputs: 12,
    script: Buffer.from('6a4d89010687e8f0a411020b300030411f966b65ef1a09aae16339a092faa80a296bd71e2c6ea4e4a640f8e6e49a61b69f6fbde81a777f31aa0b6717c6173ec3752536e531fbeeb691c5f956386293513a81b5a2c92c010113412017441c2dcd7918a2b4f3573b491735abb0cde2cbfc72b756fbac29a9e9c7f3c4372db62cece2fdc2c02b26482f437de9f7c202691e3d59319f0d294b89ee01b3898693d147020280640330411f637aa818bf059812d45caf60cbc861e91ec9a6d90a4db1c106c87fb4824116247fe60b00a12efda63da225658a1b8620135565778bfe776e633093a6603b5e0180bee4e22a02041d05094120e2974041e1e3e8f3eb32023f9280e20e78c0bd53c7ee94a58d12a0cc2d3b88252f78d562c44c59ab3dd8e3f4a55450d906b99419712ea08478202a75cfb0b33d84dbf5dc380206813e07800a411f9cc9b26cc0baa63c7331f6cb1e2f8b0da34236a97e063ff203b8990ae80787bf63c0d61017ab1f50919cd6de7cf34fb74470536d83f2bcccc75de2ad9a40d71c87cabdbd5b020831090900', 'hex'),
    asset: {
      allocation: [{ assetGuid: '2369540753', values: [{ n: 11, value: new BN(50000000) }, { n: 0, value: new BN(50000000) }], notarysig: Buffer.from('H5ZrZe8aCarhYzmgkvqoCilr1x4sbqTkpkD45uSaYbafb73oGnd/MaoLZxfGFz7DdSU25TH77raRxflWOGKTUTo=', 'base64') },
        { assetGuid: '650700076', values: [{ n: 1, value: new BN(200000000) }], notarysig: Buffer.from('IBdEHC3NeRiitPNXO0kXNauwzeLL/HK3VvusKanpx/PENy22LOzi/cLAKyZIL0N96ffCAmkePVkxnw0pS4nuAbM=', 'base64') },
        { assetGuid: '2699372871', values: [{ n: 2, value: new BN(250000000) }, { n: 3, value: new BN(50000000) }], notarysig: Buffer.from('H2N6qBi/BZgS1FyvYMvIYekeyabZCk2xwQbIf7SCQRYkf+YLAKEu/aY9oiVlihuGIBNVZXeL/nduYzCTpmA7XgE=', 'base64') },
        { assetGuid: '402223530', values: [{ n: 4, value: new BN(300000000) }, { n: 5, value: new BN(100000000) }], notarysig: Buffer.from('IOKXQEHh4+jz6zICP5KA4g54wL1Tx+6UpY0SoMwtO4glL3jVYsRMWas92OP0pVRQ2Qa5lBlxLqCEeCAqdc+wsz0=', 'base64') },
        { assetGuid: '1537060536', values: [{ n: 6, value: new BN(350000000) }, { n: 7, value: new BN(150000000) }], notarysig: Buffer.from('H5zJsmzAuqY8czH2yx4viw2jQjapfgY/8gO4mQroB4e/Y8DWEBerH1CRnNbefPNPt0RwU22D8rzMx13irZpA1xw=', 'base64') },
        { assetGuid: '2305793883', values: [{ n: 8, value: new BN(500000000) }, { n: 9, value: new BN(100000000) }], notarysig: Buffer.from('') }]
    },
    receivingIndex: 11,
    changeIndex: 3
  }
},
{
  description: 'send multi asset allocations (varied sys values) with notarization',
  version: syscointx.utils.SYSCOIN_TX_VERSION_ALLOCATION_SEND,
  txOpts: {
    rbf: false // should override rbf as size of tx is > 1100
  },
  mnemonic: 'club toss element melody skin ship rifle student reason real interest insane elevator beauty movie',
  feeRate: new BN(10),
  utxoObj: {
    utxos: [
      { txid: 'c5c2af64e6f8d0732b2250416eecc063f22161b9cd14eda802c97ed518d173e0', vout: 0, address: 'tsys1qarxqg2nuja4tqp5v7rj0etjggh2pwa98ur30gw', path: "m/84'/1'/0'/0/4", value: '9800', assetInfo: { assetGuid: '2369540753', value: '100000000' } },
      { txid: '4fdab120b984f7bcf0c9458f9783ec0b3169a292de7e40a2612db1f7d4fd6efb', vout: 0, address: 'tsys1qjfcltq5yljfzkljxdnlc0ffmhqudz8ltq0z695', path: "m/84'/1'/0'/0/5", value: '9800', assetInfo: { assetGuid: '650700076', value: '200000000' } },
      { txid: '931dbdcd8098918e306c43c2f9ee9a6c2fac4c06190a669809c83f3a48f7b522', vout: 0, address: 'tsys1qyj99y8u9vxhc7u6apa0x6yl5z9m7ggaanqlmzk', path: "m/84'/1'/0'/0/6", value: '980', assetInfo: { assetGuid: '2699372871', value: '300000000' } },
      { txid: '66d6841bef92b91344f793bbd43b2cd139e9da4b82b6f13e9e967cf793c384e1', vout: 0, address: 'tsys1qwmwuw69e4c3wyez76xskrjlpek0v2thmkf6584', path: "m/84'/1'/0'/0/11", value: '294', assetInfo: { assetGuid: '402223530', value: '400000000' } }, // m/84'/1'/0'/0/7 had some kind of collision the pub/priv key didn't match between js and core
      { txid: '212680579797d8bf19a2c4bbde5fb7f35296b82ed02c7d0a22281d1d2a47edf2', vout: 0, address: 'tsys1qwvn92ygjm5ff73utfgl7f74cp8rlktgvhtxmgm', path: "m/84'/1'/0'/0/8", value: '9800', assetInfo: { assetGuid: '1537060536', value: '500000000' } },
      { txid: '57219dc0fd292caa06c54e1af6125323181a4c86921442e6d508275b30086682', vout: 0, address: 'tsys1qgylgl55m9an3kczce86shagml9cjwnjny3slu5', path: "m/84'/1'/0'/0/9", value: '980', assetInfo: { assetGuid: '2305793883', value: '600000000' } }
    ],
    assets: [
      {
        assetGuid: '2369540753',
        decimals: 8,
        pubData: { desc: syscointx.utils.encodeToBase64('publicvalue') },
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 127,
        totalSupply: '0',
        maxSupply: '100000000000',
        notaryKeyID: 'X1egKJRfW1uirvT9K1EgY+eF3PU=', // keyid for tsys1qtat6q2y5tad4hg4w7n7jk5fqv0ncth84puexca (m/84’/1’/0’/0/3)
        notaryDetails: {
          endPoint: 'https://test.com',
          instantTransfers: 0,
          HDRequired: 1
        },
        // for unit test only, this normally wouldn't come in payload
        notarySig: 'H5ZrZe8aCarhYzmgkvqoCilr1x4sbqTkpkD45uSaYbafb73oGnd/MaoLZxfGFz7DdSU25TH77raRxflWOGKTUTo='
      },
      {
        assetGuid: '650700076',
        decimals: 8,
        pubData: { desc: syscointx.utils.encodeToBase64('publicvalue') },
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 127,
        totalSupply: '0',
        maxSupply: '100000000000',
        notaryKeyID: 'X1egKJRfW1uirvT9K1EgY+eF3PU=',
        notaryDetails: {
          endPoint: 'https://test.com',
          instantTransfers: 0,
          HDRequired: 1
        },
        notarySig: 'IBdEHC3NeRiitPNXO0kXNauwzeLL/HK3VvusKanpx/PENy22LOzi/cLAKyZIL0N96ffCAmkePVkxnw0pS4nuAbM='
      },
      {
        assetGuid: '2699372871',
        decimals: 8,
        pubData: { desc: syscointx.utils.encodeToBase64('publicvalue') },
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 127,
        totalSupply: '0',
        maxSupply: '100000000000',
        notaryKeyID: 'X1egKJRfW1uirvT9K1EgY+eF3PU=',
        notaryDetails: {
          endPoint: 'https://test.com',
          instantTransfers: 0,
          HDRequired: 1
        },
        notarySig: 'H2N6qBi/BZgS1FyvYMvIYekeyabZCk2xwQbIf7SCQRYkf+YLAKEu/aY9oiVlihuGIBNVZXeL/nduYzCTpmA7XgE='
      },
      {
        assetGuid: '402223530',
        decimals: 8,
        pubData: { desc: syscointx.utils.encodeToBase64('publicvalue') },
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 127,
        totalSupply: '0',
        maxSupply: '100000000000',
        notaryKeyID: 'X1egKJRfW1uirvT9K1EgY+eF3PU=',
        notaryDetails: {
          endPoint: 'https://test.com',
          instantTransfers: 0,
          HDRequired: 1
        },
        notarySig: 'IOKXQEHh4+jz6zICP5KA4g54wL1Tx+6UpY0SoMwtO4glL3jVYsRMWas92OP0pVRQ2Qa5lBlxLqCEeCAqdc+wsz0='
      },
      {
        assetGuid: '1537060536',
        decimals: 8,
        pubData: { desc: syscointx.utils.encodeToBase64('publicvalue') },
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 127,
        totalSupply: '0',
        maxSupply: '100000000000',
        notaryKeyID: 'X1egKJRfW1uirvT9K1EgY+eF3PU=',
        notaryDetails: {
          endPoint: 'https://test.com',
          instantTransfers: 0,
          HDRequired: 1
        },
        notarySig: 'H5zJsmzAuqY8czH2yx4viw2jQjapfgY/8gO4mQroB4e/Y8DWEBerH1CRnNbefPNPt0RwU22D8rzMx13irZpA1xw='
      },
      {
        assetGuid: '2305793883',
        decimals: 8,
        pubData: { desc: syscointx.utils.encodeToBase64('publicvalue') },
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 127,
        totalSupply: '0',
        maxSupply: '100000000000'
      }
    ]
  },
  sysChangeAddress: 'tsys1qh4k0mpx4xqju3zgcvtkynvqrd5ryqhg0yr9uk8',
  assetMap: new Map([
    ['2369540753', { changeAddress: 'tsys1qarxqg2nuja4tqp5v7rj0etjggh2pwa98ur30gw', outputs: [{ value: new BN(50000000), address: 'tsys1qarxqg2nuja4tqp5v7rj0etjggh2pwa98ur30gw' }, { value: new BN(50000000), address: 'tsys1qarxqg2nuja4tqp5v7rj0etjggh2pwa98ur30gw' }] }],
    ['650700076', { changeAddress: 'tsys1qjfcltq5yljfzkljxdnlc0ffmhqudz8ltq0z695', outputs: [{ value: new BN(200000000), address: 'tsys1qjfcltq5yljfzkljxdnlc0ffmhqudz8ltq0z695' }] }],
    ['2699372871', { changeAddress: 'tsys1qyj99y8u9vxhc7u6apa0x6yl5z9m7ggaanqlmzk', outputs: [{ value: new BN(250000000), address: 'tsys1qyj99y8u9vxhc7u6apa0x6yl5z9m7ggaanqlmzk' }] }],
    ['402223530', { changeAddress: 'tsys1qtqwylszrnxrtwcd4zy8ws6nqlrzk8a7282uehx', outputs: [{ value: new BN(300000000), address: 'tsys1qtqwylszrnxrtwcd4zy8ws6nqlrzk8a7282uehx' }] }],
    ['1537060536', { changeAddress: 'tsys1qwvn92ygjm5ff73utfgl7f74cp8rlktgvhtxmgm', outputs: [{ value: new BN(350000000), address: 'tsys1qwvn92ygjm5ff73utfgl7f74cp8rlktgvhtxmgm' }] }],
    ['2305793883', { changeAddress: 'tsys1qgylgl55m9an3kczce86shagml9cjwnjny3slu5', outputs: [{ value: new BN(500000000), address: 'tsys1qgylgl55m9an3kczce86shagml9cjwnjny3slu5' }] }]
  ]),
  xpubTokens: [
    { path: "m/84'/1'/0'/0/0" },
    { path: "m/84'/1'/0'/1/0" },
    { path: "m/84'/1'/0'/1/2" },
    { path: "m/84'/1'/0'/1/3" },
    { path: "m/84'/1'/0'/1/1" },
    { path: "m/84'/1'/0'/0/4" },
    { path: "m/84'/1'/0'/0/5" },
    { path: "m/84'/1'/0'/0/6" },
    { path: "m/84'/1'/0'/0/8" },
    { path: "m/84'/1'/0'/0/9" },
    { path: "m/84'/1'/0'/0/10" },
    { path: "m/84'/1'/0'/0/11" }
  ],
  expected: {
    hex: '87000000000106e073d118d57ec902a8ed14cdb96121f263c0ec6e4150222b73d0f8e664afc2c50000000000fdfffffffb6efdd4f7b12d61a2407ede92a269310bec83978f45c9f0bcf784b920b1da4f0000000000fdffffff22b5f7483a3fc80998660a19064cac2f6c9aeef9c2436c308e919880cdbd1d930000000000fdffffffe184c393f77c969e3ef1b6824bdae939d12c3bd4bb93f74413b992ef1b84d6660000000000fdfffffff2ed472a1d1d28220a7d2cd02eb89652f3b75fdebbc4a219bfd89797578026210000000000fdffffff826608305b2708d5e6421492864c1a18235312f61a4ec506aa2c29fdc09d21570000000000fdffffff0cb202000000000000160014e8cc042a7c976ab0068cf0e4fcae4845d41774a7b2020000000000001600149271f58284fc922b7e466cff87a53bb838d11febb202000000000000160014248a521f8561af8f735d0f5e6d13f41177e423bdb202000000000000160014248a521f8561af8f735d0f5e6d13f41177e423bdb202000000000000160014581c4fc0439986b761b5110ee86a60f8c563f7cab202000000000000160014581c4fc0439986b761b5110ee86a60f8c563f7cab2020000000000001600147326551112dd129f478b4a3fe4fab809c7fb2d0cb2020000000000001600147326551112dd129f478b4a3fe4fab809c7fb2d0cb202000000000000160014413e8fd29b2f671b6058c9f50bf51bf971274e53b202000000000000160014413e8fd29b2f671b6058c9f50bf51bf971274e530000000000000000fd8d016a4d89010687e8f0a411020b300030411f966b65ef1a09aae16339a092faa80a296bd71e2c6ea4e4a640f8e6e49a61b69f6fbde81a777f31aa0b6717c6173ec3752536e531fbeeb691c5f956386293513a81b5a2c92c010113412017441c2dcd7918a2b4f3573b491735abb0cde2cbfc72b756fbac29a9e9c7f3c4372db62cece2fdc2c02b26482f437de9f7c202691e3d59319f0d294b89ee01b3898693d147020280640330411f637aa818bf059812d45caf60cbc861e91ec9a6d90a4db1c106c87fb4824116247fe60b00a12efda63da225658a1b8620135565778bfe776e633093a6603b5e0180bee4e22a02041d05094120e2974041e1e3e8f3eb32023f9280e20e78c0bd53c7ee94a58d12a0cc2d3b88252f78d562c44c59ab3dd8e3f4a55450d906b99419712ea08478202a75cfb0b33d84dbf5dc380206813e07800a411f9cc9b26cc0baa63c7331f6cb1e2f8b0da34236a97e063ff203b8990ae80787bf63c0d61017ab1f50919cd6de7cf34fb74470536d83f2bcccc75de2ad9a40d71c87cabdbd5b020831090900e032000000000000160014e8cc042a7c976ab0068cf0e4fcae4845d41774a702473044022020f855690774a8172851c5c3b06bba6b4725c74f4a21e282159fdb92bc2a949b022045cedd9b317aaa757aa147a827b287b3901e9fdbe1aea9883407d72c4f8f954101210281c11974da83e7d9ff9f47a3c32e3baa7975b5127eb447b86a2f7fd4c9d12fec02483045022100be845ba26a7674b3f77a4525b4224e1615ef8623e61e15fea176ca56e0cc517b022014ea099d6def05e1ae3489e0d3e2236dc8e25c1cbb6cdaac758212c9a7aad33e012103c86473f098d9bb69d31a7851372f9ded7b11691a77c253279e987373164b2ad202483045022100c41f750b3b3d036908d0cd352998132a1519542009832b60aa603aa55521556d02203c82fb19cb86c96a363569aed2a65e0a2c3000c187aa9a3001626c937ba9ed23012102f165ced59862353282a8fd32ac10d018c4bc449e6dabc77a7d810ca2be6f69fd02473044022069910f23d4bad73dd609831cd9a2cec2bd0864a43de2ca3ac365e6fa7435d634022016e20544b670d332438a7577f879f45b81f118191b11a2e853bf0b5c9f7662940121025eea502cd2da208247cdd27701a2efea1e64aebf7c476362c1a6c0d1416c25f302483045022100a24a214cba1f42e61ca448301655c09a004220ce183e130c07db99e9ced77c77022035d39535b3aa3a54dbc3f9ab1f1e8e972096a7d4b42e07e34d85dc225fadcb46012102ccb8a1b346388ff9691d6ee1b2019956e93e5550130cbfe2e866477193b22a3f02473044022012c0e6dd25dea8418de507a22467db1e3f1c9cb4be9c4fd9f2abda596fc21b3d022023f71dfb95b7807f3bf2d3ae35277457f834d45aad5da495af315ce375fee31e012102b7d4e03f4230eb2406328be6bf9dbd400083b929c07a4b0b3601589b3243067400000000',
    rbf: true,
    numOutputs: 12,
    script: Buffer.from('6a4d89010687e8f0a411020b300030411f966b65ef1a09aae16339a092faa80a296bd71e2c6ea4e4a640f8e6e49a61b69f6fbde81a777f31aa0b6717c6173ec3752536e531fbeeb691c5f956386293513a81b5a2c92c010113412017441c2dcd7918a2b4f3573b491735abb0cde2cbfc72b756fbac29a9e9c7f3c4372db62cece2fdc2c02b26482f437de9f7c202691e3d59319f0d294b89ee01b3898693d147020280640330411f637aa818bf059812d45caf60cbc861e91ec9a6d90a4db1c106c87fb4824116247fe60b00a12efda63da225658a1b8620135565778bfe776e633093a6603b5e0180bee4e22a02041d05094120e2974041e1e3e8f3eb32023f9280e20e78c0bd53c7ee94a58d12a0cc2d3b88252f78d562c44c59ab3dd8e3f4a55450d906b99419712ea08478202a75cfb0b33d84dbf5dc380206813e07800a411f9cc9b26cc0baa63c7331f6cb1e2f8b0da34236a97e063ff203b8990ae80787bf63c0d61017ab1f50919cd6de7cf34fb74470536d83f2bcccc75de2ad9a40d71c87cabdbd5b020831090900', 'hex'),
    asset: {
      allocation: [{ assetGuid: '2369540753', values: [{ n: 11, value: new BN(50000000) }, { n: 0, value: new BN(50000000) }], notarysig: Buffer.from('H5ZrZe8aCarhYzmgkvqoCilr1x4sbqTkpkD45uSaYbafb73oGnd/MaoLZxfGFz7DdSU25TH77raRxflWOGKTUTo=', 'base64') },
        { assetGuid: '650700076', values: [{ n: 1, value: new BN(200000000) }], notarysig: Buffer.from('IBdEHC3NeRiitPNXO0kXNauwzeLL/HK3VvusKanpx/PENy22LOzi/cLAKyZIL0N96ffCAmkePVkxnw0pS4nuAbM=', 'base64') },
        { assetGuid: '2699372871', values: [{ n: 2, value: new BN(250000000) }, { n: 3, value: new BN(50000000) }], notarysig: Buffer.from('H2N6qBi/BZgS1FyvYMvIYekeyabZCk2xwQbIf7SCQRYkf+YLAKEu/aY9oiVlihuGIBNVZXeL/nduYzCTpmA7XgE=', 'base64') },
        { assetGuid: '402223530', values: [{ n: 4, value: new BN(300000000) }, { n: 5, value: new BN(100000000) }], notarysig: Buffer.from('IOKXQEHh4+jz6zICP5KA4g54wL1Tx+6UpY0SoMwtO4glL3jVYsRMWas92OP0pVRQ2Qa5lBlxLqCEeCAqdc+wsz0=', 'base64') },
        { assetGuid: '1537060536', values: [{ n: 6, value: new BN(350000000) }, { n: 7, value: new BN(150000000) }], notarysig: Buffer.from('H5zJsmzAuqY8czH2yx4viw2jQjapfgY/8gO4mQroB4e/Y8DWEBerH1CRnNbefPNPt0RwU22D8rzMx13irZpA1xw=', 'base64') },
        { assetGuid: '2305793883', values: [{ n: 8, value: new BN(500000000) }, { n: 9, value: new BN(100000000) }], notarysig: Buffer.from('') }]
    },
    receivingIndex: 11,
    changeIndex: 3
  }
},
{
  description: 'send multi asset allocations with notarization + gas in non-selected asset',
  version: syscointx.utils.SYSCOIN_TX_VERSION_ALLOCATION_SEND,
  txOpts: {
    allowOtherNotarizedAssetInputs: true,
    rbf: true
  },
  mnemonic: 'club toss element melody skin ship rifle student reason real interest insane elevator beauty movie',
  feeRate: new BN(10),
  utxoObj: {
    utxos: [
      { txid: 'c5c2af64e6f8d0732b2250416eecc063f22161b9cd14eda802c97ed518d173e0', vout: 0, address: 'tsys1qarxqg2nuja4tqp5v7rj0etjggh2pwa98ur30gw', path: "m/84'/1'/0'/0/4", value: '980', assetInfo: { assetGuid: '2369540753', value: '100000000' } },
      { txid: '4fdab120b984f7bcf0c9458f9783ec0b3169a292de7e40a2612db1f7d4fd6efb', vout: 0, address: 'tsys1qjfcltq5yljfzkljxdnlc0ffmhqudz8ltq0z695', path: "m/84'/1'/0'/0/5", value: '980', assetInfo: { assetGuid: '650700076', value: '200000000' } },
      { txid: '931dbdcd8098918e306c43c2f9ee9a6c2fac4c06190a669809c83f3a48f7b522', vout: 0, address: 'tsys1qyj99y8u9vxhc7u6apa0x6yl5z9m7ggaanqlmzk', path: "m/84'/1'/0'/0/6", value: '980', assetInfo: { assetGuid: '2699372871', value: '300000000' } },
      { txid: '66d6841bef92b91344f793bbd43b2cd139e9da4b82b6f13e9e967cf793c384e1', vout: 0, address: 'tsys1qwmwuw69e4c3wyez76xskrjlpek0v2thmkf6584', path: "m/84'/1'/0'/0/11", value: '294', assetInfo: { assetGuid: '402223530', value: '400000000' } }, // m/84'/1'/0'/0/7 had some kind of collision the pub/priv key didn't match between js and core
      { txid: '212680579797d8bf19a2c4bbde5fb7f35296b82ed02c7d0a22281d1d2a47edf2', vout: 0, address: 'tsys1qwvn92ygjm5ff73utfgl7f74cp8rlktgvhtxmgm', path: "m/84'/1'/0'/0/8", value: '980', assetInfo: { assetGuid: '1537060536', value: '500000000' } },
      { txid: '57219dc0fd292caa06c54e1af6125323181a4c86921442e6d508275b30086682', vout: 0, address: 'tsys1qgylgl55m9an3kczce86shagml9cjwnjny3slu5', path: "m/84'/1'/0'/0/9", value: '980', assetInfo: { assetGuid: '2305793883', value: '600000000' } },
      { txid: 'c6e7702f1ab817bacf81e5678ba89e0b43a8a7b6f56c4c055aa8aeda87197a68', vout: 0, address: 'tsys1qgylgl55m9an3kczce86shagml9cjwnjny3slu5', path: "m/84'/1'/0'/0/9", value: '980000', assetInfo: { assetGuid: '1635229542', value: '1000000000' } }
    ],
    assets: [
      {
        assetGuid: '2369540753',
        decimals: 8,
        pubData: { desc: syscointx.utils.encodeToBase64('publicvalue') },
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 127,
        totalSupply: '0',
        maxSupply: '100000000000',
        notaryKeyID: 'X1egKJRfW1uirvT9K1EgY+eF3PU=', // keyid for tsys1qtat6q2y5tad4hg4w7n7jk5fqv0ncth84puexca (m/84’/1’/0’/0/3)
        notaryDetails: {
          endPoint: 'https://test.com',
          instantTransfers: 0,
          HDRequired: 1
        },
        // for unit test only, this normally wouldn't come in payload
        notarySig: 'H5ZrZe8aCarhYzmgkvqoCilr1x4sbqTkpkD45uSaYbafb73oGnd/MaoLZxfGFz7DdSU25TH77raRxflWOGKTUTo='
      },
      {
        assetGuid: '650700076',
        decimals: 8,
        pubData: { desc: syscointx.utils.encodeToBase64('publicvalue') },
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 127,
        totalSupply: '0',
        maxSupply: '100000000000',
        notaryKeyID: 'X1egKJRfW1uirvT9K1EgY+eF3PU=',
        notaryDetails: {
          endPoint: 'https://test.com',
          instantTransfers: 0,
          HDRequired: 1
        },
        notarySig: 'IBdEHC3NeRiitPNXO0kXNauwzeLL/HK3VvusKanpx/PENy22LOzi/cLAKyZIL0N96ffCAmkePVkxnw0pS4nuAbM='
      },
      {
        assetGuid: '2699372871',
        decimals: 8,
        pubData: { desc: syscointx.utils.encodeToBase64('publicvalue') },
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 127,
        totalSupply: '0',
        maxSupply: '100000000000',
        notaryKeyID: 'X1egKJRfW1uirvT9K1EgY+eF3PU=',
        notaryDetails: {
          endPoint: 'https://test.com',
          instantTransfers: 0,
          HDRequired: 1
        },
        notarySig: 'H2N6qBi/BZgS1FyvYMvIYekeyabZCk2xwQbIf7SCQRYkf+YLAKEu/aY9oiVlihuGIBNVZXeL/nduYzCTpmA7XgE='
      },
      {
        assetGuid: '402223530',
        decimals: 8,
        pubData: { desc: syscointx.utils.encodeToBase64('publicvalue') },
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 127,
        totalSupply: '0',
        maxSupply: '100000000000',
        notaryKeyID: 'X1egKJRfW1uirvT9K1EgY+eF3PU=',
        notaryDetails: {
          endPoint: 'https://test.com',
          instantTransfers: 0,
          HDRequired: 1
        },
        notarySig: 'IOKXQEHh4+jz6zICP5KA4g54wL1Tx+6UpY0SoMwtO4glL3jVYsRMWas92OP0pVRQ2Qa5lBlxLqCEeCAqdc+wsz0='
      },
      {
        assetGuid: '1537060536',
        decimals: 8,
        pubData: { desc: syscointx.utils.encodeToBase64('publicvalue') },
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 127,
        totalSupply: '0',
        maxSupply: '100000000000',
        notaryKeyID: 'X1egKJRfW1uirvT9K1EgY+eF3PU=',
        notaryDetails: {
          endPoint: 'https://test.com',
          instantTransfers: 0,
          HDRequired: 1
        },
        notarySig: 'H5zJsmzAuqY8czH2yx4viw2jQjapfgY/8gO4mQroB4e/Y8DWEBerH1CRnNbefPNPt0RwU22D8rzMx13irZpA1xw='
      },
      {
        assetGuid: '2305793883',
        decimals: 8,
        pubData: { desc: syscointx.utils.encodeToBase64('publicvalue') },
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 127,
        totalSupply: '0',
        maxSupply: '100000000000'
      },
      {
        assetGuid: '1635229542',
        decimals: 8,
        pubData: { desc: syscointx.utils.encodeToBase64('publicvalue') },
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 127,
        totalSupply: '0',
        maxSupply: '100000000000',
        notaryKeyID: 'X1egKJRfW1uirvT9K1EgY+eF3PU=',
        notaryDetails: {
          endPoint: 'https://test.com',
          instantTransfers: 0,
          HDRequired: 1
        }
      }
    ]
  },
  sysChangeAddress: 'tsys1qh4k0mpx4xqju3zgcvtkynvqrd5ryqhg0yr9uk8',
  assetMap: new Map([
    ['2369540753', { changeAddress: 'tsys1qarxqg2nuja4tqp5v7rj0etjggh2pwa98ur30gw', outputs: [{ value: new BN(50000000), address: 'tsys1qarxqg2nuja4tqp5v7rj0etjggh2pwa98ur30gw' }, { value: new BN(50000000), address: 'tsys1qarxqg2nuja4tqp5v7rj0etjggh2pwa98ur30gw' }] }],
    ['650700076', { changeAddress: 'tsys1qjfcltq5yljfzkljxdnlc0ffmhqudz8ltq0z695', outputs: [{ value: new BN(200000000), address: 'tsys1qjfcltq5yljfzkljxdnlc0ffmhqudz8ltq0z695' }] }],
    ['2699372871', { changeAddress: 'tsys1qyj99y8u9vxhc7u6apa0x6yl5z9m7ggaanqlmzk', outputs: [{ value: new BN(250000000), address: 'tsys1qyj99y8u9vxhc7u6apa0x6yl5z9m7ggaanqlmzk' }] }],
    ['402223530', { changeAddress: 'tsys1qtqwylszrnxrtwcd4zy8ws6nqlrzk8a7282uehx', outputs: [{ value: new BN(300000000), address: 'tsys1qtqwylszrnxrtwcd4zy8ws6nqlrzk8a7282uehx' }] }],
    ['1537060536', { changeAddress: 'tsys1qwvn92ygjm5ff73utfgl7f74cp8rlktgvhtxmgm', outputs: [{ value: new BN(350000000), address: 'tsys1qwvn92ygjm5ff73utfgl7f74cp8rlktgvhtxmgm' }] }],
    ['2305793883', { changeAddress: 'tsys1qgylgl55m9an3kczce86shagml9cjwnjny3slu5', outputs: [{ value: new BN(500000000), address: 'tsys1qgylgl55m9an3kczce86shagml9cjwnjny3slu5' }] }]
  ]),
  xpubTokens: [
    { path: "m/84'/1'/0'/0/0" },
    { path: "m/84'/1'/0'/1/0" },
    { path: "m/84'/1'/0'/1/2" },
    { path: "m/84'/1'/0'/1/3" },
    { path: "m/84'/1'/0'/1/1" },
    { path: "m/84'/1'/0'/0/4" },
    { path: "m/84'/1'/0'/0/5" },
    { path: "m/84'/1'/0'/0/6" },
    { path: "m/84'/1'/0'/0/8" },
    { path: "m/84'/1'/0'/0/9" },
    { path: "m/84'/1'/0'/0/10" },
    { path: "m/84'/1'/0'/0/11" }
  ],
  expected: {
    hex: '87000000000107e073d118d57ec902a8ed14cdb96121f263c0ec6e4150222b73d0f8e664afc2c50000000000fdfffffffb6efdd4f7b12d61a2407ede92a269310bec83978f45c9f0bcf784b920b1da4f0000000000fdffffff22b5f7483a3fc80998660a19064cac2f6c9aeef9c2436c308e919880cdbd1d930000000000fdffffffe184c393f77c969e3ef1b6824bdae939d12c3bd4bb93f74413b992ef1b84d6660000000000fdfffffff2ed472a1d1d28220a7d2cd02eb89652f3b75fdebbc4a219bfd89797578026210000000000fdffffff826608305b2708d5e6421492864c1a18235312f61a4ec506aa2c29fdc09d21570000000000fdffffff687a1987daaea85a054c6cf5b6a7a8430b9ea88b67e581cfba17b81a2f70e7c60000000000fdffffff0db202000000000000160014e8cc042a7c976ab0068cf0e4fcae4845d41774a7b2020000000000001600149271f58284fc922b7e466cff87a53bb838d11febb202000000000000160014248a521f8561af8f735d0f5e6d13f41177e423bdb202000000000000160014248a521f8561af8f735d0f5e6d13f41177e423bdb202000000000000160014581c4fc0439986b761b5110ee86a60f8c563f7cab202000000000000160014581c4fc0439986b761b5110ee86a60f8c563f7cab2020000000000001600147326551112dd129f478b4a3fe4fab809c7fb2d0cb2020000000000001600147326551112dd129f478b4a3fe4fab809c7fb2d0cb202000000000000160014413e8fd29b2f671b6058c9f50bf51bf971274e53b202000000000000160014413e8fd29b2f671b6058c9f50bf51bf971274e530000000000000000fdd7016a4dd3010787e8f0a411020b300030411f966b65ef1a09aae16339a092faa80a296bd71e2c6ea4e4a640f8e6e49a61b69f6fbde81a777f31aa0b6717c6173ec3752536e531fbeeb691c5f956386293513a81b5a2c92c010113412017441c2dcd7918a2b4f3573b491735abb0cde2cbfc72b756fbac29a9e9c7f3c4372db62cece2fdc2c02b26482f437de9f7c202691e3d59319f0d294b89ee01b3898693d147020280640330411f637aa818bf059812d45caf60cbc861e91ec9a6d90a4db1c106c87fb4824116247fe60b00a12efda63da225658a1b8620135565778bfe776e633093a6603b5e0180bee4e22a02041d05094120e2974041e1e3e8f3eb32023f9280e20e78c0bd53c7ee94a58d12a0cc2d3b88252f78d562c44c59ab3dd8e3f4a55450d906b99419712ea08478202a75cfb0b33d84dbf5dc380206813e07800a411f9cc9b26cc0baa63c7331f6cb1e2f8b0da34236a97e063ff203b8990ae80787bf63c0d61017ab1f50919cd6de7cf34fb74470536d83f2bcccc75de2ad9a40d71c87cabdbd5b020831090900858addbd66010c0a41000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000026b60e0000000000160014e8cc042a7c976ab0068cf0e4fcae4845d41774a7b202000000000000160014bd6cfd84d53025c8891862ec49b0036d06405d0f0247304402203063dc8829f5fd265b91dba2334e8ec09b17b7d8f404fb52d05ca10b38c68a3d022036ef3a638e7b706ef13e9ad6b3c69c1b49d0e5df7b972ee44e51d70e8dcf03b101210281c11974da83e7d9ff9f47a3c32e3baa7975b5127eb447b86a2f7fd4c9d12fec02483045022100c00eac4af4b2627bc5978032b64e4c0a14b1138b6dad17d206cb06279c19d68b02201e98da6482f34ee17265f1ebf84323588c641d42545f14737f5afc3945cff1fd012103c86473f098d9bb69d31a7851372f9ded7b11691a77c253279e987373164b2ad202483045022100c67f603c38df265352df2a3d08d4da2fe77bd09d867723fe5b36d58e510e432d022007be1418b52c2bd060bfa2febbb41594246f064afce9ef2c8197187bc50e8836012102f165ced59862353282a8fd32ac10d018c4bc449e6dabc77a7d810ca2be6f69fd02483045022100a0d8e99124e993cd00ee566206720b20352de1eb8a08c62863b5d43000a9a9e40220280d26e06c50cbc1c34f80ff09429aee6d90e1643145f7d8966d85363763af2a0121025eea502cd2da208247cdd27701a2efea1e64aebf7c476362c1a6c0d1416c25f3024730440220754ca273589130723023badaf262cdb83c5968690ed256dbe691fa57545098a702206e8285feb5a9708c09a235585c5a64146ec1c5086e378095d989d14325e43430012102ccb8a1b346388ff9691d6ee1b2019956e93e5550130cbfe2e866477193b22a3f02483045022100e858e591cf3cfcf263bc22e7ed00f0a4ec13ff0d893b00ee2b2e85e6c4dceab102203ab7deb1eb0aa1587bba97a326f5251776c0457641b99049521147ef1a48f973012102b7d4e03f4230eb2406328be6bf9dbd400083b929c07a4b0b3601589b32430674024830450221008df890ddca5bca3568c1a97c0b3e566d6f647d37d255bb4903ee6b9dbe2a5c27022023e4950e06dc265fb3d76603dbf97540e6c98ea459177471a56dbf3dcf338f85012102b7d4e03f4230eb2406328be6bf9dbd400083b929c07a4b0b3601589b3243067400000000',
    rbf: true,
    numOutputs: 13,
    script: Buffer.from('6a4dd3010787e8f0a411020b300030411f966b65ef1a09aae16339a092faa80a296bd71e2c6ea4e4a640f8e6e49a61b69f6fbde81a777f31aa0b6717c6173ec3752536e531fbeeb691c5f956386293513a81b5a2c92c010113412017441c2dcd7918a2b4f3573b491735abb0cde2cbfc72b756fbac29a9e9c7f3c4372db62cece2fdc2c02b26482f437de9f7c202691e3d59319f0d294b89ee01b3898693d147020280640330411f637aa818bf059812d45caf60cbc861e91ec9a6d90a4db1c106c87fb4824116247fe60b00a12efda63da225658a1b8620135565778bfe776e633093a6603b5e0180bee4e22a02041d05094120e2974041e1e3e8f3eb32023f9280e20e78c0bd53c7ee94a58d12a0cc2d3b88252f78d562c44c59ab3dd8e3f4a55450d906b99419712ea08478202a75cfb0b33d84dbf5dc380206813e07800a411f9cc9b26cc0baa63c7331f6cb1e2f8b0da34236a97e063ff203b8990ae80787bf63c0d61017ab1f50919cd6de7cf34fb74470536d83f2bcccc75de2ad9a40d71c87cabdbd5b020831090900858addbd66010c0a410000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000', 'hex'),
    asset: {
      allocation: [{ assetGuid: '2369540753', values: [{ n: 11, value: new BN(50000000) }, { n: 0, value: new BN(50000000) }], notarysig: Buffer.from('H5ZrZe8aCarhYzmgkvqoCilr1x4sbqTkpkD45uSaYbafb73oGnd/MaoLZxfGFz7DdSU25TH77raRxflWOGKTUTo=', 'base64') },
        { assetGuid: '650700076', values: [{ n: 1, value: new BN(200000000) }], notarysig: Buffer.from('IBdEHC3NeRiitPNXO0kXNauwzeLL/HK3VvusKanpx/PENy22LOzi/cLAKyZIL0N96ffCAmkePVkxnw0pS4nuAbM=', 'base64') },
        { assetGuid: '2699372871', values: [{ n: 2, value: new BN(250000000) }, { n: 3, value: new BN(50000000) }], notarysig: Buffer.from('H2N6qBi/BZgS1FyvYMvIYekeyabZCk2xwQbIf7SCQRYkf+YLAKEu/aY9oiVlihuGIBNVZXeL/nduYzCTpmA7XgE=', 'base64') },
        { assetGuid: '402223530', values: [{ n: 4, value: new BN(300000000) }, { n: 5, value: new BN(100000000) }], notarysig: Buffer.from('IOKXQEHh4+jz6zICP5KA4g54wL1Tx+6UpY0SoMwtO4glL3jVYsRMWas92OP0pVRQ2Qa5lBlxLqCEeCAqdc+wsz0=', 'base64') },
        { assetGuid: '1537060536', values: [{ n: 6, value: new BN(350000000) }, { n: 7, value: new BN(150000000) }], notarysig: Buffer.from('H5zJsmzAuqY8czH2yx4viw2jQjapfgY/8gO4mQroB4e/Y8DWEBerH1CRnNbefPNPt0RwU22D8rzMx13irZpA1xw=', 'base64') },
        { assetGuid: '2305793883', values: [{ n: 8, value: new BN(500000000) }, { n: 9, value: new BN(100000000) }], notarysig: Buffer.from('') },
        { assetGuid: '1635229542', values: [{ n: 12, value: new BN(1000000000) }], notarysig: Buffer.alloc(65, 0) }]
    },
    receivingIndex: 11,
    changeIndex: 3
  }
},
{
  description: 'send asset allocation with auxfees',
  version: syscointx.utils.SYSCOIN_TX_VERSION_ALLOCATION_SEND,
  txOpts: {
    rbf: false
  },
  mnemonic: 'club toss element melody skin ship rifle student reason real interest insane elevator beauty movie',
  feeRate: new BN(10),
  utxoObj: {
    utxos: [
      { txid: 'c6e7702f1ab817bacf81e5678ba89e0b43a8a7b6f56c4c055aa8aeda87197a62', vout: 0, address: 'tsys1qarxqg2nuja4tqp5v7rj0etjggh2pwa98ur30gw', path: "m/84'/1'/0'/0/4", value: '980', assetInfo: { assetGuid: '1635229536', value: '1000000000' } },
      { txid: '2cf903537c6c161a1c65d940758b63efd4706fc8f78eb21d252612407e59e865', vout: 0, address: 'tsys1qjfcltq5yljfzkljxdnlc0ffmhqudz8ltq0z695', path: "m/84'/1'/0'/0/5", value: '100000000' }
    ],
    assets: [
      {
        assetGuid: '1635229536',
        decimals: 8,
        pubData: { desc: syscointx.utils.encodeToBase64('publicvalue') },
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 127,
        totalSupply: '0',
        maxSupply: '100000000000',
        auxFeeDetails: {
          auxFeeKeyID: 'X1egKJRfW1uirvT9K1EgY+eF3PU=',
          auxFees: [{
            bound: 0,
            percent: 1 * scalarPct
          },
          {
            bound: 10 * COIN,
            percent: 0.4 * scalarPct
          },
          {
            bound: 250 * COIN,
            percent: 0.2 * scalarPct
          },
          {
            bound: 2500 * COIN,
            percent: 0.07 * scalarPct
          },
          {
            bound: 25000 * COIN,
            percent: 0.007 * scalarPct
          },
          {
            bound: 250000 * COIN,
            percent: 0
          }
          ]
        }
      }
    ]
  },
  sysChangeAddress: 'tsys1qh4k0mpx4xqju3zgcvtkynvqrd5ryqhg0yr9uk8',
  assetMap: new Map([
    ['1635229536', { changeAddress: 'tsys1qjfcltq5yljfzkljxdnlc0ffmhqudz8ltq0z695', outputs: [{ value: new BN(600000000), address: 'tsys1qgylgl55m9an3kczce86shagml9cjwnjny3slu5' }] }]
  ]),
  xpubTokens: [
    { path: "m/84'/1'/0'/0/0" },
    { path: "m/84'/1'/0'/1/0" },
    { path: "m/84'/1'/0'/1/2" },
    { path: "m/84'/1'/0'/1/3" },
    { path: "m/84'/1'/0'/1/1" },
    { path: "m/84'/1'/0'/0/4" },
    { path: "m/84'/1'/0'/0/5" },
    { path: "m/84'/1'/0'/0/6" },
    { path: "m/84'/1'/0'/0/8" },
    { path: "m/84'/1'/0'/0/9" },
    { path: "m/84'/1'/0'/0/10" },
    { path: "m/84'/1'/0'/0/11" }
  ],
  expected: {
    hex: '87000000000102627a1987daaea85a054c6cf5b6a7a8430b9ea88b67e581cfba17b81a2f70e7c60000000000ffffffff65e8597e401226251db28ef7c86f70d4ef638b7540d9651c1a166c7c5303f92c0000000000ffffffff04b2020000000000001600149271f58284fc922b7e466cff87a53bb838d11febb202000000000000160014413e8fd29b2f671b6058c9f50bf51bf971274e530000000000000000116a0f01858addbd60030039013b039a5b00eed4f505000000001600149271f58284fc922b7e466cff87a53bb838d11feb0247304402207c7401e65548d3b261f50a545142a59eab6fd68d6595a1d093e05e77b1e2e9b802203f0026d305580257a693f60732e2b51d23b1164ecd67d3e0ca4b4e995f707bfc01210281c11974da83e7d9ff9f47a3c32e3baa7975b5127eb447b86a2f7fd4c9d12fec024730440220349eb402ec5f636de73cb550dea56801ad5690c701f90f39b89df622489a24710220473a607bf9a7ced196ededdda79eb7e9ef55a3e9fec5e83ae05f79118a17c051012103c86473f098d9bb69d31a7851372f9ded7b11691a77c253279e987373164b2ad200000000',
    rbf: false,
    numOutputs: 4,
    script: Buffer.from('6a0f01858addbd60030039013b039a5b00', 'hex'),
    asset: {
      allocation: [{ assetGuid: '1635229536', values: [{ n: 0, value: new BN(6000000) }, { n: 1, value: new BN(600000000) }, { n: 3, value: new BN(394000000) }], notarysig: Buffer.from('') }]
    },
    receivingIndex: 11,
    changeIndex: 3
  }
},
{
  description: 'burn asset allocation to syscoin',
  version: syscointx.utils.SYSCOIN_TX_VERSION_ALLOCATION_BURN_TO_SYSCOIN,
  txOpts: {
    rbf: true
  },
  mnemonic: 'club toss element melody skin ship rifle student reason real interest insane elevator beauty movie',
  feeRate: new BN(10),
  utxoObj: {
    utxos: [
      { txid: '912605d620edc959ebf04eba709ca2ad7adbe147e83ba26db55e719d5f948717', vout: 0, address: 'tsys1qarxqg2nuja4tqp5v7rj0etjggh2pwa98ur30gw', path: "m/84'/1'/0'/0/4", value: '690', assetInfo: { assetGuid: '2369540753', value: '30000000' } },
      { txid: '912605d620edc959ebf04eba709ca2ad7adbe147e83ba26db55e719d5f948717', vout: 11, address: 'tsys1qarxqg2nuja4tqp5v7rj0etjggh2pwa98ur30gw', path: "m/84'/1'/0'/0/4", value: '99979484', assetInfo: { assetGuid: '2369540753', value: '50000000' } }
    ],
    assets: [
      {
        assetGuid: '2369540753',
        decimals: 8,
        pubData: { desc: syscointx.utils.encodeToBase64('publicvalue') },
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 127,
        totalSupply: '0',
        maxSupply: '100000000000',
        notaryKeyID: 'X1egKJRfW1uirvT9K1EgY+eF3PU=', // keyid for tsys1qtat6q2y5tad4hg4w7n7jk5fqv0ncth84puexca (m/84’/1’/0’/0/3)
        notaryDetails: {
          endPoint: 'https://test.com',
          instantTransfers: 0,
          HDRequired: 1
        },
        // for unit test only, this normally wouldn't come in payload
        notarySig: 'IB3TMX//cFV3lyCkyXkwj82pVIy6brf/q3zIno09dgeualzicEi9/kdIaRmrhjUXjwiBizK09+NWFWpqldDLP98='
      }
    ]
  },
  assetOpts: { ethaddress: Buffer.from('', 'hex') },
  sysChangeAddress: 'tsys1qh4k0mpx4xqju3zgcvtkynvqrd5ryqhg0yr9uk8',
  assetMap: new Map([
    ['2369540753', { changeAddress: 'tsys1qjfcltq5yljfzkljxdnlc0ffmhqudz8ltq0z695', outputs: [{ value: new BN(40000000) }] }]
  ]),
  xpubTokens: [
    { path: "m/84'/1'/0'/0/0" },
    { path: "m/84'/1'/0'/1/0" },
    { path: "m/84'/1'/0'/1/2" },
    { path: "m/84'/1'/0'/1/3" },
    { path: "m/84'/1'/0'/1/1" },
    { path: "m/84'/1'/0'/0/4" },
    { path: "m/84'/1'/0'/0/5" },
    { path: "m/84'/1'/0'/0/6" },
    { path: "m/84'/1'/0'/0/8" },
    { path: "m/84'/1'/0'/0/9" },
    { path: "m/84'/1'/0'/0/10" },
    { path: "m/84'/1'/0'/0/11" }
  ],
  expected: {
    hex: '800000000001011787945f9d715eb56da23be847e1db7aada29c70ba4ef0eb59c9ed20d60526910b00000000fdffffff03005a6202000000001600149271f58284fc922b7e466cff87a53bb838d11feb0000000000000000516a4c4e0187e8f0a411020126020841201dd3317fff7055779720a4c979308fcda9548cba6eb7ffab7cc89e8d3d7607ae6a5ce27048bdfe47486919ab8635178f08818b32b4f7e356156a6a95d0cb3fdf00c287f505000000001600149271f58284fc922b7e466cff87a53bb838d11feb02483045022100ce369795ecfca0985bda6d64b1eba299ee18ac850a806c40d19f394422cc2f78022025a9ed376c0783ff66ff11c5942086dc4667401268a33f80fdb251ac75a6902401210281c11974da83e7d9ff9f47a3c32e3baa7975b5127eb447b86a2f7fd4c9d12fec00000000',
    rbf: true,
    numOutputs: 3,
    script: Buffer.from('6a4c4e0187e8f0a411020126020841201dd3317fff7055779720a4c979308fcda9548cba6eb7ffab7cc89e8d3d7607ae6a5ce27048bdfe47486919ab8635178f08818b32b4f7e356156a6a95d0cb3fdf00', 'hex'),
    asset: {
      allocation: [{ assetGuid: '2369540753', values: [{ n: 1, value: new BN(40000000) }, { n: 2, value: new BN(10000000) }], notarysig: Buffer.from('IB3TMX//cFV3lyCkyXkwj82pVIy6brf/q3zIno09dgeualzicEi9/kdIaRmrhjUXjwiBizK09+NWFWpqldDLP98=', 'base64') }], ethaddress: Buffer.from('', 'hex')
    },
    receivingIndex: 11,
    changeIndex: 3
  }
},
{
  description: 'burn asset allocation to syscoin with 0 val input',
  version: syscointx.utils.SYSCOIN_TX_VERSION_ALLOCATION_BURN_TO_SYSCOIN,
  txOpts: {
    rbf: true
  },
  mnemonic: 'club toss element melody skin ship rifle student reason real interest insane elevator beauty movie',
  feeRate: new BN(10),
  utxoObj: {
    utxos: [
      { txid: '912605d620edc959ebf04eba709ca2ad7adbe147e83ba26db55e719d5f948717', vout: 0, address: 'tsys1qarxqg2nuja4tqp5v7rj0etjggh2pwa98ur30gw', path: "m/84'/1'/0'/0/4", value: '690', assetInfo: { assetGuid: '2369540753', value: '1000000000' } },
      { txid: '912605d620edc959ebf04eba709ca2ad7adbe147e83ba26db55e719d5f948717', vout: 11, address: 'tsys1qarxqg2nuja4tqp5v7rj0etjggh2pwa98ur30gw', path: "m/84'/1'/0'/0/4", value: '113889979672', assetInfo: { assetGuid: '2369540753', value: '0' } }
    ],
    assets: [
      {
        assetGuid: '2369540753',
        decimals: 8,
        pubData: { desc: syscointx.utils.encodeToBase64('publicvalue') },
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 127,
        totalSupply: '0',
        maxSupply: '100000000000',
        notaryKeyID: 'X1egKJRfW1uirvT9K1EgY+eF3PU=', // keyid for tsys1qtat6q2y5tad4hg4w7n7jk5fqv0ncth84puexca (m/84’/1’/0’/0/3)
        notaryDetails: {
          endPoint: 'https://test.com',
          instantTransfers: 0,
          HDRequired: 1
        },
        // for unit test only, this normally wouldn't come in payload
        notarySig: 'IB3TMX//cFV3lyCkyXkwj82pVIy6brf/q3zIno09dgeualzicEi9/kdIaRmrhjUXjwiBizK09+NWFWpqldDLP98='
      }
    ]
  },
  assetOpts: { ethaddress: Buffer.from('', 'hex') },
  sysChangeAddress: 'tsys1qh4k0mpx4xqju3zgcvtkynvqrd5ryqhg0yr9uk8',
  assetMap: new Map([
    ['2369540753', { changeAddress: 'tsys1qjfcltq5yljfzkljxdnlc0ffmhqudz8ltq0z695', outputs: [{ value: new BN(1) }] }]
  ]),
  xpubTokens: [
    { path: "m/84'/1'/0'/0/0" },
    { path: "m/84'/1'/0'/1/0" },
    { path: "m/84'/1'/0'/1/2" },
    { path: "m/84'/1'/0'/1/3" },
    { path: "m/84'/1'/0'/1/1" },
    { path: "m/84'/1'/0'/0/4" },
    { path: "m/84'/1'/0'/0/5" },
    { path: "m/84'/1'/0'/0/6" },
    { path: "m/84'/1'/0'/0/8" },
    { path: "m/84'/1'/0'/0/9" },
    { path: "m/84'/1'/0'/0/10" },
    { path: "m/84'/1'/0'/0/11" }
  ],
  expected: {
    hex: '800000000001021787945f9d715eb56da23be847e1db7aada29c70ba4ef0eb59c9ed20d60526910000000000fdffffff1787945f9d715eb56da23be847e1db7aada29c70ba4ef0eb59c9ed20d60526910b00000000fdffffff0401000000000000001600149271f58284fc922b7e466cff87a53bb838d11feb0000000000000000576a4c540187e8f0a41103010102a0c2c3b277030041201dd3317fff7055779720a4c979308fcda9548cba6eb7ffab7cc89e8d3d7607ae6a5ce27048bdfe47486919ab8635178f08818b32b4f7e356156a6a95d0cb3fdf00da1f5f841a0000001600149271f58284fc922b7e466cff87a53bb838d11febb2020000000000001600149271f58284fc922b7e466cff87a53bb838d11feb02483045022100d5cd1a306bbb6b1e4d3d2906a496795a2ddac3e05f3ec87fd63cc99243b9bfae0220501ac9504d751717567b4d08fa3d43c0828ed2ab5d2bbf1c16e42c4cf3bd15c101210281c11974da83e7d9ff9f47a3c32e3baa7975b5127eb447b86a2f7fd4c9d12fec024730440220660e4519e56e850534dfa52b5b699c055ec733b739b8ff73671db2a9936ef5ef02203b7f962aeb0f013c8f5ec415c7f4f6c1c7c835bdfc14c302479f559c82e5a44c01210281c11974da83e7d9ff9f47a3c32e3baa7975b5127eb447b86a2f7fd4c9d12fec00000000',
    rbf: true,
    numOutputs: 4,
    script: Buffer.from('6a4c540187e8f0a41103010102a0c2c3b277030041201dd3317fff7055779720a4c979308fcda9548cba6eb7ffab7cc89e8d3d7607ae6a5ce27048bdfe47486919ab8635178f08818b32b4f7e356156a6a95d0cb3fdf00', 'hex'),
    asset: {
      allocation: [{ assetGuid: '2369540753', values: [{ n: 1, value: new BN(1) }, { n: 2, value: new BN(999999999) }, { n: 3, value: new BN(0) }], notarysig: Buffer.from('IB3TMX//cFV3lyCkyXkwj82pVIy6brf/q3zIno09dgeualzicEi9/kdIaRmrhjUXjwiBizK09+NWFWpqldDLP98=', 'base64') }], ethaddress: Buffer.from('', 'hex')
    },
    receivingIndex: 11,
    changeIndex: 3
  }
},
{
  description: 'burn asset allocation to ethereum multiple inputs',
  version: syscointx.utils.SYSCOIN_TX_VERSION_ALLOCATION_BURN_TO_ETHEREUM,
  txOpts: {
    rbf: true
  },
  mnemonic: 'club toss element melody skin ship rifle student reason real interest insane elevator beauty movie',
  feeRate: new BN(10),
  utxoObj: {
    utxos: [
      { txid: '912605d620edc959ebf04eba709ca2ad7adbe147e83ba26db55e719d5f948717', vout: 9, address: 'tsys1qgylgl55m9an3kczce86shagml9cjwnjny3slu5', path: "m/84'/1'/0'/0/9", value: '690', assetInfo: { assetGuid: '2305793883', value: '100000000' } },
      { txid: '9f586de3e6d8ce33b1c6de709c992cb431cc324ab3bc6dff5537137aa4b17022', vout: 3, address: 'tsys1qh4k0mpx4xqju3zgcvtkynvqrd5ryqhg0yr9uk8', path: "m/84'/1'/0'/0/10", value: '99974764' }
    ],
    assets: [
      {
        assetGuid: '2305793883',
        decimals: 8,
        pubData: { desc: syscointx.utils.encodeToBase64('publicvalue') },
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 127,
        totalSupply: '0',
        maxSupply: '100000000000'
      }
    ]
  },
  assetOpts: { ethaddress: Buffer.from('9667de58c15475626165eaa4c9970e409e1181d0', 'hex') },
  sysChangeAddress: 'tsys1qh4k0mpx4xqju3zgcvtkynvqrd5ryqhg0yr9uk8',
  assetMap: new Map([
    ['2305793883', { changeAddress: 'tsys1qjfcltq5yljfzkljxdnlc0ffmhqudz8ltq0z695', outputs: [{ value: new BN(10000000) }] }]
  ]),
  xpubTokens: [
    { path: "m/84'/1'/0'/0/0" },
    { path: "m/84'/1'/0'/1/0" },
    { path: "m/84'/1'/0'/1/2" },
    { path: "m/84'/1'/0'/1/3" },
    { path: "m/84'/1'/0'/1/1" },
    { path: "m/84'/1'/0'/0/4" },
    { path: "m/84'/1'/0'/0/5" },
    { path: "m/84'/1'/0'/0/6" },
    { path: "m/84'/1'/0'/0/8" },
    { path: "m/84'/1'/0'/0/9" },
    { path: "m/84'/1'/0'/0/10" },
    { path: "m/84'/1'/0'/0/11" }
  ],
  expected: {
    hex: '860000000001021787945f9d715eb56da23be847e1db7aada29c70ba4ef0eb59c9ed20d60526910900000000fdffffff2270b1a47a133755ff6dbcb34a32cc31b42c999c70dec6b133ced8e6e36d589f0300000000fdffffff020000000000000000236a210187cabdbd5b020008015800149667de58c15475626165eaa4c9970e409e1181d05478f505000000001600149271f58284fc922b7e466cff87a53bb838d11feb0247304402203aedf8a729cc737b0eca867055a4c1f86adee2f27259faf928133d25cf02d2bc02205e77e10f5cd17417bb36e23aadcbd1f7ee226f2077b349636bc42a8b8caef158012102b7d4e03f4230eb2406328be6bf9dbd400083b929c07a4b0b3601589b3243067402483045022100d25f78cffd43faec0dfcb1759960d638b3ae7b477b496d9b16856b89cc3219d902200a85c2e5b2fb3ab4eebcef4197898c96c2081c868c94c10ce92b7ec15a9e36fc012103b7eeb47fdd1c2084ef795fac22bf24185e7295d2efa3178b69b6eca409810fba00000000',
    rbf: true,
    numOutputs: 2,
    script: Buffer.from('6a210187cabdbd5b020008015800149667de58c15475626165eaa4c9970e409e1181d0', 'hex'),
    asset: {
      allocation: [{ assetGuid: '2305793883', values: [{ n: 0, value: new BN(10000000) }, { n: 1, value: new BN(90000000) }], notarysig: Buffer.from('') }],
      ethaddress: Buffer.from('9667de58c15475626165eaa4c9970e409e1181d0', 'hex')
    },
    receivingIndex: 11,
    changeIndex: 3
  }
},
{
  description: 'burn asset allocation to ethereum multiple inputs, change has asset',
  version: syscointx.utils.SYSCOIN_TX_VERSION_ALLOCATION_BURN_TO_ETHEREUM,
  txOpts: {
    rbf: true
  },
  mnemonic: 'club toss element melody skin ship rifle student reason real interest insane elevator beauty movie',
  feeRate: new BN(10),
  utxoObj: {
    utxos: [
      { txid: '912605d620edc959ebf04eba709ca2ad7adbe147e83ba26db55e719d5f948717', vout: 8, address: 'tsys1qgylgl55m9an3kczce86shagml9cjwnjny3slu5', path: "m/84'/1'/0'/0/9", value: '690', assetInfo: { assetGuid: '2305793883', value: '500000000' } },
      { txid: '386efe525b6b3f29fb6cb982da3710d2ea324a31ce3448ea76122a6b1150c530', vout: 1, address: 'tsys1qjfcltq5yljfzkljxdnlc0ffmhqudz8ltq0z695', path: "m/84'/1'/0'/0/5", value: '99970714', assetInfo: { assetGuid: '2305793883', value: '90000000' } }
    ],
    assets: [
      {
        assetGuid: '2305793883',
        decimals: 8,
        pubData: { desc: syscointx.utils.encodeToBase64('publicvalue') },
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 127,
        totalSupply: '0',
        maxSupply: '100000000000'
      }
    ]
  },
  assetOpts: { ethaddress: Buffer.from('9667de58c15475626165eaa4c9970e409e1181d0', 'hex') },
  sysChangeAddress: 'tsys1qh4k0mpx4xqju3zgcvtkynvqrd5ryqhg0yr9uk8',
  assetMap: new Map([
    ['2305793883', { changeAddress: 'tsys1qjfcltq5yljfzkljxdnlc0ffmhqudz8ltq0z695', outputs: [{ value: new BN(100000000) }] }]
  ]),
  xpubTokens: [
    { path: "m/84'/1'/0'/0/0" },
    { path: "m/84'/1'/0'/1/0" },
    { path: "m/84'/1'/0'/1/2" },
    { path: "m/84'/1'/0'/1/3" },
    { path: "m/84'/1'/0'/1/1" },
    { path: "m/84'/1'/0'/0/4" },
    { path: "m/84'/1'/0'/0/5" },
    { path: "m/84'/1'/0'/0/6" },
    { path: "m/84'/1'/0'/0/8" },
    { path: "m/84'/1'/0'/0/9" },
    { path: "m/84'/1'/0'/0/10" },
    { path: "m/84'/1'/0'/0/11" }
  ],
  expected: {
    hex: '860000000001021787945f9d715eb56da23be847e1db7aada29c70ba4ef0eb59c9ed20d60526910800000000fdffffff30c550116b2a1276ea4834ce314a32ead21037da82b96cfb293f6b5b52fe6e380100000000fdffffff020000000000000000246a220187cabdbd5b02000901824000149667de58c15475626165eaa4c9970e409e1181d07868f505000000001600149271f58284fc922b7e466cff87a53bb838d11feb0248304502210091cfc7488c230c76d9e86a79db8c652b3c9029ceb17a23bbd17b9d992947a7e90220694f29699daa5a5270edd2bbca46c9016742c18dc7a7c312b0f681a8b5361420012102b7d4e03f4230eb2406328be6bf9dbd400083b929c07a4b0b3601589b3243067402483045022100a8c68dd68cce7654228771a52e057baba72e794851cb3f1f50fe549f2bcb24270220637a7b6f3c8a45aad47f182c1d8a9e99596939f045d28e797ba1c5f6fb361ccd012103c86473f098d9bb69d31a7851372f9ded7b11691a77c253279e987373164b2ad200000000',
    rbf: true,
    numOutputs: 2,
    script: Buffer.from('6a220187cabdbd5b02000901824000149667de58c15475626165eaa4c9970e409e1181d0', 'hex'),
    asset: {
      allocation: [{ assetGuid: '2305793883', values: [{ n: 0, value: new BN(100000000) }, { n: 1, value: new BN(490000000) }], notarysig: Buffer.from('') }],
      ethaddress: Buffer.from('9667de58c15475626165eaa4c9970e409e1181d0', 'hex')
    },
    receivingIndex: 11,
    changeIndex: 3
  }
},
{
  description: 'standard sys send',
  version: 2,
  txOpts: {
    rbf: true
  },
  mnemonic: 'club toss element melody skin ship rifle student reason real interest insane elevator beauty movie',
  feeRate: new BN(10),
  utxoObj: {
    utxos: [
      { txid: '9f586de3e6d8ce33b1c6de709c992cb431cc324ab3bc6dff5537137aa4b17022', vout: 0, address: 'tsys1qjfcltq5yljfzkljxdnlc0ffmhqudz8ltq0z695', path: "m/84'/1'/0'/0/5", value: '40000000' },
      { txid: 'f98d9922a1fd8c81728be2fb06b775e564cb0766ce251d43e97df762378bf736', vout: 1, address: 'tsys1qjfcltq5yljfzkljxdnlc0ffmhqudz8ltq0z695', path: "m/84'/1'/0'/0/5", value: '30000000' }
    ]
  },
  changeAddress: 'tsys1qjfcltq5yljfzkljxdnlc0ffmhqudz8ltq0z695',
  outputs: [
    { address: 'tsys1qh4k0mpx4xqju3zgcvtkynvqrd5ryqhg0yr9uk8', value: new BN(50000000) }
  ],
  xpubTokens: [
    { path: "m/84'/1'/0'/0/0" },
    { path: "m/84'/1'/0'/1/0" },
    { path: "m/84'/1'/0'/1/2" },
    { path: "m/84'/1'/0'/1/3" },
    { path: "m/84'/1'/0'/1/1" },
    { path: "m/84'/1'/0'/0/4" },
    { path: "m/84'/1'/0'/0/5" },
    { path: "m/84'/1'/0'/0/6" },
    { path: "m/84'/1'/0'/0/8" },
    { path: "m/84'/1'/0'/0/9" },
    { path: "m/84'/1'/0'/0/10" },
    { path: "m/84'/1'/0'/0/11" }
  ],
  expected: {
    hex: '020000000001022270b1a47a133755ff6dbcb34a32cc31b42c999c70dec6b133ced8e6e36d589f0000000000fdffffff36f78b3762f77de9431d25ce6607cb64e575b706fbe28b72818cfda122998df90100000000fdffffff0280f0fa0200000000160014bd6cfd84d53025c8891862ec49b0036d06405d0f90243101000000001600149271f58284fc922b7e466cff87a53bb838d11feb0247304402207a16b7e1407e07ac3cb747c3a972a5152bb820cf4daf908f8a776617725c3e9502201ae6983969a49b7a36018fc16d03ba127a355fb9b137470e0021db392d33720e012103c86473f098d9bb69d31a7851372f9ded7b11691a77c253279e987373164b2ad202473044022067eccf84fee985c353d87407ed8d95544a137145e8200ece94bc3def6f65b84502202d07c7751cc9207e991f6de48f4eba58f44c8f560b2a6efe698a5a13172d257e012103c86473f098d9bb69d31a7851372f9ded7b11691a77c253279e987373164b2ad200000000',
    rbf: true,
    version: 2,
    numOutputs: 2,
    receivingIndex: 11,
    changeIndex: 3
  }
},
{
  description: 'standard sys send with asset inputs',
  version: 2,
  txOpts: {
    allowOtherNotarizedAssetInputs: true,
    rbf: true
  },
  mnemonic: 'club toss element melody skin ship rifle student reason real interest insane elevator beauty movie',
  feeRate: new BN(10),
  utxoObj: {
    utxos: [
      { txid: '64dbfb02268b642f6a32a266bdd54add8989a1fa913b7414a642b5d85e964c68', vout: 0, address: 'tsys1qh4k0mpx4xqju3zgcvtkynvqrd5ryqhg0yr9uk8', path: "m/84'/1'/0'/0/10", value: '100000000', assetInfo: { assetGuid: '2305793883', value: '90000000' } },
      { txid: '9f586de3e6d8ce33b1c6de709c992cb431cc324ab3bc6dff5537137aa4b17022', vout: 1, address: 'tsys1qjfcltq5yljfzkljxdnlc0ffmhqudz8ltq0z695', path: "m/84'/1'/0'/0/5", value: '6900', assetInfo: { assetGuid: '2369540753', value: '10000000' } }
    ],
    assets: [
      {
        assetGuid: '2305793883',
        decimals: 8,
        pubData: { desc: syscointx.utils.encodeToBase64('publicvalue') },
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 127,
        totalSupply: '0',
        maxSupply: '100000000000'
      },
      {
        assetGuid: '2369540753',
        decimals: 8,
        pubData: { desc: syscointx.utils.encodeToBase64('publicvalue') },
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 127,
        totalSupply: '0',
        maxSupply: '100000000000',
        notaryKeyID: 'X1egKJRfW1uirvT9K1EgY+eF3PU=', // keyid for tsys1qtat6q2y5tad4hg4w7n7jk5fqv0ncth84puexca (m/84’/1’/0’/0/3)
        notaryDetails: {
          endPoint: 'https://test.com',
          instantTransfers: 0,
          HDRequired: 1
        },
        // for unit test only, this normally wouldn't come in payload
        notarySig: 'H5ZrZe8aCarhYzmgkvqoCilr1x4sbqTkpkD45uSaYbafb73oGnd/MaoLZxfGFz7DdSU25TH77raRxflWOGKTUTo='
      }
    ]
  },
  changeAddress: 'tsys1qjfcltq5yljfzkljxdnlc0ffmhqudz8ltq0z695',
  outputs: [
    { address: 'tsys1qh4k0mpx4xqju3zgcvtkynvqrd5ryqhg0yr9uk8', value: new BN(99997600) }
  ],
  xpubTokens: [
    { path: "m/84'/1'/0'/0/0" },
    { path: "m/84'/1'/0'/1/0" },
    { path: "m/84'/1'/0'/1/2" },
    { path: "m/84'/1'/0'/1/3" },
    { path: "m/84'/1'/0'/1/1" },
    { path: "m/84'/1'/0'/0/4" },
    { path: "m/84'/1'/0'/0/5" },
    { path: "m/84'/1'/0'/0/6" },
    { path: "m/84'/1'/0'/0/8" },
    { path: "m/84'/1'/0'/0/9" },
    { path: "m/84'/1'/0'/0/10" },
    { path: "m/84'/1'/0'/0/11" }
  ],
  expected: {
    hex: '87000000000102684c965ed8b542a614743b91faa18989dd4ad5bd66a2326a2f648b2602fbdb640000000000fdffffff2270b1a47a133755ff6dbcb34a32cc31b42c999c70dec6b133ced8e6e36d589f0100000000fdffffff04a0d7f50500000000160014bd6cfd84d53025c8891862ec49b0036d06405d0f46140000000000001600149271f58284fc922b7e466cff87a53bb838d11febb2020000000000001600149271f58284fc922b7e466cff87a53bb838d11feb0000000000000000576a4c540287cabdbd5b0101580087e8f0a411010208411f966b65ef1a09aae16339a092faa80a296bd71e2c6ea4e4a640f8e6e49a61b69f6fbde81a777f31aa0b6717c6173ec3752536e531fbeeb691c5f956386293513a02473044022033145176ec8b2f0b7f92245910f3047f6d1c809840440b96cb93fec9c420e1f502200e135f74b89e5fe36280c1edfd5192c2aafde2b14aa2923275db5705ebe4b519012103b7eeb47fdd1c2084ef795fac22bf24185e7295d2efa3178b69b6eca409810fba02483045022100a708dea5889dd6729fdda9d4d718d736c7e784ddf1eb1e4e68e00f5529a1a5c102203cb88c30592f53e5a5037695386a04dee221ea3bf53cc9fb0e0f578a8025820d012103c86473f098d9bb69d31a7851372f9ded7b11691a77c253279e987373164b2ad200000000',
    rbf: true,
    version: syscointx.utils.SYSCOIN_TX_VERSION_ALLOCATION_SEND,
    numOutputs: 4, // 4 because new opreturn will be created + 1 for second asset change
    script: Buffer.from('6a4c540287cabdbd5b0101580087e8f0a411010208411f966b65ef1a09aae16339a092faa80a296bd71e2c6ea4e4a640f8e6e49a61b69f6fbde81a777f31aa0b6717c6173ec3752536e531fbeeb691c5f956386293513a', 'hex'),
    asset: {
      allocation: [{ assetGuid: '2305793883', values: [{ n: 1, value: new BN(90000000) }], notarysig: Buffer.from('') }, { assetGuid: '2369540753', values: [{ n: 2, value: new BN(10000000) }], notarysig: Buffer.from('H5ZrZe8aCarhYzmgkvqoCilr1x4sbqTkpkD45uSaYbafb73oGnd/MaoLZxfGFz7DdSU25TH77raRxflWOGKTUTo=', 'base64') }]
    },
    receivingIndex: 11,
    changeIndex: 3
  }
},
{
  description: 'mint assetallocation',
  version: syscointx.utils.SYSCOIN_TX_VERSION_ALLOCATION_MINT,
  txOpts: {
    rbf: true
  },
  mnemonic: 'club toss element melody skin ship rifle student reason real interest insane elevator beauty movie',
  feeRate: new BN(10),
  utxoObj: {
    utxos: [
      { txid: '64dbfb02268b642f6a32a266bdd54add8989a1fa913b7414a642b5d85e964c68', vout: 0, address: 'tsys1qh4k0mpx4xqju3zgcvtkynvqrd5ryqhg0yr9uk8', path: "m/84'/1'/0'/0/10", value: '100000000', assetInfo: { assetGuid: '2305793883', value: '90000000' } },
      { txid: '9f586de3e6d8ce33b1c6de709c992cb431cc324ab3bc6dff5537137aa4b17022', vout: 1, address: 'tsys1qjfcltq5yljfzkljxdnlc0ffmhqudz8ltq0z695', path: "m/84'/1'/0'/0/5", value: '6900', assetInfo: { assetGuid: '2369540753', value: '10000000' } }
    ],
    assets: [
      {
        assetGuid: '2305793883',
        decimals: 8,
        pubData: { desc: syscointx.utils.encodeToBase64('publicvalue') },
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 127,
        totalSupply: '0',
        maxSupply: '100000000000'
      },
      {
        assetGuid: '2369540753',
        decimals: 8,
        pubData: { desc: syscointx.utils.encodeToBase64('publicvalue') },
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 127,
        totalSupply: '0',
        maxSupply: '100000000000'
      }
    ]
  },
  assetOpts: {
    bridgetransferid: 2,
    blocknumber: 6816449,
    txvalue: Buffer.from('f9012b82051f843b9aca008307a120940765efb302d504751c652c5b1d65e8e9edf2e70f80b8c454c988ff00000000000000000000000000000000000000000000000000000002540be400000000000000000000000000000000000000000000000000000000009be8894b0000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000002c62637274317130667265323430737939326d716b386b6b377073616561366b74366d3537323570377964636a00000000000000000000000000000000000000002ca0dccb6e077c3f6252d199202113893407119d4ba09667113f2d20c63a31487b87a01e0a059e50f08f2772781691f2c9e43a9503a167c98cf467b1afc177b74d84e6', 'hex'),
    txroot: Buffer.from('0xa0842ab40a9c4770c8ec74158aadcf943e8158128fdd1ba8cef9c7cb8eda732692', 'hex'),
    txparentnodes: Buffer.from('f9039cf871a04442f3f69add48df0531fe3c0025103b53fcf3fe38060e5f29366caec8855e4fa0229f7b7e69c0b5793f8a61c06f5cc09b0f4938561856c632ee56c3b2c4d6d153808080808080a07720fff5e8eabef55fa129ee55b3b0d82875e2b25b8f26e22cf6b5c4f9cec7ab8080808080808080f901f180a03ee147749c5b769bc5d1a53e4f37567506d417de4ec4e67722130eda4638427da043caa62b40dad61bce4d50fb62ea485729a6687c3aa13895cf4ba234b92afe82a0b79958e4aa63104da4599ebb91e712375e6adfc89abc14b9533c5778f107e7d8a01bc7f80f81a8d281253ac882bb89aca6131e5794bfcbdccde990bb6d5be6cb2fa0aedad62f1426b68e395a59e06bf242fb28b882af67589bce3495a99650058ec4a0c21a7e0b9d0948bb6b65a5e73f5f01173064d20e4819ca4884d1eabc22bf737da090087708c533b10af8925eebf398c005fc16cb6a515111f2be4f328f762949d0a02827daacd6a52ae6c74a78791ff0c5e33a7a85f5ca0a47cdfbcd5219f75f705ca0af7ecf31d56575155d272cd813bf7d7ac435f62b0538c31771e407dafef6be53a09b74707c3abdbfa305cb61f23c940f063f553f17d0bd3013126aad357193353ea067a52ed59820bb48f8010d2b2bb0ee92803b1a00a8341fd4c3269b065ed070d9a0bf0e9b45955283e6e04b71eda63bfc7b55d9f54527943aa1c159b4161b1e1daea0ecabd4c00deacf9a7ff25be942c9f468628eb776fbec23a9ca0d8fc256f14a31a0df406c7ac7f38c2ea1d9bdb06c2e51db3de8cf0e655a8e0e683e19ca1ddf83d3a08360ec6c5e26614f144520ed9d0b577640381f0f38b5429b67422f75d603ad5a80f9013220b9012ef9012b82051f843b9aca008307a120940765efb302d504751c652c5b1d65e8e9edf2e70f80b8c454c988ff00000000000000000000000000000000000000000000000000000002540be400000000000000000000000000000000000000000000000000000000009be8894b0000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000002c62637274317130667265323430737939326d716b386b6b377073616561366b74366d3537323570377964636a00000000000000000000000000000000000000002ca0dccb6e077c3f6252d199202113893407119d4ba09667113f2d20c63a31487b87a01e0a059e50f08f2772781691f2c9e43a9503a167c98cf467b1afc177b74d84e6', 'hex'),
    txpath: Buffer.from('0b', 'hex'),
    receiptvalue: Buffer.from('f902e00183192ee2b9010000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000200000000000000008000000000000000000000100200000000000000000010000000000000200000000000000000000000000000000000010000000000000000000000000000004000000000000000000000000400004001000000000020000000000000000000000000080000000000000408000000040000000000000000002000000000000000000000000000000000000000000000000000000000010000000000000000010000000000000000000000000000000000000000000f901d5f89b94f2bb7bfa19e7c4b6bb333ee1afdf8e5e8f9b3561f863a0ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3efa0000000000000000000000000b0ea8c9ee8aa87efd28a12de8c034f947c144053a00000000000000000000000000765efb302d504751c652c5b1d65e8e9edf2e70fa000000000000000000000000000000000000000000000000000000002540be400f89b94f2bb7bfa19e7c4b6bb333ee1afdf8e5e8f9b3561f863a08c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925a0000000000000000000000000b0ea8c9ee8aa87efd28a12de8c034f947c144053a00000000000000000000000000765efb302d504751c652c5b1d65e8e9edf2e70fa00000000000000000000000000000000000000000000000000000000000000000f899940765efb302d504751c652c5b1d65e8e9edf2e70fe1a09c6dea23fe3b510bb5d170df49dc74e387692eaa3258c691918cd3aa94f5fb74b860000000000000000000000000b0ea8c9ee8aa87efd28a12de8c034f947c14405300000000000000000000000000000000000000000000000000000002540be4000000000000000000000000000000000000000000000000000000080800000002', 'hex'),
    receiptroot: Buffer.from('0xa0a958499bf48fcce17672b58aa9037bd3dafeb6231880722d909c60bacfaaa8d4', 'hex'),
    receiptparentnodes: Buffer.from('f90551f871a0cab13def05783d763febde31920bd234d0486c26955c2937e0486db909a28eeea09cf564a668a29a5f1cc5d6ef8e19988dfd2b30d290672f0ffc4200e608cb65ac808080808080a029b8ed2258c53562954c87bcd7f60671029680d2a19ef8bcd3ad470ea48d57d18080808080808080f901f180a07c21ca39872e6b8f611bc6b1b295c24f988b5cf944625eabf5236b37ea3b9f01a0edb9e63fdc31ba41f11a8b2fb8000ad1357b3c0b27a8483968d75e93e7b488a1a02231847aa3c5dde2f2a1851a66aabec65e5eaae8c28110756f122c72be1fba05a08fa87809e5b7f989e78ccbe1a6bc4924115d5747529af879f2fe196f959b64fca091f1bf748061eba21a413b72d70afccb8daebb5906d5cd9dda06d5f877065d5ba0d7e6c82dd1c25eb2f90b02f038beaff98c260d46992d0b3c1eac7d51552c7417a01d5c43deb2e3794292cdffb04f82ab25bc4e75f5e0cab928b66582e08026f5b1a0d7323a87dc8fbc66c7b34810d2cad92fc0da168d962b4556e825a3266a148b74a0af31f0b7cdcd6a855ac7678ef2b8fcb1afeda918b0c8e4696a4013f2b75ca402a0f9d63f2db8ab6d3c3e12073ac2910ee575832bde3e4586f18e59dd26a16adb7ca0f0c91e059c43780617d304fe8992511f096ccc35232da1f25127db53ba4fb05aa052030932d0a9026efd2a3ada67f33d401cd9a97ddb24c606af3a0a0c24e432aba0142af9b4686c6ca30b0ac39133fa76d8682b7bbbec488e62e652d3f25419777da0940f31617e91cfbabaa9d0d1638949f8125f80a43027122778522675194a4e65a0edc4c7d2cf30150fdf7e502d0ef06c80c85fc37260134a112493c6183f62f4b580f902e720b902e3f902e00183192ee2b9010000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000200000000000000008000000000000000000000100200000000000000000010000000000000200000000000000000000000000000000000010000000000000000000000000000004000000000000000000000000400004001000000000020000000000000000000000000080000000000000408000000040000000000000000002000000000000000000000000000000000000000000000000000000000010000000000000000010000000000000000000000000000000000000000000f901d5f89b94f2bb7bfa19e7c4b6bb333ee1afdf8e5e8f9b3561f863a0ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3efa0000000000000000000000000b0ea8c9ee8aa87efd28a12de8c034f947c144053a00000000000000000000000000765efb302d504751c652c5b1d65e8e9edf2e70fa000000000000000000000000000000000000000000000000000000002540be400f89b94f2bb7bfa19e7c4b6bb333ee1afdf8e5e8f9b3561f863a08c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925a0000000000000000000000000b0ea8c9ee8aa87efd28a12de8c034f947c144053a00000000000000000000000000765efb302d504751c652c5b1d65e8e9edf2e70fa00000000000000000000000000000000000000000000000000000000000000000f899940765efb302d504751c652c5b1d65e8e9edf2e70fe1a09c6dea23fe3b510bb5d170df49dc74e387692eaa3258c691918cd3aa94f5fb74b860000000000000000000000000b0ea8c9ee8aa87efd28a12de8c034f947c14405300000000000000000000000000000000000000000000000000000002540be4000000000000000000000000000000000000000000000000000000080800000002', 'hex')
  },
  sysChangeAddress: 'tsys1qp7qn0t0t6ymwhdwne9uku7v3dhw07a7tra8hzl',
  assetMap: new Map([
    ['2615707979', { changeAddress: 'tsys1qjfcltq5yljfzkljxdnlc0ffmhqudz8ltq0z695', outputs: [{ value: new BN(10000000000), address: 'tsys1qdflre2yd37qtpqe2ykuhwandlhq04r2td2t9ae' }] }]
  ]),
  xpubTokens: [
    { path: "m/84'/1'/0'/0/0" },
    { path: "m/84'/1'/0'/1/0" },
    { path: "m/84'/1'/0'/1/2" },
    { path: "m/84'/1'/0'/1/3" },
    { path: "m/84'/1'/0'/1/1" },
    { path: "m/84'/1'/0'/0/4" },
    { path: "m/84'/1'/0'/0/5" },
    { path: "m/84'/1'/0'/0/6" },
    { path: "m/84'/1'/0'/0/8" },
    { path: "m/84'/1'/0'/0/9" },
    { path: "m/84'/1'/0'/0/10" },
    { path: "m/84'/1'/0'/0/11" }
  ],
  expected: {
    hex: '85000000000101684c965ed8b542a614743b91faa18989dd4ad5bd66a2326a2f648b2602fbdb640000000000fdffffff03b2020000000000001600146a7e3ca88d8f80b0832a25b977766dfdc0fa8d4b0000000000000000fd20096a4d1c090288dea1914b0100640087cabdbd5b0102580002000000c10268007102fd9f03f9039cf871a04442f3f69add48df0531fe3c0025103b53fcf3fe38060e5f29366caec8855e4fa0229f7b7e69c0b5793f8a61c06f5cc09b0f4938561856c632ee56c3b2c4d6d153808080808080a07720fff5e8eabef55fa129ee55b3b0d82875e2b25b8f26e22cf6b5c4f9cec7ab8080808080808080f901f180a03ee147749c5b769bc5d1a53e4f37567506d417de4ec4e67722130eda4638427da043caa62b40dad61bce4d50fb62ea485729a6687c3aa13895cf4ba234b92afe82a0b79958e4aa63104da4599ebb91e712375e6adfc89abc14b9533c5778f107e7d8a01bc7f80f81a8d281253ac882bb89aca6131e5794bfcbdccde990bb6d5be6cb2fa0aedad62f1426b68e395a59e06bf242fb28b882af67589bce3495a99650058ec4a0c21a7e0b9d0948bb6b65a5e73f5f01173064d20e4819ca4884d1eabc22bf737da090087708c533b10af8925eebf398c005fc16cb6a515111f2be4f328f762949d0a02827daacd6a52ae6c74a78791ff0c5e33a7a85f5ca0a47cdfbcd5219f75f705ca0af7ecf31d56575155d272cd813bf7d7ac435f62b0538c31771e407dafef6be53a09b74707c3abdbfa305cb61f23c940f063f553f17d0bd3013126aad357193353ea067a52ed59820bb48f8010d2b2bb0ee92803b1a00a8341fd4c3269b065ed070d9a0bf0e9b45955283e6e04b71eda63bfc7b55d9f54527943aa1c159b4161b1e1daea0ecabd4c00deacf9a7ff25be942c9f468628eb776fbec23a9ca0d8fc256f14a31a0df406c7ac7f38c2ea1d9bdb06c2e51db3de8cf0e655a8e0e683e19ca1ddf83d3a08360ec6c5e26614f144520ed9d0b577640381f0f38b5429b67422f75d603ad5a80f9013220b9012ef9012b82051f843b9aca008307a120940765efb302d504751c652c5b1d65e8e9edf2e70f80b8c454c988ff00000000000000000000000000000000000000000000000000000002540be400000000000000000000000000000000000000000000000000000000009be8894b0000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000002c62637274317130667265323430737939326d716b386b6b377073616561366b74366d3537323570377964636a00000000000000000000000000000000000000002ca0dccb6e077c3f6252d199202113893407119d4ba09667113f2d20c63a31487b87a01e0a059e50f08f2772781691f2c9e43a9503a167c98cf467b1afc177b74d84e6010b7102fd5405f90551f871a0cab13def05783d763febde31920bd234d0486c26955c2937e0486db909a28eeea09cf564a668a29a5f1cc5d6ef8e19988dfd2b30d290672f0ffc4200e608cb65ac808080808080a029b8ed2258c53562954c87bcd7f60671029680d2a19ef8bcd3ad470ea48d57d18080808080808080f901f180a07c21ca39872e6b8f611bc6b1b295c24f988b5cf944625eabf5236b37ea3b9f01a0edb9e63fdc31ba41f11a8b2fb8000ad1357b3c0b27a8483968d75e93e7b488a1a02231847aa3c5dde2f2a1851a66aabec65e5eaae8c28110756f122c72be1fba05a08fa87809e5b7f989e78ccbe1a6bc4924115d5747529af879f2fe196f959b64fca091f1bf748061eba21a413b72d70afccb8daebb5906d5cd9dda06d5f877065d5ba0d7e6c82dd1c25eb2f90b02f038beaff98c260d46992d0b3c1eac7d51552c7417a01d5c43deb2e3794292cdffb04f82ab25bc4e75f5e0cab928b66582e08026f5b1a0d7323a87dc8fbc66c7b34810d2cad92fc0da168d962b4556e825a3266a148b74a0af31f0b7cdcd6a855ac7678ef2b8fcb1afeda918b0c8e4696a4013f2b75ca402a0f9d63f2db8ab6d3c3e12073ac2910ee575832bde3e4586f18e59dd26a16adb7ca0f0c91e059c43780617d304fe8992511f096ccc35232da1f25127db53ba4fb05aa052030932d0a9026efd2a3ada67f33d401cd9a97ddb24c606af3a0a0c24e432aba0142af9b4686c6ca30b0ac39133fa76d8682b7bbbec488e62e652d3f25419777da0940f31617e91cfbabaa9d0d1638949f8125f80a43027122778522675194a4e65a0edc4c7d2cf30150fdf7e502d0ef06c80c85fc37260134a112493c6183f62f4b580f902e720b902e3f902e00183192ee2b9010000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000200000000000000008000000000000000000000100200000000000000000010000000000000200000000000000000000000000000000000010000000000000000000000000000004000000000000000000000000400004001000000000020000000000000000000000000080000000000000408000000040000000000000000002000000000000000000000000000000000000000000000000000000000010000000000000000010000000000000000000000000000000000000000000f901d5f89b94f2bb7bfa19e7c4b6bb333ee1afdf8e5e8f9b3561f863a0ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3efa0000000000000000000000000b0ea8c9ee8aa87efd28a12de8c034f947c144053a00000000000000000000000000765efb302d504751c652c5b1d65e8e9edf2e70fa000000000000000000000000000000000000000000000000000000002540be400f89b94f2bb7bfa19e7c4b6bb333ee1afdf8e5e8f9b3561f863a08c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925a0000000000000000000000000b0ea8c9ee8aa87efd28a12de8c034f947c144053a00000000000000000000000000765efb302d504751c652c5b1d65e8e9edf2e70fa00000000000000000000000000000000000000000000000000000000000000000f899940765efb302d504751c652c5b1d65e8e9edf2e70fe1a09c6dea23fe3b510bb5d170df49dc74e387692eaa3258c691918cd3aa94f5fb74b860000000000000000000000000b0ea8c9ee8aa87efd28a12de8c034f947c14405300000000000000000000000000000000000000000000000000000002540be400000000000000000000000000000000000000000000000000000008080000000200001e7df505000000001600140f8137adebd136ebb5d3c9796e79916ddcff77cb024730440220209b208a5c3d7d53525ae0b92bf40896cb3ad93eafc8da0546eb74e21bdaedd202206fa7ff140b06b864a3857583e6ff3587e6354db3817fa6d7852c20d2d0bae95e012103b7eeb47fdd1c2084ef795fac22bf24185e7295d2efa3178b69b6eca409810fba00000000',
    rbf: true,
    version: syscointx.utils.SYSCOIN_TX_VERSION_ALLOCATION_MINT,
    numOutputs: 3,
    script: Buffer.from('6a4d1c090288dea1914b0100640087cabdbd5b0102580002000000c10268007102fd9f03f9039cf871a04442f3f69add48df0531fe3c0025103b53fcf3fe38060e5f29366caec8855e4fa0229f7b7e69c0b5793f8a61c06f5cc09b0f4938561856c632ee56c3b2c4d6d153808080808080a07720fff5e8eabef55fa129ee55b3b0d82875e2b25b8f26e22cf6b5c4f9cec7ab8080808080808080f901f180a03ee147749c5b769bc5d1a53e4f37567506d417de4ec4e67722130eda4638427da043caa62b40dad61bce4d50fb62ea485729a6687c3aa13895cf4ba234b92afe82a0b79958e4aa63104da4599ebb91e712375e6adfc89abc14b9533c5778f107e7d8a01bc7f80f81a8d281253ac882bb89aca6131e5794bfcbdccde990bb6d5be6cb2fa0aedad62f1426b68e395a59e06bf242fb28b882af67589bce3495a99650058ec4a0c21a7e0b9d0948bb6b65a5e73f5f01173064d20e4819ca4884d1eabc22bf737da090087708c533b10af8925eebf398c005fc16cb6a515111f2be4f328f762949d0a02827daacd6a52ae6c74a78791ff0c5e33a7a85f5ca0a47cdfbcd5219f75f705ca0af7ecf31d56575155d272cd813bf7d7ac435f62b0538c31771e407dafef6be53a09b74707c3abdbfa305cb61f23c940f063f553f17d0bd3013126aad357193353ea067a52ed59820bb48f8010d2b2bb0ee92803b1a00a8341fd4c3269b065ed070d9a0bf0e9b45955283e6e04b71eda63bfc7b55d9f54527943aa1c159b4161b1e1daea0ecabd4c00deacf9a7ff25be942c9f468628eb776fbec23a9ca0d8fc256f14a31a0df406c7ac7f38c2ea1d9bdb06c2e51db3de8cf0e655a8e0e683e19ca1ddf83d3a08360ec6c5e26614f144520ed9d0b577640381f0f38b5429b67422f75d603ad5a80f9013220b9012ef9012b82051f843b9aca008307a120940765efb302d504751c652c5b1d65e8e9edf2e70f80b8c454c988ff00000000000000000000000000000000000000000000000000000002540be400000000000000000000000000000000000000000000000000000000009be8894b0000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000002c62637274317130667265323430737939326d716b386b6b377073616561366b74366d3537323570377964636a00000000000000000000000000000000000000002ca0dccb6e077c3f6252d199202113893407119d4ba09667113f2d20c63a31487b87a01e0a059e50f08f2772781691f2c9e43a9503a167c98cf467b1afc177b74d84e6010b7102fd5405f90551f871a0cab13def05783d763febde31920bd234d0486c26955c2937e0486db909a28eeea09cf564a668a29a5f1cc5d6ef8e19988dfd2b30d290672f0ffc4200e608cb65ac808080808080a029b8ed2258c53562954c87bcd7f60671029680d2a19ef8bcd3ad470ea48d57d18080808080808080f901f180a07c21ca39872e6b8f611bc6b1b295c24f988b5cf944625eabf5236b37ea3b9f01a0edb9e63fdc31ba41f11a8b2fb8000ad1357b3c0b27a8483968d75e93e7b488a1a02231847aa3c5dde2f2a1851a66aabec65e5eaae8c28110756f122c72be1fba05a08fa87809e5b7f989e78ccbe1a6bc4924115d5747529af879f2fe196f959b64fca091f1bf748061eba21a413b72d70afccb8daebb5906d5cd9dda06d5f877065d5ba0d7e6c82dd1c25eb2f90b02f038beaff98c260d46992d0b3c1eac7d51552c7417a01d5c43deb2e3794292cdffb04f82ab25bc4e75f5e0cab928b66582e08026f5b1a0d7323a87dc8fbc66c7b34810d2cad92fc0da168d962b4556e825a3266a148b74a0af31f0b7cdcd6a855ac7678ef2b8fcb1afeda918b0c8e4696a4013f2b75ca402a0f9d63f2db8ab6d3c3e12073ac2910ee575832bde3e4586f18e59dd26a16adb7ca0f0c91e059c43780617d304fe8992511f096ccc35232da1f25127db53ba4fb05aa052030932d0a9026efd2a3ada67f33d401cd9a97ddb24c606af3a0a0c24e432aba0142af9b4686c6ca30b0ac39133fa76d8682b7bbbec488e62e652d3f25419777da0940f31617e91cfbabaa9d0d1638949f8125f80a43027122778522675194a4e65a0edc4c7d2cf30150fdf7e502d0ef06c80c85fc37260134a112493c6183f62f4b580f902e720b902e3f902e00183192ee2b9010000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000200000000000000008000000000000000000000100200000000000000000010000000000000200000000000000000000000000000000000010000000000000000000000000000004000000000000000000000000400004001000000000020000000000000000000000000080000000000000408000000040000000000000000002000000000000000000000000000000000000000000000000000000000010000000000000000010000000000000000000000000000000000000000000f901d5f89b94f2bb7bfa19e7c4b6bb333ee1afdf8e5e8f9b3561f863a0ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3efa0000000000000000000000000b0ea8c9ee8aa87efd28a12de8c034f947c144053a00000000000000000000000000765efb302d504751c652c5b1d65e8e9edf2e70fa000000000000000000000000000000000000000000000000000000002540be400f89b94f2bb7bfa19e7c4b6bb333ee1afdf8e5e8f9b3561f863a08c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925a0000000000000000000000000b0ea8c9ee8aa87efd28a12de8c034f947c144053a00000000000000000000000000765efb302d504751c652c5b1d65e8e9edf2e70fa00000000000000000000000000000000000000000000000000000000000000000f899940765efb302d504751c652c5b1d65e8e9edf2e70fe1a09c6dea23fe3b510bb5d170df49dc74e387692eaa3258c691918cd3aa94f5fb74b860000000000000000000000000b0ea8c9ee8aa87efd28a12de8c034f947c14405300000000000000000000000000000000000000000000000000000002540be40000000000000000000000000000000000000000000000000000000808000000020000', 'hex'),
    asset: {
      allocation: [{ assetGuid: '2615707979', values: [{ n: 0, value: new BN(10000000000) }], notarysig: Buffer.from('') }, { assetGuid: '2305793883', values: [{ n: 2, value: new BN(90000000) }], notarysig: Buffer.from('') }],
      bridgetransferid: 2,
      blocknumber: 6816449,
      txpos: 625,
      txroot: Buffer.from('0xa0842ab40a9c4770c8ec74158aadcf943e8158128fdd1ba8cef9c7cb8eda732692', 'hex'),
      txparentnodes: Buffer.from('f9039cf871a04442f3f69add48df0531fe3c0025103b53fcf3fe38060e5f29366caec8855e4fa0229f7b7e69c0b5793f8a61c06f5cc09b0f4938561856c632ee56c3b2c4d6d153808080808080a07720fff5e8eabef55fa129ee55b3b0d82875e2b25b8f26e22cf6b5c4f9cec7ab8080808080808080f901f180a03ee147749c5b769bc5d1a53e4f37567506d417de4ec4e67722130eda4638427da043caa62b40dad61bce4d50fb62ea485729a6687c3aa13895cf4ba234b92afe82a0b79958e4aa63104da4599ebb91e712375e6adfc89abc14b9533c5778f107e7d8a01bc7f80f81a8d281253ac882bb89aca6131e5794bfcbdccde990bb6d5be6cb2fa0aedad62f1426b68e395a59e06bf242fb28b882af67589bce3495a99650058ec4a0c21a7e0b9d0948bb6b65a5e73f5f01173064d20e4819ca4884d1eabc22bf737da090087708c533b10af8925eebf398c005fc16cb6a515111f2be4f328f762949d0a02827daacd6a52ae6c74a78791ff0c5e33a7a85f5ca0a47cdfbcd5219f75f705ca0af7ecf31d56575155d272cd813bf7d7ac435f62b0538c31771e407dafef6be53a09b74707c3abdbfa305cb61f23c940f063f553f17d0bd3013126aad357193353ea067a52ed59820bb48f8010d2b2bb0ee92803b1a00a8341fd4c3269b065ed070d9a0bf0e9b45955283e6e04b71eda63bfc7b55d9f54527943aa1c159b4161b1e1daea0ecabd4c00deacf9a7ff25be942c9f468628eb776fbec23a9ca0d8fc256f14a31a0df406c7ac7f38c2ea1d9bdb06c2e51db3de8cf0e655a8e0e683e19ca1ddf83d3a08360ec6c5e26614f144520ed9d0b577640381f0f38b5429b67422f75d603ad5a80f9013220b9012ef9012b82051f843b9aca008307a120940765efb302d504751c652c5b1d65e8e9edf2e70f80b8c454c988ff00000000000000000000000000000000000000000000000000000002540be400000000000000000000000000000000000000000000000000000000009be8894b0000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000002c62637274317130667265323430737939326d716b386b6b377073616561366b74366d3537323570377964636a00000000000000000000000000000000000000002ca0dccb6e077c3f6252d199202113893407119d4ba09667113f2d20c63a31487b87a01e0a059e50f08f2772781691f2c9e43a9503a167c98cf467b1afc177b74d84e6', 'hex'),
      txpath: Buffer.from('0b', 'hex'),
      receiptpos: 625,
      receiptroot: Buffer.from('0xa0a958499bf48fcce17672b58aa9037bd3dafeb6231880722d909c60bacfaaa8d4', 'hex'),
      receiptparentnodes: Buffer.from('f90551f871a0cab13def05783d763febde31920bd234d0486c26955c2937e0486db909a28eeea09cf564a668a29a5f1cc5d6ef8e19988dfd2b30d290672f0ffc4200e608cb65ac808080808080a029b8ed2258c53562954c87bcd7f60671029680d2a19ef8bcd3ad470ea48d57d18080808080808080f901f180a07c21ca39872e6b8f611bc6b1b295c24f988b5cf944625eabf5236b37ea3b9f01a0edb9e63fdc31ba41f11a8b2fb8000ad1357b3c0b27a8483968d75e93e7b488a1a02231847aa3c5dde2f2a1851a66aabec65e5eaae8c28110756f122c72be1fba05a08fa87809e5b7f989e78ccbe1a6bc4924115d5747529af879f2fe196f959b64fca091f1bf748061eba21a413b72d70afccb8daebb5906d5cd9dda06d5f877065d5ba0d7e6c82dd1c25eb2f90b02f038beaff98c260d46992d0b3c1eac7d51552c7417a01d5c43deb2e3794292cdffb04f82ab25bc4e75f5e0cab928b66582e08026f5b1a0d7323a87dc8fbc66c7b34810d2cad92fc0da168d962b4556e825a3266a148b74a0af31f0b7cdcd6a855ac7678ef2b8fcb1afeda918b0c8e4696a4013f2b75ca402a0f9d63f2db8ab6d3c3e12073ac2910ee575832bde3e4586f18e59dd26a16adb7ca0f0c91e059c43780617d304fe8992511f096ccc35232da1f25127db53ba4fb05aa052030932d0a9026efd2a3ada67f33d401cd9a97ddb24c606af3a0a0c24e432aba0142af9b4686c6ca30b0ac39133fa76d8682b7bbbec488e62e652d3f25419777da0940f31617e91cfbabaa9d0d1638949f8125f80a43027122778522675194a4e65a0edc4c7d2cf30150fdf7e502d0ef06c80c85fc37260134a112493c6183f62f4b580f902e720b902e3f902e00183192ee2b9010000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000200000000000000008000000000000000000000100200000000000000000010000000000000200000000000000000000000000000000000010000000000000000000000000000004000000000000000000000000400004001000000000020000000000000000000000000080000000000000408000000040000000000000000002000000000000000000000000000000000000000000000000000000000010000000000000000010000000000000000000000000000000000000000000f901d5f89b94f2bb7bfa19e7c4b6bb333ee1afdf8e5e8f9b3561f863a0ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3efa0000000000000000000000000b0ea8c9ee8aa87efd28a12de8c034f947c144053a00000000000000000000000000765efb302d504751c652c5b1d65e8e9edf2e70fa000000000000000000000000000000000000000000000000000000002540be400f89b94f2bb7bfa19e7c4b6bb333ee1afdf8e5e8f9b3561f863a08c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925a0000000000000000000000000b0ea8c9ee8aa87efd28a12de8c034f947c144053a00000000000000000000000000765efb302d504751c652c5b1d65e8e9edf2e70fa00000000000000000000000000000000000000000000000000000000000000000f899940765efb302d504751c652c5b1d65e8e9edf2e70fe1a09c6dea23fe3b510bb5d170df49dc74e387692eaa3258c691918cd3aa94f5fb74b860000000000000000000000000b0ea8c9ee8aa87efd28a12de8c034f947c14405300000000000000000000000000000000000000000000000000000002540be4000000000000000000000000000000000000000000000000000000080800000002', 'hex')
    },
    receivingIndex: 11,
    changeIndex: 3
  }
},
{
  description: 'sys to sysx',
  version: syscointx.utils.SYSCOIN_TX_VERSION_SYSCOIN_BURN_TO_ALLOCATION,
  txOpts: {
    rbf: true
  },
  mnemonic: 'club toss element melody skin ship rifle student reason real interest insane elevator beauty movie',
  feeRate: new BN(10),
  utxoObj: {
    utxos: [
      { txid: '64dbfb02268b642f6a32a266bdd54add8989a1fa913b7414a642b5d85e964c68', vout: 0, address: 'tsys1qh4k0mpx4xqju3zgcvtkynvqrd5ryqhg0yr9uk8', path: "m/84'/1'/0'/0/10", value: '1000000' },
      { txid: '9f586de3e6d8ce33b1c6de709c992cb431cc324ab3bc6dff5537137aa4b17022', vout: 1, address: 'tsys1qjfcltq5yljfzkljxdnlc0ffmhqudz8ltq0z695', path: "m/84'/1'/0'/0/5", value: '6900' }
    ],
    assets: [
    ]
  },
  sysChangeAddress: 'tsys1qp7qn0t0t6ymwhdwne9uku7v3dhw07a7tra8hzl',
  assetMap: new Map([
    ['2615707979', { changeAddress: 'tsys1qjfcltq5yljfzkljxdnlc0ffmhqudz8ltq0z695', outputs: [{ value: new BN(10000000000), address: 'tsys1qdflre2yd37qtpqe2ykuhwandlhq04r2td2t9ae' }] }]
  ]),
  xpubTokens: [
    { path: "m/84'/1'/0'/0/0" },
    { path: "m/84'/1'/0'/1/0" },
    { path: "m/84'/1'/0'/1/2" },
    { path: "m/84'/1'/0'/1/3" },
    { path: "m/84'/1'/0'/1/1" },
    { path: "m/84'/1'/0'/0/4" },
    { path: "m/84'/1'/0'/0/5" },
    { path: "m/84'/1'/0'/0/6" },
    { path: "m/84'/1'/0'/0/8" },
    { path: "m/84'/1'/0'/0/9" },
    { path: "m/84'/1'/0'/0/10" },
    { path: "m/84'/1'/0'/0/11" }
  ],
  expected: {
    hex: '81000000000101684c965ed8b542a614743b91faa18989dd4ad5bd66a2326a2f648b2602fbdb640000000000fdffffff02b2020000000000001600146a7e3ca88d8f80b0832a25b977766dfdc0fa8d4b00e40b54020000000c6a0a0188dea1914b010064000247304402205d4d6414a671a4d7a5b5bbdf2f1e11d93307cbb7ee6ede9db51c5e81129b3eee0220039794f4d7a993cae0e6291ce72b969600774ae3f19a749c09f4299bbd9891e4012103b7eeb47fdd1c2084ef795fac22bf24185e7295d2efa3178b69b6eca409810fba00000000',
    rbf: true,
    version: syscointx.utils.SYSCOIN_TX_VERSION_SYSCOIN_BURN_TO_ALLOCATION,
    numOutputs: 2,
    script: Buffer.from('6a0a0188dea1914b01006400', 'hex'),
    asset: {
      allocation: [{ assetGuid: '2615707979', values: [{ n: 0, value: new BN(10000000000) }], notarysig: Buffer.from('') }]
    },
    receivingIndex: 11,
    changeIndex: 3
  }
},
{
  description: 'sys to sysx with asset inputs',
  version: syscointx.utils.SYSCOIN_TX_VERSION_SYSCOIN_BURN_TO_ALLOCATION,
  txOpts: {
    rbf: true
  },
  mnemonic: 'club toss element melody skin ship rifle student reason real interest insane elevator beauty movie',
  feeRate: new BN(10),
  utxoObj: {
    utxos: [
      { txid: '64dbfb02268b642f6a32a266bdd54add8989a1fa913b7414a642b5d85e964c68', vout: 0, address: 'tsys1qh4k0mpx4xqju3zgcvtkynvqrd5ryqhg0yr9uk8', path: "m/84'/1'/0'/0/10", value: '1000000', assetInfo: { assetGuid: '2305793883', value: '90000000' } },
      { txid: '9f586de3e6d8ce33b1c6de709c992cb431cc324ab3bc6dff5537137aa4b17022', vout: 1, address: 'tsys1qjfcltq5yljfzkljxdnlc0ffmhqudz8ltq0z695', path: "m/84'/1'/0'/0/5", value: '6900', assetInfo: { assetGuid: '2369540753', value: '10000000' } }
    ],
    assets: [
      {
        assetGuid: '2305793883',
        decimals: 8,
        pubData: { desc: syscointx.utils.encodeToBase64('publicvalue') },
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 127,
        totalSupply: '0',
        maxSupply: '100000000000'
      },
      {
        assetGuid: '2369540753',
        decimals: 8,
        pubData: { desc: syscointx.utils.encodeToBase64('publicvalue') },
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 127,
        totalSupply: '0',
        maxSupply: '100000000000'
      }
    ]
  },
  sysChangeAddress: 'tsys1qp7qn0t0t6ymwhdwne9uku7v3dhw07a7tra8hzl',
  assetMap: new Map([
    ['2615707979', { changeAddress: 'tsys1qjfcltq5yljfzkljxdnlc0ffmhqudz8ltq0z695', outputs: [{ value: new BN(10000000000), address: 'tsys1qdflre2yd37qtpqe2ykuhwandlhq04r2td2t9ae' }] }]
  ]),
  xpubTokens: [
    { path: "m/84'/1'/0'/0/0" },
    { path: "m/84'/1'/0'/1/0" },
    { path: "m/84'/1'/0'/1/2" },
    { path: "m/84'/1'/0'/1/3" },
    { path: "m/84'/1'/0'/1/1" },
    { path: "m/84'/1'/0'/0/4" },
    { path: "m/84'/1'/0'/0/5" },
    { path: "m/84'/1'/0'/0/6" },
    { path: "m/84'/1'/0'/0/8" },
    { path: "m/84'/1'/0'/0/9" },
    { path: "m/84'/1'/0'/0/10" },
    { path: "m/84'/1'/0'/0/11" }
  ],
  expected: {
    hex: '81000000000101684c965ed8b542a614743b91faa18989dd4ad5bd66a2326a2f648b2602fbdb640000000000fdffffff03b2020000000000001600146a7e3ca88d8f80b0832a25b977766dfdc0fa8d4b00e40b5402000000156a130288dea1914b0100640087cabdbd5b01025800b2020000000000001600140f8137adebd136ebb5d3c9796e79916ddcff77cb02483045022100bb5d76a8e358825b812b7d3965c5c4e922055aa10efe47396ab8d79132cd1a8f02200b67114f6bfe9862d81ec0971bba005bdbfbf7c5909c33f62fd8f4fc04448f03012103b7eeb47fdd1c2084ef795fac22bf24185e7295d2efa3178b69b6eca409810fba00000000',
    rbf: true,
    version: syscointx.utils.SYSCOIN_TX_VERSION_SYSCOIN_BURN_TO_ALLOCATION,
    numOutputs: 3,
    script: Buffer.from('6a130288dea1914b0100640087cabdbd5b01025800', 'hex'),
    asset: {
      allocation: [{ assetGuid: '2615707979', values: [{ n: 0, value: new BN(10000000000) }], notarysig: Buffer.from('') }, { assetGuid: '2305793883', values: [{ n: 2, value: new BN(90000000) }], notarysig: Buffer.from('') }]
    },
    receivingIndex: 11,
    changeIndex: 3
  }
},
{
  description: 'sys to sysx with sysx input',
  version: syscointx.utils.SYSCOIN_TX_VERSION_SYSCOIN_BURN_TO_ALLOCATION,
  txOpts: {
    rbf: true
  },
  mnemonic: 'club toss element melody skin ship rifle student reason real interest insane elevator beauty movie',
  feeRate: new BN(10),
  utxoObj: {
    utxos: [
      { txid: '64dbfb02268b642f6a32a266bdd54add8989a1fa913b7414a642b5d85e964c68', vout: 0, address: 'tsys1qh4k0mpx4xqju3zgcvtkynvqrd5ryqhg0yr9uk8', path: "m/84'/1'/0'/0/10", value: '10000000000', assetInfo: { assetGuid: '2615707979', value: '90000000' } },
      { txid: '9f586de3e6d8ce33b1c6de709c992cb431cc324ab3bc6dff5537137aa4b17022', vout: 1, address: 'tsys1qjfcltq5yljfzkljxdnlc0ffmhqudz8ltq0z695', path: "m/84'/1'/0'/0/5", value: '6900', assetInfo: { assetGuid: '2369540753', value: '10000000' } }
    ],
    assets: [
      {
        assetGuid: '2615707979',
        decimals: 8,
        pubData: { desc: syscointx.utils.encodeToBase64('publicvalue') },
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 127,
        totalSupply: '0',
        maxSupply: '100000000000'
      },
      {
        assetGuid: '2369540753',
        decimals: 8,
        pubData: { desc: syscointx.utils.encodeToBase64('publicvalue') },
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 127,
        totalSupply: '0',
        maxSupply: '100000000000'
      }
    ]
  },
  sysChangeAddress: 'tsys1qp7qn0t0t6ymwhdwne9uku7v3dhw07a7tra8hzl',
  assetMap: new Map([
    ['2615707979', { changeAddress: 'tsys1qjfcltq5yljfzkljxdnlc0ffmhqudz8ltq0z695', outputs: [{ value: new BN(10000000000), address: 'tsys1qdflre2yd37qtpqe2ykuhwandlhq04r2td2t9ae' }] }]
  ]),
  xpubTokens: [
    { path: "m/84'/1'/0'/0/0" },
    { path: "m/84'/1'/0'/1/0" },
    { path: "m/84'/1'/0'/1/2" },
    { path: "m/84'/1'/0'/1/3" },
    { path: "m/84'/1'/0'/1/1" },
    { path: "m/84'/1'/0'/0/4" },
    { path: "m/84'/1'/0'/0/5" },
    { path: "m/84'/1'/0'/0/6" },
    { path: "m/84'/1'/0'/0/8" },
    { path: "m/84'/1'/0'/0/9" },
    { path: "m/84'/1'/0'/0/10" },
    { path: "m/84'/1'/0'/0/11" }
  ],
  expected: {
    hex: '81000000000101684c965ed8b542a614743b91faa18989dd4ad5bd66a2326a2f648b2602fbdb640000000000fdffffff03b2020000000000001600146a7e3ca88d8f80b0832a25b977766dfdc0fa8d4b00e40b54020000000e6a0c0188dea1914b020064025800b2020000000000001600149271f58284fc922b7e466cff87a53bb838d11feb0247304402205f17d7bb18f20a954b884021ad4cac40d9fcec6501873563f8ea014b0f3771590220714d3105adbd5e552bf89b97891113aeaf8175f104adfccf5f2ea8d38f3ad50d012103b7eeb47fdd1c2084ef795fac22bf24185e7295d2efa3178b69b6eca409810fba00000000',
    rbf: true,
    version: syscointx.utils.SYSCOIN_TX_VERSION_SYSCOIN_BURN_TO_ALLOCATION,
    numOutputs: 3,
    script: Buffer.from('6a0c0188dea1914b020064025800', 'hex'),
    asset: {
      allocation: [{ assetGuid: '2615707979', values: [{ n: 0, value: new BN(10000000000) }, { n: 2, value: new BN(90000000) }], notarysig: Buffer.from('') }]
    },
    receivingIndex: 11,
    changeIndex: 3
  }
},
{
  description: 'standard sys send with asset input and regular input',
  version: 2,
  txOpts: {
    rbf: false
  },
  mnemonic: 'club toss element melody skin ship rifle student reason real interest insane elevator beauty movie',
  feeRate: new BN(10),
  utxoObj: {
    utxos: [
      { txid: '386efe525b6b3f29fb6cb982da3710d2ea324a31ce3448ea76122a6b1150c530', vout: 1, address: 'tsys1qjfcltq5yljfzkljxdnlc0ffmhqudz8ltq0z695', path: "m/84'/1'/0'/0/5", value: '99970714', assetInfo: { assetGuid: '2305793883', value: '90000000' } },
      { txid: '395f36f4dd4d65d9bd95be4207dcae91a2b6d256a832458aa42b40922b3beb64', vout: 1, address: 'tsys1qjfcltq5yljfzkljxdnlc0ffmhqudz8ltq0z695', path: "m/84'/1'/0'/0/5", value: '19996260' }
    ],
    assets: [
      {
        assetGuid: '2305793883',
        decimals: 8,
        pubData: { desc: syscointx.utils.encodeToBase64('publicvalue') },
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 127,
        totalSupply: '0',
        maxSupply: '100000000000'
      }
    ]
  },
  changeAddress: 'tsys1qjfcltq5yljfzkljxdnlc0ffmhqudz8ltq0z695',
  outputs: [
    { address: 'tsys1qh4k0mpx4xqju3zgcvtkynvqrd5ryqhg0yr9uk8', value: new BN(100000000) }
  ],
  xpubTokens: [
    { path: "m/84'/1'/0'/0/0" },
    { path: "m/84'/1'/0'/1/0" },
    { path: "m/84'/1'/0'/1/2" },
    { path: "m/84'/1'/0'/1/3" },
    { path: "m/84'/1'/0'/1/1" },
    { path: "m/84'/1'/0'/0/4" },
    { path: "m/84'/1'/0'/0/5" },
    { path: "m/84'/1'/0'/0/6" },
    { path: "m/84'/1'/0'/0/8" },
    { path: "m/84'/1'/0'/0/9" },
    { path: "m/84'/1'/0'/0/10" },
    { path: "m/84'/1'/0'/0/11" }
  ],
  expected: {
    hex: '8700000000010264eb3b2b92402ba48a4532a856d2b6a291aedc0742be95bdd9654dddf4365f390100000000ffffffff30c550116b2a1276ea4834ce314a32ead21037da82b96cfb293f6b5b52fe6e380100000000ffffffff0300e1f50500000000160014bd6cfd84d53025c8891862ec49b0036d06405d0fc6a23001000000001600149271f58284fc922b7e466cff87a53bb838d11feb00000000000000000c6a0a0187cabdbd5b0101580002483045022100e35637463dcd53ce40c436eea36f633429d189ebfbb779b722d8ec8348d5cbb1022033b24cd1ffacfae3599e5d812402e5f09bd16c05a9e91855ff972884fc1cd6b7012103c86473f098d9bb69d31a7851372f9ded7b11691a77c253279e987373164b2ad202473044022033c46cddf79de841915b07eaa003114ef203ce79d3afb461246eef2edc4f45db02203ce9de06b65b93eacf441492f2a45781a61e501020e1196f3cb733ce8bfd6fc5012103c86473f098d9bb69d31a7851372f9ded7b11691a77c253279e987373164b2ad200000000',
    rbf: false,
    version: syscointx.utils.SYSCOIN_TX_VERSION_ALLOCATION_SEND,
    numOutputs: 3, // 3 because new opreturn will be created
    script: Buffer.from('6a0a0187cabdbd5b01015800', 'hex'),
    asset: {
      allocation: [{ assetGuid: '2305793883', values: [{ n: 1, value: new BN(90000000) }], notarysig: Buffer.from('') }]
    },
    receivingIndex: 11,
    changeIndex: 3
  }
},
{
  description: 'send asset allocation with xpub',
  version: syscointx.utils.SYSCOIN_TX_VERSION_ALLOCATION_SEND,
  txOpts: {
    rbf: true
  },
  mnemonic: 'club toss element melody skin ship rifle student reason real interest insane elevator beauty movie',
  feeRate: new BN(10),
  sysFromXpubOrAddress: 'vpub5YRAiaSdofukzKaR3uMCnPxL41yFFJpDsr9jn93FXFVZkJWx2sedirtJHeWvJRVoisYJuDqVp8r9Z1fuAS33oekzgZe5U3sg2ENWe8Dtb2G',
  utxoObj: {
    utxos: [
      { txid: '44f1038835a563bacdbaa9873b35f97d968ecf1e1bf53452b5fcabd1bfdfad35', vout: 0, address: 'tsys1qsgtj3pujwgfgakjjen94j3g9wmw95l837srurc', path: "m/84'/1'/0'/1/3", value: '980', assetInfo: { assetGuid: '2529870008', value: '1000000000' } },
      { txid: '3f0536c23125183e99bfd021fb6a7bb279ccc739356985058cfc15b0a0e52946', vout: 0, address: 'tsys1qsgtj3pujwgfgakjjen94j3g9wmw95l837srurc', path: "m/84'/1'/0'/1/3", value: '84999988550' }
    ],
    assets: [
      {
        assetGuid: '2529870008',
        decimals: 8,
        pubData: { desc: syscointx.utils.encodeToBase64('new publicvalue') },
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 127,
        totalSupply: '10000000000',
        maxSupply: '100000000000',
        notaryKeyID: 'X1egKJRfW1uirvT9K1EgY+eF3PU=', // base64 of keyid for tsys1qtat6q2y5tad4hg4w7n7jk5fqv0ncth84puexca (m/84’/1’/0’/0/3)
        notaryDetails: {
          endPoint: 'https://test.com',
          instantTransfers: 0,
          HDRequired: 1
        },
        // for unit test only, this normally wouldn't come in payload
        notarySig: 'H5ZrZe8aCarhYzmgkvqoCilr1x4sbqTkpkD45uSaYbafb73oGnd/MaoLZxfGFz7DdSU25TH77raRxflWOGKTUTo='
      }
    ]
  },
  sysChangeAddress: 'tsys1qcflmge9vann8405ws2y69jwt94sv40kd7rqexs',
  assetMap: new Map([
    ['2529870008', { changeAddress: 'tsys1qcflmge9vann8405ws2y69jwt94sv40kd7rqexs', outputs: [{ value: new BN(600000000), address: 'tsys1q3hqp7rgcvsphpcy3rxyhjwvyv647mz58peqctz' }] }]
  ]),
  xpubTokens: [
    { path: "m/84'/1'/0'/0/0" },
    { path: "m/84'/1'/0'/1/0" },
    { path: "m/84'/1'/0'/1/2" },
    { path: "m/84'/1'/0'/1/3" },
    { path: "m/84'/1'/0'/1/1" }
  ],
  expected: {
    hex: '8700000000010235addfbfd1abfcb55234f51b1ecf8e967df9353b87a9bacdba63a5358803f1440000000000fdffffff4629e5a0b015fc8c0585693539c7cc79b27b6afb21d0bf993e182531c236053f0000000000fdffffff03b2020000000000001600148dc01f0d18640370e091198979398466abed8a870000000000000000506a4c4d0188b5aa803802003b0227411f966b65ef1a09aae16339a092faa80a296bd71e2c6ea4e4a640f8e6e49a61b69f6fbde81a777f31aa0b6717c6173ec3752536e531fbeeb691c5f956386293513aa6da64ca13000000160014c27fb464acece67abe8e8289a2c9cb2d60cabecd02473044022079e3fcb82dd8cc83689d5c5c64202fa4a76e6bb3e803f827ddbf83a09377567d022058c31ca133514f2fb534cd8eb359ab8b2dbefac2910f92c5aa8f0620bea51909012103e493f90c55de11c1b3aa3fc13b337807c7c1e121a2767856cfd6946e18c7fcc1024830450221009eff96424f0343d91ab69643e4e85409e0831a0981ca4ce97995261e948710210220113edb7683b38b2c0fae08a5f3d2782818e29d158246846e1d5bc3e81d076d45012103e493f90c55de11c1b3aa3fc13b337807c7c1e121a2767856cfd6946e18c7fcc100000000',
    rbf: true,
    numOutputs: 3,
    script: Buffer.from('6a4c4d0188b5aa803802003b0227411f966b65ef1a09aae16339a092faa80a296bd71e2c6ea4e4a640f8e6e49a61b69f6fbde81a777f31aa0b6717c6173ec3752536e531fbeeb691c5f956386293513a', 'hex'),
    asset: {
      allocation: [{ assetGuid: '2529870008', values: [{ n: 0, value: new BN(600000000) }, { n: 2, value: new BN(400000000) }], notarysig: Buffer.from('1f966b65ef1a09aae16339a092faa80a296bd71e2c6ea4e4a640f8e6e49a61b69f6fbde81a777f31aa0b6717c6173ec3752536e531fbeeb691c5f956386293513a', 'hex') }]
    },
    receivingIndex: 0,
    changeIndex: 3
  }
},
{
  description: 'send asset allocation with wif',
  version: syscointx.utils.SYSCOIN_TX_VERSION_ALLOCATION_SEND,
  txOpts: {
    rbf: true
  },
  mnemonic: 'club toss element melody skin ship rifle student reason real interest insane elevator beauty movie',
  feeRate: new BN(10),
  sysFromXpubOrAddress: 'tsys1qsgtj3pujwgfgakjjen94j3g9wmw95l837srurc',
  utxoObj: {
    utxos: [
      { txid: '44f1038835a563bacdbaa9873b35f97d968ecf1e1bf53452b5fcabd1bfdfad35', vout: 0, address: 'tsys1qsgtj3pujwgfgakjjen94j3g9wmw95l837srurc', path: "m/84'/1'/0'/1/3", value: '980', assetInfo: { assetGuid: '2529870008', value: '1000000000' } },
      { txid: '3f0536c23125183e99bfd021fb6a7bb279ccc739356985058cfc15b0a0e52946', vout: 0, address: 'tsys1qsgtj3pujwgfgakjjen94j3g9wmw95l837srurc', path: "m/84'/1'/0'/1/3", value: '84999988550' }
    ],
    assets: [
      {
        assetGuid: '2529870008',
        decimals: 8,
        pubData: { desc: syscointx.utils.encodeToBase64('new publicvalue') },
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 127,
        totalSupply: '10000000000',
        maxSupply: '100000000000',
        notaryKeyID: 'X1egKJRfW1uirvT9K1EgY+eF3PU=', // base64 of keyid for tsys1qtat6q2y5tad4hg4w7n7jk5fqv0ncth84puexca (m/84’/1’/0’/0/3)
        notaryDetails: {
          endPoint: 'https://test.com',
          instantTransfers: 0,
          HDRequired: 1
        },
        // for unit test only, this normally wouldn't come in payload
        notarySig: 'H5ZrZe8aCarhYzmgkvqoCilr1x4sbqTkpkD45uSaYbafb73oGnd/MaoLZxfGFz7DdSU25TH77raRxflWOGKTUTo='
      }
    ]
  },
  sysChangeAddress: 'tsys1qcflmge9vann8405ws2y69jwt94sv40kd7rqexs',
  assetMap: new Map([
    ['2529870008', { changeAddress: 'tsys1qcflmge9vann8405ws2y69jwt94sv40kd7rqexs', outputs: [{ value: new BN(600000000), address: 'tsys1q3hqp7rgcvsphpcy3rxyhjwvyv647mz58peqctz' }] }]
  ]),
  xpubTokens: [
    { path: "m/84'/1'/0'/0/0" },
    { path: "m/84'/1'/0'/1/0" },
    { path: "m/84'/1'/0'/1/2" },
    { path: "m/84'/1'/0'/1/3" },
    { path: "m/84'/1'/0'/1/1" }
  ],
  expected: {
    hex: '8700000000010235addfbfd1abfcb55234f51b1ecf8e967df9353b87a9bacdba63a5358803f1440000000000fdffffff4629e5a0b015fc8c0585693539c7cc79b27b6afb21d0bf993e182531c236053f0000000000fdffffff03b2020000000000001600148dc01f0d18640370e091198979398466abed8a870000000000000000506a4c4d0188b5aa803802003b0227411f966b65ef1a09aae16339a092faa80a296bd71e2c6ea4e4a640f8e6e49a61b69f6fbde81a777f31aa0b6717c6173ec3752536e531fbeeb691c5f956386293513aa6da64ca13000000160014c27fb464acece67abe8e8289a2c9cb2d60cabecd02473044022079e3fcb82dd8cc83689d5c5c64202fa4a76e6bb3e803f827ddbf83a09377567d022058c31ca133514f2fb534cd8eb359ab8b2dbefac2910f92c5aa8f0620bea51909012103e493f90c55de11c1b3aa3fc13b337807c7c1e121a2767856cfd6946e18c7fcc1024830450221009eff96424f0343d91ab69643e4e85409e0831a0981ca4ce97995261e948710210220113edb7683b38b2c0fae08a5f3d2782818e29d158246846e1d5bc3e81d076d45012103e493f90c55de11c1b3aa3fc13b337807c7c1e121a2767856cfd6946e18c7fcc100000000',
    rbf: true,
    numOutputs: 3,
    script: Buffer.from('6a4c4d0188b5aa803802003b0227411f966b65ef1a09aae16339a092faa80a296bd71e2c6ea4e4a640f8e6e49a61b69f6fbde81a777f31aa0b6717c6173ec3752536e531fbeeb691c5f956386293513a', 'hex'),
    asset: {
      allocation: [{ assetGuid: '2529870008', values: [{ n: 0, value: new BN(600000000) }, { n: 2, value: new BN(400000000) }], notarysig: Buffer.from('1f966b65ef1a09aae16339a092faa80a296bd71e2c6ea4e4a640f8e6e49a61b69f6fbde81a777f31aa0b6717c6173ec3752536e531fbeeb691c5f956386293513a', 'hex') }]
    },
    receivingIndex: 0,
    changeIndex: 3
  }
}
]
