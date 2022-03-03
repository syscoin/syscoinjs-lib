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
  xpubTokens: [{ path: "m/84'/1'/0'/0/0", transfers: 1 }],
  expected: {
    hex: '82000000000101b8c0ca9606da799a289b8aa943adca0c11a9bf7481237457a6d20587104510b60000000000ffffffff0200e1f50500000000346a320188b5aa80380101000008c1045130465586681b7b2264657363223a226348566962476c6a646d46736457553d227d007f000c008142170000001600140562b935bea44785c6528948c19e944116e4c4870247304402201c9017f15edcf9e4457ba14f8c0173b2a90d52954c88a1b773fb5586961b701d02200416acd907e01f229e3e33b4235e6c75d75356e8df9de76b34f90fed9fec55790121032563fbbbbe4d1e551f12d01e213d14830db0ae15a781b9c9ebf7f2fe5786eb2100000000',
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
    { path: "m/84'/1'/0'/0/0", transfers: 1 },
    { path: "m/84'/1'/0'/1/0", transfers: 1 }
  ],
  expected: {
    hex: '83000000000101fd29f5152c7f5dba90d73dd25165a5da6ce4b94ce034845df080fcd879c9f5a70100000000fdffffff020000000000000000636a4c600188b5aa8038010100000843142b1e58b979e4b2d72d8bca5bb4646ccc032ddbfc001f7b2264657363223a22626d563349484231596d787059335a686248566c227d1b7b2264657363223a226348566962476c6a646d46736457553d227d7b7fbcfb64ca1300000016001459fa0d5c63fe35cc86157031a24d38b0cc61b94f02483045022100f7cd702f811589b6450e9ab4aff4033952e08315a8b7ce6c39b003fe6838c8d70220671b7adaf5f03035740133aa2c6e673e28f589a6404e0e69eb23fe20843fe9eb012103e4d8568a37e0afb8f220178b640454e91c9e9e7e2425be9e43142a7c3140e2e900000000',
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
    { path: "m/84'/1'/0'/0/0", transfers: 1 },
    { path: "m/84'/1'/0'/1/0", transfers: 1 }
  ],
  expected: {
    hex: '83000000000101fd29f5152c7f5dba90d73dd25165a5da6ce4b94ce034845df080fcd879c9f5a70100000000fdffffff03a8020000000000001600140562b935bea44785c6528948c19e944116e4c4870000000000000000636a4c600188b5aa8038010000000843142b1e58b979e4b2d72d8bca5bb4646ccc032ddbfc001f7b2264657363223a22626d563349484231596d787059335a686248566c227d1b7b2264657363223a226348566962476c6a646d46736457553d227d7b7fdef764ca1300000016001459fa0d5c63fe35cc86157031a24d38b0cc61b94f024830450221009faa28e865b151116770207b1fd5ea6fafc4a12fd013ba554f233ef0fe2242c00220399e65411e066677d692db23d4710ae4d6fc09a0515135ed739dff53e29027e9012103e4d8568a37e0afb8f220178b640454e91c9e9e7e2425be9e43142a7c3140e2e900000000',
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
    { path: "m/84'/1'/0'/0/0", transfers: 1 },
    { path: "m/84'/1'/0'/1/0", transfers: 1 }
  ],
  expected: {
    hex: '83000000000101fd29f5152c7f5dba90d73dd25165a5da6ce4b94ce034845df080fcd879c9f5a70100000000fdffffff03a802000000000000160014c27fb464acece67abe8e8289a2c9cb2d60cabecd0000000000000000636a4c600188b5aa8038010000000843142b1e58b979e4b2d72d8bca5bb4646ccc032ddbfc001f7b2264657363223a22626d563349484231596d787059335a686248566c227d1b7b2264657363223a226348566962476c6a646d46736457553d227d7b7fdef764ca130000001600140f8137adebd136ebb5d3c9796e79916ddcff77cb02483045022100be228106e8c4427947b5455c955ce544b2ffad72f458d55c8675c9c0470def7b022001352d2723022ed520af9df42b8087f7632dfb848fd632688ea8c50d762d350e012103e4d8568a37e0afb8f220178b640454e91c9e9e7e2425be9e43142a7c3140e2e900000000',
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
    { path: "m/84'/1'/0'/0/0", transfers: 1 },
    { path: "m/84'/1'/0'/1/0", transfers: 1 },
    { path: "m/84'/1'/0'/1/2", transfers: 1 }
  ],
  expected: {
    hex: '840000000001019deb8569f70a25f8d9e064c84ab51fe3104cac735befcfd87443b2ee372f65900100000000ffffffff03a8020000000000001600148330985b6b43c7fbbe2c577a265c1288fc8b026200000000000000000e6a0c0188b5aa803802000a020000c2eb64ca130000001600140f8137adebd136ebb5d3c9796e79916ddcff77cb024830450221009d26b3064aa87f04142e5840c4228ffe9008c120b741fb404b278224f050f46b02204ddf05c837c7165fe9ea05d968d07e5fb43badd1d5e3a2de71a8cc330c350f31012102f249cb8576b8d9c6f0d45bb3ab3b73654911b724f229ec0a5a2f45785e1e47c900000000',
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
    { path: "m/84'/1'/0'/0/0", transfers: 1 },
    { path: "m/84'/1'/0'/1/0", transfers: 1 },
    { path: "m/84'/1'/0'/1/2", transfers: 1 }
  ],
  expected: {
    hex: '8400000000010281510a7991a22b857af8e8e88de5256b94d73c60de73f6c57adfd3f1ab729c5e0100000000fdffffff81510a7991a22b857af8e8e88de5256b94d73c60de73f6c57adfd3f1ab729c5e0000000000fdffffff04a8020000000000001600140f8137adebd136ebb5d3c9796e79916ddcff77cba802000000000000160014c27fb464acece67abe8e8289a2c9cb2d60cabecd0000000000000000116a0f01858addbd6003000a010003bd2300a802000000000000160014c27fb464acece67abe8e8289a2c9cb2d60cabecd02473044022018297e2afd2543f307316712fb695a153292d2dc0c4d52d8dfd2be7b5c94366502202e9ab1a358b37e0f6d1fbf8c836fefdba0d15b2112386b051e6a7c92cd46f56f012102f249cb8576b8d9c6f0d45bb3ab3b73654911b724f229ec0a5a2f45785e1e47c902483045022100f0927775dace0625643f0d6ed348dc62a3cb45a65bbb42fe4836f717e656a6ad022021176793240939e45ad1ebeb4620655082f1119956802f9767506debd7565339012102f249cb8576b8d9c6f0d45bb3ab3b73654911b724f229ec0a5a2f45785e1e47c900000000',
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
    { path: "m/84'/1'/0'/0/0", transfers: 1 },
    { path: "m/84'/1'/0'/1/0", transfers: 1 },
    { path: "m/84'/1'/0'/1/2", transfers: 1 },
    { path: "m/84'/1'/0'/1/3", transfers: 1 },
    { path: "m/84'/1'/0'/1/1", transfers: 1 }
  ],
  expected: {
    hex: '8700000000010235addfbfd1abfcb55234f51b1ecf8e967df9353b87a9bacdba63a5358803f1440000000000fdffffff4629e5a0b015fc8c0585693539c7cc79b27b6afb21d0bf993e182531c236053f0000000000fdffffff03a8020000000000001600148dc01f0d18640370e091198979398466abed8a8700000000000000000e6a0c0188b5aa803802003b0227001cdd64ca13000000160014c27fb464acece67abe8e8289a2c9cb2d60cabecd02483045022100a40356bfd380328451b213d4c7217228bee0b3c4b60173fbdcf94ea4a6b4563d02201f9c318c883990b8fee9fd627154cc5263297900e3e21c4d4025918c94c5a90f012103e493f90c55de11c1b3aa3fc13b337807c7c1e121a2767856cfd6946e18c7fcc10248304502210095ea183cc943766174e9944b254ecf05c023c44d7840591d117d2cc20d6685c00220179e1540a4825350ebadae37260b9e1f28a21e963918f40800d342b09c29591a012102e58139f9d633d5d1d76feb87fc2c44705cc317e83ade1a812f8d2a4ae7be9cb500000000',
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
    { path: "m/84'/1'/0'/0/0", transfers: 1 },
    { path: "m/84'/1'/0'/1/0", transfers: 1 },
    { path: "m/84'/1'/0'/1/2", transfers: 1 },
    { path: "m/84'/1'/0'/1/13", transfers: 1 },
    { path: "m/84'/1'/0'/1/1", transfers: 1 }
  ],
  expected: {
    hex: '87000000000102234c67db23a214a4f505016a19327fda100a8f92c7996720632ae0c9968cb2610000000000fdffffff234c67db23a214a4f505016a19327fda100a8f92c7996720632ae0c9968cb2610200000000fdffffff04a8020000000000001600146a7e3ca88d8f80b0832a25b977766dfdc0fa8d4b0000000000000000116a0f0184d4a2cf5203000202857c0300003eacaa79e60a0000160014f97d234b491c64d3d3347d551eb3b1a9693b89d9a802000000000000160014f97d234b491c64d3d3347d551eb3b1a9693b89d902473044022014eaf5822472a9014c562c3dc1455a7c9ca95e7b5e1426be0afe502c3097b1af022027bc7924eaaa2997d50d1ea0c0ab61cc43359061f1a637cce5a0c92e817a978c01210341e88f7fd83e582b8c673149b25d3879926e0490df8cd9c530560feb536a7fa20248304502210095c8e7195b0f07288c642ef8a9e421ee30043fb4cfdd5fb136c2c0742127a93602207b7f45a8fd11c726f482f7f69687b8719839ec2381d3f1093a1702e0a7c22ee1012102f249cb8576b8d9c6f0d45bb3ab3b73654911b724f229ec0a5a2f45785e1e47c900000000',
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
          endPoint: 'aHR0cHM6Ly90ZXN0LmNvbQ==',
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
          endPoint: 'aHR0cHM6Ly90ZXN0LmNvbQ==',
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
          endPoint: 'aHR0cHM6Ly90ZXN0LmNvbQ==',
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
          endPoint: 'aHR0cHM6Ly90ZXN0LmNvbQ==',
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
          endPoint: 'aHR0cHM6Ly90ZXN0LmNvbQ==',
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
    { path: "m/84'/1'/0'/0/0", transfers: 1 },
    { path: "m/84'/1'/0'/1/0", transfers: 1 },
    { path: "m/84'/1'/0'/1/2", transfers: 1 },
    { path: "m/84'/1'/0'/1/3", transfers: 1 },
    { path: "m/84'/1'/0'/1/1", transfers: 1 },
    { path: "m/84'/1'/0'/0/4", transfers: 1 },
    { path: "m/84'/1'/0'/0/5", transfers: 1 },
    { path: "m/84'/1'/0'/0/6", transfers: 1 },
    { path: "m/84'/1'/0'/0/8", transfers: 1 },
    { path: "m/84'/1'/0'/0/9", transfers: 1 },
    { path: "m/84'/1'/0'/0/10", transfers: 1 },
    { path: "m/84'/1'/0'/0/11", transfers: 1 }
  ],
  expected: {
    hex: '87000000000107e073d118d57ec902a8ed14cdb96121f263c0ec6e4150222b73d0f8e664afc2c50000000000fdfffffffb6efdd4f7b12d61a2407ede92a269310bec83978f45c9f0bcf784b920b1da4f0000000000fdffffff22b5f7483a3fc80998660a19064cac2f6c9aeef9c2436c308e919880cdbd1d930000000000fdffffffe184c393f77c969e3ef1b6824bdae939d12c3bd4bb93f74413b992ef1b84d6660000000000fdfffffff2ed472a1d1d28220a7d2cd02eb89652f3b75fdebbc4a219bfd89797578026210000000000fdffffff826608305b2708d5e6421492864c1a18235312f61a4ec506aa2c29fdc09d21570000000000fdffffff42d6e38f8445d79b4a80fcfffbe9f99699852de26c57b05142afa5479c15a2c80000000000fdffffff0ca802000000000000160014e8cc042a7c976ab0068cf0e4fcae4845d41774a7a8020000000000001600149271f58284fc922b7e466cff87a53bb838d11feba802000000000000160014248a521f8561af8f735d0f5e6d13f41177e423bda802000000000000160014248a521f8561af8f735d0f5e6d13f41177e423bda802000000000000160014581c4fc0439986b761b5110ee86a60f8c563f7caa802000000000000160014581c4fc0439986b761b5110ee86a60f8c563f7caa8020000000000001600147326551112dd129f478b4a3fe4fab809c7fb2d0ca8020000000000001600147326551112dd129f478b4a3fe4fab809c7fb2d0ca802000000000000160014413e8fd29b2f671b6058c9f50bf51bf971274e53a802000000000000160014413e8fd29b2f671b6058c9f50bf51bf971274e530000000000000000fd8d016a4d89010687e8f0a411020b300030411f966b65ef1a09aae16339a092faa80a296bd71e2c6ea4e4a640f8e6e49a61b69f6fbde81a777f31aa0b6717c6173ec3752536e531fbeeb691c5f956386293513a81b5a2c92c010113412017441c2dcd7918a2b4f3573b491735abb0cde2cbfc72b756fbac29a9e9c7f3c4372db62cece2fdc2c02b26482f437de9f7c202691e3d59319f0d294b89ee01b3898693d147020280640330411f637aa818bf059812d45caf60cbc861e91ec9a6d90a4db1c106c87fb4824116247fe60b00a12efda63da225658a1b8620135565778bfe776e633093a6603b5e0180bee4e22a02041d05094120e2974041e1e3e8f3eb32023f9280e20e78c0bd53c7ee94a58d12a0cc2d3b88252f78d562c44c59ab3dd8e3f4a55450d906b99419712ea08478202a75cfb0b33d84dbf5dc380206813e07800a411f9cc9b26cc0baa63c7331f6cb1e2f8b0da34236a97e063ff203b8990ae80787bf63c0d61017ab1f50919cd6de7cf34fb74470536d83f2bcccc75de2ad9a40d71c87cabdbd5b02083109090040aaf50500000000160014e8cc042a7c976ab0068cf0e4fcae4845d41774a70247304402202f92958c19d0b52b6be3c164c00e4bf7e73b283fc613e60203f65c494fc86143022058396151436b81bc0c09e7887fdb795cf7b290fcc454bf8025142341e129cfc001210281c11974da83e7d9ff9f47a3c32e3baa7975b5127eb447b86a2f7fd4c9d12fec0247304402203a606e5072febc62a8551be2919717f23fc1f646d48e8ef8a1b902eb8932032102204aea49cb3752febbf72d4ddb12d0aa2100a0df2b59860fb91e12e5ceb8fed513012103c86473f098d9bb69d31a7851372f9ded7b11691a77c253279e987373164b2ad20247304402202f71801936d4e279ef573cba7287d156555d667654fe26fd0b44f98eb7f8f7d002207549e6e49b8f2cb06628be587bcccd12f736d74c0e89ebedcf57a9d2dc268aef012102f165ced59862353282a8fd32ac10d018c4bc449e6dabc77a7d810ca2be6f69fd0247304402207e7d5004608786ebf3dbec127e0f1e44075bcfa22891c9e9ae1d8ccdd053069c02201db6d5799e4f45039fd996589cc7ca9ecf2d9959d03ecd48b3e80fe4f74018f60121025eea502cd2da208247cdd27701a2efea1e64aebf7c476362c1a6c0d1416c25f30247304402207f49dcdaad23f18b1af92dac53815a3fc26fa3f2c73f30502e839b0beb9be6f702201d596c1a5f65bdc23ff4190248f141fe29977cd70f0fdef92d8ded68e5ee60cb012102ccb8a1b346388ff9691d6ee1b2019956e93e5550130cbfe2e866477193b22a3f02483045022100d43c5998202124aad12348a0e7736faef6fef1cf720c75ed452b96bcbaf2069002200365dc9f86b459a60f6871a1817f3d5b83bb5688d632905cbed4a7120764ee34012102b7d4e03f4230eb2406328be6bf9dbd400083b929c07a4b0b3601589b3243067402473044022063548dd6dd865ea93f44597928ff49420a1454c3fe3cc6b05c3896dfdaf15b69022026dc133703f6ac931a73bc572ec8a0d6d1b830de75b04da9a2fb614079c36e3d012103b7eeb47fdd1c2084ef795fac22bf24185e7295d2efa3178b69b6eca409810fba00000000',
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
          endPoint: 'aHR0cHM6Ly90ZXN0LmNvbQ==',
          instantTransfers: 0,
          HDRequired: 1
        },
        // for unit test only, this normally wouldn't come in payload
        notarySig: 'HzA01At+Ipkfxgs2wiZOD23j0lPY5PxEt6S4QYbv2L96VgLo4QBsX/fTtjqxDADLljZp/wSquNmWzfd5VtRYbKM='
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
          endPoint: 'aHR0cHM6Ly90ZXN0LmNvbQ==',
          instantTransfers: 0,
          HDRequired: 1
        },
        notarySig: 'IB2HqxXLma9nc60lNTLkEsmbClqz3loBKd0CGZf7ZM4DYUKWk9z7wrrWlUt5Nwb9clvUed0vRh3Amkgnk9aW0gk='
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
          endPoint: 'aHR0cHM6Ly90ZXN0LmNvbQ==',
          instantTransfers: 0,
          HDRequired: 1
        },
        notarySig: 'H/QRY9EMSK4Jx/fNPRZhbE+q4pXjoZeiFBaoLBNKLTqQXeQSMN97LCbLhJVd/t+DJVng+dkJJzTKuLcXepy/WVk='
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
          endPoint: 'aHR0cHM6Ly90ZXN0LmNvbQ==',
          instantTransfers: 0,
          HDRequired: 1
        },
        notarySig: 'H/92vEOHlgkXM4N0O/flKK5/U9ElB1XNWKDTrpusqyLbS0XlLUAGxPc90gfVV1wAIjx84VDzVQWOOoazHyoYTYo='
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
          endPoint: 'aHR0cHM6Ly90ZXN0LmNvbQ==',
          instantTransfers: 0,
          HDRequired: 1
        },
        notarySig: 'IH9XYZ5ZKmwao09sFiw3i4+WnmrrHVh7aLck+7gUmiSRB2AbCvt/wft6xJLgUbcQcaUaGT+2r1yCx71fJs22SJ4='
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
    { path: "m/84'/1'/0'/0/0", transfers: 1 },
    { path: "m/84'/1'/0'/1/0", transfers: 1 },
    { path: "m/84'/1'/0'/1/2", transfers: 1 },
    { path: "m/84'/1'/0'/1/3", transfers: 1 },
    { path: "m/84'/1'/0'/1/1", transfers: 1 },
    { path: "m/84'/1'/0'/0/4", transfers: 1 },
    { path: "m/84'/1'/0'/0/5", transfers: 1 },
    { path: "m/84'/1'/0'/0/6", transfers: 1 },
    { path: "m/84'/1'/0'/0/8", transfers: 1 },
    { path: "m/84'/1'/0'/0/9", transfers: 1 },
    { path: "m/84'/1'/0'/0/10", transfers: 1 },
    { path: "m/84'/1'/0'/0/11", transfers: 1 }
  ],
  expected: {
    hex: '87000000000106e073d118d57ec902a8ed14cdb96121f263c0ec6e4150222b73d0f8e664afc2c50000000000fdfffffffb6efdd4f7b12d61a2407ede92a269310bec83978f45c9f0bcf784b920b1da4f0000000000fdffffff22b5f7483a3fc80998660a19064cac2f6c9aeef9c2436c308e919880cdbd1d930000000000fdffffffe184c393f77c969e3ef1b6824bdae939d12c3bd4bb93f74413b992ef1b84d6660000000000fdfffffff2ed472a1d1d28220a7d2cd02eb89652f3b75fdebbc4a219bfd89797578026210000000000fdffffff826608305b2708d5e6421492864c1a18235312f61a4ec506aa2c29fdc09d21570000000000fdffffff0ca802000000000000160014e8cc042a7c976ab0068cf0e4fcae4845d41774a7a8020000000000001600149271f58284fc922b7e466cff87a53bb838d11feba802000000000000160014248a521f8561af8f735d0f5e6d13f41177e423bda802000000000000160014248a521f8561af8f735d0f5e6d13f41177e423bda802000000000000160014581c4fc0439986b761b5110ee86a60f8c563f7caa802000000000000160014581c4fc0439986b761b5110ee86a60f8c563f7caa8020000000000001600147326551112dd129f478b4a3fe4fab809c7fb2d0ca8020000000000001600147326551112dd129f478b4a3fe4fab809c7fb2d0ca802000000000000160014413e8fd29b2f671b6058c9f50bf51bf971274e53a802000000000000160014413e8fd29b2f671b6058c9f50bf51bf971274e530000000000000000fd8d016a4d89010687e8f0a411020b300030411f3034d40b7e22991fc60b36c2264e0f6de3d253d8e4fc44b7a4b84186efd8bf7a5602e8e1006c5ff7d3b63ab10c00cb963669ff04aab8d996cdf77956d4586ca381b5a2c92c01011341201d87ab15cb99af6773ad253532e412c99b0a5ab3de5a0129dd021997fb64ce0361429693dcfbc2bad6954b793706fd725bd479dd2f461dc09a482793d696d209898693d147020280640330411ff41163d10c48ae09c7f7cd3d16616c4faae295e3a197a21416a82c134a2d3a905de41230df7b2c26cb84955dfedf832559e0f9d9092734cab8b7177a9cbf595980bee4e22a02041d0509411fff76bc43879609173383743bf7e528ae7f53d1250755cd58a0d3ae9bacab22db4b45e52d4006c4f73dd207d5575c00223c7ce150f355058e3a86b31f2a184d8a84dbf5dc380206813e07800a41207f57619e592a6c1aa34f6c162c378b8f969e6aeb1d587b68b724fbb8149a249107601b0afb7fc1fb7ac492e051b71071a51a193fb6af5c82c7bd5f26cdb6489e87cabdbd5b0208310909004433000000000000160014e8cc042a7c976ab0068cf0e4fcae4845d41774a70247304402205fbab83550c4ebaaee4bc9c617c37663db85d64fa52401351cf12c2b1bca919a022069a1d2e79e9cc6c2ee1f90a0b0bcf0265d8eed7aa5185fd42646d796f260429401210281c11974da83e7d9ff9f47a3c32e3baa7975b5127eb447b86a2f7fd4c9d12fec0248304502210094198e0d006c878429ee9d040ead335c8a4444685c2d54493b1932ff937dc2c90220573dddf919fcd398df3901d1871bbd0d497800204619d78918f1a5cb70bb826b012103c86473f098d9bb69d31a7851372f9ded7b11691a77c253279e987373164b2ad202483045022100ffb106f82e22f70afdd0895648213fcb3f9cdd393f5075c6eaa6166ab7f6c2a50220731ea74d66acb85742be6c173c1b42af1725254eae5827421e60cd529a0ff087012102f165ced59862353282a8fd32ac10d018c4bc449e6dabc77a7d810ca2be6f69fd02473044022013c9e68ff54b0e871f7c2b8ffcfa795fb58581ffa64e129f1424ad407b0096b102205e4b82345908d5fea48165aeeabbb46dfaf741aedd8b8c4140fb6107da99835f0121025eea502cd2da208247cdd27701a2efea1e64aebf7c476362c1a6c0d1416c25f302473044022078f809b5046953998046f6e9d63a66c6364a89da4ba862748c87999b4fb10b2c02200c66df357b4212f1e5a4711bd9be67cb4dbcd3daec6cba1fa7d516a88ce0327d012102ccb8a1b346388ff9691d6ee1b2019956e93e5550130cbfe2e866477193b22a3f0247304402202fa8c63041e7cb6eccf283a6c28576b4dca56083fa55c7c24dbd0811bd768fbc0220280143bbeff2be0076e0860c22e926925f358854a25180a333acd36342b69141012102b7d4e03f4230eb2406328be6bf9dbd400083b929c07a4b0b3601589b3243067400000000',
    rbf: true,
    numOutputs: 12,
    script: Buffer.from('6a4d89010687e8f0a411020b300030411f3034d40b7e22991fc60b36c2264e0f6de3d253d8e4fc44b7a4b84186efd8bf7a5602e8e1006c5ff7d3b63ab10c00cb963669ff04aab8d996cdf77956d4586ca381b5a2c92c01011341201d87ab15cb99af6773ad253532e412c99b0a5ab3de5a0129dd021997fb64ce0361429693dcfbc2bad6954b793706fd725bd479dd2f461dc09a482793d696d209898693d147020280640330411ff41163d10c48ae09c7f7cd3d16616c4faae295e3a197a21416a82c134a2d3a905de41230df7b2c26cb84955dfedf832559e0f9d9092734cab8b7177a9cbf595980bee4e22a02041d0509411fff76bc43879609173383743bf7e528ae7f53d1250755cd58a0d3ae9bacab22db4b45e52d4006c4f73dd207d5575c00223c7ce150f355058e3a86b31f2a184d8a84dbf5dc380206813e07800a41207f57619e592a6c1aa34f6c162c378b8f969e6aeb1d587b68b724fbb8149a249107601b0afb7fc1fb7ac492e051b71071a51a193fb6af5c82c7bd5f26cdb6489e87cabdbd5b020831090900', 'hex'),
    asset: {
      allocation: [{ assetGuid: '2369540753', values: [{ n: 11, value: new BN(50000000) }, { n: 0, value: new BN(50000000) }], notarysig: Buffer.from('HzA01At+Ipkfxgs2wiZOD23j0lPY5PxEt6S4QYbv2L96VgLo4QBsX/fTtjqxDADLljZp/wSquNmWzfd5VtRYbKM=', 'base64') },
        { assetGuid: '650700076', values: [{ n: 1, value: new BN(200000000) }], notarysig: Buffer.from('IB2HqxXLma9nc60lNTLkEsmbClqz3loBKd0CGZf7ZM4DYUKWk9z7wrrWlUt5Nwb9clvUed0vRh3Amkgnk9aW0gk=', 'base64') },
        { assetGuid: '2699372871', values: [{ n: 2, value: new BN(250000000) }, { n: 3, value: new BN(50000000) }], notarysig: Buffer.from('H/QRY9EMSK4Jx/fNPRZhbE+q4pXjoZeiFBaoLBNKLTqQXeQSMN97LCbLhJVd/t+DJVng+dkJJzTKuLcXepy/WVk=', 'base64') },
        { assetGuid: '402223530', values: [{ n: 4, value: new BN(300000000) }, { n: 5, value: new BN(100000000) }], notarysig: Buffer.from('H/92vEOHlgkXM4N0O/flKK5/U9ElB1XNWKDTrpusqyLbS0XlLUAGxPc90gfVV1wAIjx84VDzVQWOOoazHyoYTYo=', 'base64') },
        { assetGuid: '1537060536', values: [{ n: 6, value: new BN(350000000) }, { n: 7, value: new BN(150000000) }], notarysig: Buffer.from('IH9XYZ5ZKmwao09sFiw3i4+WnmrrHVh7aLck+7gUmiSRB2AbCvt/wft6xJLgUbcQcaUaGT+2r1yCx71fJs22SJ4=', 'base64') },
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
    assetWhiteList: new Map([['1635229542', {}]]),
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
          endPoint: 'aHR0cHM6Ly90ZXN0LmNvbQ==',
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
          endPoint: 'aHR0cHM6Ly90ZXN0LmNvbQ==',
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
          endPoint: 'aHR0cHM6Ly90ZXN0LmNvbQ==',
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
          endPoint: 'aHR0cHM6Ly90ZXN0LmNvbQ==',
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
          endPoint: 'aHR0cHM6Ly90ZXN0LmNvbQ==',
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
          endPoint: 'aHR0cHM6Ly90ZXN0LmNvbQ==',
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
    { path: "m/84'/1'/0'/0/0", transfers: 1 },
    { path: "m/84'/1'/0'/1/0", transfers: 1 },
    { path: "m/84'/1'/0'/1/2", transfers: 1 },
    { path: "m/84'/1'/0'/1/3", transfers: 1 },
    { path: "m/84'/1'/0'/1/1", transfers: 1 },
    { path: "m/84'/1'/0'/0/4", transfers: 1 },
    { path: "m/84'/1'/0'/0/5", transfers: 1 },
    { path: "m/84'/1'/0'/0/6", transfers: 1 },
    { path: "m/84'/1'/0'/0/8", transfers: 1 },
    { path: "m/84'/1'/0'/0/9", transfers: 1 },
    { path: "m/84'/1'/0'/0/10", transfers: 1 },
    { path: "m/84'/1'/0'/0/11", transfers: 1 }
  ],
  expected: {
    hex: '87000000000107e073d118d57ec902a8ed14cdb96121f263c0ec6e4150222b73d0f8e664afc2c50000000000fdfffffffb6efdd4f7b12d61a2407ede92a269310bec83978f45c9f0bcf784b920b1da4f0000000000fdffffff22b5f7483a3fc80998660a19064cac2f6c9aeef9c2436c308e919880cdbd1d930000000000fdffffffe184c393f77c969e3ef1b6824bdae939d12c3bd4bb93f74413b992ef1b84d6660000000000fdfffffff2ed472a1d1d28220a7d2cd02eb89652f3b75fdebbc4a219bfd89797578026210000000000fdffffff826608305b2708d5e6421492864c1a18235312f61a4ec506aa2c29fdc09d21570000000000fdffffff687a1987daaea85a054c6cf5b6a7a8430b9ea88b67e581cfba17b81a2f70e7c60000000000fdffffff0da802000000000000160014e8cc042a7c976ab0068cf0e4fcae4845d41774a7a8020000000000001600149271f58284fc922b7e466cff87a53bb838d11feba802000000000000160014248a521f8561af8f735d0f5e6d13f41177e423bda802000000000000160014248a521f8561af8f735d0f5e6d13f41177e423bda802000000000000160014581c4fc0439986b761b5110ee86a60f8c563f7caa802000000000000160014581c4fc0439986b761b5110ee86a60f8c563f7caa8020000000000001600147326551112dd129f478b4a3fe4fab809c7fb2d0ca8020000000000001600147326551112dd129f478b4a3fe4fab809c7fb2d0ca802000000000000160014413e8fd29b2f671b6058c9f50bf51bf971274e53a802000000000000160014413e8fd29b2f671b6058c9f50bf51bf971274e530000000000000000fdd7016a4dd3010787e8f0a411020b300030411f966b65ef1a09aae16339a092faa80a296bd71e2c6ea4e4a640f8e6e49a61b69f6fbde81a777f31aa0b6717c6173ec3752536e531fbeeb691c5f956386293513a81b5a2c92c010113412017441c2dcd7918a2b4f3573b491735abb0cde2cbfc72b756fbac29a9e9c7f3c4372db62cece2fdc2c02b26482f437de9f7c202691e3d59319f0d294b89ee01b3898693d147020280640330411f637aa818bf059812d45caf60cbc861e91ec9a6d90a4db1c106c87fb4824116247fe60b00a12efda63da225658a1b8620135565778bfe776e633093a6603b5e0180bee4e22a02041d05094120e2974041e1e3e8f3eb32023f9280e20e78c0bd53c7ee94a58d12a0cc2d3b88252f78d562c44c59ab3dd8e3f4a55450d906b99419712ea08478202a75cfb0b33d84dbf5dc380206813e07800a411f9cc9b26cc0baa63c7331f6cb1e2f8b0da34236a97e063ff203b8990ae80787bf63c0d61017ab1f50919cd6de7cf34fb74470536d83f2bcccc75de2ad9a40d71c87cabdbd5b020831090900858addbd66010c0a4100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000009eb60e0000000000160014e8cc042a7c976ab0068cf0e4fcae4845d41774a7a802000000000000160014bd6cfd84d53025c8891862ec49b0036d06405d0f02483045022100e9cc5a24c8ed8a4246524b0e7d89833d5ee6227c540bd7562ab10c1908e7555b02205098a6932a766e6990c4101e13a0f5b48c6a7387025facdb17615f7b51a7a48a01210281c11974da83e7d9ff9f47a3c32e3baa7975b5127eb447b86a2f7fd4c9d12fec02483045022100faed8d730a3e5ce1e4126c64f32ab0ff9af8831fae5c485eec89fcf09a53bfc1022028a23b8fc0400ff800635d7dba7d9f27a1f3049c3e04daaddb73cab76723ef1b012103c86473f098d9bb69d31a7851372f9ded7b11691a77c253279e987373164b2ad2024730440220278ff5c4b7c7f61dd3e4227905bb8148cbe1d55ad0028c6e25096fed4b265dab02207c2a2d279061631dce2fdd2c6507c286672a7465159490a6e2623f9efacbc81e012102f165ced59862353282a8fd32ac10d018c4bc449e6dabc77a7d810ca2be6f69fd02483045022100c57a54bd3713572414459de61c147b7c8bf72951dcc9947cf139a044a30bc4af02203ab606c567c29d037bb1fa8303a37018b1a1d75353b0b229c56836bb5537b9d60121025eea502cd2da208247cdd27701a2efea1e64aebf7c476362c1a6c0d1416c25f3024830450221009ba06e4e1a668050fa65241bf3f4d59c58fc84fefd387887966574df7afa362b02206ccd463d106ae9c0cc332526866c61eb176c4d6b4b5607f2270f16199e6ff74a012102ccb8a1b346388ff9691d6ee1b2019956e93e5550130cbfe2e866477193b22a3f0247304402203e15ca9ea787c6cc3b368e338ad0903a5fde5e3db1ff92fffeb040cbd62caa22022014e87d55acfe7d612664bc2890d11b72b8899fac17e93699802351ad2ebad238012102b7d4e03f4230eb2406328be6bf9dbd400083b929c07a4b0b3601589b3243067402483045022100bc5167c49bbd85606b6d22fea1bcef722e757c856623a99ae249dee0b6de71cf022078882fc820078ab4d0bcb87828f3596f8274b609aac4488be8240469f980f4da012102b7d4e03f4230eb2406328be6bf9dbd400083b929c07a4b0b3601589b3243067400000000',
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
    { path: "m/84'/1'/0'/0/0", transfers: 1 },
    { path: "m/84'/1'/0'/1/0", transfers: 1 },
    { path: "m/84'/1'/0'/1/2", transfers: 1 },
    { path: "m/84'/1'/0'/1/3", transfers: 1 },
    { path: "m/84'/1'/0'/1/1", transfers: 1 },
    { path: "m/84'/1'/0'/0/4", transfers: 1 },
    { path: "m/84'/1'/0'/0/5", transfers: 1 },
    { path: "m/84'/1'/0'/0/6", transfers: 1 },
    { path: "m/84'/1'/0'/0/8", transfers: 1 },
    { path: "m/84'/1'/0'/0/9", transfers: 1 },
    { path: "m/84'/1'/0'/0/10", transfers: 1 },
    { path: "m/84'/1'/0'/0/11", transfers: 1 }
  ],
  expected: {
    hex: '87000000000102627a1987daaea85a054c6cf5b6a7a8430b9ea88b67e581cfba17b81a2f70e7c60000000000ffffffff65e8597e401226251db28ef7c86f70d4ef638b7540d9651c1a166c7c5303f92c0000000000ffffffff04a8020000000000001600145f57a028945f5b5ba2aef4fd2b512063e785dcf5a802000000000000160014413e8fd29b2f671b6058c9f50bf51bf971274e530000000000000000116a0f01858addbd60030039013b039a5b00dad4f505000000001600149271f58284fc922b7e466cff87a53bb838d11feb02483045022100c4edfcbe73a417ca8ab49e47e28524bb9cd9265b01a38828d3a36f4c7244dd7c022055f1b1cdad1ef591a2fe74973c5e8ee69ee9ae79f87d37b5de6216e82b82177901210281c11974da83e7d9ff9f47a3c32e3baa7975b5127eb447b86a2f7fd4c9d12fec02483045022100afa63efe3f39097d00f0e46b8527379a8902e9fd3196c00f554331e9f5cde8e402202150104bae5bd1fe9a337b92083017233e2b8c6eb2ca96cb8302a366cca8ae80012103c86473f098d9bb69d31a7851372f9ded7b11691a77c253279e987373164b2ad200000000',
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
          endPoint: 'aHR0cHM6Ly90ZXN0LmNvbQ==',
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
    { path: "m/84'/1'/0'/0/0", transfers: 1 },
    { path: "m/84'/1'/0'/1/0", transfers: 1 },
    { path: "m/84'/1'/0'/1/2", transfers: 1 },
    { path: "m/84'/1'/0'/1/3", transfers: 1 },
    { path: "m/84'/1'/0'/1/1", transfers: 1 },
    { path: "m/84'/1'/0'/0/4", transfers: 1 },
    { path: "m/84'/1'/0'/0/5", transfers: 1 },
    { path: "m/84'/1'/0'/0/6", transfers: 1 },
    { path: "m/84'/1'/0'/0/8", transfers: 1 },
    { path: "m/84'/1'/0'/0/9", transfers: 1 },
    { path: "m/84'/1'/0'/0/10", transfers: 1 },
    { path: "m/84'/1'/0'/0/11", transfers: 1 }
  ],
  expected: {
    hex: '800000000001011787945f9d715eb56da23be847e1db7aada29c70ba4ef0eb59c9ed20d60526910b00000000fdffffff03005a6202000000001600149271f58284fc922b7e466cff87a53bb838d11feb0000000000000000516a4c4e0187e8f0a411020126000841201dd3317fff7055779720a4c979308fcda9548cba6eb7ffab7cc89e8d3d7607ae6a5ce27048bdfe47486919ab8635178f08818b32b4f7e356156a6a95d0cb3fdf009087f50500000000160014bd6cfd84d53025c8891862ec49b0036d06405d0f0247304402206f5cfb66d37c88689e8dd0629f04da94cbacd6015695b69c90bdd5e3f46a7ded02200b0d168e9a0b5f64b700341a413edec56d8575e8f33f15db8c8d3e4592fe71f101210281c11974da83e7d9ff9f47a3c32e3baa7975b5127eb447b86a2f7fd4c9d12fec00000000',
    rbf: true,
    numOutputs: 3,
    script: Buffer.from('6a4c4e0187e8f0a411020126000841201dd3317fff7055779720a4c979308fcda9548cba6eb7ffab7cc89e8d3d7607ae6a5ce27048bdfe47486919ab8635178f08818b32b4f7e356156a6a95d0cb3fdf00', 'hex'),
    asset: {
      allocation: [{ assetGuid: '2369540753', values: [{ n: 1, value: new BN(40000000) }, { n: 0, value: new BN(10000000) }], notarysig: Buffer.from('IB3TMX//cFV3lyCkyXkwj82pVIy6brf/q3zIno09dgeualzicEi9/kdIaRmrhjUXjwiBizK09+NWFWpqldDLP98=', 'base64') }], ethaddress: Buffer.from('', 'hex')
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
          endPoint: 'aHR0cHM6Ly90ZXN0LmNvbQ==',
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
    { path: "m/84'/1'/0'/0/0", transfers: 1 },
    { path: "m/84'/1'/0'/1/0", transfers: 1 },
    { path: "m/84'/1'/0'/1/2", transfers: 1 },
    { path: "m/84'/1'/0'/1/3", transfers: 1 },
    { path: "m/84'/1'/0'/1/1", transfers: 1 },
    { path: "m/84'/1'/0'/0/4", transfers: 1 },
    { path: "m/84'/1'/0'/0/5", transfers: 1 },
    { path: "m/84'/1'/0'/0/6", transfers: 1 },
    { path: "m/84'/1'/0'/0/8", transfers: 1 },
    { path: "m/84'/1'/0'/0/9", transfers: 1 },
    { path: "m/84'/1'/0'/0/10", transfers: 1 },
    { path: "m/84'/1'/0'/0/11", transfers: 1 }
  ],
  expected: {
    hex: '800000000001021787945f9d715eb56da23be847e1db7aada29c70ba4ef0eb59c9ed20d60526910000000000fdffffff1787945f9d715eb56da23be847e1db7aada29c70ba4ef0eb59c9ed20d60526910b00000000fdffffff0401000000000000001600149271f58284fc922b7e466cff87a53bb838d11feb0000000000000000576a4c540187e8f0a41103010100a0c2c3b277030041201dd3317fff7055779720a4c979308fcda9548cba6eb7ffab7cc89e8d3d7607ae6a5ce27048bdfe47486919ab8635178f08818b32b4f7e356156a6a95d0cb3fdf00bc1f5f841a000000160014bd6cfd84d53025c8891862ec49b0036d06405d0fa8020000000000001600149271f58284fc922b7e466cff87a53bb838d11feb02483045022100bbdf6412868072c3b7101fe83cad0e6b947f84e59fc5b927a43f413547d2886c022045ffb9bb4e53deceed5737c71edea27eca7780523285079d22ae547874ab096501210281c11974da83e7d9ff9f47a3c32e3baa7975b5127eb447b86a2f7fd4c9d12fec0247304402207937356db8258ad561329ef3eac1d58d9dc90cbb09c424541a1e0645021876800220149099a054464a4cf4c04af43d93624d0bd8be26dc11d746103c520db0e0274201210281c11974da83e7d9ff9f47a3c32e3baa7975b5127eb447b86a2f7fd4c9d12fec00000000',
    rbf: true,
    numOutputs: 4,
    script: Buffer.from('6a4c540187e8f0a41103010100a0c2c3b277030041201dd3317fff7055779720a4c979308fcda9548cba6eb7ffab7cc89e8d3d7607ae6a5ce27048bdfe47486919ab8635178f08818b32b4f7e356156a6a95d0cb3fdf00', 'hex'),
    asset: {
      allocation: [{ assetGuid: '2369540753', values: [{ n: 1, value: new BN(1) }, { n: 0, value: new BN(999999999) }, { n: 3, value: new BN(0) }], notarysig: Buffer.from('IB3TMX//cFV3lyCkyXkwj82pVIy6brf/q3zIno09dgeualzicEi9/kdIaRmrhjUXjwiBizK09+NWFWpqldDLP98=', 'base64') }], ethaddress: Buffer.from('', 'hex')
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
    { path: "m/84'/1'/0'/0/0", transfers: 1 },
    { path: "m/84'/1'/0'/1/0", transfers: 1 },
    { path: "m/84'/1'/0'/1/2", transfers: 1 },
    { path: "m/84'/1'/0'/1/3", transfers: 1 },
    { path: "m/84'/1'/0'/1/1", transfers: 1 },
    { path: "m/84'/1'/0'/0/4", transfers: 1 },
    { path: "m/84'/1'/0'/0/5", transfers: 1 },
    { path: "m/84'/1'/0'/0/6", transfers: 1 },
    { path: "m/84'/1'/0'/0/8", transfers: 1 },
    { path: "m/84'/1'/0'/0/9", transfers: 1 },
    { path: "m/84'/1'/0'/0/10", transfers: 1 },
    { path: "m/84'/1'/0'/0/11", transfers: 1 }
  ],
  expected: {
    hex: '860000000001021787945f9d715eb56da23be847e1db7aada29c70ba4ef0eb59c9ed20d60526910900000000fdffffff2270b1a47a133755ff6dbcb34a32cc31b42c999c70dec6b133ced8e6e36d589f0300000000fdffffff020000000000000000236a210187cabdbd5b020008015800149667de58c15475626165eaa4c9970e409e1181d02c78f505000000001600149271f58284fc922b7e466cff87a53bb838d11feb02483045022100b7eede69e1af760ef328b3e641809af6449a13f4eda09bc958533b3d68f1d77d022003668a795c8bb43d02f3bdf5fefbf7af4ea43553735ddd3bc2724fef4f6af220012102b7d4e03f4230eb2406328be6bf9dbd400083b929c07a4b0b3601589b3243067402483045022100e97c9f58505b124373f2dadff697cb93811f89db36e2ee6109d859de56a5874b02200ff9588bc93b1380782328275b8c405957e461572f651de1da7a8fe43e9ded77012103b7eeb47fdd1c2084ef795fac22bf24185e7295d2efa3178b69b6eca409810fba00000000',
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
    { path: "m/84'/1'/0'/0/0", transfers: 1 },
    { path: "m/84'/1'/0'/1/0", transfers: 1 },
    { path: "m/84'/1'/0'/1/2", transfers: 1 },
    { path: "m/84'/1'/0'/1/3", transfers: 1 },
    { path: "m/84'/1'/0'/1/1", transfers: 1 },
    { path: "m/84'/1'/0'/0/4", transfers: 1 },
    { path: "m/84'/1'/0'/0/5", transfers: 1 },
    { path: "m/84'/1'/0'/0/6", transfers: 1 },
    { path: "m/84'/1'/0'/0/8", transfers: 1 },
    { path: "m/84'/1'/0'/0/9", transfers: 1 },
    { path: "m/84'/1'/0'/0/10", transfers: 1 },
    { path: "m/84'/1'/0'/0/11", transfers: 1 }
  ],
  expected: {
    hex: '860000000001021787945f9d715eb56da23be847e1db7aada29c70ba4ef0eb59c9ed20d60526910800000000fdffffff30c550116b2a1276ea4834ce314a32ead21037da82b96cfb293f6b5b52fe6e380100000000fdffffff020000000000000000246a220187cabdbd5b02000901824000149667de58c15475626165eaa4c9970e409e1181d05068f505000000001600149271f58284fc922b7e466cff87a53bb838d11feb02483045022100c97c374ce4c27ef97e8d34d58ec7961c9e5759ec05d62ff745652fcb6dab81c2022026ce576e106ccfced6b02222ed7cf4146c7522695bd49056ba686c00a0d1c854012102b7d4e03f4230eb2406328be6bf9dbd400083b929c07a4b0b3601589b324306740247304402200e043132842bea2cf382b18ee5bd856bb757eedaa6331b1db4272da87d1e4e27022011cd544b17b14a9c361226acf46f55a38b79ce6159e8f8fc90dbb75cabcaf21a012103c86473f098d9bb69d31a7851372f9ded7b11691a77c253279e987373164b2ad200000000',
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
    { path: "m/84'/1'/0'/0/0", transfers: 1 },
    { path: "m/84'/1'/0'/1/0", transfers: 1 },
    { path: "m/84'/1'/0'/1/2", transfers: 1 },
    { path: "m/84'/1'/0'/1/3", transfers: 1 },
    { path: "m/84'/1'/0'/1/1", transfers: 1 },
    { path: "m/84'/1'/0'/0/4", transfers: 1 },
    { path: "m/84'/1'/0'/0/5", transfers: 1 },
    { path: "m/84'/1'/0'/0/6", transfers: 1 },
    { path: "m/84'/1'/0'/0/8", transfers: 1 },
    { path: "m/84'/1'/0'/0/9", transfers: 1 },
    { path: "m/84'/1'/0'/0/10", transfers: 1 },
    { path: "m/84'/1'/0'/0/11", transfers: 1 }
  ],
  expected: {
    hex: '020000000001022270b1a47a133755ff6dbcb34a32cc31b42c999c70dec6b133ced8e6e36d589f0000000000fdffffff36f78b3762f77de9431d25ce6607cb64e575b706fbe28b72818cfda122998df90100000000fdffffff0280f0fa0200000000160014bd6cfd84d53025c8891862ec49b0036d06405d0f9a243101000000001600149271f58284fc922b7e466cff87a53bb838d11feb02483045022100eef370cd78e4a34bf40c4b65e77e13f9719646bead6f03954b2f2e7de11f044402206b436f15aeb7972795c0d3591a3c8d0bfa249315a77c92d5eae71394b7104cd3012103c86473f098d9bb69d31a7851372f9ded7b11691a77c253279e987373164b2ad202473044022071abab927e663c95637455b1a9031a2b5894efea59e9238d78e03760e0ace46702207d86edbc3f021fa0308cbe785a55ff97e7cb35cb7f8d5006f04a18dade7d65aa012103c86473f098d9bb69d31a7851372f9ded7b11691a77c253279e987373164b2ad200000000',
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
    assetWhiteList: new Map([['2305793883', {}], ['2369540753', {}]]),
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
          endPoint: 'aHR0cHM6Ly90ZXN0LmNvbQ==',
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
    { path: "m/84'/1'/0'/0/0", transfers: 1 },
    { path: "m/84'/1'/0'/1/0", transfers: 1 },
    { path: "m/84'/1'/0'/1/2", transfers: 1 },
    { path: "m/84'/1'/0'/1/3", transfers: 1 },
    { path: "m/84'/1'/0'/1/1", transfers: 1 },
    { path: "m/84'/1'/0'/0/4", transfers: 1 },
    { path: "m/84'/1'/0'/0/5", transfers: 1 },
    { path: "m/84'/1'/0'/0/6", transfers: 1 },
    { path: "m/84'/1'/0'/0/8", transfers: 1 },
    { path: "m/84'/1'/0'/0/9", transfers: 1 },
    { path: "m/84'/1'/0'/0/10", transfers: 1 },
    { path: "m/84'/1'/0'/0/11", transfers: 1 }
  ],
  expected: {
    hex: '87000000000102684c965ed8b542a614743b91faa18989dd4ad5bd66a2326a2f648b2602fbdb640000000000fdffffff2270b1a47a133755ff6dbcb34a32cc31b42c999c70dec6b133ced8e6e36d589f0100000000fdffffff04a0d7f50500000000160014bd6cfd84d53025c8891862ec49b0036d06405d0f28140000000000001600149271f58284fc922b7e466cff87a53bb838d11feba8020000000000001600149271f58284fc922b7e466cff87a53bb838d11feb0000000000000000576a4c540287cabdbd5b0101580087e8f0a411010208411f966b65ef1a09aae16339a092faa80a296bd71e2c6ea4e4a640f8e6e49a61b69f6fbde81a777f31aa0b6717c6173ec3752536e531fbeeb691c5f956386293513a02483045022100c42062a56b9a9ed9120284760e8afa110781229510a327900fb9a4a4c6836b0202206c23f2e550307f2d58ed8f9279c1d2b85c61f1608fc59dbd58c67ebf0bfe7716012103b7eeb47fdd1c2084ef795fac22bf24185e7295d2efa3178b69b6eca409810fba02483045022100d681c40bb9f07e753904652971cc0d1f8a9d261650e8b634288f7eba85ee1aaf022035829e6e835335ca69240b3ac9dca5108084222c3836c408154a31a4a496ea7f012103c86473f098d9bb69d31a7851372f9ded7b11691a77c253279e987373164b2ad200000000',
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
    ethtxid: Buffer.from('3c3bfe141fcbe313f2afd31be1b63dd3a0147235161e637407fbb8605d3d294f', 'hex'),
    blockhash: Buffer.from('ee524852fb7df5a6c27106f4bc47e740e6a6751e66bce1f98363ff2eecbf8c0d', 'hex'),
    txvalue: Buffer.from('f9012b82051f843b9aca008307a120940765efb302d504751c652c5b1d65e8e9edf2e70f80b8c454c988ff00000000000000000000000000000000000000000000000000000002540be400000000000000000000000000000000000000000000000000000000009be8894b0000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000002c62637274317130667265323430737939326d716b386b6b377073616561366b74366d3537323570377964636a00000000000000000000000000000000000000002ca0dccb6e077c3f6252d199202113893407119d4ba09667113f2d20c63a31487b87a01e0a059e50f08f2772781691f2c9e43a9503a167c98cf467b1afc177b74d84e6', 'hex'),
    txroot: Buffer.from('842ab40a9c4770c8ec74158aadcf943e8158128fdd1ba8cef9c7cb8eda732692', 'hex'),
    txparentnodes: Buffer.from('f9039cf871a04442f3f69add48df0531fe3c0025103b53fcf3fe38060e5f29366caec8855e4fa0229f7b7e69c0b5793f8a61c06f5cc09b0f4938561856c632ee56c3b2c4d6d153808080808080a07720fff5e8eabef55fa129ee55b3b0d82875e2b25b8f26e22cf6b5c4f9cec7ab8080808080808080f901f180a03ee147749c5b769bc5d1a53e4f37567506d417de4ec4e67722130eda4638427da043caa62b40dad61bce4d50fb62ea485729a6687c3aa13895cf4ba234b92afe82a0b79958e4aa63104da4599ebb91e712375e6adfc89abc14b9533c5778f107e7d8a01bc7f80f81a8d281253ac882bb89aca6131e5794bfcbdccde990bb6d5be6cb2fa0aedad62f1426b68e395a59e06bf242fb28b882af67589bce3495a99650058ec4a0c21a7e0b9d0948bb6b65a5e73f5f01173064d20e4819ca4884d1eabc22bf737da090087708c533b10af8925eebf398c005fc16cb6a515111f2be4f328f762949d0a02827daacd6a52ae6c74a78791ff0c5e33a7a85f5ca0a47cdfbcd5219f75f705ca0af7ecf31d56575155d272cd813bf7d7ac435f62b0538c31771e407dafef6be53a09b74707c3abdbfa305cb61f23c940f063f553f17d0bd3013126aad357193353ea067a52ed59820bb48f8010d2b2bb0ee92803b1a00a8341fd4c3269b065ed070d9a0bf0e9b45955283e6e04b71eda63bfc7b55d9f54527943aa1c159b4161b1e1daea0ecabd4c00deacf9a7ff25be942c9f468628eb776fbec23a9ca0d8fc256f14a31a0df406c7ac7f38c2ea1d9bdb06c2e51db3de8cf0e655a8e0e683e19ca1ddf83d3a08360ec6c5e26614f144520ed9d0b577640381f0f38b5429b67422f75d603ad5a80f9013220b9012ef9012b82051f843b9aca008307a120940765efb302d504751c652c5b1d65e8e9edf2e70f80b8c454c988ff00000000000000000000000000000000000000000000000000000002540be400000000000000000000000000000000000000000000000000000000009be8894b0000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000002c62637274317130667265323430737939326d716b386b6b377073616561366b74366d3537323570377964636a00000000000000000000000000000000000000002ca0dccb6e077c3f6252d199202113893407119d4ba09667113f2d20c63a31487b87a01e0a059e50f08f2772781691f2c9e43a9503a167c98cf467b1afc177b74d84e6', 'hex'),
    txpath: Buffer.from('0b', 'hex'),
    receiptvalue: Buffer.from('f902e00183192ee2b9010000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000200000000000000008000000000000000000000100200000000000000000010000000000000200000000000000000000000000000000000010000000000000000000000000000004000000000000000000000000400004001000000000020000000000000000000000000080000000000000408000000040000000000000000002000000000000000000000000000000000000000000000000000000000010000000000000000010000000000000000000000000000000000000000000f901d5f89b94f2bb7bfa19e7c4b6bb333ee1afdf8e5e8f9b3561f863a0ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3efa0000000000000000000000000b0ea8c9ee8aa87efd28a12de8c034f947c144053a00000000000000000000000000765efb302d504751c652c5b1d65e8e9edf2e70fa000000000000000000000000000000000000000000000000000000002540be400f89b94f2bb7bfa19e7c4b6bb333ee1afdf8e5e8f9b3561f863a08c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925a0000000000000000000000000b0ea8c9ee8aa87efd28a12de8c034f947c144053a00000000000000000000000000765efb302d504751c652c5b1d65e8e9edf2e70fa00000000000000000000000000000000000000000000000000000000000000000f899940765efb302d504751c652c5b1d65e8e9edf2e70fe1a09c6dea23fe3b510bb5d170df49dc74e387692eaa3258c691918cd3aa94f5fb74b860000000000000000000000000b0ea8c9ee8aa87efd28a12de8c034f947c14405300000000000000000000000000000000000000000000000000000002540be4000000000000000000000000000000000000000000000000000000080800000002', 'hex'),
    receiptroot: Buffer.from('a958499bf48fcce17672b58aa9037bd3dafeb6231880722d909c60bacfaaa8d4', 'hex'),
    receiptparentnodes: Buffer.from('f90551f871a0cab13def05783d763febde31920bd234d0486c26955c2937e0486db909a28eeea09cf564a668a29a5f1cc5d6ef8e19988dfd2b30d290672f0ffc4200e608cb65ac808080808080a029b8ed2258c53562954c87bcd7f60671029680d2a19ef8bcd3ad470ea48d57d18080808080808080f901f180a07c21ca39872e6b8f611bc6b1b295c24f988b5cf944625eabf5236b37ea3b9f01a0edb9e63fdc31ba41f11a8b2fb8000ad1357b3c0b27a8483968d75e93e7b488a1a02231847aa3c5dde2f2a1851a66aabec65e5eaae8c28110756f122c72be1fba05a08fa87809e5b7f989e78ccbe1a6bc4924115d5747529af879f2fe196f959b64fca091f1bf748061eba21a413b72d70afccb8daebb5906d5cd9dda06d5f877065d5ba0d7e6c82dd1c25eb2f90b02f038beaff98c260d46992d0b3c1eac7d51552c7417a01d5c43deb2e3794292cdffb04f82ab25bc4e75f5e0cab928b66582e08026f5b1a0d7323a87dc8fbc66c7b34810d2cad92fc0da168d962b4556e825a3266a148b74a0af31f0b7cdcd6a855ac7678ef2b8fcb1afeda918b0c8e4696a4013f2b75ca402a0f9d63f2db8ab6d3c3e12073ac2910ee575832bde3e4586f18e59dd26a16adb7ca0f0c91e059c43780617d304fe8992511f096ccc35232da1f25127db53ba4fb05aa052030932d0a9026efd2a3ada67f33d401cd9a97ddb24c606af3a0a0c24e432aba0142af9b4686c6ca30b0ac39133fa76d8682b7bbbec488e62e652d3f25419777da0940f31617e91cfbabaa9d0d1638949f8125f80a43027122778522675194a4e65a0edc4c7d2cf30150fdf7e502d0ef06c80c85fc37260134a112493c6183f62f4b580f902e720b902e3f902e00183192ee2b9010000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000200000000000000008000000000000000000000100200000000000000000010000000000000200000000000000000000000000000000000010000000000000000000000000000004000000000000000000000000400004001000000000020000000000000000000000000080000000000000408000000040000000000000000002000000000000000000000000000000000000000000000000000000000010000000000000000010000000000000000000000000000000000000000000f901d5f89b94f2bb7bfa19e7c4b6bb333ee1afdf8e5e8f9b3561f863a0ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3efa0000000000000000000000000b0ea8c9ee8aa87efd28a12de8c034f947c144053a00000000000000000000000000765efb302d504751c652c5b1d65e8e9edf2e70fa000000000000000000000000000000000000000000000000000000002540be400f89b94f2bb7bfa19e7c4b6bb333ee1afdf8e5e8f9b3561f863a08c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925a0000000000000000000000000b0ea8c9ee8aa87efd28a12de8c034f947c144053a00000000000000000000000000765efb302d504751c652c5b1d65e8e9edf2e70fa00000000000000000000000000000000000000000000000000000000000000000f899940765efb302d504751c652c5b1d65e8e9edf2e70fe1a09c6dea23fe3b510bb5d170df49dc74e387692eaa3258c691918cd3aa94f5fb74b860000000000000000000000000b0ea8c9ee8aa87efd28a12de8c034f947c14405300000000000000000000000000000000000000000000000000000002540be4000000000000000000000000000000000000000000000000000000080800000002', 'hex')
  },
  sysChangeAddress: 'tsys1qp7qn0t0t6ymwhdwne9uku7v3dhw07a7tra8hzl',
  assetMap: new Map([
    ['2615707979', { changeAddress: 'tsys1qjfcltq5yljfzkljxdnlc0ffmhqudz8ltq0z695', outputs: [{ value: new BN(10000000000), address: 'tsys1qdflre2yd37qtpqe2ykuhwandlhq04r2td2t9ae' }] }]
  ]),
  xpubTokens: [
    { path: "m/84'/1'/0'/0/0", transfers: 1 },
    { path: "m/84'/1'/0'/1/0", transfers: 1 },
    { path: "m/84'/1'/0'/1/2", transfers: 1 },
    { path: "m/84'/1'/0'/1/3", transfers: 1 },
    { path: "m/84'/1'/0'/1/1", transfers: 1 },
    { path: "m/84'/1'/0'/0/4", transfers: 1 },
    { path: "m/84'/1'/0'/0/5", transfers: 1 },
    { path: "m/84'/1'/0'/0/6", transfers: 1 },
    { path: "m/84'/1'/0'/0/8", transfers: 1 },
    { path: "m/84'/1'/0'/0/9", transfers: 1 },
    { path: "m/84'/1'/0'/0/10", transfers: 1 },
    { path: "m/84'/1'/0'/0/11", transfers: 1 }
  ],
  expected: {
    hex: '85000000000101684c965ed8b542a614743b91faa18989dd4ad5bd66a2326a2f648b2602fbdb640000000000fdffffff04a8020000000000001600146a7e3ca88d8f80b0832a25b977766dfdc0fa8d4b0000000000000000fd96096a4d92090288dea1914b0100640087cabdbd5b010358003c3bfe141fcbe313f2afd31be1b63dd3a0147235161e637407fbb8605d3d294fee524852fb7df5a6c27106f4bc47e740e6a6751e66bce1f98363ff2eecbf8c0d7102fd9f03f9039cf871a04442f3f69add48df0531fe3c0025103b53fcf3fe38060e5f29366caec8855e4fa0229f7b7e69c0b5793f8a61c06f5cc09b0f4938561856c632ee56c3b2c4d6d153808080808080a07720fff5e8eabef55fa129ee55b3b0d82875e2b25b8f26e22cf6b5c4f9cec7ab8080808080808080f901f180a03ee147749c5b769bc5d1a53e4f37567506d417de4ec4e67722130eda4638427da043caa62b40dad61bce4d50fb62ea485729a6687c3aa13895cf4ba234b92afe82a0b79958e4aa63104da4599ebb91e712375e6adfc89abc14b9533c5778f107e7d8a01bc7f80f81a8d281253ac882bb89aca6131e5794bfcbdccde990bb6d5be6cb2fa0aedad62f1426b68e395a59e06bf242fb28b882af67589bce3495a99650058ec4a0c21a7e0b9d0948bb6b65a5e73f5f01173064d20e4819ca4884d1eabc22bf737da090087708c533b10af8925eebf398c005fc16cb6a515111f2be4f328f762949d0a02827daacd6a52ae6c74a78791ff0c5e33a7a85f5ca0a47cdfbcd5219f75f705ca0af7ecf31d56575155d272cd813bf7d7ac435f62b0538c31771e407dafef6be53a09b74707c3abdbfa305cb61f23c940f063f553f17d0bd3013126aad357193353ea067a52ed59820bb48f8010d2b2bb0ee92803b1a00a8341fd4c3269b065ed070d9a0bf0e9b45955283e6e04b71eda63bfc7b55d9f54527943aa1c159b4161b1e1daea0ecabd4c00deacf9a7ff25be942c9f468628eb776fbec23a9ca0d8fc256f14a31a0df406c7ac7f38c2ea1d9bdb06c2e51db3de8cf0e655a8e0e683e19ca1ddf83d3a08360ec6c5e26614f144520ed9d0b577640381f0f38b5429b67422f75d603ad5a80f9013220b9012ef9012b82051f843b9aca008307a120940765efb302d504751c652c5b1d65e8e9edf2e70f80b8c454c988ff00000000000000000000000000000000000000000000000000000002540be400000000000000000000000000000000000000000000000000000000009be8894b0000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000002c62637274317130667265323430737939326d716b386b6b377073616561366b74366d3537323570377964636a00000000000000000000000000000000000000002ca0dccb6e077c3f6252d199202113893407119d4ba09667113f2d20c63a31487b87a01e0a059e50f08f2772781691f2c9e43a9503a167c98cf467b1afc177b74d84e6010b7102fd5405f90551f871a0cab13def05783d763febde31920bd234d0486c26955c2937e0486db909a28eeea09cf564a668a29a5f1cc5d6ef8e19988dfd2b30d290672f0ffc4200e608cb65ac808080808080a029b8ed2258c53562954c87bcd7f60671029680d2a19ef8bcd3ad470ea48d57d18080808080808080f901f180a07c21ca39872e6b8f611bc6b1b295c24f988b5cf944625eabf5236b37ea3b9f01a0edb9e63fdc31ba41f11a8b2fb8000ad1357b3c0b27a8483968d75e93e7b488a1a02231847aa3c5dde2f2a1851a66aabec65e5eaae8c28110756f122c72be1fba05a08fa87809e5b7f989e78ccbe1a6bc4924115d5747529af879f2fe196f959b64fca091f1bf748061eba21a413b72d70afccb8daebb5906d5cd9dda06d5f877065d5ba0d7e6c82dd1c25eb2f90b02f038beaff98c260d46992d0b3c1eac7d51552c7417a01d5c43deb2e3794292cdffb04f82ab25bc4e75f5e0cab928b66582e08026f5b1a0d7323a87dc8fbc66c7b34810d2cad92fc0da168d962b4556e825a3266a148b74a0af31f0b7cdcd6a855ac7678ef2b8fcb1afeda918b0c8e4696a4013f2b75ca402a0f9d63f2db8ab6d3c3e12073ac2910ee575832bde3e4586f18e59dd26a16adb7ca0f0c91e059c43780617d304fe8992511f096ccc35232da1f25127db53ba4fb05aa052030932d0a9026efd2a3ada67f33d401cd9a97ddb24c606af3a0a0c24e432aba0142af9b4686c6ca30b0ac39133fa76d8682b7bbbec488e62e652d3f25419777da0940f31617e91cfbabaa9d0d1638949f8125f80a43027122778522675194a4e65a0edc4c7d2cf30150fdf7e502d0ef06c80c85fc37260134a112493c6183f62f4b580f902e720b902e3f902e00183192ee2b9010000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000200000000000000008000000000000000000000100200000000000000000010000000000000200000000000000000000000000000000000010000000000000000000000000000004000000000000000000000000400004001000000000020000000000000000000000000080000000000000408000000040000000000000000002000000000000000000000000000000000000000000000000000000000010000000000000000010000000000000000000000000000000000000000000f901d5f89b94f2bb7bfa19e7c4b6bb333ee1afdf8e5e8f9b3561f863a0ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3efa0000000000000000000000000b0ea8c9ee8aa87efd28a12de8c034f947c144053a00000000000000000000000000765efb302d504751c652c5b1d65e8e9edf2e70fa000000000000000000000000000000000000000000000000000000002540be400f89b94f2bb7bfa19e7c4b6bb333ee1afdf8e5e8f9b3561f863a08c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925a0000000000000000000000000b0ea8c9ee8aa87efd28a12de8c034f947c144053a00000000000000000000000000765efb302d504751c652c5b1d65e8e9edf2e70fa00000000000000000000000000000000000000000000000000000000000000000f899940765efb302d504751c652c5b1d65e8e9edf2e70fe1a09c6dea23fe3b510bb5d170df49dc74e387692eaa3258c691918cd3aa94f5fb74b860000000000000000000000000b0ea8c9ee8aa87efd28a12de8c034f947c14405300000000000000000000000000000000000000000000000000000002540be4000000000000000000000000000000000000000000000000000000080800000002842ab40a9c4770c8ec74158aadcf943e8158128fdd1ba8cef9c7cb8eda732692a958499bf48fcce17672b58aa9037bd3dafeb6231880722d909c60bacfaaa8d49074f505000000001600140f8137adebd136ebb5d3c9796e79916ddcff77cba8020000000000001600140f8137adebd136ebb5d3c9796e79916ddcff77cb02483045022100aac3d43e52a453b14d8d95d34e5d772fd22b85b4d92db23afebe2fad3436a5ad02205611c7e62f68f515b073fe154b5cff8f57285ea23f9fff325bd9abf0a637758f012103b7eeb47fdd1c2084ef795fac22bf24185e7295d2efa3178b69b6eca409810fba00000000',
    rbf: true,
    version: syscointx.utils.SYSCOIN_TX_VERSION_ALLOCATION_MINT,
    numOutputs: 4,
    script: Buffer.from('6a4d92090288dea1914b0100640087cabdbd5b010358003c3bfe141fcbe313f2afd31be1b63dd3a0147235161e637407fbb8605d3d294fee524852fb7df5a6c27106f4bc47e740e6a6751e66bce1f98363ff2eecbf8c0d7102fd9f03f9039cf871a04442f3f69add48df0531fe3c0025103b53fcf3fe38060e5f29366caec8855e4fa0229f7b7e69c0b5793f8a61c06f5cc09b0f4938561856c632ee56c3b2c4d6d153808080808080a07720fff5e8eabef55fa129ee55b3b0d82875e2b25b8f26e22cf6b5c4f9cec7ab8080808080808080f901f180a03ee147749c5b769bc5d1a53e4f37567506d417de4ec4e67722130eda4638427da043caa62b40dad61bce4d50fb62ea485729a6687c3aa13895cf4ba234b92afe82a0b79958e4aa63104da4599ebb91e712375e6adfc89abc14b9533c5778f107e7d8a01bc7f80f81a8d281253ac882bb89aca6131e5794bfcbdccde990bb6d5be6cb2fa0aedad62f1426b68e395a59e06bf242fb28b882af67589bce3495a99650058ec4a0c21a7e0b9d0948bb6b65a5e73f5f01173064d20e4819ca4884d1eabc22bf737da090087708c533b10af8925eebf398c005fc16cb6a515111f2be4f328f762949d0a02827daacd6a52ae6c74a78791ff0c5e33a7a85f5ca0a47cdfbcd5219f75f705ca0af7ecf31d56575155d272cd813bf7d7ac435f62b0538c31771e407dafef6be53a09b74707c3abdbfa305cb61f23c940f063f553f17d0bd3013126aad357193353ea067a52ed59820bb48f8010d2b2bb0ee92803b1a00a8341fd4c3269b065ed070d9a0bf0e9b45955283e6e04b71eda63bfc7b55d9f54527943aa1c159b4161b1e1daea0ecabd4c00deacf9a7ff25be942c9f468628eb776fbec23a9ca0d8fc256f14a31a0df406c7ac7f38c2ea1d9bdb06c2e51db3de8cf0e655a8e0e683e19ca1ddf83d3a08360ec6c5e26614f144520ed9d0b577640381f0f38b5429b67422f75d603ad5a80f9013220b9012ef9012b82051f843b9aca008307a120940765efb302d504751c652c5b1d65e8e9edf2e70f80b8c454c988ff00000000000000000000000000000000000000000000000000000002540be400000000000000000000000000000000000000000000000000000000009be8894b0000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000002c62637274317130667265323430737939326d716b386b6b377073616561366b74366d3537323570377964636a00000000000000000000000000000000000000002ca0dccb6e077c3f6252d199202113893407119d4ba09667113f2d20c63a31487b87a01e0a059e50f08f2772781691f2c9e43a9503a167c98cf467b1afc177b74d84e6010b7102fd5405f90551f871a0cab13def05783d763febde31920bd234d0486c26955c2937e0486db909a28eeea09cf564a668a29a5f1cc5d6ef8e19988dfd2b30d290672f0ffc4200e608cb65ac808080808080a029b8ed2258c53562954c87bcd7f60671029680d2a19ef8bcd3ad470ea48d57d18080808080808080f901f180a07c21ca39872e6b8f611bc6b1b295c24f988b5cf944625eabf5236b37ea3b9f01a0edb9e63fdc31ba41f11a8b2fb8000ad1357b3c0b27a8483968d75e93e7b488a1a02231847aa3c5dde2f2a1851a66aabec65e5eaae8c28110756f122c72be1fba05a08fa87809e5b7f989e78ccbe1a6bc4924115d5747529af879f2fe196f959b64fca091f1bf748061eba21a413b72d70afccb8daebb5906d5cd9dda06d5f877065d5ba0d7e6c82dd1c25eb2f90b02f038beaff98c260d46992d0b3c1eac7d51552c7417a01d5c43deb2e3794292cdffb04f82ab25bc4e75f5e0cab928b66582e08026f5b1a0d7323a87dc8fbc66c7b34810d2cad92fc0da168d962b4556e825a3266a148b74a0af31f0b7cdcd6a855ac7678ef2b8fcb1afeda918b0c8e4696a4013f2b75ca402a0f9d63f2db8ab6d3c3e12073ac2910ee575832bde3e4586f18e59dd26a16adb7ca0f0c91e059c43780617d304fe8992511f096ccc35232da1f25127db53ba4fb05aa052030932d0a9026efd2a3ada67f33d401cd9a97ddb24c606af3a0a0c24e432aba0142af9b4686c6ca30b0ac39133fa76d8682b7bbbec488e62e652d3f25419777da0940f31617e91cfbabaa9d0d1638949f8125f80a43027122778522675194a4e65a0edc4c7d2cf30150fdf7e502d0ef06c80c85fc37260134a112493c6183f62f4b580f902e720b902e3f902e00183192ee2b9010000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000200000000000000008000000000000000000000100200000000000000000010000000000000200000000000000000000000000000000000010000000000000000000000000000004000000000000000000000000400004001000000000020000000000000000000000000080000000000000408000000040000000000000000002000000000000000000000000000000000000000000000000000000000010000000000000000010000000000000000000000000000000000000000000f901d5f89b94f2bb7bfa19e7c4b6bb333ee1afdf8e5e8f9b3561f863a0ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3efa0000000000000000000000000b0ea8c9ee8aa87efd28a12de8c034f947c144053a00000000000000000000000000765efb302d504751c652c5b1d65e8e9edf2e70fa000000000000000000000000000000000000000000000000000000002540be400f89b94f2bb7bfa19e7c4b6bb333ee1afdf8e5e8f9b3561f863a08c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925a0000000000000000000000000b0ea8c9ee8aa87efd28a12de8c034f947c144053a00000000000000000000000000765efb302d504751c652c5b1d65e8e9edf2e70fa00000000000000000000000000000000000000000000000000000000000000000f899940765efb302d504751c652c5b1d65e8e9edf2e70fe1a09c6dea23fe3b510bb5d170df49dc74e387692eaa3258c691918cd3aa94f5fb74b860000000000000000000000000b0ea8c9ee8aa87efd28a12de8c034f947c14405300000000000000000000000000000000000000000000000000000002540be4000000000000000000000000000000000000000000000000000000080800000002842ab40a9c4770c8ec74158aadcf943e8158128fdd1ba8cef9c7cb8eda732692a958499bf48fcce17672b58aa9037bd3dafeb6231880722d909c60bacfaaa8d4', 'hex'),
    asset: {
      allocation: [{ assetGuid: '2615707979', values: [{ n: 0, value: new BN(10000000000) }], notarysig: Buffer.from('') }, { assetGuid: '2305793883', values: [{ n: 3, value: new BN(90000000) }], notarysig: Buffer.from('') }],
      ethtxid: Buffer.from('3c3bfe141fcbe313f2afd31be1b63dd3a0147235161e637407fbb8605d3d294f', 'hex'),
      blockhash: Buffer.from('ee524852fb7df5a6c27106f4bc47e740e6a6751e66bce1f98363ff2eecbf8c0d', 'hex'),
      txpos: 625,
      txroot: Buffer.from('842ab40a9c4770c8ec74158aadcf943e8158128fdd1ba8cef9c7cb8eda732692', 'hex'),
      txparentnodes: Buffer.from('f9039cf871a04442f3f69add48df0531fe3c0025103b53fcf3fe38060e5f29366caec8855e4fa0229f7b7e69c0b5793f8a61c06f5cc09b0f4938561856c632ee56c3b2c4d6d153808080808080a07720fff5e8eabef55fa129ee55b3b0d82875e2b25b8f26e22cf6b5c4f9cec7ab8080808080808080f901f180a03ee147749c5b769bc5d1a53e4f37567506d417de4ec4e67722130eda4638427da043caa62b40dad61bce4d50fb62ea485729a6687c3aa13895cf4ba234b92afe82a0b79958e4aa63104da4599ebb91e712375e6adfc89abc14b9533c5778f107e7d8a01bc7f80f81a8d281253ac882bb89aca6131e5794bfcbdccde990bb6d5be6cb2fa0aedad62f1426b68e395a59e06bf242fb28b882af67589bce3495a99650058ec4a0c21a7e0b9d0948bb6b65a5e73f5f01173064d20e4819ca4884d1eabc22bf737da090087708c533b10af8925eebf398c005fc16cb6a515111f2be4f328f762949d0a02827daacd6a52ae6c74a78791ff0c5e33a7a85f5ca0a47cdfbcd5219f75f705ca0af7ecf31d56575155d272cd813bf7d7ac435f62b0538c31771e407dafef6be53a09b74707c3abdbfa305cb61f23c940f063f553f17d0bd3013126aad357193353ea067a52ed59820bb48f8010d2b2bb0ee92803b1a00a8341fd4c3269b065ed070d9a0bf0e9b45955283e6e04b71eda63bfc7b55d9f54527943aa1c159b4161b1e1daea0ecabd4c00deacf9a7ff25be942c9f468628eb776fbec23a9ca0d8fc256f14a31a0df406c7ac7f38c2ea1d9bdb06c2e51db3de8cf0e655a8e0e683e19ca1ddf83d3a08360ec6c5e26614f144520ed9d0b577640381f0f38b5429b67422f75d603ad5a80f9013220b9012ef9012b82051f843b9aca008307a120940765efb302d504751c652c5b1d65e8e9edf2e70f80b8c454c988ff00000000000000000000000000000000000000000000000000000002540be400000000000000000000000000000000000000000000000000000000009be8894b0000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000002c62637274317130667265323430737939326d716b386b6b377073616561366b74366d3537323570377964636a00000000000000000000000000000000000000002ca0dccb6e077c3f6252d199202113893407119d4ba09667113f2d20c63a31487b87a01e0a059e50f08f2772781691f2c9e43a9503a167c98cf467b1afc177b74d84e6', 'hex'),
      txpath: Buffer.from('0b', 'hex'),
      receiptpos: 625,
      receiptroot: Buffer.from('a958499bf48fcce17672b58aa9037bd3dafeb6231880722d909c60bacfaaa8d4', 'hex'),
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
    ['2615707979', { changeAddress: 'tsys1qjfcltq5yljfzkljxdnlc0ffmhqudz8ltq0z695', outputs: [{ value: new BN(900000), address: 'tsys1qdflre2yd37qtpqe2ykuhwandlhq04r2td2t9ae' }] }]
  ]),
  xpubTokens: [
    { path: "m/84'/1'/0'/0/0", transfers: 1 },
    { path: "m/84'/1'/0'/1/0", transfers: 1 },
    { path: "m/84'/1'/0'/1/2", transfers: 1 },
    { path: "m/84'/1'/0'/1/3", transfers: 1 },
    { path: "m/84'/1'/0'/1/1", transfers: 1 },
    { path: "m/84'/1'/0'/0/4", transfers: 1 },
    { path: "m/84'/1'/0'/0/5", transfers: 1 },
    { path: "m/84'/1'/0'/0/6", transfers: 1 },
    { path: "m/84'/1'/0'/0/8", transfers: 1 },
    { path: "m/84'/1'/0'/0/9", transfers: 1 },
    { path: "m/84'/1'/0'/0/10", transfers: 1 },
    { path: "m/84'/1'/0'/0/11", transfers: 1 }
  ],
  expected: {
    hex: '81000000000101684c965ed8b542a614743b91faa18989dd4ad5bd66a2326a2f648b2602fbdb640000000000fdffffff03a8020000000000001600146a7e3ca88d8f80b0832a25b977766dfdc0fa8d4ba0bb0d00000000000c6a0a0188dea1914b010056005e7d0100000000001600140f8137adebd136ebb5d3c9796e79916ddcff77cb024730440220398e1b0a6508e8fbb44bdd64045a40ef5561f10199e39fdeb81a44a937e6a409022058d1ebc215edc6b855bf3788061051c43f689ad8a3126c059bab8381b3cdff69012103b7eeb47fdd1c2084ef795fac22bf24185e7295d2efa3178b69b6eca409810fba00000000',
    rbf: true,
    version: syscointx.utils.SYSCOIN_TX_VERSION_SYSCOIN_BURN_TO_ALLOCATION,
    numOutputs: 3,
    script: Buffer.from('6a0a0188dea1914b01005600', 'hex'),
    asset: {
      allocation: [{ assetGuid: '2615707979', values: [{ n: 0, value: new BN(900000) }], notarysig: Buffer.from('') }]
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
    ['2615707979', { changeAddress: 'tsys1qjfcltq5yljfzkljxdnlc0ffmhqudz8ltq0z695', outputs: [{ value: new BN(900000), address: 'tsys1qdflre2yd37qtpqe2ykuhwandlhq04r2td2t9ae' }] }]
  ]),
  xpubTokens: [
    { path: "m/84'/1'/0'/0/0", transfers: 1 },
    { path: "m/84'/1'/0'/1/0", transfers: 1 },
    { path: "m/84'/1'/0'/1/2", transfers: 1 },
    { path: "m/84'/1'/0'/1/3", transfers: 1 },
    { path: "m/84'/1'/0'/1/1", transfers: 1 },
    { path: "m/84'/1'/0'/0/4", transfers: 1 },
    { path: "m/84'/1'/0'/0/5", transfers: 1 },
    { path: "m/84'/1'/0'/0/6", transfers: 1 },
    { path: "m/84'/1'/0'/0/8", transfers: 1 },
    { path: "m/84'/1'/0'/0/9", transfers: 1 },
    { path: "m/84'/1'/0'/0/10", transfers: 1 },
    { path: "m/84'/1'/0'/0/11", transfers: 1 }
  ],
  expected: {
    hex: '81000000000101684c965ed8b542a614743b91faa18989dd4ad5bd66a2326a2f648b2602fbdb640000000000fdffffff03a8020000000000001600146a7e3ca88d8f80b0832a25b977766dfdc0fa8d4ba0bb0d0000000000156a130288dea1914b0100560087cabdbd5b01025800047d0100000000001600140f8137adebd136ebb5d3c9796e79916ddcff77cb0247304402202366faaf152d38f777e92edd124a3caa737fa38a7d4cc9709ddb1af41bfa141c02204d1809c6dc358d8bfc422c997c7cb0cbab01f5b54af18f20edb183310fad4e1b012103b7eeb47fdd1c2084ef795fac22bf24185e7295d2efa3178b69b6eca409810fba00000000',
    rbf: true,
    version: syscointx.utils.SYSCOIN_TX_VERSION_SYSCOIN_BURN_TO_ALLOCATION,
    numOutputs: 3,
    script: Buffer.from('6a130288dea1914b0100560087cabdbd5b01025800', 'hex'),
    asset: {
      allocation: [{ assetGuid: '2615707979', values: [{ n: 0, value: new BN(900000) }], notarysig: Buffer.from('') }, { assetGuid: '2305793883', values: [{ n: 2, value: new BN(90000000) }], notarysig: Buffer.from('') }]
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
    ['2615707979', { changeAddress: 'tsys1qjfcltq5yljfzkljxdnlc0ffmhqudz8ltq0z695', outputs: [{ value: new BN(9000000000), address: 'tsys1qdflre2yd37qtpqe2ykuhwandlhq04r2td2t9ae' }] }]
  ]),
  xpubTokens: [
    { path: "m/84'/1'/0'/0/0", transfers: 1 },
    { path: "m/84'/1'/0'/1/0", transfers: 1 },
    { path: "m/84'/1'/0'/1/2", transfers: 1 },
    { path: "m/84'/1'/0'/1/3", transfers: 1 },
    { path: "m/84'/1'/0'/1/1", transfers: 1 },
    { path: "m/84'/1'/0'/0/4", transfers: 1 },
    { path: "m/84'/1'/0'/0/5", transfers: 1 },
    { path: "m/84'/1'/0'/0/6", transfers: 1 },
    { path: "m/84'/1'/0'/0/8", transfers: 1 },
    { path: "m/84'/1'/0'/0/9", transfers: 1 },
    { path: "m/84'/1'/0'/0/10", transfers: 1 },
    { path: "m/84'/1'/0'/0/11", transfers: 1 }
  ],
  expected: {
    hex: '81000000000101684c965ed8b542a614743b91faa18989dd4ad5bd66a2326a2f648b2602fbdb640000000000fdffffff03a8020000000000001600146a7e3ca88d8f80b0832a25b977766dfdc0fa8d4b001a7118020000000e6a0c0188dea1914b02005a025800aac09a3b000000001600149271f58284fc922b7e466cff87a53bb838d11feb02473044022019442852cb6e8874b225f15b781354e984c9a8d1bcf77eaed8c8f6a1ca4e074f02201e5cd2114da920c8d6f2af44259f50e701c7ee16f09ad5339ae5d7e8c25cd5ee012103b7eeb47fdd1c2084ef795fac22bf24185e7295d2efa3178b69b6eca409810fba00000000',
    rbf: true,
    version: syscointx.utils.SYSCOIN_TX_VERSION_SYSCOIN_BURN_TO_ALLOCATION,
    numOutputs: 3,
    script: Buffer.from('6a0c0188dea1914b02005a025800', 'hex'),
    asset: {
      allocation: [{ assetGuid: '2615707979', values: [{ n: 0, value: new BN(9000000000) }, { n: 2, value: new BN(90000000) }], notarysig: Buffer.from('') }]
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
    { path: "m/84'/1'/0'/0/0", transfers: 1 },
    { path: "m/84'/1'/0'/1/0", transfers: 1 },
    { path: "m/84'/1'/0'/1/2", transfers: 1 },
    { path: "m/84'/1'/0'/1/3", transfers: 1 },
    { path: "m/84'/1'/0'/1/1", transfers: 1 },
    { path: "m/84'/1'/0'/0/4", transfers: 1 },
    { path: "m/84'/1'/0'/0/5", transfers: 1 },
    { path: "m/84'/1'/0'/0/6", transfers: 1 },
    { path: "m/84'/1'/0'/0/8", transfers: 1 },
    { path: "m/84'/1'/0'/0/9", transfers: 1 },
    { path: "m/84'/1'/0'/0/10", transfers: 1 },
    { path: "m/84'/1'/0'/0/11", transfers: 1 }
  ],
  expected: {
    hex: '8700000000010264eb3b2b92402ba48a4532a856d2b6a291aedc0742be95bdd9654dddf4365f390100000000ffffffff30c550116b2a1276ea4834ce314a32ead21037da82b96cfb293f6b5b52fe6e380100000000ffffffff0300e1f50500000000160014bd6cfd84d53025c8891862ec49b0036d06405d0f9ea23001000000001600149271f58284fc922b7e466cff87a53bb838d11feb00000000000000000c6a0a0187cabdbd5b0101580002473044022069ccd0088c16fda7d5c2f016855f49216cf97b92dab1e8bfcedde83389a84f0502204e480dbeb0c4b903b931e714593ff5f89bce8aaa084d5ca0acad1099006fb9c2012103c86473f098d9bb69d31a7851372f9ded7b11691a77c253279e987373164b2ad202483045022100eab83ec89289d39ef0da2636f62ec17dbe29a8ffd214a1a0fe48fd4792562527022047eee666fef42895cd4263a7eec928f9e9b0b0426ec238f97254a06b8f971ca4012103c86473f098d9bb69d31a7851372f9ded7b11691a77c253279e987373164b2ad200000000',
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
          endPoint: 'aHR0cHM6Ly90ZXN0LmNvbQ==',
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
    { path: "m/84'/1'/0'/0/0", transfers: 1 },
    { path: "m/84'/1'/0'/1/0", transfers: 1 },
    { path: "m/84'/1'/0'/1/2", transfers: 1 },
    { path: "m/84'/1'/0'/1/3", transfers: 1 },
    { path: "m/84'/1'/0'/1/1", transfers: 1 }
  ],
  expected: {
    hex: '8700000000010235addfbfd1abfcb55234f51b1ecf8e967df9353b87a9bacdba63a5358803f1440000000000fdffffff4629e5a0b015fc8c0585693539c7cc79b27b6afb21d0bf993e182531c236053f0000000000fdffffff03a8020000000000001600148dc01f0d18640370e091198979398466abed8a870000000000000000506a4c4d0188b5aa803802003b0227411f966b65ef1a09aae16339a092faa80a296bd71e2c6ea4e4a640f8e6e49a61b69f6fbde81a777f31aa0b6717c6173ec3752536e531fbeeb691c5f956386293513a88da64ca13000000160014c27fb464acece67abe8e8289a2c9cb2d60cabecd024730440220040a7161634f1fe16d727282bf1e6b1519b56c8c5a688417b2c6707fb6062395022071dd063e76f0959090234443e9539bf7eeb168348875ccd1ec1de9ada7699fb7012103e493f90c55de11c1b3aa3fc13b337807c7c1e121a2767856cfd6946e18c7fcc10247304402203cc2592909d31646414aeef37216440a45c2ab95d89c8851243ddf0e60026b96022040b2ebda82d6492940e130c18c5a84223cda179830c4d66b33f50700758a79fd012103e493f90c55de11c1b3aa3fc13b337807c7c1e121a2767856cfd6946e18c7fcc100000000',
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
          endPoint: 'aHR0cHM6Ly90ZXN0LmNvbQ==',
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
    { path: "m/84'/1'/0'/0/0", transfers: 1 },
    { path: "m/84'/1'/0'/1/0", transfers: 1 },
    { path: "m/84'/1'/0'/1/2", transfers: 1 },
    { path: "m/84'/1'/0'/1/3", transfers: 1 },
    { path: "m/84'/1'/0'/1/1", transfers: 1 }
  ],
  expected: {
    hex: '8700000000010235addfbfd1abfcb55234f51b1ecf8e967df9353b87a9bacdba63a5358803f1440000000000fdffffff4629e5a0b015fc8c0585693539c7cc79b27b6afb21d0bf993e182531c236053f0000000000fdffffff03a8020000000000001600148dc01f0d18640370e091198979398466abed8a870000000000000000506a4c4d0188b5aa803802003b0227411f966b65ef1a09aae16339a092faa80a296bd71e2c6ea4e4a640f8e6e49a61b69f6fbde81a777f31aa0b6717c6173ec3752536e531fbeeb691c5f956386293513a88da64ca13000000160014c27fb464acece67abe8e8289a2c9cb2d60cabecd024730440220040a7161634f1fe16d727282bf1e6b1519b56c8c5a688417b2c6707fb6062395022071dd063e76f0959090234443e9539bf7eeb168348875ccd1ec1de9ada7699fb7012103e493f90c55de11c1b3aa3fc13b337807c7c1e121a2767856cfd6946e18c7fcc10247304402203cc2592909d31646414aeef37216440a45c2ab95d89c8851243ddf0e60026b96022040b2ebda82d6492940e130c18c5a84223cda179830c4d66b33f50700758a79fd012103e493f90c55de11c1b3aa3fc13b337807c7c1e121a2767856cfd6946e18c7fcc100000000',
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
