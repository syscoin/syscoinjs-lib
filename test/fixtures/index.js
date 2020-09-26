var BN = require('bn.js')
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
    hex: '82000000000101b8c0ca9606da799a289b8aa943adca0c11a9bf7481237457a6d20587104510b60000000000ffffffff0200d6117e03000000336a3101b8c0ca960101000008c1045130465586681b7b2264657363223a226348566962476c6a646d46736457553d227d007f00480b65ca130000001600140562b935bea44785c6528948c19e944116e4c4870247304402206218cb9f0f0ef8e853493059fb708297a73a7648d7d3942bf97ffdfc6349a8cc022022f9abbe0882a4c175b1546fa594da5acf45b1e17b927b44c99ecaec974b203f0121032563fbbbbe4d1e551f12d01e213d14830db0ae15a781b9c9ebf7f2fe5786eb2100000000',
    rbf: false,
    numOutputs: 2,
    script: Buffer.from('6a3101b8c0ca960101000008c1045130465586681b7b2264657363223a226348566962476c6a646d46736457553d227d007f00', 'hex'),
    asset: {
      allocation: [{ assetGuid: 2529870008, values: [{ n: 1, value: new BN(0) }], notarysig: Buffer.from('') }],
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
      { txid: 'a7f5c979d8fc80f05d8434e04cb9e46cdaa56551d23dd790ba5d7f2c15f529fd', vout: 1, address: 'tsys1qq43tjdd753rct3jj39yvr855gytwf3y8p5kuf9', path: "m/84'/1'/0'/1/0", value: '84999996550', assetInfo: { assetGuid: 2529870008, value: '0' } }
    ],
    assets: [
      {
        assetGuid: 2529870008,
        decimals: 8,
        pubData: { desc: syscointx.utils.encodeToBase64('publicvalue') },
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 127,
        totalSupply: '10000000000',
        maxSupply: '100000000000'
      }
    ]
  },
  assetGuid: 2529870008,
  assetOpts: { updatecapabilityflags: 123, contract: Buffer.from('2b1e58b979e4b2d72d8bca5bb4646ccc032ddbfc', 'hex'), description: 'new publicvalue' },
  sysChangeAddress: 'tsys1qt8aq6hrrlc6ueps4wqc6ynfckrxxrw20ydamc9',
  xpubTokens: [
    { path: "m/84'/1'/0'/0/0" },
    { path: "m/84'/1'/0'/1/0" }
  ],
  expected: {
    hex: '83000000000101fd29f5152c7f5dba90d73dd25165a5da6ce4b94ce034845df080fcd879c9f5a70100000000fdffffff020000000000000000626a4c5f01b8c0ca96010100000843142b1e58b979e4b2d72d8bca5bb4646ccc032ddbfc001f7b2264657363223a22626d563349484231596d787059335a686248566c227d1b7b2264657363223a226348566962476c6a646d46736457553d227d7b7ff8fb64ca1300000016001459fa0d5c63fe35cc86157031a24d38b0cc61b94f0247304402207993dd051edf097dbc288deb52fae9b41ba2b9bbab9a8a33b28b0be35fe9544802205bf15761028ca56e83cd7493879f255cc909d53cbefb0618725aac6079677b69012103e4d8568a37e0afb8f220178b640454e91c9e9e7e2425be9e43142a7c3140e2e900000000',
    rbf: true,
    numOutputs: 2,
    script: Buffer.from('6a4c5f01b8c0ca96010100000843142b1e58b979e4b2d72d8bca5bb4646ccc032ddbfc001f7b2264657363223a22626d563349484231596d787059335a686248566c227d1b7b2264657363223a226348566962476c6a646d46736457553d227d7b7f', 'hex'),
    asset: {
      allocation: [{ assetGuid: 2529870008, values: [{ n: 1, value: new BN(0) }], notarysig: Buffer.from('') }],
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
      { txid: '90652f37eeb24374d8cfef5b73ac4c10e31fb54ac864e0d9f8250af76985eb9d', vout: 1, address: 'tsys1qt8aq6hrrlc6ueps4wqc6ynfckrxxrw20ydamc9', path: "m/84'/1'/0'/1/2", value: '84999992600', assetInfo: { assetGuid: 2529870008, value: '0' } }
    ],
    assets: [
      {
        assetGuid: 2529870008,
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
    [2529870008, { outputs: [{ value: new BN(1000000000), address: 'tsys1qsvcfskmtg0rlh03v2aazvhqj3r7gkqnzaej258' }] }]
  ]),
  xpubTokens: [
    { path: "m/84'/1'/0'/0/0" },
    { path: "m/84'/1'/0'/1/0" },
    { path: "m/84'/1'/0'/1/2" }
  ],
  expected: {
    hex: '840000000001019deb8569f70a25f8d9e064c84ab51fe3104cac735befcfd87443b2ee372f65900100000000ffffffff03b2020000000000001600148330985b6b43c7fbbe2c577a265c1288fc8b026200000000000000000d6a0b01b8c0ca9602000a020000f4eb64ca130000001600140f8137adebd136ebb5d3c9796e79916ddcff77cb0247304402206ed5a22165ef9652108aba8e156d13344f804dbc0abec1db5f5016e58ff2b011022051a529edd784ec9b02c211302ba5a1c8dc4111bcc51d432adeec739cdb962d2b012102f249cb8576b8d9c6f0d45bb3ab3b73654911b724f229ec0a5a2f45785e1e47c900000000',
    rbf: false,
    numOutputs: 3,
    script: Buffer.from('6a0b01b8c0ca9602000a020000', 'hex'),
    asset: {
      allocation: [{ assetGuid: 2529870008, values: [{ n: 0, value: new BN(1000000000) }, { n: 2, value: new BN(0) }], notarysig: Buffer.from('') }]
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
      { txid: '44f1038835a563bacdbaa9873b35f97d968ecf1e1bf53452b5fcabd1bfdfad35', vout: 0, address: 'tsys1qsgtj3pujwgfgakjjen94j3g9wmw95l837srurc', path: "m/84'/1'/0'/1/3", value: '980', assetInfo: { assetGuid: 2529870008, value: '1000000000' } },
      { txid: '3f0536c23125183e99bfd021fb6a7bb279ccc739356985058cfc15b0a0e52946', vout: 0, address: 'tsys1qp7qn0t0t6ymwhdwne9uku7v3dhw07a7tra8hzl', path: "m/84'/1'/0'/1/1", value: '84999988550' }
    ],
    assets: [
      {
        assetGuid: 2529870008,
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
    [2529870008, { changeAddress: 'tsys1qcflmge9vann8405ws2y69jwt94sv40kd7rqexs', outputs: [{ value: new BN(600000000), address: 'tsys1q3hqp7rgcvsphpcy3rxyhjwvyv647mz58peqctz' }] }]
  ]),
  xpubTokens: [
    { path: "m/84'/1'/0'/0/0" },
    { path: "m/84'/1'/0'/1/0" },
    { path: "m/84'/1'/0'/1/2" },
    { path: "m/84'/1'/0'/1/3" },
    { path: "m/84'/1'/0'/1/1" }
  ],
  expected: {
    hex: '8700000000010235addfbfd1abfcb55234f51b1ecf8e967df9353b87a9bacdba63a5358803f1440000000000fdffffff4629e5a0b015fc8c0585693539c7cc79b27b6afb21d0bf993e182531c236053f0000000000fdffffff03b2020000000000001600148dc01f0d18640370e091198979398466abed8a8700000000000000000d6a0b01b8c0ca9602003b02270044dd64ca13000000160014c27fb464acece67abe8e8289a2c9cb2d60cabecd02483045022100bddb1d84ca553fac2d334a13c3850b6ed304d83edc018dc47f18d33cbd935461022040b0143eff121ddb42df323395fe2b958489b8a9b8cadf3424e8e34e4af12515012103e493f90c55de11c1b3aa3fc13b337807c7c1e121a2767856cfd6946e18c7fcc102483045022100ac9641d4a5e2537d78c04ab6f5ad632eea39f7a56d1ec29eb3d2f9ffc8f176e102203016a43d7e504cfa9a7ef5e9182860421ed713870e30106dd3c457ed8d94da2c012102e58139f9d633d5d1d76feb87fc2c44705cc317e83ade1a812f8d2a4ae7be9cb500000000',
    rbf: true,
    numOutputs: 3,
    script: Buffer.from('6a0b01b8c0ca9602003b022700', 'hex'),
    asset: {
      allocation: [{ assetGuid: 2529870008, values: [{ n: 0, value: new BN(600000000) }, { n: 2, value: new BN(400000000) }], notarysig: Buffer.from('') }]
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
      { txid: '61b28c96c9e02a63206799c7928f0a10da7f32196a0105f5a414a223db674c23', vout: 0, address: 'tsys1qdflre2yd37qtpqe2ykuhwandlhq04r2td2t9ae', path: "m/84'/1'/0'/1/13", value: '690', assetInfo: { assetGuid: 1521018962, value: '1000' } },
      { txid: '61b28c96c9e02a63206799c7928f0a10da7f32196a0105f5a414a223db674c23', vout: 2, address: 'tsys1qt8aq6hrrlc6ueps4wqc6ynfckrxxrw20ydamc9', path: "m/84'/1'/0'/1/2", value: '11984999987590', assetInfo: { assetGuid: 1521018962, value: '0' } }
    ],
    assets: [
      {
        assetGuid: 1521018962,
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
    [1521018962, { changeAddress: 'tsys1ql97jxj6fr3jd85e50423ava3495nhzwe4axyad', outputs: [{ value: new BN(10), address: 'tsys1qdflre2yd37qtpqe2ykuhwandlhq04r2td2t9ae' }] }]
  ]),
  xpubTokens: [
    { path: "m/84'/1'/0'/0/0" },
    { path: "m/84'/1'/0'/1/0" },
    { path: "m/84'/1'/0'/1/2" },
    { path: "m/84'/1'/0'/1/13" },
    { path: "m/84'/1'/0'/1/1" }
  ],
  expected: {
    hex: '87000000000102234c67db23a214a4f505016a19327fda100a8f92c7996720632ae0c9968cb2610000000000fdffffff234c67db23a214a4f505016a19327fda100a8f92c7996720632ae0c9968cb2610200000000fdffffff04b2020000000000001600146a7e3ca88d8f80b0832a25b977766dfdc0fa8d4b0000000000000000106a0e0152e8a85a03000202857c0300005cacaa79e60a0000160014f97d234b491c64d3d3347d551eb3b1a9693b89d9b202000000000000160014f97d234b491c64d3d3347d551eb3b1a9693b89d902483045022100d4a77d03ab263303426b3b5c48d36dd2e12b1ca4838f1198259e644719209b4e02204ac7f4bcc330481d28884031ab2f7e7bd65bb4a8cdaf96504d4f01427bbc79d001210341e88f7fd83e582b8c673149b25d3879926e0490df8cd9c530560feb536a7fa202473044022047f85c5a17ed08984b191a2402391b048438aec422d0c6373e5928e5eddd1d51022056229f3605de16f2b71e46c9861b31bdca404a0e4c8ce2be46fba8882b20ea80012102f249cb8576b8d9c6f0d45bb3ab3b73654911b724f229ec0a5a2f45785e1e47c900000000',
    rbf: true,
    numOutputs: 4,
    script: Buffer.from('6a0e0152e8a85a03000202857c030000', 'hex'),
    asset: {
      allocation: [{ assetGuid: 1521018962, values: [{ n: 0, value: new BN(10) }, { n: 2, value: new BN(990) }, { n: 3, value: new BN(0) }], notarysig: Buffer.from('') }]
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
      { txid: 'c5c2af64e6f8d0732b2250416eecc063f22161b9cd14eda802c97ed518d173e0', vout: 0, address: 'tsys1qarxqg2nuja4tqp5v7rj0etjggh2pwa98ur30gw', path: "m/84'/1'/0'/0/4", value: '980', assetInfo: { assetGuid: 2369540753, value: '100000000' } },
      { txid: '4fdab120b984f7bcf0c9458f9783ec0b3169a292de7e40a2612db1f7d4fd6efb', vout: 0, address: 'tsys1qjfcltq5yljfzkljxdnlc0ffmhqudz8ltq0z695', path: "m/84'/1'/0'/0/5", value: '980', assetInfo: { assetGuid: 650700076, value: '200000000' } },
      { txid: '931dbdcd8098918e306c43c2f9ee9a6c2fac4c06190a669809c83f3a48f7b522', vout: 0, address: 'tsys1qyj99y8u9vxhc7u6apa0x6yl5z9m7ggaanqlmzk', path: "m/84'/1'/0'/0/6", value: '980', assetInfo: { assetGuid: 2699372871, value: '300000000' } },
      { txid: '66d6841bef92b91344f793bbd43b2cd139e9da4b82b6f13e9e967cf793c384e1', vout: 0, address: 'tsys1qwmwuw69e4c3wyez76xskrjlpek0v2thmkf6584', path: "m/84'/1'/0'/0/11", value: 294, assetInfo: { assetGuid: 402223530, value: '400000000' } }, // m/84'/1'/0'/0/7 had some kind of collision the pub/priv key didn't match between js and core
      { txid: '212680579797d8bf19a2c4bbde5fb7f35296b82ed02c7d0a22281d1d2a47edf2', vout: 0, address: 'tsys1qwvn92ygjm5ff73utfgl7f74cp8rlktgvhtxmgm', path: "m/84'/1'/0'/0/8", value: '980', assetInfo: { assetGuid: 1537060536, value: '500000000' } },
      { txid: '57219dc0fd292caa06c54e1af6125323181a4c86921442e6d508275b30086682', vout: 0, address: 'tsys1qgylgl55m9an3kczce86shagml9cjwnjny3slu5', path: "m/84'/1'/0'/0/9", value: '980', assetInfo: { assetGuid: 2305793883, value: '600000000' } },
      { txid: 'c8a2159c47a5af4251b0576ce22d859996f9e9fbfffc804a9bd745848fe3d642', vout: 0, address: 'tsys1qh4k0mpx4xqju3zgcvtkynvqrd5ryqhg0yr9uk8', path: "m/84'/1'/0'/0/10", value: '100000000' }
    ],
    assets: [
      {
        assetGuid: 2369540753,
        decimals: 8,
        pubData: { desc: syscointx.utils.encodeToBase64('publicvalue') },
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 127,
        totalSupply: '0',
        maxSupply: '100000000000',
        notaryKeyID: '5f57a028945f5b5ba2aef4fd2b512063e785dcf5', // keyid for tsys1qtat6q2y5tad4hg4w7n7jk5fqv0ncth84puexca (m/84’/1’/0’/0/3)
        notaryDetails: {
          endPoint: 'https://test.com',
          instantTransfers: 0,
          HDRequired: 1
        },
        // for unit test only, this normally wouldn't come in payload
        notarySig: syscointx.utils.decodeFromBase64ToHex('H5ZrZe8aCarhYzmgkvqoCilr1x4sbqTkpkD45uSaYbafb73oGnd/MaoLZxfGFz7DdSU25TH77raRxflWOGKTUTo=')
      },
      {
        assetGuid: 650700076,
        decimals: 8,
        pubData: { desc: syscointx.utils.encodeToBase64('publicvalue') },
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 127,
        totalSupply: '0',
        maxSupply: '100000000000',
        notaryKeyID: '5f57a028945f5b5ba2aef4fd2b512063e785dcf5',
        notaryDetails: {
          endPoint: 'https://test.com',
          instantTransfers: 0,
          HDRequired: 1
        },
        notarySig: syscointx.utils.decodeFromBase64ToHex('IBdEHC3NeRiitPNXO0kXNauwzeLL/HK3VvusKanpx/PENy22LOzi/cLAKyZIL0N96ffCAmkePVkxnw0pS4nuAbM=')
      },
      {
        assetGuid: 2699372871,
        decimals: 8,
        pubData: { desc: syscointx.utils.encodeToBase64('publicvalue') },
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 127,
        totalSupply: '0',
        maxSupply: '100000000000',
        notaryKeyID: '5f57a028945f5b5ba2aef4fd2b512063e785dcf5',
        notaryDetails: {
          endPoint: 'https://test.com',
          instantTransfers: 0,
          HDRequired: 1
        },
        notarySig: syscointx.utils.decodeFromBase64ToHex('H2N6qBi/BZgS1FyvYMvIYekeyabZCk2xwQbIf7SCQRYkf+YLAKEu/aY9oiVlihuGIBNVZXeL/nduYzCTpmA7XgE=')
      },
      {
        assetGuid: 402223530,
        decimals: 8,
        pubData: { desc: syscointx.utils.encodeToBase64('publicvalue') },
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 127,
        totalSupply: '0',
        maxSupply: '100000000000',
        notaryKeyID: '5f57a028945f5b5ba2aef4fd2b512063e785dcf5',
        notaryDetails: {
          endPoint: 'https://test.com',
          instantTransfers: 0,
          HDRequired: 1
        },
        notarySig: syscointx.utils.decodeFromBase64ToHex('IOKXQEHh4+jz6zICP5KA4g54wL1Tx+6UpY0SoMwtO4glL3jVYsRMWas92OP0pVRQ2Qa5lBlxLqCEeCAqdc+wsz0=')
      },
      {
        assetGuid: 1537060536,
        decimals: 8,
        pubData: { desc: syscointx.utils.encodeToBase64('publicvalue') },
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 127,
        totalSupply: '0',
        maxSupply: '100000000000',
        notaryKeyID: '5f57a028945f5b5ba2aef4fd2b512063e785dcf5',
        notaryDetails: {
          endPoint: 'https://test.com',
          instantTransfers: 0,
          HDRequired: 1
        },
        notarySig: syscointx.utils.decodeFromBase64ToHex('H5zJsmzAuqY8czH2yx4viw2jQjapfgY/8gO4mQroB4e/Y8DWEBerH1CRnNbefPNPt0RwU22D8rzMx13irZpA1xw=')
      },
      {
        assetGuid: 2305793883,
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
    [2369540753, { changeAddress: 'tsys1qarxqg2nuja4tqp5v7rj0etjggh2pwa98ur30gw', outputs: [{ value: new BN(50000000), address: 'tsys1qarxqg2nuja4tqp5v7rj0etjggh2pwa98ur30gw' }, { value: new BN(50000000), address: 'tsys1qarxqg2nuja4tqp5v7rj0etjggh2pwa98ur30gw' }] }],
    [650700076, { changeAddress: 'tsys1qjfcltq5yljfzkljxdnlc0ffmhqudz8ltq0z695', outputs: [{ value: new BN(200000000), address: 'tsys1qjfcltq5yljfzkljxdnlc0ffmhqudz8ltq0z695' }] }],
    [2699372871, { changeAddress: 'tsys1qyj99y8u9vxhc7u6apa0x6yl5z9m7ggaanqlmzk', outputs: [{ value: new BN(250000000), address: 'tsys1qyj99y8u9vxhc7u6apa0x6yl5z9m7ggaanqlmzk' }] }],
    [402223530, { changeAddress: 'tsys1qtqwylszrnxrtwcd4zy8ws6nqlrzk8a7282uehx', outputs: [{ value: new BN(300000000), address: 'tsys1qtqwylszrnxrtwcd4zy8ws6nqlrzk8a7282uehx' }] }],
    [1537060536, { changeAddress: 'tsys1qwvn92ygjm5ff73utfgl7f74cp8rlktgvhtxmgm', outputs: [{ value: new BN(350000000), address: 'tsys1qwvn92ygjm5ff73utfgl7f74cp8rlktgvhtxmgm' }] }],
    [2305793883, { changeAddress: 'tsys1qgylgl55m9an3kczce86shagml9cjwnjny3slu5', outputs: [{ value: new BN(500000000), address: 'tsys1qgylgl55m9an3kczce86shagml9cjwnjny3slu5' }] }]
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
    hex: '87000000000107e073d118d57ec902a8ed14cdb96121f263c0ec6e4150222b73d0f8e664afc2c50000000000fdfffffffb6efdd4f7b12d61a2407ede92a269310bec83978f45c9f0bcf784b920b1da4f0000000000fdffffff22b5f7483a3fc80998660a19064cac2f6c9aeef9c2436c308e919880cdbd1d930000000000fdffffffe184c393f77c969e3ef1b6824bdae939d12c3bd4bb93f74413b992ef1b84d6660000000000fdfffffff2ed472a1d1d28220a7d2cd02eb89652f3b75fdebbc4a219bfd89797578026210000000000fdffffff826608305b2708d5e6421492864c1a18235312f61a4ec506aa2c29fdc09d21570000000000fdffffff42d6e38f8445d79b4a80fcfffbe9f99699852de26c57b05142afa5479c15a2c80000000000fdffffff0cb202000000000000160014e8cc042a7c976ab0068cf0e4fcae4845d41774a7b2020000000000001600149271f58284fc922b7e466cff87a53bb838d11febb202000000000000160014248a521f8561af8f735d0f5e6d13f41177e423bdb202000000000000160014248a521f8561af8f735d0f5e6d13f41177e423bdb202000000000000160014581c4fc0439986b761b5110ee86a60f8c563f7cab202000000000000160014581c4fc0439986b761b5110ee86a60f8c563f7cab2020000000000001600147326551112dd129f478b4a3fe4fab809c7fb2d0cb2020000000000001600147326551112dd129f478b4a3fe4fab809c7fb2d0cb202000000000000160014413e8fd29b2f671b6058c9f50bf51bf971274e53b202000000000000160014413e8fd29b2f671b6058c9f50bf51bf971274e530000000000000000fd87016a4d83010691523c8d020b300030411f966b65ef1a09aae16339a092faa80a296bd71e2c6ea4e4a640f8e6e49a61b69f6fbde81a777f31aa0b6717c6173ec3752536e531fbeeb691c5f956386293513a2ce5c826010113412017441c2dcd7918a2b4f3573b491735abb0cde2cbfc72b756fbac29a9e9c7f3c4372db62cece2fdc2c02b26482f437de9f7c202691e3d59319f0d294b89ee01b34729e5a0020280640330411f637aa818bf059812d45caf60cbc861e91ec9a6d90a4db1c106c87fb4824116247fe60b00a12efda63da225658a1b8620135565778bfe776e633093a6603b5e01aa71f91702041d05094120e2974041e1e3e8f3eb32023f9280e20e78c0bd53c7ee94a58d12a0cc2d3b88252f78d562c44c59ab3dd8e3f4a55450d906b99419712ea08478202a75cfb0b33db8ae9d5b0206813e07800a411f9cc9b26cc0baa63c7331f6cb1e2f8b0da34236a97e063ff203b8990ae80787bf63c0d61017ab1f50919cd6de7cf34fb74470536d83f2bcccc75de2ad9a40d71c5b9f6f890208310909000eaaf50500000000160014e8cc042a7c976ab0068cf0e4fcae4845d41774a70247304402207ac593f29c834b97638b9d2e637ce9ed7594b445ea8471c14ef9955f5a783955022020ac4a4af05a20516355ebd2afdd3755b008eebaf69014120f96b2fbf9973f4f01210281c11974da83e7d9ff9f47a3c32e3baa7975b5127eb447b86a2f7fd4c9d12fec024830450221009f848996a987d07826949734afce83d609f72a84bd8e02102c71445a1dea511902207acb080a54476b574bdf60be1a78b372131c8cc23158cc3af4847731c6b6e2b9012103c86473f098d9bb69d31a7851372f9ded7b11691a77c253279e987373164b2ad202483045022100f8c047245dd8db17d01247cf030f1583a06031215c04282b46c0f08939ca4ce0022003dcae1d3eb417f43ca63d65825ad88763d53462f3e072adf35099d8594295c0012102f165ced59862353282a8fd32ac10d018c4bc449e6dabc77a7d810ca2be6f69fd024730440220265cf9904e067f4b1b5023e06dcc667a9ef98e0cc1bf317176b321b01aa4f38e02203b7f8a876e123fef3638d213da40bf9bf9a6cdfab510d64a222e51ae907eea190121025eea502cd2da208247cdd27701a2efea1e64aebf7c476362c1a6c0d1416c25f302483045022100913ce9676097bcb785c7a70ad61a4cfa83d23979e79d7f6500514d915b167a9702207496293265166e2369e3891ff0a4159df2b7c22a9b2f5b6f3d66e4e1ada33a3a012102ccb8a1b346388ff9691d6ee1b2019956e93e5550130cbfe2e866477193b22a3f0247304402206ed12293509b68c174c96593a1b63074cf50424133fbba6f67c92eed7f65bbc702206942dfdec2318c86eb21a0f7ffd21bafc4e9d2285dc5dbb0bdf96e0c413d0698012102b7d4e03f4230eb2406328be6bf9dbd400083b929c07a4b0b3601589b3243067402483045022100ceabebae03014c9740d31fbbabd8dfe296067167a1bb06dc28aea2f5e6bc48b502205319cdd42076daaf8aa189be0988e106fea0c434573377a9d19c4875a11573b3012103b7eeb47fdd1c2084ef795fac22bf24185e7295d2efa3178b69b6eca409810fba00000000',
    rbf: true,
    numOutputs: 12,
    script: Buffer.from('6a4d83010691523c8d020b300030411f966b65ef1a09aae16339a092faa80a296bd71e2c6ea4e4a640f8e6e49a61b69f6fbde81a777f31aa0b6717c6173ec3752536e531fbeeb691c5f956386293513a2ce5c826010113412017441c2dcd7918a2b4f3573b491735abb0cde2cbfc72b756fbac29a9e9c7f3c4372db62cece2fdc2c02b26482f437de9f7c202691e3d59319f0d294b89ee01b34729e5a0020280640330411f637aa818bf059812d45caf60cbc861e91ec9a6d90a4db1c106c87fb4824116247fe60b00a12efda63da225658a1b8620135565778bfe776e633093a6603b5e01aa71f91702041d05094120e2974041e1e3e8f3eb32023f9280e20e78c0bd53c7ee94a58d12a0cc2d3b88252f78d562c44c59ab3dd8e3f4a55450d906b99419712ea08478202a75cfb0b33db8ae9d5b0206813e07800a411f9cc9b26cc0baa63c7331f6cb1e2f8b0da34236a97e063ff203b8990ae80787bf63c0d61017ab1f50919cd6de7cf34fb74470536d83f2bcccc75de2ad9a40d71c5b9f6f89020831090900', 'hex'),
    asset: {
      allocation: [{ assetGuid: 2369540753, values: [{ n: 11, value: new BN(50000000) }, { n: 0, value: new BN(50000000) }], notarysig: Buffer.from('H5ZrZe8aCarhYzmgkvqoCilr1x4sbqTkpkD45uSaYbafb73oGnd/MaoLZxfGFz7DdSU25TH77raRxflWOGKTUTo=', 'base64') },
        { assetGuid: 650700076, values: [{ n: 1, value: new BN(200000000) }], notarysig: Buffer.from('IBdEHC3NeRiitPNXO0kXNauwzeLL/HK3VvusKanpx/PENy22LOzi/cLAKyZIL0N96ffCAmkePVkxnw0pS4nuAbM=', 'base64') },
        { assetGuid: 2699372871, values: [{ n: 2, value: new BN(250000000) }, { n: 3, value: new BN(50000000) }], notarysig: Buffer.from('H2N6qBi/BZgS1FyvYMvIYekeyabZCk2xwQbIf7SCQRYkf+YLAKEu/aY9oiVlihuGIBNVZXeL/nduYzCTpmA7XgE=', 'base64') },
        { assetGuid: 402223530, values: [{ n: 4, value: new BN(300000000) }, { n: 5, value: new BN(100000000) }], notarysig: Buffer.from('IOKXQEHh4+jz6zICP5KA4g54wL1Tx+6UpY0SoMwtO4glL3jVYsRMWas92OP0pVRQ2Qa5lBlxLqCEeCAqdc+wsz0=', 'base64') },
        { assetGuid: 1537060536, values: [{ n: 6, value: new BN(350000000) }, { n: 7, value: new BN(150000000) }], notarysig: Buffer.from('H5zJsmzAuqY8czH2yx4viw2jQjapfgY/8gO4mQroB4e/Y8DWEBerH1CRnNbefPNPt0RwU22D8rzMx13irZpA1xw=', 'base64') },
        { assetGuid: 2305793883, values: [{ n: 8, value: new BN(500000000) }, { n: 9, value: new BN(100000000) }], notarysig: Buffer.from('') }]
    },
    receivingIndex: 11,
    changeIndex: 3
  }
},
{
  description: 'send multi asset allocations (varied sys values) with notarization',
  version: syscointx.utils.SYSCOIN_TX_VERSION_ALLOCATION_SEND,
  txOpts: {
    rbf: true // don't use zdag as size of tx is large
  },
  mnemonic: 'club toss element melody skin ship rifle student reason real interest insane elevator beauty movie',
  feeRate: new BN(10),
  utxoObj: {
    utxos: [
      { txid: 'c5c2af64e6f8d0732b2250416eecc063f22161b9cd14eda802c97ed518d173e0', vout: 0, address: 'tsys1qarxqg2nuja4tqp5v7rj0etjggh2pwa98ur30gw', path: "m/84'/1'/0'/0/4", value: '9800', assetInfo: { assetGuid: 2369540753, value: '100000000' } },
      { txid: '4fdab120b984f7bcf0c9458f9783ec0b3169a292de7e40a2612db1f7d4fd6efb', vout: 0, address: 'tsys1qjfcltq5yljfzkljxdnlc0ffmhqudz8ltq0z695', path: "m/84'/1'/0'/0/5", value: '9800', assetInfo: { assetGuid: 650700076, value: '200000000' } },
      { txid: '931dbdcd8098918e306c43c2f9ee9a6c2fac4c06190a669809c83f3a48f7b522', vout: 0, address: 'tsys1qyj99y8u9vxhc7u6apa0x6yl5z9m7ggaanqlmzk', path: "m/84'/1'/0'/0/6", value: '980', assetInfo: { assetGuid: 2699372871, value: '300000000' } },
      { txid: '66d6841bef92b91344f793bbd43b2cd139e9da4b82b6f13e9e967cf793c384e1', vout: 0, address: 'tsys1qwmwuw69e4c3wyez76xskrjlpek0v2thmkf6584', path: "m/84'/1'/0'/0/11", value: '294', assetInfo: { assetGuid: 402223530, value: '400000000' } }, // m/84'/1'/0'/0/7 had some kind of collision the pub/priv key didn't match between js and core
      { txid: '212680579797d8bf19a2c4bbde5fb7f35296b82ed02c7d0a22281d1d2a47edf2', vout: 0, address: 'tsys1qwvn92ygjm5ff73utfgl7f74cp8rlktgvhtxmgm', path: "m/84'/1'/0'/0/8", value: '9800', assetInfo: { assetGuid: 1537060536, value: '500000000' } },
      { txid: '57219dc0fd292caa06c54e1af6125323181a4c86921442e6d508275b30086682', vout: 0, address: 'tsys1qgylgl55m9an3kczce86shagml9cjwnjny3slu5', path: "m/84'/1'/0'/0/9", value: '980', assetInfo: { assetGuid: 2305793883, value: '600000000' } }
    ],
    assets: [
      {
        assetGuid: 2369540753,
        decimals: 8,
        pubData: { desc: syscointx.utils.encodeToBase64('publicvalue') },
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 127,
        totalSupply: '0',
        maxSupply: '100000000000',
        notaryKeyID: '5f57a028945f5b5ba2aef4fd2b512063e785dcf5', // keyid for tsys1qtat6q2y5tad4hg4w7n7jk5fqv0ncth84puexca (m/84’/1’/0’/0/3)
        notaryDetails: {
          endPoint: 'https://test.com',
          instantTransfers: 0,
          HDRequired: 1
        },
        // for unit test only, this normally wouldn't come in payload
        notarySig: syscointx.utils.decodeFromBase64ToHex('H5ZrZe8aCarhYzmgkvqoCilr1x4sbqTkpkD45uSaYbafb73oGnd/MaoLZxfGFz7DdSU25TH77raRxflWOGKTUTo=')
      },
      {
        assetGuid: 650700076,
        decimals: 8,
        pubData: { desc: syscointx.utils.encodeToBase64('publicvalue') },
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 127,
        totalSupply: '0',
        maxSupply: '100000000000',
        notaryKeyID: '5f57a028945f5b5ba2aef4fd2b512063e785dcf5',
        notaryDetails: {
          endPoint: 'https://test.com',
          instantTransfers: 0,
          HDRequired: 1
        },
        notarySig: syscointx.utils.decodeFromBase64ToHex('IBdEHC3NeRiitPNXO0kXNauwzeLL/HK3VvusKanpx/PENy22LOzi/cLAKyZIL0N96ffCAmkePVkxnw0pS4nuAbM=')
      },
      {
        assetGuid: 2699372871,
        decimals: 8,
        pubData: { desc: syscointx.utils.encodeToBase64('publicvalue') },
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 127,
        totalSupply: '0',
        maxSupply: '100000000000',
        notaryKeyID: '5f57a028945f5b5ba2aef4fd2b512063e785dcf5',
        notaryDetails: {
          endPoint: 'https://test.com',
          instantTransfers: 0,
          HDRequired: 1
        },
        notarySig: syscointx.utils.decodeFromBase64ToHex('H2N6qBi/BZgS1FyvYMvIYekeyabZCk2xwQbIf7SCQRYkf+YLAKEu/aY9oiVlihuGIBNVZXeL/nduYzCTpmA7XgE=')
      },
      {
        assetGuid: 402223530,
        decimals: 8,
        pubData: { desc: syscointx.utils.encodeToBase64('publicvalue') },
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 127,
        totalSupply: '0',
        maxSupply: '100000000000',
        notaryKeyID: '5f57a028945f5b5ba2aef4fd2b512063e785dcf5',
        notaryDetails: {
          endPoint: 'https://test.com',
          instantTransfers: 0,
          HDRequired: 1
        },
        notarySig: syscointx.utils.decodeFromBase64ToHex('IOKXQEHh4+jz6zICP5KA4g54wL1Tx+6UpY0SoMwtO4glL3jVYsRMWas92OP0pVRQ2Qa5lBlxLqCEeCAqdc+wsz0=')
      },
      {
        assetGuid: 1537060536,
        decimals: 8,
        pubData: { desc: syscointx.utils.encodeToBase64('publicvalue') },
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 127,
        totalSupply: '0',
        maxSupply: '100000000000',
        notaryKeyID: '5f57a028945f5b5ba2aef4fd2b512063e785dcf5',
        notaryDetails: {
          endPoint: 'https://test.com',
          instantTransfers: 0,
          HDRequired: 1
        },
        notarySig: syscointx.utils.decodeFromBase64ToHex('H5zJsmzAuqY8czH2yx4viw2jQjapfgY/8gO4mQroB4e/Y8DWEBerH1CRnNbefPNPt0RwU22D8rzMx13irZpA1xw=')
      },
      {
        assetGuid: 2305793883,
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
    [2369540753, { changeAddress: 'tsys1qarxqg2nuja4tqp5v7rj0etjggh2pwa98ur30gw', outputs: [{ value: new BN(50000000), address: 'tsys1qarxqg2nuja4tqp5v7rj0etjggh2pwa98ur30gw' }, { value: new BN(50000000), address: 'tsys1qarxqg2nuja4tqp5v7rj0etjggh2pwa98ur30gw' }] }],
    [650700076, { changeAddress: 'tsys1qjfcltq5yljfzkljxdnlc0ffmhqudz8ltq0z695', outputs: [{ value: new BN(200000000), address: 'tsys1qjfcltq5yljfzkljxdnlc0ffmhqudz8ltq0z695' }] }],
    [2699372871, { changeAddress: 'tsys1qyj99y8u9vxhc7u6apa0x6yl5z9m7ggaanqlmzk', outputs: [{ value: new BN(250000000), address: 'tsys1qyj99y8u9vxhc7u6apa0x6yl5z9m7ggaanqlmzk' }] }],
    [402223530, { changeAddress: 'tsys1qtqwylszrnxrtwcd4zy8ws6nqlrzk8a7282uehx', outputs: [{ value: new BN(300000000), address: 'tsys1qtqwylszrnxrtwcd4zy8ws6nqlrzk8a7282uehx' }] }],
    [1537060536, { changeAddress: 'tsys1qwvn92ygjm5ff73utfgl7f74cp8rlktgvhtxmgm', outputs: [{ value: new BN(350000000), address: 'tsys1qwvn92ygjm5ff73utfgl7f74cp8rlktgvhtxmgm' }] }],
    [2305793883, { changeAddress: 'tsys1qgylgl55m9an3kczce86shagml9cjwnjny3slu5', outputs: [{ value: new BN(500000000), address: 'tsys1qgylgl55m9an3kczce86shagml9cjwnjny3slu5' }] }]
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
    hex: '87000000000106e073d118d57ec902a8ed14cdb96121f263c0ec6e4150222b73d0f8e664afc2c50000000000fdfffffffb6efdd4f7b12d61a2407ede92a269310bec83978f45c9f0bcf784b920b1da4f0000000000fdffffff22b5f7483a3fc80998660a19064cac2f6c9aeef9c2436c308e919880cdbd1d930000000000fdffffffe184c393f77c969e3ef1b6824bdae939d12c3bd4bb93f74413b992ef1b84d6660000000000fdfffffff2ed472a1d1d28220a7d2cd02eb89652f3b75fdebbc4a219bfd89797578026210000000000fdffffff826608305b2708d5e6421492864c1a18235312f61a4ec506aa2c29fdc09d21570000000000fdffffff0cb202000000000000160014e8cc042a7c976ab0068cf0e4fcae4845d41774a7b2020000000000001600149271f58284fc922b7e466cff87a53bb838d11febb202000000000000160014248a521f8561af8f735d0f5e6d13f41177e423bdb202000000000000160014248a521f8561af8f735d0f5e6d13f41177e423bdb202000000000000160014581c4fc0439986b761b5110ee86a60f8c563f7cab202000000000000160014581c4fc0439986b761b5110ee86a60f8c563f7cab2020000000000001600147326551112dd129f478b4a3fe4fab809c7fb2d0cb2020000000000001600147326551112dd129f478b4a3fe4fab809c7fb2d0cb202000000000000160014413e8fd29b2f671b6058c9f50bf51bf971274e53b202000000000000160014413e8fd29b2f671b6058c9f50bf51bf971274e530000000000000000fd87016a4d83010691523c8d020b300030411f966b65ef1a09aae16339a092faa80a296bd71e2c6ea4e4a640f8e6e49a61b69f6fbde81a777f31aa0b6717c6173ec3752536e531fbeeb691c5f956386293513a2ce5c826010113412017441c2dcd7918a2b4f3573b491735abb0cde2cbfc72b756fbac29a9e9c7f3c4372db62cece2fdc2c02b26482f437de9f7c202691e3d59319f0d294b89ee01b34729e5a0020280640330411f637aa818bf059812d45caf60cbc861e91ec9a6d90a4db1c106c87fb4824116247fe60b00a12efda63da225658a1b8620135565778bfe776e633093a6603b5e01aa71f91702041d05094120e2974041e1e3e8f3eb32023f9280e20e78c0bd53c7ee94a58d12a0cc2d3b88252f78d562c44c59ab3dd8e3f4a55450d906b99419712ea08478202a75cfb0b33db8ae9d5b0206813e07800a411f9cc9b26cc0baa63c7331f6cb1e2f8b0da34236a97e063ff203b8990ae80787bf63c0d61017ab1f50919cd6de7cf34fb74470536d83f2bcccc75de2ad9a40d71c5b9f6f890208310909001c33000000000000160014e8cc042a7c976ab0068cf0e4fcae4845d41774a70247304402202dc73eb37b3a5e7e89b5fe72d1c514127b079a72eb5d7a6fd77f96941ef1a982022041230be5f6fc28228479123e6b43d6f48afab3b0ebeb511cac1471f960b03ce401210281c11974da83e7d9ff9f47a3c32e3baa7975b5127eb447b86a2f7fd4c9d12fec024730440220699223aeb0a41508f09e5577c0b984a1be33450a549cb4e61c92c24559a43349022068eac816204adbbf0f706390365b1adc81ee5ae90dd1541e74a0bd592322fa1e012103c86473f098d9bb69d31a7851372f9ded7b11691a77c253279e987373164b2ad202483045022100e72b558f97b57eeee8bc19604af86d56b99a7dbcf6e1965563f3127b1d12f94f02201d4b116a4148190f0f8d4967e06d5cad10ef5b8fe781817d63fc9e989f88e95d012102f165ced59862353282a8fd32ac10d018c4bc449e6dabc77a7d810ca2be6f69fd02473044022040eaadfc49f4f068958617c2b1ff9e20f34137044b32b4b5c9c411a6d4f168d902202682b168b48abcca9e95d655c48d0f23cb9666711394a032ff2ef5abea13575c0121025eea502cd2da208247cdd27701a2efea1e64aebf7c476362c1a6c0d1416c25f3024830450221008e74a2d448138eadd1467c867d7b671ff0a2fbe7904bc77b244177dcd1b2d7b702201f35a74fc8dc3d88e5381f1c46c89e9f41797ae3df6b431f37cbb331da5ac56c012102ccb8a1b346388ff9691d6ee1b2019956e93e5550130cbfe2e866477193b22a3f02473044022008a70ad2ced726cc3054a82eb33acebaeb347c028dab4959f3d624d9ce0809f0022009b22a2bba1e0638f7f8067c81d9c2b4fc727c8414a8a967b609aaa13a1a5591012102b7d4e03f4230eb2406328be6bf9dbd400083b929c07a4b0b3601589b3243067400000000',
    rbf: true,
    numOutputs: 12,
    script: Buffer.from('6a4d83010691523c8d020b300030411f966b65ef1a09aae16339a092faa80a296bd71e2c6ea4e4a640f8e6e49a61b69f6fbde81a777f31aa0b6717c6173ec3752536e531fbeeb691c5f956386293513a2ce5c826010113412017441c2dcd7918a2b4f3573b491735abb0cde2cbfc72b756fbac29a9e9c7f3c4372db62cece2fdc2c02b26482f437de9f7c202691e3d59319f0d294b89ee01b34729e5a0020280640330411f637aa818bf059812d45caf60cbc861e91ec9a6d90a4db1c106c87fb4824116247fe60b00a12efda63da225658a1b8620135565778bfe776e633093a6603b5e01aa71f91702041d05094120e2974041e1e3e8f3eb32023f9280e20e78c0bd53c7ee94a58d12a0cc2d3b88252f78d562c44c59ab3dd8e3f4a55450d906b99419712ea08478202a75cfb0b33db8ae9d5b0206813e07800a411f9cc9b26cc0baa63c7331f6cb1e2f8b0da34236a97e063ff203b8990ae80787bf63c0d61017ab1f50919cd6de7cf34fb74470536d83f2bcccc75de2ad9a40d71c5b9f6f89020831090900', 'hex'),
    asset: {
      allocation: [{ assetGuid: 2369540753, values: [{ n: 11, value: new BN(50000000) }, { n: 0, value: new BN(50000000) }], notarysig: Buffer.from('H5ZrZe8aCarhYzmgkvqoCilr1x4sbqTkpkD45uSaYbafb73oGnd/MaoLZxfGFz7DdSU25TH77raRxflWOGKTUTo=', 'base64') },
        { assetGuid: 650700076, values: [{ n: 1, value: new BN(200000000) }], notarysig: Buffer.from('IBdEHC3NeRiitPNXO0kXNauwzeLL/HK3VvusKanpx/PENy22LOzi/cLAKyZIL0N96ffCAmkePVkxnw0pS4nuAbM=', 'base64') },
        { assetGuid: 2699372871, values: [{ n: 2, value: new BN(250000000) }, { n: 3, value: new BN(50000000) }], notarysig: Buffer.from('H2N6qBi/BZgS1FyvYMvIYekeyabZCk2xwQbIf7SCQRYkf+YLAKEu/aY9oiVlihuGIBNVZXeL/nduYzCTpmA7XgE=', 'base64') },
        { assetGuid: 402223530, values: [{ n: 4, value: new BN(300000000) }, { n: 5, value: new BN(100000000) }], notarysig: Buffer.from('IOKXQEHh4+jz6zICP5KA4g54wL1Tx+6UpY0SoMwtO4glL3jVYsRMWas92OP0pVRQ2Qa5lBlxLqCEeCAqdc+wsz0=', 'base64') },
        { assetGuid: 1537060536, values: [{ n: 6, value: new BN(350000000) }, { n: 7, value: new BN(150000000) }], notarysig: Buffer.from('H5zJsmzAuqY8czH2yx4viw2jQjapfgY/8gO4mQroB4e/Y8DWEBerH1CRnNbefPNPt0RwU22D8rzMx13irZpA1xw=', 'base64') },
        { assetGuid: 2305793883, values: [{ n: 8, value: new BN(500000000) }, { n: 9, value: new BN(100000000) }], notarysig: Buffer.from('') }]
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
      { txid: 'c5c2af64e6f8d0732b2250416eecc063f22161b9cd14eda802c97ed518d173e0', vout: 0, address: 'tsys1qarxqg2nuja4tqp5v7rj0etjggh2pwa98ur30gw', path: "m/84'/1'/0'/0/4", value: '980', assetInfo: { assetGuid: 2369540753, value: '100000000' } },
      { txid: '4fdab120b984f7bcf0c9458f9783ec0b3169a292de7e40a2612db1f7d4fd6efb', vout: 0, address: 'tsys1qjfcltq5yljfzkljxdnlc0ffmhqudz8ltq0z695', path: "m/84'/1'/0'/0/5", value: '980', assetInfo: { assetGuid: 650700076, value: '200000000' } },
      { txid: '931dbdcd8098918e306c43c2f9ee9a6c2fac4c06190a669809c83f3a48f7b522', vout: 0, address: 'tsys1qyj99y8u9vxhc7u6apa0x6yl5z9m7ggaanqlmzk', path: "m/84'/1'/0'/0/6", value: '980', assetInfo: { assetGuid: 2699372871, value: '300000000' } },
      { txid: '66d6841bef92b91344f793bbd43b2cd139e9da4b82b6f13e9e967cf793c384e1', vout: 0, address: 'tsys1qwmwuw69e4c3wyez76xskrjlpek0v2thmkf6584', path: "m/84'/1'/0'/0/11", value: '294', assetInfo: { assetGuid: 402223530, value: '400000000' } }, // m/84'/1'/0'/0/7 had some kind of collision the pub/priv key didn't match between js and core
      { txid: '212680579797d8bf19a2c4bbde5fb7f35296b82ed02c7d0a22281d1d2a47edf2', vout: 0, address: 'tsys1qwvn92ygjm5ff73utfgl7f74cp8rlktgvhtxmgm', path: "m/84'/1'/0'/0/8", value: '980', assetInfo: { assetGuid: 1537060536, value: '500000000' } },
      { txid: '57219dc0fd292caa06c54e1af6125323181a4c86921442e6d508275b30086682', vout: 0, address: 'tsys1qgylgl55m9an3kczce86shagml9cjwnjny3slu5', path: "m/84'/1'/0'/0/9", value: '980', assetInfo: { assetGuid: 2305793883, value: '600000000' } },
      { txid: 'c6e7702f1ab817bacf81e5678ba89e0b43a8a7b6f56c4c055aa8aeda87197a68', vout: 0, address: 'tsys1qgylgl55m9an3kczce86shagml9cjwnjny3slu5', path: "m/84'/1'/0'/0/9", value: '980000', assetInfo: { assetGuid: 1635229542, value: '1000000000' } }
    ],
    assets: [
      {
        assetGuid: 2369540753,
        decimals: 8,
        pubData: { desc: syscointx.utils.encodeToBase64('publicvalue') },
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 127,
        totalSupply: '0',
        maxSupply: '100000000000',
        notaryKeyID: '5f57a028945f5b5ba2aef4fd2b512063e785dcf5', // keyid for tsys1qtat6q2y5tad4hg4w7n7jk5fqv0ncth84puexca (m/84’/1’/0’/0/3)
        notaryDetails: {
          endPoint: 'https://test.com',
          instantTransfers: 0,
          HDRequired: 1
        },
        // for unit test only, this normally wouldn't come in payload
        notarySig: syscointx.utils.decodeFromBase64ToHex('H5ZrZe8aCarhYzmgkvqoCilr1x4sbqTkpkD45uSaYbafb73oGnd/MaoLZxfGFz7DdSU25TH77raRxflWOGKTUTo=')
      },
      {
        assetGuid: 650700076,
        decimals: 8,
        pubData: { desc: syscointx.utils.encodeToBase64('publicvalue') },
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 127,
        totalSupply: '0',
        maxSupply: '100000000000',
        notaryKeyID: '5f57a028945f5b5ba2aef4fd2b512063e785dcf5',
        notaryDetails: {
          endPoint: 'https://test.com',
          instantTransfers: 0,
          HDRequired: 1
        },
        notarySig: syscointx.utils.decodeFromBase64ToHex('IBdEHC3NeRiitPNXO0kXNauwzeLL/HK3VvusKanpx/PENy22LOzi/cLAKyZIL0N96ffCAmkePVkxnw0pS4nuAbM=')
      },
      {
        assetGuid: 2699372871,
        decimals: 8,
        pubData: { desc: syscointx.utils.encodeToBase64('publicvalue') },
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 127,
        totalSupply: '0',
        maxSupply: '100000000000',
        notaryKeyID: '5f57a028945f5b5ba2aef4fd2b512063e785dcf5',
        notaryDetails: {
          endPoint: 'https://test.com',
          instantTransfers: 0,
          HDRequired: 1
        },
        notarySig: syscointx.utils.decodeFromBase64ToHex('H2N6qBi/BZgS1FyvYMvIYekeyabZCk2xwQbIf7SCQRYkf+YLAKEu/aY9oiVlihuGIBNVZXeL/nduYzCTpmA7XgE=')
      },
      {
        assetGuid: 402223530,
        decimals: 8,
        pubData: { desc: syscointx.utils.encodeToBase64('publicvalue') },
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 127,
        totalSupply: '0',
        maxSupply: '100000000000',
        notaryKeyID: '5f57a028945f5b5ba2aef4fd2b512063e785dcf5',
        notaryDetails: {
          endPoint: 'https://test.com',
          instantTransfers: 0,
          HDRequired: 1
        },
        notarySig: syscointx.utils.decodeFromBase64ToHex('IOKXQEHh4+jz6zICP5KA4g54wL1Tx+6UpY0SoMwtO4glL3jVYsRMWas92OP0pVRQ2Qa5lBlxLqCEeCAqdc+wsz0=')
      },
      {
        assetGuid: 1537060536,
        decimals: 8,
        pubData: { desc: syscointx.utils.encodeToBase64('publicvalue') },
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 127,
        totalSupply: '0',
        maxSupply: '100000000000',
        notaryKeyID: '5f57a028945f5b5ba2aef4fd2b512063e785dcf5',
        notaryDetails: {
          endPoint: 'https://test.com',
          instantTransfers: 0,
          HDRequired: 1
        },
        notarySig: syscointx.utils.decodeFromBase64ToHex('H5zJsmzAuqY8czH2yx4viw2jQjapfgY/8gO4mQroB4e/Y8DWEBerH1CRnNbefPNPt0RwU22D8rzMx13irZpA1xw=')
      },
      {
        assetGuid: 2305793883,
        decimals: 8,
        pubData: { desc: syscointx.utils.encodeToBase64('publicvalue') },
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 127,
        totalSupply: '0',
        maxSupply: '100000000000'
      },
      {
        assetGuid: 1635229542,
        decimals: 8,
        pubData: { desc: syscointx.utils.encodeToBase64('publicvalue') },
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 127,
        totalSupply: '0',
        maxSupply: '100000000000',
        notaryKeyID: '5f57a028945f5b5ba2aef4fd2b512063e785dcf5',
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
    [2369540753, { changeAddress: 'tsys1qarxqg2nuja4tqp5v7rj0etjggh2pwa98ur30gw', outputs: [{ value: new BN(50000000), address: 'tsys1qarxqg2nuja4tqp5v7rj0etjggh2pwa98ur30gw' }, { value: new BN(50000000), address: 'tsys1qarxqg2nuja4tqp5v7rj0etjggh2pwa98ur30gw' }] }],
    [650700076, { changeAddress: 'tsys1qjfcltq5yljfzkljxdnlc0ffmhqudz8ltq0z695', outputs: [{ value: new BN(200000000), address: 'tsys1qjfcltq5yljfzkljxdnlc0ffmhqudz8ltq0z695' }] }],
    [2699372871, { changeAddress: 'tsys1qyj99y8u9vxhc7u6apa0x6yl5z9m7ggaanqlmzk', outputs: [{ value: new BN(250000000), address: 'tsys1qyj99y8u9vxhc7u6apa0x6yl5z9m7ggaanqlmzk' }] }],
    [402223530, { changeAddress: 'tsys1qtqwylszrnxrtwcd4zy8ws6nqlrzk8a7282uehx', outputs: [{ value: new BN(300000000), address: 'tsys1qtqwylszrnxrtwcd4zy8ws6nqlrzk8a7282uehx' }] }],
    [1537060536, { changeAddress: 'tsys1qwvn92ygjm5ff73utfgl7f74cp8rlktgvhtxmgm', outputs: [{ value: new BN(350000000), address: 'tsys1qwvn92ygjm5ff73utfgl7f74cp8rlktgvhtxmgm' }] }],
    [2305793883, { changeAddress: 'tsys1qgylgl55m9an3kczce86shagml9cjwnjny3slu5', outputs: [{ value: new BN(500000000), address: 'tsys1qgylgl55m9an3kczce86shagml9cjwnjny3slu5' }] }]
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
    hex: '87000000000107e073d118d57ec902a8ed14cdb96121f263c0ec6e4150222b73d0f8e664afc2c50000000000fdfffffffb6efdd4f7b12d61a2407ede92a269310bec83978f45c9f0bcf784b920b1da4f0000000000fdffffff22b5f7483a3fc80998660a19064cac2f6c9aeef9c2436c308e919880cdbd1d930000000000fdffffffe184c393f77c969e3ef1b6824bdae939d12c3bd4bb93f74413b992ef1b84d6660000000000fdfffffff2ed472a1d1d28220a7d2cd02eb89652f3b75fdebbc4a219bfd89797578026210000000000fdffffff826608305b2708d5e6421492864c1a18235312f61a4ec506aa2c29fdc09d21570000000000fdffffff687a1987daaea85a054c6cf5b6a7a8430b9ea88b67e581cfba17b81a2f70e7c60000000000fdffffff0db202000000000000160014e8cc042a7c976ab0068cf0e4fcae4845d41774a7b2020000000000001600149271f58284fc922b7e466cff87a53bb838d11febb202000000000000160014248a521f8561af8f735d0f5e6d13f41177e423bdb202000000000000160014248a521f8561af8f735d0f5e6d13f41177e423bdb202000000000000160014581c4fc0439986b761b5110ee86a60f8c563f7cab202000000000000160014581c4fc0439986b761b5110ee86a60f8c563f7cab2020000000000001600147326551112dd129f478b4a3fe4fab809c7fb2d0cb2020000000000001600147326551112dd129f478b4a3fe4fab809c7fb2d0cb202000000000000160014413e8fd29b2f671b6058c9f50bf51bf971274e53b202000000000000160014413e8fd29b2f671b6058c9f50bf51bf971274e530000000000000000fdd0016a4dcc010791523c8d020b300030411f966b65ef1a09aae16339a092faa80a296bd71e2c6ea4e4a640f8e6e49a61b69f6fbde81a777f31aa0b6717c6173ec3752536e531fbeeb691c5f956386293513a2ce5c826010113412017441c2dcd7918a2b4f3573b491735abb0cde2cbfc72b756fbac29a9e9c7f3c4372db62cece2fdc2c02b26482f437de9f7c202691e3d59319f0d294b89ee01b34729e5a0020280640330411f637aa818bf059812d45caf60cbc861e91ec9a6d90a4db1c106c87fb4824116247fe60b00a12efda63da225658a1b8620135565778bfe776e633093a6603b5e01aa71f91702041d05094120e2974041e1e3e8f3eb32023f9280e20e78c0bd53c7ee94a58d12a0cc2d3b88252f78d562c44c59ab3dd8e3f4a55450d906b99419712ea08478202a75cfb0b33db8ae9d5b0206813e07800a411f9cc9b26cc0baa63c7331f6cb1e2f8b0da34236a97e063ff203b8990ae80787bf63c0d61017ab1f50919cd6de7cf34fb74470536d83f2bcccc75de2ad9a40d71c5b9f6f89020831090900669f7761010c0a4100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006cb60e0000000000160014e8cc042a7c976ab0068cf0e4fcae4845d41774a7b202000000000000160014bd6cfd84d53025c8891862ec49b0036d06405d0f024730440220420d357ba6e3f824fe4c8650cfe04a6ee5c2710f8fc83028231d49bd5d5b79360220011ebca50d9fd6fd6dc264a1282d542eeca32fdd2663c4f2e85c58afb6b865c401210281c11974da83e7d9ff9f47a3c32e3baa7975b5127eb447b86a2f7fd4c9d12fec0247304402202ddc30f3281e19149ff4c4d9a1e04e3e703ffa796f7a9a79c6a9af1f2aaef1b20220492f24bc72aa2a58bac7e15dc381669dab7716735f3035571a74f545c33535f3012103c86473f098d9bb69d31a7851372f9ded7b11691a77c253279e987373164b2ad20247304402201ed8a3fb373b4a07b8db9af0a45bbfb804e579e8879dd786e9b069ad77cee3e8022064c377526721f9bed1e7dc62517fcf6f494922686e0babd3dacd1964a59ea4ed012102f165ced59862353282a8fd32ac10d018c4bc449e6dabc77a7d810ca2be6f69fd02483045022100d7d13b907491ffd86d3a65f77ef0d6e96c811ffa81eed5c83c36b00b6f2ce216022070dccab32da970f9c2e3dfb9647ec00932de679f9d8d383aed09f4098135bc650121025eea502cd2da208247cdd27701a2efea1e64aebf7c476362c1a6c0d1416c25f30247304402207cc748c629eda34585612717c038c292a98cf4bd9da41b5a0e8527855597f1d602200cee96c88b5258eeb18aa88a7d0b505c08dc466db0e8233b66204f354a1aac52012102ccb8a1b346388ff9691d6ee1b2019956e93e5550130cbfe2e866477193b22a3f02483045022100f2049747e45f31a68df8891e411da1c859fd6ffe049223723042e87a23d7125202207aff30f6e173ac1af0cc2e38f9dd010536ad51d56c9876fcb436cc7beda8a554012102b7d4e03f4230eb2406328be6bf9dbd400083b929c07a4b0b3601589b324306740247304402207f4f03ab40983111b448e81a153d5621ae6f94e1e787330f9d55520a53fb4f7702201d701e8c5965b8b83bacdfbaa4891615bf868d83eeb7d3b1ae57a634f5cf3de2012102b7d4e03f4230eb2406328be6bf9dbd400083b929c07a4b0b3601589b3243067400000000',
    rbf: true,
    numOutputs: 13,
    script: Buffer.from('6a4dcc010791523c8d020b300030411f966b65ef1a09aae16339a092faa80a296bd71e2c6ea4e4a640f8e6e49a61b69f6fbde81a777f31aa0b6717c6173ec3752536e531fbeeb691c5f956386293513a2ce5c826010113412017441c2dcd7918a2b4f3573b491735abb0cde2cbfc72b756fbac29a9e9c7f3c4372db62cece2fdc2c02b26482f437de9f7c202691e3d59319f0d294b89ee01b34729e5a0020280640330411f637aa818bf059812d45caf60cbc861e91ec9a6d90a4db1c106c87fb4824116247fe60b00a12efda63da225658a1b8620135565778bfe776e633093a6603b5e01aa71f91702041d05094120e2974041e1e3e8f3eb32023f9280e20e78c0bd53c7ee94a58d12a0cc2d3b88252f78d562c44c59ab3dd8e3f4a55450d906b99419712ea08478202a75cfb0b33db8ae9d5b0206813e07800a411f9cc9b26cc0baa63c7331f6cb1e2f8b0da34236a97e063ff203b8990ae80787bf63c0d61017ab1f50919cd6de7cf34fb74470536d83f2bcccc75de2ad9a40d71c5b9f6f89020831090900669f7761010c0a410000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000', 'hex'),
    asset: {
      allocation: [{ assetGuid: 2369540753, values: [{ n: 11, value: new BN(50000000) }, { n: 0, value: new BN(50000000) }], notarysig: Buffer.from('H5ZrZe8aCarhYzmgkvqoCilr1x4sbqTkpkD45uSaYbafb73oGnd/MaoLZxfGFz7DdSU25TH77raRxflWOGKTUTo=', 'base64') },
        { assetGuid: 650700076, values: [{ n: 1, value: new BN(200000000) }], notarysig: Buffer.from('IBdEHC3NeRiitPNXO0kXNauwzeLL/HK3VvusKanpx/PENy22LOzi/cLAKyZIL0N96ffCAmkePVkxnw0pS4nuAbM=', 'base64') },
        { assetGuid: 2699372871, values: [{ n: 2, value: new BN(250000000) }, { n: 3, value: new BN(50000000) }], notarysig: Buffer.from('H2N6qBi/BZgS1FyvYMvIYekeyabZCk2xwQbIf7SCQRYkf+YLAKEu/aY9oiVlihuGIBNVZXeL/nduYzCTpmA7XgE=', 'base64') },
        { assetGuid: 402223530, values: [{ n: 4, value: new BN(300000000) }, { n: 5, value: new BN(100000000) }], notarysig: Buffer.from('IOKXQEHh4+jz6zICP5KA4g54wL1Tx+6UpY0SoMwtO4glL3jVYsRMWas92OP0pVRQ2Qa5lBlxLqCEeCAqdc+wsz0=', 'base64') },
        { assetGuid: 1537060536, values: [{ n: 6, value: new BN(350000000) }, { n: 7, value: new BN(150000000) }], notarysig: Buffer.from('H5zJsmzAuqY8czH2yx4viw2jQjapfgY/8gO4mQroB4e/Y8DWEBerH1CRnNbefPNPt0RwU22D8rzMx13irZpA1xw=', 'base64') },
        { assetGuid: 2305793883, values: [{ n: 8, value: new BN(500000000) }, { n: 9, value: new BN(100000000) }], notarysig: Buffer.from('') },
        { assetGuid: 1635229542, values: [{ n: 12, value: new BN(1000000000) }], notarysig: Buffer.alloc(65, 0) }]
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
      { txid: 'c6e7702f1ab817bacf81e5678ba89e0b43a8a7b6f56c4c055aa8aeda87197a62', vout: 0, address: 'tsys1qarxqg2nuja4tqp5v7rj0etjggh2pwa98ur30gw', path: "m/84'/1'/0'/0/4", value: '980', assetInfo: { assetGuid: 1635229536, value: '1000000000' } },
      { txid: '2cf903537c6c161a1c65d940758b63efd4706fc8f78eb21d252612407e59e865', vout: 0, address: 'tsys1qjfcltq5yljfzkljxdnlc0ffmhqudz8ltq0z695', path: "m/84'/1'/0'/0/5", value: '100000000' }
    ],
    assets: [
      {
        assetGuid: 1635229536,
        decimals: 8,
        pubData: { desc: syscointx.utils.encodeToBase64('publicvalue') },
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 127,
        totalSupply: '0',
        maxSupply: '100000000000',
        auxFeeDetails: {
          auxFeeKeyID: '5f57a028945f5b5ba2aef4fd2b512063e785dcf5',
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
    [1635229536, { changeAddress: 'tsys1qjfcltq5yljfzkljxdnlc0ffmhqudz8ltq0z695', outputs: [{ value: new BN(600000000), address: 'tsys1qgylgl55m9an3kczce86shagml9cjwnjny3slu5' }] }]
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
    hex: '87000000000102627a1987daaea85a054c6cf5b6a7a8430b9ea88b67e581cfba17b81a2f70e7c60000000000ffffffff65e8597e401226251db28ef7c86f70d4ef638b7540d9651c1a166c7c5303f92c0000000000ffffffff04b2020000000000001600149271f58284fc922b7e466cff87a53bb838d11febb202000000000000160014413e8fd29b2f671b6058c9f50bf51bf971274e530000000000000000106a0e01609f7761030039013b039a5b00f8d4f505000000001600149271f58284fc922b7e466cff87a53bb838d11feb02483045022100dbe08846f87e88a8b70845c5dc94442ba583a854c5786af55dcc133bd0b88640022021297a6d8728261db6a2b29c8efcd03e6538b9a82cbef3185dfdf4a6840c912a01210281c11974da83e7d9ff9f47a3c32e3baa7975b5127eb447b86a2f7fd4c9d12fec02483045022100e56134993dbe977f9edf1e7a1c125cca5294b92230c2e75b39db1dd7529fed49022013967e84086d894e6fe97e56d2c5eaa68c5a8b229387c74e3fcecea698d8e920012103c86473f098d9bb69d31a7851372f9ded7b11691a77c253279e987373164b2ad200000000',
    rbf: false,
    numOutputs: 4,
    script: Buffer.from('6a0e01609f7761030039013b039a5b00', 'hex'),
    asset: {
      allocation: [{ assetGuid: 1635229536, values: [{ n: 0, value: new BN(6000000) }, { n: 1, value: new BN(600000000) }, { n: 3, value: new BN(394000000) }], notarysig: Buffer.from('') }]
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
      { txid: '912605d620edc959ebf04eba709ca2ad7adbe147e83ba26db55e719d5f948717', vout: 0, address: 'tsys1qarxqg2nuja4tqp5v7rj0etjggh2pwa98ur30gw', path: "m/84'/1'/0'/0/4", value: '690', assetInfo: { assetGuid: 2369540753, value: '30000000' } },
      { txid: '912605d620edc959ebf04eba709ca2ad7adbe147e83ba26db55e719d5f948717', vout: 11, address: 'tsys1qarxqg2nuja4tqp5v7rj0etjggh2pwa98ur30gw', path: "m/84'/1'/0'/0/4", value: '99979484', assetInfo: { assetGuid: 2369540753, value: '50000000' } }
    ],
    assets: [
      {
        assetGuid: 2369540753,
        decimals: 8,
        pubData: { desc: syscointx.utils.encodeToBase64('publicvalue') },
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 127,
        totalSupply: '0',
        maxSupply: '100000000000',
        notaryKeyID: '5f57a028945f5b5ba2aef4fd2b512063e785dcf5', // keyid for tsys1qtat6q2y5tad4hg4w7n7jk5fqv0ncth84puexca (m/84’/1’/0’/0/3)
        notaryDetails: {
          endPoint: 'https://test.com',
          instantTransfers: 0,
          HDRequired: 1
        },
        // for unit test only, this normally wouldn't come in payload
        notarySig: syscointx.utils.decodeFromBase64ToHex('IB3TMX//cFV3lyCkyXkwj82pVIy6brf/q3zIno09dgeualzicEi9/kdIaRmrhjUXjwiBizK09+NWFWpqldDLP98=')
      }
    ]
  },
  assetOpts: { ethaddress: Buffer.from('', 'hex') },
  sysChangeAddress: 'tsys1qh4k0mpx4xqju3zgcvtkynvqrd5ryqhg0yr9uk8',
  assetMap: new Map([
    [2369540753, { changeAddress: 'tsys1qjfcltq5yljfzkljxdnlc0ffmhqudz8ltq0z695', outputs: [{ value: new BN(40000000) }] }]
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
    hex: '800000000001011787945f9d715eb56da23be847e1db7aada29c70ba4ef0eb59c9ed20d60526910b00000000fdffffff03005a6202000000001600149271f58284fc922b7e466cff87a53bb838d11feb0000000000000000506a4c4d0191523c8d020126020841201dd3317fff7055779720a4c979308fcda9548cba6eb7ffab7cc89e8d3d7607ae6a5ce27048bdfe47486919ab8635178f08818b32b4f7e356156a6a95d0cb3fdf00cc87f505000000001600149271f58284fc922b7e466cff87a53bb838d11feb024830450221008e801b5464c2ad1e2c4053988dc77417e9c47306fb78f4637720ac3753e4079802207a7b9a68ab0aaa94213c39addb857a3ef7b68437d0c54e69ab36aea66df90c9d01210281c11974da83e7d9ff9f47a3c32e3baa7975b5127eb447b86a2f7fd4c9d12fec00000000',
    rbf: true,
    numOutputs: 3,
    script: Buffer.from('6a4c4d0191523c8d020126020841201dd3317fff7055779720a4c979308fcda9548cba6eb7ffab7cc89e8d3d7607ae6a5ce27048bdfe47486919ab8635178f08818b32b4f7e356156a6a95d0cb3fdf00', 'hex'),
    asset: {
      allocation: [{ assetGuid: 2369540753, values: [{ n: 1, value: new BN(40000000) }, { n: 2, value: new BN(10000000) }], notarysig: Buffer.from('IB3TMX//cFV3lyCkyXkwj82pVIy6brf/q3zIno09dgeualzicEi9/kdIaRmrhjUXjwiBizK09+NWFWpqldDLP98=', 'base64') }], ethaddress: Buffer.from('', 'hex')
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
      { txid: '912605d620edc959ebf04eba709ca2ad7adbe147e83ba26db55e719d5f948717', vout: 9, address: 'tsys1qgylgl55m9an3kczce86shagml9cjwnjny3slu5', path: "m/84'/1'/0'/0/9", value: '690', assetInfo: { assetGuid: 2305793883, value: '100000000' } },
      { txid: '9f586de3e6d8ce33b1c6de709c992cb431cc324ab3bc6dff5537137aa4b17022', vout: 3, address: 'tsys1qh4k0mpx4xqju3zgcvtkynvqrd5ryqhg0yr9uk8', path: "m/84'/1'/0'/0/10", value: '99974764' }
    ],
    assets: [
      {
        assetGuid: 2305793883,
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
    [2305793883, { changeAddress: 'tsys1qjfcltq5yljfzkljxdnlc0ffmhqudz8ltq0z695', outputs: [{ value: new BN(10000000) }] }]
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
    hex: '860000000001021787945f9d715eb56da23be847e1db7aada29c70ba4ef0eb59c9ed20d60526910900000000fdffffff2270b1a47a133755ff6dbcb34a32cc31b42c999c70dec6b133ced8e6e36d589f0300000000fdffffff020000000000000000226a20015b9f6f89020008015800149667de58c15475626165eaa4c9970e409e1181d05e78f505000000001600149271f58284fc922b7e466cff87a53bb838d11feb02483045022100a818ff46ffc7b3becb8f3d38d88160821d08f0fdd108cff3f5b5ad144979d8270220016f6e16da11e945776a695bbb2e63d876613a468ee2035a61be0894ff4b24f7012102b7d4e03f4230eb2406328be6bf9dbd400083b929c07a4b0b3601589b3243067402483045022100cab4003c92a7a15914b3828ae281f82ebcc1f2f01c6f43b2e2914bc0a7ef7c910220155767704af15bf2a18240448f5c324186a01f27b9315c8aedcfebeaf9a3fe55012103b7eeb47fdd1c2084ef795fac22bf24185e7295d2efa3178b69b6eca409810fba00000000',
    rbf: true,
    numOutputs: 2,
    script: Buffer.from('6a20015b9f6f89020008015800149667de58c15475626165eaa4c9970e409e1181d0', 'hex'),
    asset: {
      allocation: [{ assetGuid: 2305793883, values: [{ n: 0, value: new BN(10000000) }, { n: 1, value: new BN(90000000) }], notarysig: Buffer.from('') }],
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
      { txid: '912605d620edc959ebf04eba709ca2ad7adbe147e83ba26db55e719d5f948717', vout: 8, address: 'tsys1qgylgl55m9an3kczce86shagml9cjwnjny3slu5', path: "m/84'/1'/0'/0/9", value: '690', assetInfo: { assetGuid: 2305793883, value: '500000000' } },
      { txid: '386efe525b6b3f29fb6cb982da3710d2ea324a31ce3448ea76122a6b1150c530', vout: 1, address: 'tsys1qjfcltq5yljfzkljxdnlc0ffmhqudz8ltq0z695', path: "m/84'/1'/0'/0/5", value: '99970714', assetInfo: { assetGuid: 2305793883, value: '90000000' } }
    ],
    assets: [
      {
        assetGuid: 2305793883,
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
    [2305793883, { changeAddress: 'tsys1qjfcltq5yljfzkljxdnlc0ffmhqudz8ltq0z695', outputs: [{ value: new BN(100000000) }] }]
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
    hex: '860000000001021787945f9d715eb56da23be847e1db7aada29c70ba4ef0eb59c9ed20d60526910800000000fdffffff30c550116b2a1276ea4834ce314a32ead21037da82b96cfb293f6b5b52fe6e380100000000fdffffff020000000000000000236a21015b9f6f8902000901824000149667de58c15475626165eaa4c9970e409e1181d08268f505000000001600149271f58284fc922b7e466cff87a53bb838d11feb024730440220221ab32702071df52c9122cd9b30faa25034aebd2ef6eaef2598af7a85779de002204c4bde291ff8fbed95ada769648df72159114f92e8660692358b141aa5e4fd38012102b7d4e03f4230eb2406328be6bf9dbd400083b929c07a4b0b3601589b3243067402483045022100fc94cb632e1103a963668957e0885c03938b02349d4cf9b0691bb6417899b8ca0220017ae2bac56b22658da20560ad55c383d2a2d775a2902123645da1f11c479acb012103c86473f098d9bb69d31a7851372f9ded7b11691a77c253279e987373164b2ad200000000',
    rbf: true,
    numOutputs: 2,
    script: Buffer.from('6a21015b9f6f8902000901824000149667de58c15475626165eaa4c9970e409e1181d0', 'hex'),
    asset: {
      allocation: [{ assetGuid: 2305793883, values: [{ n: 0, value: new BN(100000000) }, { n: 1, value: new BN(490000000) }], notarysig: Buffer.from('') }],
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
      { txid: '64dbfb02268b642f6a32a266bdd54add8989a1fa913b7414a642b5d85e964c68', vout: 0, address: 'tsys1qh4k0mpx4xqju3zgcvtkynvqrd5ryqhg0yr9uk8', path: "m/84'/1'/0'/0/10", value: '100000000', assetInfo: { assetGuid: 2305793883, value: '90000000' } },
      { txid: '9f586de3e6d8ce33b1c6de709c992cb431cc324ab3bc6dff5537137aa4b17022', vout: 1, address: 'tsys1qjfcltq5yljfzkljxdnlc0ffmhqudz8ltq0z695', path: "m/84'/1'/0'/0/5", value: '6900', assetInfo: { assetGuid: 2369540753, value: '10000000' } }
    ],
    assets: [
      {
        assetGuid: 2305793883,
        decimals: 8,
        pubData: { desc: syscointx.utils.encodeToBase64('publicvalue') },
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 127,
        totalSupply: '0',
        maxSupply: '100000000000'
      },
      {
        assetGuid: 2369540753,
        decimals: 8,
        pubData: { desc: syscointx.utils.encodeToBase64('publicvalue') },
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 127,
        totalSupply: '0',
        maxSupply: '100000000000',
        notaryKeyID: '5f57a028945f5b5ba2aef4fd2b512063e785dcf5', // keyid for tsys1qtat6q2y5tad4hg4w7n7jk5fqv0ncth84puexca (m/84’/1’/0’/0/3)
        notaryDetails: {
          endPoint: 'https://test.com',
          instantTransfers: 0,
          HDRequired: 1
        },
        // for unit test only, this normally wouldn't come in payload
        notarySig: syscointx.utils.decodeFromBase64ToHex('H5ZrZe8aCarhYzmgkvqoCilr1x4sbqTkpkD45uSaYbafb73oGnd/MaoLZxfGFz7DdSU25TH77raRxflWOGKTUTo=')
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
    hex: '87000000000102684c965ed8b542a614743b91faa18989dd4ad5bd66a2326a2f648b2602fbdb640000000000fdffffff2270b1a47a133755ff6dbcb34a32cc31b42c999c70dec6b133ced8e6e36d589f0100000000fdffffff04a0d7f50500000000160014bd6cfd84d53025c8891862ec49b0036d06405d0f5a140000000000001600149271f58284fc922b7e466cff87a53bb838d11febb2020000000000001600149271f58284fc922b7e466cff87a53bb838d11feb0000000000000000556a4c52025b9f6f890101580091523c8d010208411f966b65ef1a09aae16339a092faa80a296bd71e2c6ea4e4a640f8e6e49a61b69f6fbde81a777f31aa0b6717c6173ec3752536e531fbeeb691c5f956386293513a024730440220227277b3dab028ec1815610dd448d51b9b9f88250d1f873130421fa51c8d9499022057345ff3708c35dbc47600a7f34f00d75bf6c7590e455a327e79373f64f2a9b7012103b7eeb47fdd1c2084ef795fac22bf24185e7295d2efa3178b69b6eca409810fba024830450221009df79fb6a36b0d241480aa99619a4fb7fb6479fba0d1997f13dce6228884e1e102204de160f1a91ed972039a85f5f804b634f7a4adb1cdd899fdfad318cf98738c9d012103c86473f098d9bb69d31a7851372f9ded7b11691a77c253279e987373164b2ad200000000',
    rbf: true,
    version: syscointx.utils.SYSCOIN_TX_VERSION_ALLOCATION_SEND,
    numOutputs: 4, // 4 because new opreturn will be created + 1 for second asset change
    script: Buffer.from('6a4c52025b9f6f890101580091523c8d010208411f966b65ef1a09aae16339a092faa80a296bd71e2c6ea4e4a640f8e6e49a61b69f6fbde81a777f31aa0b6717c6173ec3752536e531fbeeb691c5f956386293513a', 'hex'),
    asset: {
      allocation: [{ assetGuid: 2305793883, values: [{ n: 1, value: new BN(90000000) }], notarysig: Buffer.from('') }, { assetGuid: 2369540753, values: [{ n: 2, value: new BN(10000000) }], notarysig: Buffer.from('H5ZrZe8aCarhYzmgkvqoCilr1x4sbqTkpkD45uSaYbafb73oGnd/MaoLZxfGFz7DdSU25TH77raRxflWOGKTUTo=', 'base64') }]
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
      { txid: '64dbfb02268b642f6a32a266bdd54add8989a1fa913b7414a642b5d85e964c68', vout: 0, address: 'tsys1qh4k0mpx4xqju3zgcvtkynvqrd5ryqhg0yr9uk8', path: "m/84'/1'/0'/0/10", value: '100000000', assetInfo: { assetGuid: 2305793883, value: '90000000' } },
      { txid: '9f586de3e6d8ce33b1c6de709c992cb431cc324ab3bc6dff5537137aa4b17022', vout: 1, address: 'tsys1qjfcltq5yljfzkljxdnlc0ffmhqudz8ltq0z695', path: "m/84'/1'/0'/0/5", value: '6900', assetInfo: { assetGuid: 2369540753, value: '10000000' } }
    ],
    assets: [
      {
        assetGuid: 2305793883,
        decimals: 8,
        pubData: { desc: syscointx.utils.encodeToBase64('publicvalue') },
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 127,
        totalSupply: '0',
        maxSupply: '100000000000'
      },
      {
        assetGuid: 2369540753,
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
    [2615707979, { changeAddress: 'tsys1qjfcltq5yljfzkljxdnlc0ffmhqudz8ltq0z695', outputs: [{ value: new BN(10000000000), address: 'tsys1qdflre2yd37qtpqe2ykuhwandlhq04r2td2t9ae' }] }]
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
    hex: '85000000000101684c965ed8b542a614743b91faa18989dd4ad5bd66a2326a2f648b2602fbdb640000000000fdffffff03b2020000000000001600146a7e3ca88d8f80b0832a25b977766dfdc0fa8d4b0000000000000000fd1e096a4d1a09024b89e89b010064005b9f6f890102580002000000c10268007102fd9f03f9039cf871a04442f3f69add48df0531fe3c0025103b53fcf3fe38060e5f29366caec8855e4fa0229f7b7e69c0b5793f8a61c06f5cc09b0f4938561856c632ee56c3b2c4d6d153808080808080a07720fff5e8eabef55fa129ee55b3b0d82875e2b25b8f26e22cf6b5c4f9cec7ab8080808080808080f901f180a03ee147749c5b769bc5d1a53e4f37567506d417de4ec4e67722130eda4638427da043caa62b40dad61bce4d50fb62ea485729a6687c3aa13895cf4ba234b92afe82a0b79958e4aa63104da4599ebb91e712375e6adfc89abc14b9533c5778f107e7d8a01bc7f80f81a8d281253ac882bb89aca6131e5794bfcbdccde990bb6d5be6cb2fa0aedad62f1426b68e395a59e06bf242fb28b882af67589bce3495a99650058ec4a0c21a7e0b9d0948bb6b65a5e73f5f01173064d20e4819ca4884d1eabc22bf737da090087708c533b10af8925eebf398c005fc16cb6a515111f2be4f328f762949d0a02827daacd6a52ae6c74a78791ff0c5e33a7a85f5ca0a47cdfbcd5219f75f705ca0af7ecf31d56575155d272cd813bf7d7ac435f62b0538c31771e407dafef6be53a09b74707c3abdbfa305cb61f23c940f063f553f17d0bd3013126aad357193353ea067a52ed59820bb48f8010d2b2bb0ee92803b1a00a8341fd4c3269b065ed070d9a0bf0e9b45955283e6e04b71eda63bfc7b55d9f54527943aa1c159b4161b1e1daea0ecabd4c00deacf9a7ff25be942c9f468628eb776fbec23a9ca0d8fc256f14a31a0df406c7ac7f38c2ea1d9bdb06c2e51db3de8cf0e655a8e0e683e19ca1ddf83d3a08360ec6c5e26614f144520ed9d0b577640381f0f38b5429b67422f75d603ad5a80f9013220b9012ef9012b82051f843b9aca008307a120940765efb302d504751c652c5b1d65e8e9edf2e70f80b8c454c988ff00000000000000000000000000000000000000000000000000000002540be400000000000000000000000000000000000000000000000000000000009be8894b0000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000002c62637274317130667265323430737939326d716b386b6b377073616561366b74366d3537323570377964636a00000000000000000000000000000000000000002ca0dccb6e077c3f6252d199202113893407119d4ba09667113f2d20c63a31487b87a01e0a059e50f08f2772781691f2c9e43a9503a167c98cf467b1afc177b74d84e6010b7102fd5405f90551f871a0cab13def05783d763febde31920bd234d0486c26955c2937e0486db909a28eeea09cf564a668a29a5f1cc5d6ef8e19988dfd2b30d290672f0ffc4200e608cb65ac808080808080a029b8ed2258c53562954c87bcd7f60671029680d2a19ef8bcd3ad470ea48d57d18080808080808080f901f180a07c21ca39872e6b8f611bc6b1b295c24f988b5cf944625eabf5236b37ea3b9f01a0edb9e63fdc31ba41f11a8b2fb8000ad1357b3c0b27a8483968d75e93e7b488a1a02231847aa3c5dde2f2a1851a66aabec65e5eaae8c28110756f122c72be1fba05a08fa87809e5b7f989e78ccbe1a6bc4924115d5747529af879f2fe196f959b64fca091f1bf748061eba21a413b72d70afccb8daebb5906d5cd9dda06d5f877065d5ba0d7e6c82dd1c25eb2f90b02f038beaff98c260d46992d0b3c1eac7d51552c7417a01d5c43deb2e3794292cdffb04f82ab25bc4e75f5e0cab928b66582e08026f5b1a0d7323a87dc8fbc66c7b34810d2cad92fc0da168d962b4556e825a3266a148b74a0af31f0b7cdcd6a855ac7678ef2b8fcb1afeda918b0c8e4696a4013f2b75ca402a0f9d63f2db8ab6d3c3e12073ac2910ee575832bde3e4586f18e59dd26a16adb7ca0f0c91e059c43780617d304fe8992511f096ccc35232da1f25127db53ba4fb05aa052030932d0a9026efd2a3ada67f33d401cd9a97ddb24c606af3a0a0c24e432aba0142af9b4686c6ca30b0ac39133fa76d8682b7bbbec488e62e652d3f25419777da0940f31617e91cfbabaa9d0d1638949f8125f80a43027122778522675194a4e65a0edc4c7d2cf30150fdf7e502d0ef06c80c85fc37260134a112493c6183f62f4b580f902e720b902e3f902e00183192ee2b9010000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000200000000000000008000000000000000000000100200000000000000000010000000000000200000000000000000000000000000000000010000000000000000000000000000004000000000000000000000000400004001000000000020000000000000000000000000080000000000000408000000040000000000000000002000000000000000000000000000000000000000000000000000000000010000000000000000010000000000000000000000000000000000000000000f901d5f89b94f2bb7bfa19e7c4b6bb333ee1afdf8e5e8f9b3561f863a0ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3efa0000000000000000000000000b0ea8c9ee8aa87efd28a12de8c034f947c144053a00000000000000000000000000765efb302d504751c652c5b1d65e8e9edf2e70fa000000000000000000000000000000000000000000000000000000002540be400f89b94f2bb7bfa19e7c4b6bb333ee1afdf8e5e8f9b3561f863a08c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925a0000000000000000000000000b0ea8c9ee8aa87efd28a12de8c034f947c144053a00000000000000000000000000765efb302d504751c652c5b1d65e8e9edf2e70fa00000000000000000000000000000000000000000000000000000000000000000f899940765efb302d504751c652c5b1d65e8e9edf2e70fe1a09c6dea23fe3b510bb5d170df49dc74e387692eaa3258c691918cd3aa94f5fb74b860000000000000000000000000b0ea8c9ee8aa87efd28a12de8c034f947c14405300000000000000000000000000000000000000000000000000000002540be40000000000000000000000000000000000000000000000000000000808000000020000327df505000000001600140f8137adebd136ebb5d3c9796e79916ddcff77cb02483045022100e5b3b430176b6731be7c4836c7965ff17e709ebf47d6eff1d0388bd54099f88e0220532dc94cb5c1a45cc6d5b7a805d571ed563b881645ccc62292bce8539d65ed7b012103b7eeb47fdd1c2084ef795fac22bf24185e7295d2efa3178b69b6eca409810fba00000000',
    rbf: true,
    version: syscointx.utils.SYSCOIN_TX_VERSION_ALLOCATION_MINT,
    numOutputs: 3,
    script: Buffer.from('6a4d1a09024b89e89b010064005b9f6f890102580002000000c10268007102fd9f03f9039cf871a04442f3f69add48df0531fe3c0025103b53fcf3fe38060e5f29366caec8855e4fa0229f7b7e69c0b5793f8a61c06f5cc09b0f4938561856c632ee56c3b2c4d6d153808080808080a07720fff5e8eabef55fa129ee55b3b0d82875e2b25b8f26e22cf6b5c4f9cec7ab8080808080808080f901f180a03ee147749c5b769bc5d1a53e4f37567506d417de4ec4e67722130eda4638427da043caa62b40dad61bce4d50fb62ea485729a6687c3aa13895cf4ba234b92afe82a0b79958e4aa63104da4599ebb91e712375e6adfc89abc14b9533c5778f107e7d8a01bc7f80f81a8d281253ac882bb89aca6131e5794bfcbdccde990bb6d5be6cb2fa0aedad62f1426b68e395a59e06bf242fb28b882af67589bce3495a99650058ec4a0c21a7e0b9d0948bb6b65a5e73f5f01173064d20e4819ca4884d1eabc22bf737da090087708c533b10af8925eebf398c005fc16cb6a515111f2be4f328f762949d0a02827daacd6a52ae6c74a78791ff0c5e33a7a85f5ca0a47cdfbcd5219f75f705ca0af7ecf31d56575155d272cd813bf7d7ac435f62b0538c31771e407dafef6be53a09b74707c3abdbfa305cb61f23c940f063f553f17d0bd3013126aad357193353ea067a52ed59820bb48f8010d2b2bb0ee92803b1a00a8341fd4c3269b065ed070d9a0bf0e9b45955283e6e04b71eda63bfc7b55d9f54527943aa1c159b4161b1e1daea0ecabd4c00deacf9a7ff25be942c9f468628eb776fbec23a9ca0d8fc256f14a31a0df406c7ac7f38c2ea1d9bdb06c2e51db3de8cf0e655a8e0e683e19ca1ddf83d3a08360ec6c5e26614f144520ed9d0b577640381f0f38b5429b67422f75d603ad5a80f9013220b9012ef9012b82051f843b9aca008307a120940765efb302d504751c652c5b1d65e8e9edf2e70f80b8c454c988ff00000000000000000000000000000000000000000000000000000002540be400000000000000000000000000000000000000000000000000000000009be8894b0000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000002c62637274317130667265323430737939326d716b386b6b377073616561366b74366d3537323570377964636a00000000000000000000000000000000000000002ca0dccb6e077c3f6252d199202113893407119d4ba09667113f2d20c63a31487b87a01e0a059e50f08f2772781691f2c9e43a9503a167c98cf467b1afc177b74d84e6010b7102fd5405f90551f871a0cab13def05783d763febde31920bd234d0486c26955c2937e0486db909a28eeea09cf564a668a29a5f1cc5d6ef8e19988dfd2b30d290672f0ffc4200e608cb65ac808080808080a029b8ed2258c53562954c87bcd7f60671029680d2a19ef8bcd3ad470ea48d57d18080808080808080f901f180a07c21ca39872e6b8f611bc6b1b295c24f988b5cf944625eabf5236b37ea3b9f01a0edb9e63fdc31ba41f11a8b2fb8000ad1357b3c0b27a8483968d75e93e7b488a1a02231847aa3c5dde2f2a1851a66aabec65e5eaae8c28110756f122c72be1fba05a08fa87809e5b7f989e78ccbe1a6bc4924115d5747529af879f2fe196f959b64fca091f1bf748061eba21a413b72d70afccb8daebb5906d5cd9dda06d5f877065d5ba0d7e6c82dd1c25eb2f90b02f038beaff98c260d46992d0b3c1eac7d51552c7417a01d5c43deb2e3794292cdffb04f82ab25bc4e75f5e0cab928b66582e08026f5b1a0d7323a87dc8fbc66c7b34810d2cad92fc0da168d962b4556e825a3266a148b74a0af31f0b7cdcd6a855ac7678ef2b8fcb1afeda918b0c8e4696a4013f2b75ca402a0f9d63f2db8ab6d3c3e12073ac2910ee575832bde3e4586f18e59dd26a16adb7ca0f0c91e059c43780617d304fe8992511f096ccc35232da1f25127db53ba4fb05aa052030932d0a9026efd2a3ada67f33d401cd9a97ddb24c606af3a0a0c24e432aba0142af9b4686c6ca30b0ac39133fa76d8682b7bbbec488e62e652d3f25419777da0940f31617e91cfbabaa9d0d1638949f8125f80a43027122778522675194a4e65a0edc4c7d2cf30150fdf7e502d0ef06c80c85fc37260134a112493c6183f62f4b580f902e720b902e3f902e00183192ee2b9010000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000200000000000000008000000000000000000000100200000000000000000010000000000000200000000000000000000000000000000000010000000000000000000000000000004000000000000000000000000400004001000000000020000000000000000000000000080000000000000408000000040000000000000000002000000000000000000000000000000000000000000000000000000000010000000000000000010000000000000000000000000000000000000000000f901d5f89b94f2bb7bfa19e7c4b6bb333ee1afdf8e5e8f9b3561f863a0ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3efa0000000000000000000000000b0ea8c9ee8aa87efd28a12de8c034f947c144053a00000000000000000000000000765efb302d504751c652c5b1d65e8e9edf2e70fa000000000000000000000000000000000000000000000000000000002540be400f89b94f2bb7bfa19e7c4b6bb333ee1afdf8e5e8f9b3561f863a08c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925a0000000000000000000000000b0ea8c9ee8aa87efd28a12de8c034f947c144053a00000000000000000000000000765efb302d504751c652c5b1d65e8e9edf2e70fa00000000000000000000000000000000000000000000000000000000000000000f899940765efb302d504751c652c5b1d65e8e9edf2e70fe1a09c6dea23fe3b510bb5d170df49dc74e387692eaa3258c691918cd3aa94f5fb74b860000000000000000000000000b0ea8c9ee8aa87efd28a12de8c034f947c14405300000000000000000000000000000000000000000000000000000002540be40000000000000000000000000000000000000000000000000000000808000000020000', 'hex'),
    asset: {
      allocation: [{ assetGuid: 2615707979, values: [{ n: 0, value: new BN(10000000000) }], notarysig: Buffer.from('') }, { assetGuid: 2305793883, values: [{ n: 2, value: new BN(90000000) }], notarysig: Buffer.from('') }],
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
  dataAmount: new BN(10000000000),
  sysChangeAddress: 'tsys1qp7qn0t0t6ymwhdwne9uku7v3dhw07a7tra8hzl',
  assetMap: new Map([
    [2615707979, { changeAddress: 'tsys1qjfcltq5yljfzkljxdnlc0ffmhqudz8ltq0z695', outputs: [{ value: new BN(10000000000), address: 'tsys1qdflre2yd37qtpqe2ykuhwandlhq04r2td2t9ae' }] }]
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
    hex: '81000000000101684c965ed8b542a614743b91faa18989dd4ad5bd66a2326a2f648b2602fbdb640000000000fdffffff02b2020000000000001600146a7e3ca88d8f80b0832a25b977766dfdc0fa8d4b00e40b54020000000b6a09014b89e89b010064000248304502210093785a84a98fd5faa2b64afa80b04c82795a4fdad6748de3c1978d5d4cd4856102200170c5959ce1658f8c990fe59705b060e5c5b37639c1af703cc6468f426d7961012103b7eeb47fdd1c2084ef795fac22bf24185e7295d2efa3178b69b6eca409810fba00000000',
    rbf: true,
    version: syscointx.utils.SYSCOIN_TX_VERSION_SYSCOIN_BURN_TO_ALLOCATION,
    numOutputs: 2,
    script: Buffer.from('6a09014b89e89b01006400', 'hex'),
    asset: {
      allocation: [{ assetGuid: 2615707979, values: [{ n: 0, value: new BN(10000000000) }], notarysig: Buffer.from('') }]
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
      { txid: '64dbfb02268b642f6a32a266bdd54add8989a1fa913b7414a642b5d85e964c68', vout: 0, address: 'tsys1qh4k0mpx4xqju3zgcvtkynvqrd5ryqhg0yr9uk8', path: "m/84'/1'/0'/0/10", value: '1000000', assetInfo: { assetGuid: 2305793883, value: '90000000' } },
      { txid: '9f586de3e6d8ce33b1c6de709c992cb431cc324ab3bc6dff5537137aa4b17022', vout: 1, address: 'tsys1qjfcltq5yljfzkljxdnlc0ffmhqudz8ltq0z695', path: "m/84'/1'/0'/0/5", value: '6900', assetInfo: { assetGuid: 2369540753, value: '10000000' } }
    ],
    assets: [
      {
        assetGuid: 2305793883,
        decimals: 8,
        pubData: { desc: syscointx.utils.encodeToBase64('publicvalue') },
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 127,
        totalSupply: '0',
        maxSupply: '100000000000'
      },
      {
        assetGuid: 2369540753,
        decimals: 8,
        pubData: { desc: syscointx.utils.encodeToBase64('publicvalue') },
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 127,
        totalSupply: '0',
        maxSupply: '100000000000'
      }
    ]
  },
  dataAmount: new BN(10000000000),
  sysChangeAddress: 'tsys1qp7qn0t0t6ymwhdwne9uku7v3dhw07a7tra8hzl',
  assetMap: new Map([
    [2615707979, { changeAddress: 'tsys1qjfcltq5yljfzkljxdnlc0ffmhqudz8ltq0z695', outputs: [{ value: new BN(10000000000), address: 'tsys1qdflre2yd37qtpqe2ykuhwandlhq04r2td2t9ae' }] }]
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
    hex: '81000000000101684c965ed8b542a614743b91faa18989dd4ad5bd66a2326a2f648b2602fbdb640000000000fdffffff03b2020000000000001600146a7e3ca88d8f80b0832a25b977766dfdc0fa8d4b00e40b5402000000136a11024b89e89b010064005b9f6f8901025800b2020000000000001600140f8137adebd136ebb5d3c9796e79916ddcff77cb02473044022010caf81f96d3a51757062e49ad565e96f8a046b7c82d37bec1650c0dd5667f4102201f041e9cab14be118bc45f1623e4f7d8be0f22a088eb7f82e677c58f26e3ee40012103b7eeb47fdd1c2084ef795fac22bf24185e7295d2efa3178b69b6eca409810fba00000000',
    rbf: true,
    version: syscointx.utils.SYSCOIN_TX_VERSION_SYSCOIN_BURN_TO_ALLOCATION,
    numOutputs: 3,
    script: Buffer.from('6a11024b89e89b010064005b9f6f8901025800', 'hex'),
    asset: {
      allocation: [{ assetGuid: 2615707979, values: [{ n: 0, value: new BN(10000000000) }], notarysig: Buffer.from('') }, { assetGuid: 2305793883, values: [{ n: 2, value: new BN(90000000) }], notarysig: Buffer.from('') }]
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
      { txid: '64dbfb02268b642f6a32a266bdd54add8989a1fa913b7414a642b5d85e964c68', vout: 0, address: 'tsys1qh4k0mpx4xqju3zgcvtkynvqrd5ryqhg0yr9uk8', path: "m/84'/1'/0'/0/10", value: '10000000000', assetInfo: { assetGuid: 2615707979, value: '90000000' } },
      { txid: '9f586de3e6d8ce33b1c6de709c992cb431cc324ab3bc6dff5537137aa4b17022', vout: 1, address: 'tsys1qjfcltq5yljfzkljxdnlc0ffmhqudz8ltq0z695', path: "m/84'/1'/0'/0/5", value: '6900', assetInfo: { assetGuid: 2369540753, value: '10000000' } }
    ],
    assets: [
      {
        assetGuid: 2615707979,
        decimals: 8,
        pubData: { desc: syscointx.utils.encodeToBase64('publicvalue') },
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 127,
        totalSupply: '0',
        maxSupply: '100000000000'
      },
      {
        assetGuid: 2369540753,
        decimals: 8,
        pubData: { desc: syscointx.utils.encodeToBase64('publicvalue') },
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 127,
        totalSupply: '0',
        maxSupply: '100000000000'
      }
    ]
  },
  dataAmount: new BN(10000000000),
  sysChangeAddress: 'tsys1qp7qn0t0t6ymwhdwne9uku7v3dhw07a7tra8hzl',
  assetMap: new Map([
    [2615707979, { changeAddress: 'tsys1qjfcltq5yljfzkljxdnlc0ffmhqudz8ltq0z695', outputs: [{ value: new BN(10000000000), address: 'tsys1qdflre2yd37qtpqe2ykuhwandlhq04r2td2t9ae' }] }]
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
    hex: '81000000000101684c965ed8b542a614743b91faa18989dd4ad5bd66a2326a2f648b2602fbdb640000000000fdffffff03b2020000000000001600146a7e3ca88d8f80b0832a25b977766dfdc0fa8d4bb2020000000000001600149271f58284fc922b7e466cff87a53bb838d11feb00e40b54020000000d6a0b014b89e89b02006401580002473044022060b19f38e0f241178d270109db8a4ce9da6ac1f1eb30dcef25a7abb374c6829e02207a198b608748284ae97323dd8cbea7d0fa11c1fe6938e1d7f6750217ed7b44e0012103b7eeb47fdd1c2084ef795fac22bf24185e7295d2efa3178b69b6eca409810fba00000000',
    rbf: true,
    version: syscointx.utils.SYSCOIN_TX_VERSION_SYSCOIN_BURN_TO_ALLOCATION,
    numOutputs: 3,
    script: Buffer.from('6a0b014b89e89b020064015800', 'hex'),
    asset: {
      allocation: [{ assetGuid: 2615707979, values: [{ n: 0, value: new BN(10000000000) }, { n: 1, value: new BN(90000000) }], notarysig: Buffer.from('') }]
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
      { txid: '386efe525b6b3f29fb6cb982da3710d2ea324a31ce3448ea76122a6b1150c530', vout: 1, address: 'tsys1qjfcltq5yljfzkljxdnlc0ffmhqudz8ltq0z695', path: "m/84'/1'/0'/0/5", value: '99970714', assetInfo: { assetGuid: 2305793883, value: '90000000' } },
      { txid: '395f36f4dd4d65d9bd95be4207dcae91a2b6d256a832458aa42b40922b3beb64', vout: 1, address: 'tsys1qjfcltq5yljfzkljxdnlc0ffmhqudz8ltq0z695', path: "m/84'/1'/0'/0/5", value: '19996260' }
    ],
    assets: [
      {
        assetGuid: 2305793883,
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
    hex: '8700000000010264eb3b2b92402ba48a4532a856d2b6a291aedc0742be95bdd9654dddf4365f390100000000ffffffff30c550116b2a1276ea4834ce314a32ead21037da82b96cfb293f6b5b52fe6e380100000000ffffffff0300e1f50500000000160014bd6cfd84d53025c8891862ec49b0036d06405d0fd0a23001000000001600149271f58284fc922b7e466cff87a53bb838d11feb00000000000000000b6a09015b9f6f890101580002473044022043d03b6b925a9a9ff195105bf9caebcd19ad5f9a9193662d50807b09b08090cb022001fa80733e554b8aaeb451ed92df86b3892590608e8ab8ca2485a37f8d6fdcfc012103c86473f098d9bb69d31a7851372f9ded7b11691a77c253279e987373164b2ad202473044022038c6e87ec6ce3b2ecdfd494afd503afd9cccf4f31d70e1354eb1730c5947247702204835f047151e9f57945a616a370ebf09e9e080562d0e6510cb31ce95334d9a1c012103c86473f098d9bb69d31a7851372f9ded7b11691a77c253279e987373164b2ad200000000',
    rbf: false,
    version: syscointx.utils.SYSCOIN_TX_VERSION_ALLOCATION_SEND,
    numOutputs: 3, // 3 because new opreturn will be created
    script: Buffer.from('6a09015b9f6f8901015800', 'hex'),
    asset: {
      allocation: [{ assetGuid: 2305793883, values: [{ n: 1, value: new BN(90000000) }], notarysig: Buffer.from('') }]
    },
    receivingIndex: 11,
    changeIndex: 3
  }
}
]
