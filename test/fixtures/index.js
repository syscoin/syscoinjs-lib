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
      { txId: 'b61045108705d2a65774238174bfa9110ccaad43a98a9b289a79da0696cac0b8', vout: 0, script: Buffer.from('0014de5ae4961d07ca3d0e2e10136f27ce9c2822f7fd', 'hex'), path: "m/84'/1'/0'/0/0", value: 100000000000 }
    ]
  },
  assetOpts: { precision: 8, symbol: 'CAT', updatecapabilityflags: 255, balance: new BN(10000000000), maxsupply: new BN(100000000000), description: 'publicvalue' },
  sysChangeAddress: 'tsys1qq43tjdd753rct3jj39yvr855gytwf3y8p5kuf9',
  expected: {
    hex: '82000000000101b8c0ca9606da799a289b8aa943adca0c11a9bf7481237457a6d20587104510b60000000000ffffffff0200d6117e03000000356a3301b8c0ca9601010000080451304655851b7b2264657363223a226348566962476c6a646d46736457553d227d0064008668ff00860465ca130000001600140562b935bea44785c6528948c19e944116e4c48702473044022024de312b8f370a292d39cea462f30763c9ebdb82423fe808d8c9ced1de1154e4022015b9a5d7d1c83967a9c37175e0f053a41ecee48d078755aae760ce98744c10ce0121032563fbbbbe4d1e551f12d01e213d14830db0ae15a781b9c9ebf7f2fe5786eb2100000000',
    rbf: false,
    numOutputs: 2,
    script: Buffer.from('6a3301b8c0ca9601010000080451304655851b7b2264657363223a226348566962476c6a646d46736457553d227d0064008668ff00', 'hex'),
    asset: {
      allocation: [{ assetGuid: 2529870008, values: [{ n: 1, value: new BN(0) }], notarysig: Buffer.from('') }],
      precision: 8,
      symbol: Buffer.from(syscointx.utils.encodeToBase64('CAT')),
      updateflags: 133,
      pubdata: syscointx.utils.encodePubDataFromFields('publicvalue'),
      prevpubdata: Buffer.from(''),
      balance: new BN(10000000000),
      totalsupply: new BN(0),
      maxsupply: new BN(100000000000),
      updatecapabilityflags: 255,
      prevupdatecapabilityflags: 0
    }
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
      { txId: 'a7f5c979d8fc80f05d8434e04cb9e46cdaa56551d23dd790ba5d7f2c15f529fd', vout: 1, script: Buffer.from('00140562b935bea44785c6528948c19e944116e4c487', 'hex'), path: "m/84'/1'/0'/1/0", value: 84999996550, assetInfo: { assetGuid: 2529870008, value: 0 } }
    ],
    assets: [
      {
        assetGuid: 2529870008,
        decimals: 8,
        pubData: syscointx.utils.encodePubDataFromFields('publicvalue').toString(),
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 255,
        balance: 10000000000,
        totalSupply: 10000000000,
        maxSupply: 100000000000
      }
    ]
  },
  assetGuid: 2529870008,
  assetOpts: { updatecapabilityflags: 127, balance: new BN(42000000000), contract: Buffer.from('2b1e58b979e4b2d72d8bca5bb4646ccc032ddbfc', 'hex'), description: 'new publicvalue' },
  sysChangeAddress: 'tsys1qp7qn0t0t6ymwhdwne9uku7v3dhw07a7tra8hzl',
  assetMap: new Map([
    [2529870008, { changeAddress: 'tsys1qt8aq6hrrlc6ueps4wqc6ynfckrxxrw20ydamc9', outputs: [{ value: new BN(0), address: 'tsys1qt8aq6hrrlc6ueps4wqc6ynfckrxxrw20ydamc9' }] }]
  ]),
  expected: {
    hex: '83000000000101fd29f5152c7f5dba90d73dd25165a5da6ce4b94ce034845df080fcd879c9f5a70100000000fdffffff020000000000000000676a4c6401b8c0ca9601010000080087142b1e58b979e4b2d72d8bca5bb4646ccc032ddbfc001f7b2264657363223a22626d563349484231596d787059335a686248566c227d1b7b2264657363223a226348566962476c6a646d46736457553d227d822400007fff18f564ca1300000016001459fa0d5c63fe35cc86157031a24d38b0cc61b94f024730440220794c2914c9aa81b7913d1b196b8cf8ae34ccf5fa59d83fc6b5b6db9f138873b1022030ce496a8316c7c670aadef5df33b2b23cfb2ce354c7a02c1872574cce91d12d012103e4d8568a37e0afb8f220178b640454e91c9e9e7e2425be9e43142a7c3140e2e900000000',
    rbf: true,
    numOutputs: 2,
    script: Buffer.from('6a4c6401b8c0ca9601010000080087142b1e58b979e4b2d72d8bca5bb4646ccc032ddbfc001f7b2264657363223a22626d563349484231596d787059335a686248566c227d1b7b2264657363223a226348566962476c6a646d46736457553d227d822400007fff', 'hex'),
    asset: {
      allocation: [{ assetGuid: 2529870008, values: [{ n: 1, value: new BN(0) }], notarysig: Buffer.from('') }],
      precision: 8,
      symbol: Buffer.from(''),
      updateflags: 135,
      contract: Buffer.from('2b1e58b979e4b2d72d8bca5bb4646ccc032ddbfc', 'hex'),
      prevcontract: Buffer.from(''),
      pubdata: syscointx.utils.encodePubDataFromFields('new publicvalue'),
      prevpubdata: syscointx.utils.encodePubDataFromFields('publicvalue'),
      balance: new BN(42000000000),
      totalsupply: new BN(0),
      maxsupply: new BN(0),
      updatecapabilityflags: 127,
      prevupdatecapabilityflags: 255
    }
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
      { txId: '90652f37eeb24374d8cfef5b73ac4c10e31fb54ac864e0d9f8250af76985eb9d', vout: 1, script: Buffer.from('001459fa0d5c63fe35cc86157031a24d38b0cc61b94f', 'hex'), path: "m/84'/1'/0'/1/2", value: 84999992600, assetInfo: { assetGuid: 2529870008, value: 0 } }
    ],
    assets: [
      {
        assetGuid: 2529870008,
        decimals: 8,
        pubData: syscointx.utils.encodePubDataFromFields('new publicvalue').toString(),
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 127,
        balance: 52000000000,
        totalSupply: 52000000000,
        maxSupply: 100000000000
      }
    ]
  },
  sysChangeAddress: 'tsys1qp7qn0t0t6ymwhdwne9uku7v3dhw07a7tra8hzl',
  assetMap: new Map([
    [2529870008, { changeAddress: 'tsys1qp7qn0t0t6ymwhdwne9uku7v3dhw07a7tra8hzl', outputs: [{ value: new BN(1000000000), address: 'tsys1qsvcfskmtg0rlh03v2aazvhqj3r7gkqnzaej258' }, { value: new BN(0), address: 'tsys1qp7qn0t0t6ymwhdwne9uku7v3dhw07a7tra8hzl' }] }]
  ]),
  expected: {
    hex: '840000000001019deb8569f70a25f8d9e064c84ab51fe3104cac735befcfd87443b2ee372f65900100000000ffffffff03b2020000000000001600148330985b6b43c7fbbe2c577a265c1288fc8b026200000000000000000d6a0b01b8c0ca9602000a02000046e564ca130000001600140f8137adebd136ebb5d3c9796e79916ddcff77cb0247304402202bbb7e58f12d2a773caecdb3970f468ec0ba6073fc1cf506f513edba364c613b0220753ee324c56586ad12be7080c5bd2ff7b056188b50872f0b57679d258a26d30a012102f249cb8576b8d9c6f0d45bb3ab3b73654911b724f229ec0a5a2f45785e1e47c900000000',
    rbf: false,
    numOutputs: 3,
    script: Buffer.from('6a0b01b8c0ca9602000a020000', 'hex'),
    asset: {
      allocation: [{ assetGuid: 2529870008, values: [{ n: 0, value: new BN(1000000000) }, { n: 2, value: new BN(0) }], notarysig: Buffer.from('') }]
    }
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
      { txId: '44f1038835a563bacdbaa9873b35f97d968ecf1e1bf53452b5fcabd1bfdfad35', vout: 0, script: Buffer.from('0014821728879272128eda52cccb59450576dc5a7cf1', 'hex'), path: "m/84'/1'/0'/1/3", value: 980, assetInfo: { assetGuid: 2529870008, value: 1000000000 } },
      { txId: '3f0536c23125183e99bfd021fb6a7bb279ccc739356985058cfc15b0a0e52946', vout: 0, script: Buffer.from('00140f8137adebd136ebb5d3c9796e79916ddcff77cb', 'hex'), path: "m/84'/1'/0'/1/1", value: 84999988550 }
    ],
    assets: [
      {
        assetGuid: 2529870008,
        decimals: 8,
        pubData: syscointx.utils.encodePubDataFromFields('new publicvalue').toString(),
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 127,
        balance: 42000000000,
        totalSupply: 52000000000,
        maxSupply: 100000000000
      }
    ]
  },
  sysChangeAddress: 'tsys1qcflmge9vann8405ws2y69jwt94sv40kd7rqexs',
  assetMap: new Map([
    [2529870008, { changeAddress: 'tsys1qcflmge9vann8405ws2y69jwt94sv40kd7rqexs', outputs: [{ value: new BN(600000000), address: 'tsys1q3hqp7rgcvsphpcy3rxyhjwvyv647mz58peqctz' }] }]
  ]),
  expected: {
    hex: '8700000000010235addfbfd1abfcb55234f51b1ecf8e967df9353b87a9bacdba63a5358803f1440000000000fdffffff4629e5a0b015fc8c0585693539c7cc79b27b6afb21d0bf993e182531c236053f0000000000fdffffff03b2020000000000001600148dc01f0d18640370e091198979398466abed8a8700000000000000000d6a0b01b8c0ca9602003b02270080d364ca13000000160014c27fb464acece67abe8e8289a2c9cb2d60cabecd0247304402204899945f69e6605d107f602609a46396554723fcc6dc85f08bd933514b0ff78702200da90c9387473e1f0ef42e0195b98f094257c949400d5a7d2562b98ae519e766012103e493f90c55de11c1b3aa3fc13b337807c7c1e121a2767856cfd6946e18c7fcc10247304402201a5d8000030ece78d58b54e363145ef1824ab369fb589b34c432a0859177055b0220409ff980e82fd91724e8e29a634e1b736639fc349cafacc83fd6ccaba1a73316012102e58139f9d633d5d1d76feb87fc2c44705cc317e83ade1a812f8d2a4ae7be9cb500000000',
    rbf: true,
    numOutputs: 3,
    script: Buffer.from('6a0b01b8c0ca9602003b022700', 'hex'),
    asset: {
      allocation: [{ assetGuid: 2529870008, values: [{ n: 0, value: new BN(600000000) }, { n: 2, value: new BN(400000000) }], notarysig: Buffer.from('') }]
    }
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
      { txId: 'c5c2af64e6f8d0732b2250416eecc063f22161b9cd14eda802c97ed518d173e0', vout: 0, script: Buffer.from('0014e8cc042a7c976ab0068cf0e4fcae4845d41774a7', 'hex'), path: "m/84'/1'/0'/0/4", value: 980, assetInfo: { assetGuid: 2369540753, value: 100000000 } },
      { txId: '4fdab120b984f7bcf0c9458f9783ec0b3169a292de7e40a2612db1f7d4fd6efb', vout: 0, script: Buffer.from('00149271f58284fc922b7e466cff87a53bb838d11feb', 'hex'), path: "m/84'/1'/0'/0/5", value: 980, assetInfo: { assetGuid: 650700076, value: 200000000 } },
      { txId: '931dbdcd8098918e306c43c2f9ee9a6c2fac4c06190a669809c83f3a48f7b522', vout: 0, script: Buffer.from('0014248a521f8561af8f735d0f5e6d13f41177e423bd', 'hex'), path: "m/84'/1'/0'/0/6", value: 980, assetInfo: { assetGuid: 2699372871, value: 300000000 } },
      { txId: '66d6841bef92b91344f793bbd43b2cd139e9da4b82b6f13e9e967cf793c384e1', vout: 0, script: Buffer.from('001476ddc768b9ae22e2645ed1a161cbe1cd9ec52efb', 'hex'), path: "m/84'/1'/0'/0/11", value: 294, assetInfo: { assetGuid: 402223530, value: 400000000 } }, // m/84'/1'/0'/0/7 had some kind of collision the pub/priv key didn't match between js and core
      { txId: '212680579797d8bf19a2c4bbde5fb7f35296b82ed02c7d0a22281d1d2a47edf2', vout: 0, script: Buffer.from('00147326551112dd129f478b4a3fe4fab809c7fb2d0c', 'hex'), path: "m/84'/1'/0'/0/8", value: 980, assetInfo: { assetGuid: 1537060536, value: 500000000 } },
      { txId: '57219dc0fd292caa06c54e1af6125323181a4c86921442e6d508275b30086682', vout: 0, script: Buffer.from('0014413e8fd29b2f671b6058c9f50bf51bf971274e53', 'hex'), path: "m/84'/1'/0'/0/9", value: 980, assetInfo: { assetGuid: 2305793883, value: 600000000 } },
      { txId: 'c8a2159c47a5af4251b0576ce22d859996f9e9fbfffc804a9bd745848fe3d642', vout: 0, script: Buffer.from('0014bd6cfd84d53025c8891862ec49b0036d06405d0f', 'hex'), path: "m/84'/1'/0'/0/10", value: 100000000 }
    ],
    assets: [
      {
        assetGuid: 2369540753,
        decimals: 8,
        pubData: syscointx.utils.encodePubDataFromFields('publicvalue').toString(),
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 255,
        balance: 10000000000,
        totalSupply: 0,
        maxSupply: 100000000000,
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
        pubData: syscointx.utils.encodePubDataFromFields('publicvalue').toString(),
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 255,
        balance: 10000000000,
        totalSupply: 0,
        maxSupply: 100000000000,
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
        pubData: syscointx.utils.encodePubDataFromFields('publicvalue').toString(),
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 255,
        balance: 10000000000,
        totalSupply: 0,
        maxSupply: 100000000000,
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
        pubData: syscointx.utils.encodePubDataFromFields('publicvalue').toString(),
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 255,
        balance: 10000000000,
        totalSupply: 0,
        maxSupply: 100000000000,
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
        pubData: syscointx.utils.encodePubDataFromFields('publicvalue').toString(),
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 255,
        balance: 10000000000,
        totalSupply: 0,
        maxSupply: 100000000000,
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
        pubData: syscointx.utils.encodePubDataFromFields('publicvalue').toString(),
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 255,
        balance: 10000000000,
        totalSupply: 0,
        maxSupply: 100000000000
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
  expected: {
    hex: '87000000000107e073d118d57ec902a8ed14cdb96121f263c0ec6e4150222b73d0f8e664afc2c50000000000fdfffffffb6efdd4f7b12d61a2407ede92a269310bec83978f45c9f0bcf784b920b1da4f0000000000fdffffff22b5f7483a3fc80998660a19064cac2f6c9aeef9c2436c308e919880cdbd1d930000000000fdffffffe184c393f77c969e3ef1b6824bdae939d12c3bd4bb93f74413b992ef1b84d6660000000000fdfffffff2ed472a1d1d28220a7d2cd02eb89652f3b75fdebbc4a219bfd89797578026210000000000fdffffff826608305b2708d5e6421492864c1a18235312f61a4ec506aa2c29fdc09d21570000000000fdffffff42d6e38f8445d79b4a80fcfffbe9f99699852de26c57b05142afa5479c15a2c80000000000fdffffff0cb202000000000000160014e8cc042a7c976ab0068cf0e4fcae4845d41774a7b2020000000000001600149271f58284fc922b7e466cff87a53bb838d11febb202000000000000160014248a521f8561af8f735d0f5e6d13f41177e423bdb202000000000000160014248a521f8561af8f735d0f5e6d13f41177e423bdb202000000000000160014581c4fc0439986b761b5110ee86a60f8c563f7cab202000000000000160014581c4fc0439986b761b5110ee86a60f8c563f7cab2020000000000001600147326551112dd129f478b4a3fe4fab809c7fb2d0cb2020000000000001600147326551112dd129f478b4a3fe4fab809c7fb2d0cb202000000000000160014413e8fd29b2f671b6058c9f50bf51bf971274e53b202000000000000160014413e8fd29b2f671b6058c9f50bf51bf971274e530000000000000000fd87016a4d83010691523c8d020b300030411f966b65ef1a09aae16339a092faa80a296bd71e2c6ea4e4a640f8e6e49a61b69f6fbde81a777f31aa0b6717c6173ec3752536e531fbeeb691c5f956386293513a2ce5c826010113412017441c2dcd7918a2b4f3573b491735abb0cde2cbfc72b756fbac29a9e9c7f3c4372db62cece2fdc2c02b26482f437de9f7c202691e3d59319f0d294b89ee01b34729e5a0020280640330411f637aa818bf059812d45caf60cbc861e91ec9a6d90a4db1c106c87fb4824116247fe60b00a12efda63da225658a1b8620135565778bfe776e633093a6603b5e01aa71f91702041d05094120e2974041e1e3e8f3eb32023f9280e20e78c0bd53c7ee94a58d12a0cc2d3b88252f78d562c44c59ab3dd8e3f4a55450d906b99419712ea08478202a75cfb0b33db8ae9d5b0206813e07800a411f9cc9b26cc0baa63c7331f6cb1e2f8b0da34236a97e063ff203b8990ae80787bf63c0d61017ab1f50919cd6de7cf34fb74470536d83f2bcccc75de2ad9a40d71c5b9f6f89020831090900dc90f50500000000160014e8cc042a7c976ab0068cf0e4fcae4845d41774a702483045022100e9e8c1be31e9bf7ed6f2e2e78d3cfd523dede9080b2992eb35371e1528a373bc022023d4cbc30c09f3bb54de8bfcbc180fb1ce576426984d4cd5f15435b53078d96a01210281c11974da83e7d9ff9f47a3c32e3baa7975b5127eb447b86a2f7fd4c9d12fec024830450221008ddc862b0dc0d9bed31b49035a308e18cf080cfb83f53edbc348a98e833c6e9002203ddb3aa0350c47234e996a32469be2e3955e30f6373998fe317f300601978ec9012103c86473f098d9bb69d31a7851372f9ded7b11691a77c253279e987373164b2ad202483045022100d9a90891051616f4cbabd096a32dc87835441b4f628a4583febe463d762eb8f502203c71a3dfe98742e2f22e8c2c591544ac4e1ce22fa048679ede6fd5ddc718369b012102f165ced59862353282a8fd32ac10d018c4bc449e6dabc77a7d810ca2be6f69fd02483045022100ba04e9f9d42ec9c4f868904e3cfc73782ea33e74b94b9a9e2c1aa280451793a90220219492dffba517e40c034ef2396854a7eefc26889e7dd1f4dacbb060a577bded0121025eea502cd2da208247cdd27701a2efea1e64aebf7c476362c1a6c0d1416c25f302483045022100ce4ca12994fd5544f585a4c115fee9e987368e1837247ce7fea38c8fd9262d7d02203a329192e20d4e15af8468a5f2eb0c25b6f9ae5191508b5ad5d5b2ce4e2e439d012102ccb8a1b346388ff9691d6ee1b2019956e93e5550130cbfe2e866477193b22a3f0247304402207c437aaec1d620272a621f0e0e1579a5c63e5d1b3fb20b6ee0cf467c3465bd61022017fa4a5da3668072e922e600d423373b8d5e306214065e205395ba54efbd5cc2012102b7d4e03f4230eb2406328be6bf9dbd400083b929c07a4b0b3601589b3243067402473044022066610598d209b7e11d95728c5d5161523ebb0c9e00df3151098e1793e799ab16022015d2b6029c84243f6a1a3f103c5701c3293997dece50bc4a222b84b37ead1efb012103b7eeb47fdd1c2084ef795fac22bf24185e7295d2efa3178b69b6eca409810fba00000000',
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
    }
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
      { txId: 'c5c2af64e6f8d0732b2250416eecc063f22161b9cd14eda802c97ed518d173e0', vout: 0, script: Buffer.from('0014e8cc042a7c976ab0068cf0e4fcae4845d41774a7', 'hex'), path: "m/84'/1'/0'/0/4", value: 9800, assetInfo: { assetGuid: 2369540753, value: 100000000 } },
      { txId: '4fdab120b984f7bcf0c9458f9783ec0b3169a292de7e40a2612db1f7d4fd6efb', vout: 0, script: Buffer.from('00149271f58284fc922b7e466cff87a53bb838d11feb', 'hex'), path: "m/84'/1'/0'/0/5", value: 9800, assetInfo: { assetGuid: 650700076, value: 200000000 } },
      { txId: '931dbdcd8098918e306c43c2f9ee9a6c2fac4c06190a669809c83f3a48f7b522', vout: 0, script: Buffer.from('0014248a521f8561af8f735d0f5e6d13f41177e423bd', 'hex'), path: "m/84'/1'/0'/0/6", value: 980, assetInfo: { assetGuid: 2699372871, value: 300000000 } },
      { txId: '66d6841bef92b91344f793bbd43b2cd139e9da4b82b6f13e9e967cf793c384e1', vout: 0, script: Buffer.from('001476ddc768b9ae22e2645ed1a161cbe1cd9ec52efb', 'hex'), path: "m/84'/1'/0'/0/11", value: 294, assetInfo: { assetGuid: 402223530, value: 400000000 } }, // m/84'/1'/0'/0/7 had some kind of collision the pub/priv key didn't match between js and core
      { txId: '212680579797d8bf19a2c4bbde5fb7f35296b82ed02c7d0a22281d1d2a47edf2', vout: 0, script: Buffer.from('00147326551112dd129f478b4a3fe4fab809c7fb2d0c', 'hex'), path: "m/84'/1'/0'/0/8", value: 9800, assetInfo: { assetGuid: 1537060536, value: 500000000 } },
      { txId: '57219dc0fd292caa06c54e1af6125323181a4c86921442e6d508275b30086682', vout: 0, script: Buffer.from('0014413e8fd29b2f671b6058c9f50bf51bf971274e53', 'hex'), path: "m/84'/1'/0'/0/9", value: 980, assetInfo: { assetGuid: 2305793883, value: 600000000 } }
    ],
    assets: [
      {
        assetGuid: 2369540753,
        decimals: 8,
        pubData: syscointx.utils.encodePubDataFromFields('publicvalue').toString(),
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 255,
        balance: 10000000000,
        totalSupply: 0,
        maxSupply: 100000000000,
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
        pubData: syscointx.utils.encodePubDataFromFields('publicvalue').toString(),
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 255,
        balance: 10000000000,
        totalSupply: 0,
        maxSupply: 100000000000,
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
        pubData: syscointx.utils.encodePubDataFromFields('publicvalue').toString(),
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 255,
        balance: 10000000000,
        totalSupply: 0,
        maxSupply: 100000000000,
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
        pubData: syscointx.utils.encodePubDataFromFields('publicvalue').toString(),
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 255,
        balance: 10000000000,
        totalSupply: 0,
        maxSupply: 100000000000,
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
        pubData: syscointx.utils.encodePubDataFromFields('publicvalue').toString(),
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 255,
        balance: 10000000000,
        totalSupply: 0,
        maxSupply: 100000000000,
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
        pubData: syscointx.utils.encodePubDataFromFields('publicvalue').toString(),
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 255,
        balance: 10000000000,
        totalSupply: 0,
        maxSupply: 100000000000
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
  expected: {
    hex: '87000000000106e073d118d57ec902a8ed14cdb96121f263c0ec6e4150222b73d0f8e664afc2c50000000000fdfffffffb6efdd4f7b12d61a2407ede92a269310bec83978f45c9f0bcf784b920b1da4f0000000000fdffffff22b5f7483a3fc80998660a19064cac2f6c9aeef9c2436c308e919880cdbd1d930000000000fdffffffe184c393f77c969e3ef1b6824bdae939d12c3bd4bb93f74413b992ef1b84d6660000000000fdfffffff2ed472a1d1d28220a7d2cd02eb89652f3b75fdebbc4a219bfd89797578026210000000000fdffffff826608305b2708d5e6421492864c1a18235312f61a4ec506aa2c29fdc09d21570000000000fdffffff0cb202000000000000160014e8cc042a7c976ab0068cf0e4fcae4845d41774a7b2020000000000001600149271f58284fc922b7e466cff87a53bb838d11febb202000000000000160014248a521f8561af8f735d0f5e6d13f41177e423bdb202000000000000160014248a521f8561af8f735d0f5e6d13f41177e423bdb202000000000000160014581c4fc0439986b761b5110ee86a60f8c563f7cab202000000000000160014581c4fc0439986b761b5110ee86a60f8c563f7cab2020000000000001600147326551112dd129f478b4a3fe4fab809c7fb2d0cb2020000000000001600147326551112dd129f478b4a3fe4fab809c7fb2d0cb202000000000000160014413e8fd29b2f671b6058c9f50bf51bf971274e53b202000000000000160014413e8fd29b2f671b6058c9f50bf51bf971274e530000000000000000fd87016a4d83010691523c8d020b300030411f966b65ef1a09aae16339a092faa80a296bd71e2c6ea4e4a640f8e6e49a61b69f6fbde81a777f31aa0b6717c6173ec3752536e531fbeeb691c5f956386293513a2ce5c826010113412017441c2dcd7918a2b4f3573b491735abb0cde2cbfc72b756fbac29a9e9c7f3c4372db62cece2fdc2c02b26482f437de9f7c202691e3d59319f0d294b89ee01b34729e5a0020280640330411f637aa818bf059812d45caf60cbc861e91ec9a6d90a4db1c106c87fb4824116247fe60b00a12efda63da225658a1b8620135565778bfe776e633093a6603b5e01aa71f91702041d05094120e2974041e1e3e8f3eb32023f9280e20e78c0bd53c7ee94a58d12a0cc2d3b88252f78d562c44c59ab3dd8e3f4a55450d906b99419712ea08478202a75cfb0b33db8ae9d5b0206813e07800a411f9cc9b26cc0baa63c7331f6cb1e2f8b0da34236a97e063ff203b8990ae80787bf63c0d61017ab1f50919cd6de7cf34fb74470536d83f2bcccc75de2ad9a40d71c5b9f6f89020831090900001d000000000000160014e8cc042a7c976ab0068cf0e4fcae4845d41774a7024830450221009b6098cf05778be1320ac353ecf381b29b1f099b4df39f209db3ea1e13ad146b02204ca9ed262dafc9087257a094abf9df3fef4ccbe40ebaba29aba8da95045bec9501210281c11974da83e7d9ff9f47a3c32e3baa7975b5127eb447b86a2f7fd4c9d12fec02473044022070e179cabebeb402ce9cb9edaf15edc458250a48b5e184ad8135aa1c0c12c49602200780103de0f1378c3aa746fa1d63ad4b00799a9d2d338d3fa60350f354320f55012103c86473f098d9bb69d31a7851372f9ded7b11691a77c253279e987373164b2ad20248304502210087931581450bd09d98064d819b864f2062ca6a8f9bf60a379743f4e8497f44de022064ba6280b9007c457f40ea32d3260d9ea68c38c91210054cbd137ccbf1b619a3012102f165ced59862353282a8fd32ac10d018c4bc449e6dabc77a7d810ca2be6f69fd0247304402205f1e03d0fcce3cbee569383e9c258df8bd259354a3e44656879fa7f0c94e5f0a02205dc3c2fdaab6dd952899080f74d5ac3ff5e24abde5c1b4ae983562ea513d86800121025eea502cd2da208247cdd27701a2efea1e64aebf7c476362c1a6c0d1416c25f30247304402200105d26658b8e2ed69adf05d70b2295d2d496043f298d8c8668f61137efc7755022009d60666bfe6753fcbd03b68fc7f275c97263fa4228c63e5d474eafcd8da4779012102ccb8a1b346388ff9691d6ee1b2019956e93e5550130cbfe2e866477193b22a3f02483045022100bedd5d9a865db9d649be0d0917ea8694fb81100dd58ac5c7b62ba1c0fdf118480220158ab4da678b29c23b07bab8e3e8412f8e5fa82d357c7a237aa6b47eb8153324012102b7d4e03f4230eb2406328be6bf9dbd400083b929c07a4b0b3601589b3243067400000000',
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
    }
  }
},
{
  description: 'send multi asset allocations with notarization + gas in non-selected asset',
  version: syscointx.utils.SYSCOIN_TX_VERSION_ALLOCATION_SEND,
  txOpts: {
    allowOtherNotarizedAssetInputs: true
  },
  mnemonic: 'club toss element melody skin ship rifle student reason real interest insane elevator beauty movie',
  feeRate: new BN(10),
  utxoObj: {
    utxos: [
      { txId: 'c5c2af64e6f8d0732b2250416eecc063f22161b9cd14eda802c97ed518d173e0', vout: 0, script: Buffer.from('0014e8cc042a7c976ab0068cf0e4fcae4845d41774a7', 'hex'), path: "m/84'/1'/0'/0/4", value: 9800, assetInfo: { assetGuid: 2369540753, value: 100000000 } },
      { txId: '4fdab120b984f7bcf0c9458f9783ec0b3169a292de7e40a2612db1f7d4fd6efb', vout: 0, script: Buffer.from('00149271f58284fc922b7e466cff87a53bb838d11feb', 'hex'), path: "m/84'/1'/0'/0/5", value: 9800, assetInfo: { assetGuid: 650700076, value: 200000000 } },
      { txId: '931dbdcd8098918e306c43c2f9ee9a6c2fac4c06190a669809c83f3a48f7b522', vout: 0, script: Buffer.from('0014248a521f8561af8f735d0f5e6d13f41177e423bd', 'hex'), path: "m/84'/1'/0'/0/6", value: 980, assetInfo: { assetGuid: 2699372871, value: 300000000 } },
      { txId: '66d6841bef92b91344f793bbd43b2cd139e9da4b82b6f13e9e967cf793c384e1', vout: 0, script: Buffer.from('001476ddc768b9ae22e2645ed1a161cbe1cd9ec52efb', 'hex'), path: "m/84'/1'/0'/0/11", value: 294, assetInfo: { assetGuid: 402223530, value: 400000000 } }, // m/84'/1'/0'/0/7 had some kind of collision the pub/priv key didn't match between js and core
      { txId: '212680579797d8bf19a2c4bbde5fb7f35296b82ed02c7d0a22281d1d2a47edf2', vout: 0, script: Buffer.from('00147326551112dd129f478b4a3fe4fab809c7fb2d0c', 'hex'), path: "m/84'/1'/0'/0/8", value: 9800, assetInfo: { assetGuid: 1537060536, value: 500000000 } },
      { txId: '57219dc0fd292caa06c54e1af6125323181a4c86921442e6d508275b30086682', vout: 0, script: Buffer.from('0014413e8fd29b2f671b6058c9f50bf51bf971274e53', 'hex'), path: "m/84'/1'/0'/0/9", value: 980, assetInfo: { assetGuid: 2305793883, value: 600000000 } },
      { txId: 'c6e7702f1ab817bacf81e5678ba89e0b43a8a7b6f56c4c055aa8aeda87197a68', vout: 0, script: Buffer.from('0014413e8fd29b2f671b6058c9f50bf51bf971274e53', 'hex'), path: "m/84'/1'/0'/0/9", value: 980000, assetInfo: { assetGuid: 1635229542, value: 1000000000 } }
    ],
    assets: [
      {
        assetGuid: 2369540753,
        decimals: 8,
        pubData: syscointx.utils.encodePubDataFromFields('publicvalue').toString(),
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 255,
        balance: 10000000000,
        totalSupply: 0,
        maxSupply: 100000000000,
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
        pubData: syscointx.utils.encodePubDataFromFields('publicvalue').toString(),
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 255,
        balance: 10000000000,
        totalSupply: 0,
        maxSupply: 100000000000,
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
        pubData: syscointx.utils.encodePubDataFromFields('publicvalue').toString(),
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 255,
        balance: 10000000000,
        totalSupply: 0,
        maxSupply: 100000000000,
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
        pubData: syscointx.utils.encodePubDataFromFields('publicvalue').toString(),
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 255,
        balance: 10000000000,
        totalSupply: 0,
        maxSupply: 100000000000,
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
        pubData: syscointx.utils.encodePubDataFromFields('publicvalue').toString(),
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 255,
        balance: 10000000000,
        totalSupply: 0,
        maxSupply: 100000000000,
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
        pubData: syscointx.utils.encodePubDataFromFields('publicvalue').toString(),
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 255,
        balance: 10000000000,
        totalSupply: 0,
        maxSupply: 100000000000
      },
      {
        assetGuid: 1635229542,
        decimals: 8,
        pubData: syscointx.utils.encodePubDataFromFields('publicvalue').toString(),
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 255,
        balance: 10000000000,
        totalSupply: 0,
        maxSupply: 100000000000,
        notaryKeyID: '5f57a028945f5b5ba2aef4fd2b512063e785dcf5',
        notaryDetails: {
          endPoint: 'https://test.com',
          instantTransfers: 0,
          HDRequired: 1
        }
      }
    ]
  },

  sysChangeAddress: 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq',
  assetMap: new Map([
    [1635229536, { changeAddress: 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq', outputs: [{ value: new BN(50000000), address: 'bc1qc7slrfxkknqcq2jevvvkdgvrt8080852dfjewde450xdlk4ugp7szw5tk9' }, { value: new BN(50000000), address: 'bc1qc7slrfxkknqcq2jevvvkdgvrt8080852dfjewde450xdlk4ugp7szw5tk9' }] }],
    [1635229537, { changeAddress: 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq', outputs: [{ value: new BN(200000000), address: 'bc1qc7slrfxkknqcq2jevvvkdgvrt8080852dfjewde450xdlk4ugp7szw5tk9' }] }],
    [1635229538, { changeAddress: 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq', outputs: [{ value: new BN(250000000), address: 'bc1qc7slrfxkknqcq2jevvvkdgvrt8080852dfjewde450xdlk4ugp7szw5tk9' }] }],
    [1635229539, { changeAddress: 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq', outputs: [{ value: new BN(300000000), address: 'bc1qc7slrfxkknqcq2jevvvkdgvrt8080852dfjewde450xdlk4ugp7szw5tk9' }] }],
    [1635229540, { changeAddress: 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq', outputs: [{ value: new BN(350000000), address: 'bc1qc7slrfxkknqcq2jevvvkdgvrt8080852dfjewde450xdlk4ugp7szw5tk9' }] }],
    [1635229541, { changeAddress: 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq', outputs: [{ value: new BN(500000000), address: 'bc1qc7slrfxkknqcq2jevvvkdgvrt8080852dfjewde450xdlk4ugp7szw5tk9' }] }]
  ]),
  expected: {
    rbf: true,
    numOutputs: 13,
    script: Buffer.from('6a4dcc0107609f77610200300130410000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000619f7761010213410000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000629f7761020380640b30410000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000639f776102041d0509410000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000649f77610206813e07800a410000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000659f7761020831090900669f7761010c0a410000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000', 'hex'),
    asset: {
      allocation: [{ assetGuid: 1635229536, values: [{ n: 0, value: new BN(50000000) }, { n: 1, value: new BN(50000000) }], notarysig: Buffer.alloc(65, 0) },
        { assetGuid: 1635229537, values: [{ n: 2, value: new BN(200000000) }], notarysig: Buffer.alloc(65, 0) },
        { assetGuid: 1635229538, values: [{ n: 3, value: new BN(250000000) }, { n: 11, value: new BN(50000000) }], notarysig: Buffer.alloc(65, 0) },
        { assetGuid: 1635229539, values: [{ n: 4, value: new BN(300000000) }, { n: 5, value: new BN(100000000) }], notarysig: Buffer.alloc(65, 0) },
        { assetGuid: 1635229540, values: [{ n: 6, value: new BN(350000000) }, { n: 7, value: new BN(150000000) }], notarysig: Buffer.alloc(65, 0) },
        { assetGuid: 1635229541, values: [{ n: 8, value: new BN(500000000) }, { n: 9, value: new BN(100000000) }], notarysig: Buffer.from('') },
        { assetGuid: 1635229542, values: [{ n: 12, value: new BN(1000000000) }], notarysig: Buffer.alloc(65, 0) }]
    }
  }
},
{
  description: 'send asset allocation with auxfees',
  version: syscointx.utils.SYSCOIN_TX_VERSION_ALLOCATION_SEND,
  txOpts: {
    rbf: false
  },
  feeRate: new BN(10),
  utxoObj: {
    utxos: [
      { txId: 'c6e7702f1ab817bacf81e5678ba89e0b43a8a7b6f56c4c055aa8aeda87197a62', vout: 0, script: Buffer.from('0014712a0433b3be8c2860db2d313c44fa1967542780', 'hex'), value: 980, assetInfo: { assetGuid: 1635229536, value: 1000000000 } },
      { txId: '2cf903537c6c161a1c65d940758b63efd4706fc8f78eb21d252612407e59e865', vout: 0, script: Buffer.from('0014ab0ed68aa74cc422d69e4d675eb029ab93211c4c', 'hex'), value: 100000000 }
    ],
    assets: [
      {
        assetGuid: 1635229536,
        decimals: 8,
        pubData: syscointx.utils.encodePubDataFromFields('publicvalue').toString(),
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 255,
        balance: 10000000000,
        totalSupply: 0,
        maxSupply: 100000000000,
        auxFeeKeyID: '5f57a028945f5b5ba2aef4fd2b512063e785dcf5',
        auxFeeDetails: {
          auxfees: [{
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
  sysChangeAddress: 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq',
  assetMap: new Map([
    [1635229536, { changeAddress: 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq', outputs: [{ value: new BN(600000000), address: 'bc1qc7slrfxkknqcq2jevvvkdgvrt8080852dfjewde450xdlk4ugp7szw5tk9' }] }]
  ]),
  expected: {
    rbf: false,
    numOutputs: 4,
    script: Buffer.from('6a0e01609f7761030039013b039a5b00', 'hex'),
    asset: {
      allocation: [{ assetGuid: 1635229536, values: [{ n: 0, value: new BN(6000000) }, { n: 1, value: new BN(600000000) }, { n: 3, value: new BN(394000000) }], notarysig: Buffer.from('') }]
    }
  }
},
{
  description: 'burn asset allocation to syscoin',
  version: syscointx.utils.SYSCOIN_TX_VERSION_ALLOCATION_BURN_TO_SYSCOIN,
  txOpts: {
    rbf: true
  },
  feeRate: new BN(10),
  utxoObj: {
    utxos: [
      { txId: 'e77901b5181e1ac5dc428d43ccc7e677c8c9179b982c779464e95c3190054c0e', vout: 0, script: Buffer.from('001483516da577935f20272bca9b62d262a4226f9c72', 'hex'), value: 980, assetInfo: { assetGuid: 1635229536, value: 600000000 } },
      { txId: 'e77901b5181e1ac5dc428d43ccc7e677c8c9179b982c779464e95c3190054c0e', vout: 2, script: Buffer.from('001461dffc7defeb8e0b5cd00ff24c196f71fe31feee', 'hex'), value: 99999771, assetInfo: { assetGuid: 1635229536, value: 400000000 } }
    ],
    assets: [
      {
        assetGuid: 1635229536,
        decimals: 8,
        pubData: syscointx.utils.encodePubDataFromFields('publicvalue').toString(),
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 255,
        balance: 10000000000,
        totalSupply: 0,
        maxSupply: 100000000000
      }
    ]
  },
  assetOpts: { ethaddress: Buffer.from('', 'hex') },
  sysChangeAddress: 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq',
  assetMap: new Map([
    [1635229536, { changeAddress: 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq', outputs: [{ value: new BN(400000000) }] }]
  ]),
  expected: {
    rbf: true,
    numOutputs: 3,
    script: Buffer.from('6a0a01609f77610101270000', 'hex'),
    asset: {
      allocation: [{ assetGuid: 1635229536, values: [{ n: 1, value: new BN(400000000) }], notarysig: Buffer.from('') }], ethaddress: Buffer.from('', 'hex')
    }
  }
},
{
  description: 'burn asset allocation to ethereum',
  version: syscointx.utils.SYSCOIN_TX_VERSION_ALLOCATION_BURN_TO_ETHEREUM,
  txOpts: {
    rbf: true
  },
  feeRate: new BN(10),
  utxoObj: {
    utxos: [
      { txId: '26f6b17b715bcd5fda921108b3bedd9a3d89ea58c666a40a3e5a6f833a454e36', vout: 1, script: Buffer.from('001487e5ec8eb455b3bbf42c5d5f952f67c26793115d', 'hex'), value: 100000914, assetInfo: { assetGuid: 1635229536, value: 900000000 } }
    ],
    assets: [
      {
        assetGuid: 1635229536,
        decimals: 8,
        pubData: syscointx.utils.encodePubDataFromFields('publicvalue').toString(),
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 255,
        balance: 10000000000,
        totalSupply: 0,
        maxSupply: 100000000000
      }
    ]
  },
  assetOpts: { ethaddress: Buffer.from('9667de58c15475626165eaa4c9970e409e1181d0', 'hex') },
  sysChangeAddress: 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq',
  assetMap: new Map([
    [1635229536, { changeAddress: 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq', outputs: [{ value: new BN(100000000) }] }]
  ]),
  expected: {
    rbf: true,
    numOutputs: 2,
    script: Buffer.from('6a2001609f7761020009014f00149667de58c15475626165eaa4c9970e409e1181d0', 'hex'),
    asset: {
      allocation: [{ assetGuid: 1635229536, values: [{ n: 0, value: new BN(100000000) }, { n: 1, value: new BN(800000000) }], notarysig: Buffer.from('') }],
      ethaddress: Buffer.from('9667de58c15475626165eaa4c9970e409e1181d0', 'hex')
    }
  }
},
{
  description: 'burn asset allocation to ethereum multiple inputs',
  version: syscointx.utils.SYSCOIN_TX_VERSION_ALLOCATION_BURN_TO_ETHEREUM,
  txOpts: {
    rbf: true
  },
  feeRate: new BN(10),
  utxoObj: {
    utxos: [
      { txId: '26f6b17b715bcd5fda921108b3bedd9a3d89ea58c666a40a3e5a6f833a454e36', vout: 1, script: Buffer.from('001487e5ec8eb455b3bbf42c5d5f952f67c26793115d', 'hex'), value: 980, assetInfo: { assetGuid: 1635229536, value: 900000000 } },
      { txId: '36f6b17b715ccd5fda921108b3bedd9a3d89ea58c666a40a3e5a6f833a454e36', vout: 0, script: Buffer.from('001497e5ec8eb455b3bba42c5d5f952f67c26793115d', 'hex'), value: 100000914 }
    ],
    assets: [
      {
        assetGuid: 1635229536,
        decimals: 8,
        pubData: syscointx.utils.encodePubDataFromFields('publicvalue').toString(),
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 255,
        balance: 10000000000,
        totalSupply: 0,
        maxSupply: 100000000000
      }
    ]
  },
  assetOpts: { ethaddress: Buffer.from('9667de58c15475626165eaa4c9970e409e1181d0', 'hex') },
  sysChangeAddress: 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq',
  assetMap: new Map([
    [1635229536, { changeAddress: 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq', outputs: [{ value: new BN(100000000) }] }]
  ]),
  expected: {
    rbf: true,
    numOutputs: 2,
    script: Buffer.from('6a2001609f7761020009014f00149667de58c15475626165eaa4c9970e409e1181d0', 'hex'),
    asset: {
      allocation: [{ assetGuid: 1635229536, values: [{ n: 0, value: new BN(100000000) }, { n: 1, value: new BN(800000000) }], notarysig: Buffer.from('') }],
      ethaddress: Buffer.from('9667de58c15475626165eaa4c9970e409e1181d0', 'hex')
    }
  }
},
{
  description: 'burn asset allocation to ethereum multiple inputs, change has asset',
  version: syscointx.utils.SYSCOIN_TX_VERSION_ALLOCATION_BURN_TO_ETHEREUM,
  txOpts: {
    rbf: true
  },
  feeRate: new BN(10),
  utxoObj: {
    utxos: [
      { txId: '26f6b17b715bcd5fda921108b3bedd9a3d89ea58c666a40a3e5a6f833a454e36', vout: 1, script: Buffer.from('001487e5ec8eb455b3bbf42c5d5f952f67c26793115d', 'hex'), value: 980, assetInfo: { assetGuid: 1635229536, value: 900000000 } },
      { txId: '36f6b17b715ccd5fda921108b3bedd9a3d89ea58c666a40a3e5a6f833a454e36', vout: 0, script: Buffer.from('001497e5ec8eb455b3bba42c5d5f952f67c26793115d', 'hex'), value: 100000914, assetInfo: { assetGuid: 1635229536, value: 800000000 } }
    ],
    assets: [
      {
        assetGuid: 1635229536,
        decimals: 8,
        pubData: syscointx.utils.encodePubDataFromFields('publicvalue').toString(),
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 255,
        balance: 10000000000,
        totalSupply: 0,
        maxSupply: 100000000000
      }
    ]
  },
  assetOpts: { ethaddress: Buffer.from('9667de58c15475626165eaa4c9970e409e1181d0', 'hex') },
  sysChangeAddress: 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq',
  assetMap: new Map([
    [1635229536, { changeAddress: 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq', outputs: [{ value: new BN(100000000) }] }]
  ]),
  expected: {
    rbf: true,
    numOutputs: 2,
    script: Buffer.from('6a2101609f776102000901801500149667de58c15475626165eaa4c9970e409e1181d0', 'hex'),
    asset: {
      allocation: [{ assetGuid: 1635229536, values: [{ n: 0, value: new BN(100000000) }, { n: 1, value: new BN(1600000000) }], notarysig: Buffer.from('') }],
      ethaddress: Buffer.from('9667de58c15475626165eaa4c9970e409e1181d0', 'hex')
    }
  }
},
{
  description: 'standard sys send',
  version: 2,
  txOpts: {
    rbf: true
  },
  feeRate: new BN(10),
  utxoObj: {
    utxos: [
      { txId: '26f6b17b715bcd5fda921108b3bedd9a3d89ea58c666a40a3e5a6f833a454e36', vout: 1, script: Buffer.from('001487e5ec8eb455b3bbf42c5d5f952f67c26793115d', 'hex'), value: 100000000 },
      { txId: '36f6b17b715ccd5fda921108b3bedd9a3d89ea58c666a40a3e5a6f833a454e36', vout: 0, script: Buffer.from('001497e5ec8eb455b3bba42c5d5f952f67c26793115d', 'hex'), value: 100000914 }
    ]
  },
  sysChangeAddress: 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq',
  outputs: [
    { address: 'bc1qc7slrfxkknqcq2jevvvkdgvrt8080852dfjewde450xdlk4ugp7szw5tk9', value: new BN(150000000) }
  ],
  expected: {
    rbf: true,
    version: 2,
    numOutputs: 2
  }
},
{
  description: 'standard sys send with asset inputs',
  version: 2,
  txOpts: {
    rbf: true
  },
  feeRate: new BN(10),
  utxoObj: {
    utxos: [
      { txId: '26f6b17b715bcd5fda921108b3bedd9a3d89ea58c666a40a3e5a6f833a454e36', vout: 1, script: Buffer.from('001487e5ec8eb455b3bbf42c5d5f952f67c26793115d', 'hex'), value: 100000000, assetInfo: { assetGuid: 1635229536, value: 900000000 } },
      { txId: '36f6b17b715ccd5fda921108b3bedd9a3d89ea58c666a40a3e5a6f833a454e36', vout: 0, script: Buffer.from('001497e5ec8eb455b3bba42c5d5f952f67c26793115d', 'hex'), value: 100000914, assetInfo: { assetGuid: 1635229536, value: 800000000 } }
    ],
    assets: [
      {
        assetGuid: 1635229536,
        decimals: 8,
        pubData: syscointx.utils.encodePubDataFromFields('publicvalue').toString(),
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 255,
        balance: 10000000000,
        totalSupply: 0,
        maxSupply: 100000000000
      }
    ]
  },
  sysChangeAddress: 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq',
  outputs: [
    { address: 'bc1qc7slrfxkknqcq2jevvvkdgvrt8080852dfjewde450xdlk4ugp7szw5tk9', value: new BN(150000000) }
  ],
  expected: {
    rbf: true,
    version: syscointx.utils.SYSCOIN_TX_VERSION_ALLOCATION_SEND,
    numOutputs: 3, // 3 because new opreturn will be created
    script: Buffer.from('6a0a01609f77610100801f00', 'hex'),
    asset: {
      allocation: [{ assetGuid: 1635229536, values: [{ n: 0, value: new BN(1700000000) }], notarysig: Buffer.from('') }]
    }
  }
},
{
  description: 'standard sys send with asset input and regular input',
  version: 2,
  txOpts: {
    rbf: false
  },
  feeRate: new BN(10),
  utxoObj: {
    utxos: [
      { txId: '26f6b17b715bcd5fda921108b3bedd9a3d89ea58c666a40a3e5a6f833a454e36', vout: 1, script: Buffer.from('001487e5ec8eb455b3bbf42c5d5f952f67c26793115d', 'hex'), value: 100000000, assetInfo: { assetGuid: 1635229536, value: 900000000 } },
      { txId: '36f6b17b715ccd5fda921108b3bedd9a3d89ea58c666a40a3e5a6f833a454e36', vout: 0, script: Buffer.from('001497e5ec8eb455b3bba42c5d5f952f67c26793115d', 'hex'), value: 100000914 }
    ],
    assets: [
      {
        assetGuid: 1635229536,
        decimals: 8,
        pubData: syscointx.utils.encodePubDataFromFields('publicvalue').toString(),
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 255,
        balance: 10000000000,
        totalSupply: 0,
        maxSupply: 100000000000
      }
    ]
  },
  sysChangeAddress: 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq',
  outputs: [
    { address: 'bc1qc7slrfxkknqcq2jevvvkdgvrt8080852dfjewde450xdlk4ugp7szw5tk9', value: new BN(150000000) }
  ],
  expected: {
    rbf: false,
    version: syscointx.utils.SYSCOIN_TX_VERSION_ALLOCATION_SEND,
    numOutputs: 3, // 3 because new opreturn will be created
    script: Buffer.from('6a0901609f776101005900', 'hex'),
    asset: {
      allocation: [{ assetGuid: 1635229536, values: [{ n: 0, value: new BN(900000000) }], notarysig: Buffer.from('') }]
    }
  }
}
]
