const BN = require('bn.js')
const syscointx = require('syscointx-js')
// Spendable P2WPKH carriers use the shared default 294-satoshi relay floor.
// Asset and native change remain separate when their locking scripts differ.
module.exports = [
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
      hex: '8e00000000010235addfbfd1abfcb55234f51b1ecf8e967df9353b87a9bacdba63a5358803f1440000000000fdffffff4629e5a0b015fc8c0585693539c7cc79b27b6afb21d0bf993e182531c236053f0000000000fdffffff0326010000000000001600148dc01f0d18640370e091198979398466abed8a8700000000000000000d6a0b0188b5aa803802003b0227a8de64ca13000000160014c27fb464acece67abe8e8289a2c9cb2d60cabecd024730440220786016ff2daf6839f94050db2fb5a2f25644e3ad1f87de6c84607063f3293fde02201becb3023c42b4016549e8941fc1ec5e3a93b4813e5bbe866df18a9a07119c40012103e493f90c55de11c1b3aa3fc13b337807c7c1e121a2767856cfd6946e18c7fcc1024830450221009d07ba1107dd35112a446e83f9b62b0d71c2a6b0ca19ec4316fe0eff38ec44ef02200ffa9b84c5309fbcd89b6b57378b262a00559fc27353ba29dc6db0e942afad01012102e58139f9d633d5d1d76feb87fc2c44705cc317e83ade1a812f8d2a4ae7be9cb500000000',
      rbf: true,
      numOutputs: 3,
      script: Buffer.from('6a0b0188b5aa803802003b0227', 'hex'),
      asset: {
        allocation: [{ assetGuid: '2529870008', values: [{ n: 0, value: new BN(600000000) }, { n: 2, value: new BN(400000000) }] }]
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
      hex: '8e000000000102234c67db23a214a4f505016a19327fda100a8f92c7996720632ae0c9968cb2610000000000fdffffff234c67db23a214a4f505016a19327fda100a8f92c7996720632ae0c9968cb2610200000000fdffffff0326010000000000001600146a7e3ca88d8f80b0832a25b977766dfdc0fa8d4b00000000000000000e6a0c0184d4a2cf5202000202857cbcb1aa79e60a0000160014f97d234b491c64d3d3347d551eb3b1a9693b89d902483045022100bda66a8572bcc28c1b2234460bd655dd950be121b5ddf0c1676c0e0593702d9102207e6f1f780a73c05e6bcaae47deca4106882d9615814e66f9f3314af631ed0f1601210341e88f7fd83e582b8c673149b25d3879926e0490df8cd9c530560feb536a7fa202483045022100d243bda63706c1238f2b0cbcd7cb539effc66661fb8685b461be6b023f6a148302207bed9267055e6f6f3ef63328a978078eeb88c1cc5bcd572dffd95cabc72e6286012102f249cb8576b8d9c6f0d45bb3ab3b73654911b724f229ec0a5a2f45785e1e47c900000000',
      rbf: true,
      numOutputs: 3,
      script: Buffer.from('6a0c0184d4a2cf5202000202857c', 'hex'),
      asset: {
        allocation: [{ assetGuid: '1521018962', values: [{ n: 0, value: new BN(10) }, { n: 2, value: new BN(990) }] }]
      },
      receivingIndex: 0,
      changeIndex: 13
    }
  },
  {
    description: 'send multi asset allocations',
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
          totalSupply: '0',
          maxSupply: '100000000000'
        },
        {
          assetGuid: '650700076',
          decimals: 8,
          totalSupply: '0',
          maxSupply: '100000000000'
        },
        {
          assetGuid: '2699372871',
          decimals: 8,
          totalSupply: '0',
          maxSupply: '100000000000'
        },
        {
          assetGuid: '402223530',
          decimals: 8,
          totalSupply: '0',
          maxSupply: '100000000000'
        },
        {
          assetGuid: '1537060536',
          decimals: 8,
          totalSupply: '0',
          maxSupply: '100000000000'
        },
        {
          assetGuid: '2305793883',
          decimals: 8,
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
      hex: '8e000000000107e073d118d57ec902a8ed14cdb96121f263c0ec6e4150222b73d0f8e664afc2c50000000000fdfffffffb6efdd4f7b12d61a2407ede92a269310bec83978f45c9f0bcf784b920b1da4f0000000000fdffffff22b5f7483a3fc80998660a19064cac2f6c9aeef9c2436c308e919880cdbd1d930000000000fdffffffe184c393f77c969e3ef1b6824bdae939d12c3bd4bb93f74413b992ef1b84d6660000000000fdfffffff2ed472a1d1d28220a7d2cd02eb89652f3b75fdebbc4a219bfd89797578026210000000000fdffffff826608305b2708d5e6421492864c1a18235312f61a4ec506aa2c29fdc09d21570000000000fdffffff42d6e38f8445d79b4a80fcfffbe9f99699852de26c57b05142afa5479c15a2c80000000000fdffffff0d2601000000000000160014e8cc042a7c976ab0068cf0e4fcae4845d41774a72601000000000000160014e8cc042a7c976ab0068cf0e4fcae4845d41774a726010000000000001600149271f58284fc922b7e466cff87a53bb838d11feb2601000000000000160014248a521f8561af8f735d0f5e6d13f41177e423bd2601000000000000160014248a521f8561af8f735d0f5e6d13f41177e423bd2601000000000000160014581c4fc0439986b761b5110ee86a60f8c563f7ca2601000000000000160014581c4fc0439986b761b5110ee86a60f8c563f7ca26010000000000001600147326551112dd129f478b4a3fe4fab809c7fb2d0c26010000000000001600147326551112dd129f478b4a3fe4fab809c7fb2d0c2601000000000000160014413e8fd29b2f671b6058c9f50bf51bf971274e532601000000000000160014413e8fd29b2f671b6058c9f50bf51bf971274e530000000000000000406a3e0687e8f0a411020030013081b5a2c92c010213898693d14702038064043080bee4e22a02051d060984dbf5dc380207813e08800a87cabdbd5b0209310a09fac3f50500000000160014bd6cfd84d53025c8891862ec49b0036d06405d0f02483045022100d71e4a5ad81198f752c31c405a22303df8a3b5d21b2740698102f0fbcd24545a02203f53a8725ae2a276afbb33bfb5f04aed3794754b3551f92b02525e6791762a5c01210281c11974da83e7d9ff9f47a3c32e3baa7975b5127eb447b86a2f7fd4c9d12fec02483045022100b410aa8c5b845cf8bbdba86b1689bf9c6737cbb0323dee1bf25e9db662ae455b02202faeb82a681c155becd76618720c16d25ed33c2271dcab1c62b3f6a668571e8e012103c86473f098d9bb69d31a7851372f9ded7b11691a77c253279e987373164b2ad2024730440220627caedf76c948bde60c9c5af18b3254faf63709dd99f1614bcbc8f3c4cccc2602205b4931dd5faa191cf88c16501367a03f67de0da2ad0163cad567a76c275b2a9b012102f165ced59862353282a8fd32ac10d018c4bc449e6dabc77a7d810ca2be6f69fd02483045022100f1116df1ae313368ee51a0dc875f6ab4efe6a94f06f2eb153f39fc956b34ff9c022013652d0dca9e9af0e5fb458f5e64e98467f7c3e29a2009fa7f7ed7012eb3bb060121025eea502cd2da208247cdd27701a2efea1e64aebf7c476362c1a6c0d1416c25f30247304402205c628f034d6574b665fa58fe1c64e9485487378e21dd07ab3618435cdf61a46d0220339c169ec80b255806e7c1fa4120449d479b817397f95dd3d9b75924d23d75d6012102ccb8a1b346388ff9691d6ee1b2019956e93e5550130cbfe2e866477193b22a3f0247304402202b49ab7a9149fbdc9c65be16f833d40fd4957e7a03a32db38e4bfcac2cb5dfe10220321f74f2054842d7d109c5c89bbe3b101890343b9de2258d8c012e85b696e666012102b7d4e03f4230eb2406328be6bf9dbd400083b929c07a4b0b3601589b324306740247304402206e1c44b6b3603aa9bd9ea7454df1ab54d6f82ec69e7f5ccc2d36a9a74b3ef47d022008caccef2701e123026834cb7f51db94df5179ce9eb45902387ee64139f9eb0a012103b7eeb47fdd1c2084ef795fac22bf24185e7295d2efa3178b69b6eca409810fba00000000',
      rbf: true,
      numOutputs: 13,
      script: Buffer.from('6a3e0687e8f0a411020030013081b5a2c92c010213898693d14702038064043080bee4e22a02051d060984dbf5dc380207813e08800a87cabdbd5b0209310a09', 'hex'),
      asset: {
        allocation: [{ assetGuid: '2369540753', values: [{ n: 0, value: new BN(50000000) }, { n: 1, value: new BN(50000000) }] }, { assetGuid: '650700076', values: [{ n: 2, value: new BN(200000000) }] }, { assetGuid: '2699372871', values: [{ n: 3, value: new BN(250000000) }, { n: 4, value: new BN(50000000) }] }, { assetGuid: '402223530', values: [{ n: 5, value: new BN(300000000) }, { n: 6, value: new BN(100000000) }] }, { assetGuid: '1537060536', values: [{ n: 7, value: new BN(350000000) }, { n: 8, value: new BN(150000000) }] }, { assetGuid: '2305793883', values: [{ n: 9, value: new BN(500000000) }, { n: 10, value: new BN(100000000) }] }]
      },
      receivingIndex: 11,
      changeIndex: 3
    }
  },
  {
    description: 'send multi asset allocations (varied sys values)',
    version: syscointx.utils.SYSCOIN_TX_VERSION_ALLOCATION_SEND,
    txOpts: {
      rbf: false
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
          totalSupply: '0',
          maxSupply: '100000000000'
        },
        {
          assetGuid: '650700076',
          decimals: 8,
          totalSupply: '0',
          maxSupply: '100000000000'
        },
        {
          assetGuid: '2699372871',
          decimals: 8,
          totalSupply: '0',
          maxSupply: '100000000000'
        },
        {
          assetGuid: '402223530',
          decimals: 8,
          totalSupply: '0',
          maxSupply: '100000000000'
        },
        {
          assetGuid: '1537060536',
          decimals: 8,
          totalSupply: '0',
          maxSupply: '100000000000'
        },
        {
          assetGuid: '2305793883',
          decimals: 8,
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
      hex: '8e000000000106e073d118d57ec902a8ed14cdb96121f263c0ec6e4150222b73d0f8e664afc2c50000000000fffffffffb6efdd4f7b12d61a2407ede92a269310bec83978f45c9f0bcf784b920b1da4f0000000000ffffffff22b5f7483a3fc80998660a19064cac2f6c9aeef9c2436c308e919880cdbd1d930000000000ffffffffe184c393f77c969e3ef1b6824bdae939d12c3bd4bb93f74413b992ef1b84d6660000000000fffffffff2ed472a1d1d28220a7d2cd02eb89652f3b75fdebbc4a219bfd89797578026210000000000ffffffff826608305b2708d5e6421492864c1a18235312f61a4ec506aa2c29fdc09d21570000000000ffffffff0d2601000000000000160014e8cc042a7c976ab0068cf0e4fcae4845d41774a72601000000000000160014e8cc042a7c976ab0068cf0e4fcae4845d41774a726010000000000001600149271f58284fc922b7e466cff87a53bb838d11feb2601000000000000160014248a521f8561af8f735d0f5e6d13f41177e423bd2601000000000000160014248a521f8561af8f735d0f5e6d13f41177e423bd2601000000000000160014581c4fc0439986b761b5110ee86a60f8c563f7ca2601000000000000160014581c4fc0439986b761b5110ee86a60f8c563f7ca26010000000000001600147326551112dd129f478b4a3fe4fab809c7fb2d0c26010000000000001600147326551112dd129f478b4a3fe4fab809c7fb2d0c2601000000000000160014413e8fd29b2f671b6058c9f50bf51bf971274e532601000000000000160014413e8fd29b2f671b6058c9f50bf51bf971274e530000000000000000406a3e0687e8f0a411020030013081b5a2c92c010213898693d14702038064043080bee4e22a02051d060984dbf5dc380207813e08800a87cabdbd5b0209310a09fe4c000000000000160014bd6cfd84d53025c8891862ec49b0036d06405d0f024730440220192267168be201fcb474abc0576097dffae57c443425395efbc9a8fda970b8980220364ac1141d236bedbeaa076620c5e107628c7b7a3c2f3a5772a7f5698a24f0c101210281c11974da83e7d9ff9f47a3c32e3baa7975b5127eb447b86a2f7fd4c9d12fec0247304402202818a53ac03bdea24f38f7899e329ea31cc43234629da24a6fe0231a339b3254022035dfb2346eb12a5f7212d7033464de04ff7be370a49e186b2e1ecfec0512c76b012103c86473f098d9bb69d31a7851372f9ded7b11691a77c253279e987373164b2ad2024730440220763a0f03407a7ff44b8cb4ae97e763c64f6ca80d7d9ec2709bd85aa26caacd0002203f9b667cbadbedccfb8f961b498d9ef640cc6cbb1756e768633c537ab4b0a91b012102f165ced59862353282a8fd32ac10d018c4bc449e6dabc77a7d810ca2be6f69fd02473044022047c96292c9ed88d34057ac1985fe217f8f8aad9cee25531224374be2e93cd0090220603188dba61d72e8bb4935ec3ae69a12acb678144973bf21b54ecd845faa90d00121025eea502cd2da208247cdd27701a2efea1e64aebf7c476362c1a6c0d1416c25f302483045022100ab9782b28042ea64fb3f2e6c0b3d58aac5598c09ae42005e0166455a653c49db022010ff78fce958fa447d4e0c10b0ff8180d0d928a544edd7c837bcf6c576aa5436012102ccb8a1b346388ff9691d6ee1b2019956e93e5550130cbfe2e866477193b22a3f0248304502210094916b258f59e54f746ae5c686d6757698417971f4d9ec7c58a340450d168f7b02200fceac506e3221dfd335d8aad3e8db0291f1587f64165b59fa6d3ff13adc04c2012102b7d4e03f4230eb2406328be6bf9dbd400083b929c07a4b0b3601589b3243067400000000',
      rbf: false,
      numOutputs: 13,
      script: Buffer.from('6a3e0687e8f0a411020030013081b5a2c92c010213898693d14702038064043080bee4e22a02051d060984dbf5dc380207813e08800a87cabdbd5b0209310a09', 'hex'),
      asset: {
        allocation: [{ assetGuid: '2369540753', values: [{ n: 0, value: new BN(50000000) }, { n: 1, value: new BN(50000000) }] }, { assetGuid: '650700076', values: [{ n: 2, value: new BN(200000000) }] }, { assetGuid: '2699372871', values: [{ n: 3, value: new BN(250000000) }, { n: 4, value: new BN(50000000) }] }, { assetGuid: '402223530', values: [{ n: 5, value: new BN(300000000) }, { n: 6, value: new BN(100000000) }] }, { assetGuid: '1537060536', values: [{ n: 7, value: new BN(350000000) }, { n: 8, value: new BN(150000000) }] }, { assetGuid: '2305793883', values: [{ n: 9, value: new BN(500000000) }, { n: 10, value: new BN(100000000) }] }]
      },
      receivingIndex: 11,
      changeIndex: 3
    }
  },
  {
    description: 'send multi asset allocations + gas in non-selected asset',
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
          totalSupply: '0',
          maxSupply: '100000000000'
        },
        {
          assetGuid: '650700076',
          decimals: 8,
          totalSupply: '0',
          maxSupply: '100000000000'
        },
        {
          assetGuid: '2699372871',
          decimals: 8,
          totalSupply: '0',
          maxSupply: '100000000000'
        },
        {
          assetGuid: '402223530',
          decimals: 8,
          totalSupply: '0',
          maxSupply: '100000000000'
        },
        {
          assetGuid: '1537060536',
          decimals: 8,
          totalSupply: '0',
          maxSupply: '100000000000'
        },
        {
          assetGuid: '2305793883',
          decimals: 8,
          totalSupply: '0',
          maxSupply: '100000000000'
        },
        {
          assetGuid: '1635229542',
          decimals: 8,
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
      hex: '8e000000000107e073d118d57ec902a8ed14cdb96121f263c0ec6e4150222b73d0f8e664afc2c50000000000fdfffffffb6efdd4f7b12d61a2407ede92a269310bec83978f45c9f0bcf784b920b1da4f0000000000fdffffff22b5f7483a3fc80998660a19064cac2f6c9aeef9c2436c308e919880cdbd1d930000000000fdffffffe184c393f77c969e3ef1b6824bdae939d12c3bd4bb93f74413b992ef1b84d6660000000000fdfffffff2ed472a1d1d28220a7d2cd02eb89652f3b75fdebbc4a219bfd89797578026210000000000fdffffff826608305b2708d5e6421492864c1a18235312f61a4ec506aa2c29fdc09d21570000000000fdffffff687a1987daaea85a054c6cf5b6a7a8430b9ea88b67e581cfba17b81a2f70e7c60000000000fdffffff0d2601000000000000160014e8cc042a7c976ab0068cf0e4fcae4845d41774a72601000000000000160014e8cc042a7c976ab0068cf0e4fcae4845d41774a726010000000000001600149271f58284fc922b7e466cff87a53bb838d11feb2601000000000000160014248a521f8561af8f735d0f5e6d13f41177e423bd2601000000000000160014248a521f8561af8f735d0f5e6d13f41177e423bd2601000000000000160014581c4fc0439986b761b5110ee86a60f8c563f7ca2601000000000000160014581c4fc0439986b761b5110ee86a60f8c563f7ca26010000000000001600147326551112dd129f478b4a3fe4fab809c7fb2d0c26010000000000001600147326551112dd129f478b4a3fe4fab809c7fb2d0c2601000000000000160014413e8fd29b2f671b6058c9f50bf51bf971274e532601000000000000160014413e8fd29b2f671b6058c9f50bf51bf971274e530000000000000000486a460787e8f0a411020030013081b5a2c92c010213898693d14702038064043080bee4e22a02051d060984dbf5dc380207813e08800a87cabdbd5b0209310a09858addbd66010c0acad60e0000000000160014bd6cfd84d53025c8891862ec49b0036d06405d0f0247304402207e65d4b9764dcd0ece0e6530f24765f94b0d40cf146bd3527a94aeb7d9e21a02022060a8aedf193113d8294496568465c8bd34a4ba3eeda895860725474c9040ea6301210281c11974da83e7d9ff9f47a3c32e3baa7975b5127eb447b86a2f7fd4c9d12fec02483045022100ff18fd09d5d071eef9e43d6918d5dc758b8bda2905524dd860726fbd320348eb022048838843f6fc074dff1f83148fbdd00f265e34571129acfca1bba2d50bc304f6012103c86473f098d9bb69d31a7851372f9ded7b11691a77c253279e987373164b2ad202483045022100fe3063643e5c62544ba4397a10af04d32543500013fe88295d976053a0396a0c02203a74c7df14f4ac0221ce041c06939e30e4381c71f38f8fb6bc23e6533420c74a012102f165ced59862353282a8fd32ac10d018c4bc449e6dabc77a7d810ca2be6f69fd024730440220650b959697e10a0476f8be6471c479100d72f19539dce20622d97d7c4118269102203395d66663fd27caabb999e1f3a0f625cd06c55b4dd0c7bb42b9585b03a4eb890121025eea502cd2da208247cdd27701a2efea1e64aebf7c476362c1a6c0d1416c25f30247304402203ea5827c6171b6c4bbd967e2a4c37e9834d19c8fd88ed4e30d6c88a5d473d45d022027899734b30328df44c17c2e46f165c4328f33f3a10d6cf8e3191269d907469b012102ccb8a1b346388ff9691d6ee1b2019956e93e5550130cbfe2e866477193b22a3f0247304402207020ceefc0968f429d99d593117a3df93133617d57bc49ca0a4dc5ec3bb133f5022006eff54c9885c2ba9bf46c6d21af2ba8966a9c5743ed1ad4144c8d68b77289f0012102b7d4e03f4230eb2406328be6bf9dbd400083b929c07a4b0b3601589b324306740247304402205a90ddccee5c23e854f1193c9adde08852fcccf8aefd9f8d79ac9b82fdedbf0702203e438ee624f0c7292c66b63ede739055783678604f9755496f8c8cb546860e49012102b7d4e03f4230eb2406328be6bf9dbd400083b929c07a4b0b3601589b3243067400000000',
      rbf: true,
      numOutputs: 13,
      script: Buffer.from('6a460787e8f0a411020030013081b5a2c92c010213898693d14702038064043080bee4e22a02051d060984dbf5dc380207813e08800a87cabdbd5b0209310a09858addbd66010c0a', 'hex'),
      asset: {
        allocation: [{ assetGuid: '2369540753', values: [{ n: 0, value: new BN(50000000) }, { n: 1, value: new BN(50000000) }] }, { assetGuid: '650700076', values: [{ n: 2, value: new BN(200000000) }] }, { assetGuid: '2699372871', values: [{ n: 3, value: new BN(250000000) }, { n: 4, value: new BN(50000000) }] }, { assetGuid: '402223530', values: [{ n: 5, value: new BN(300000000) }, { n: 6, value: new BN(100000000) }] }, { assetGuid: '1537060536', values: [{ n: 7, value: new BN(350000000) }, { n: 8, value: new BN(150000000) }] }, { assetGuid: '2305793883', values: [{ n: 9, value: new BN(500000000) }, { n: 10, value: new BN(100000000) }] }, { assetGuid: '1635229542', values: [{ n: 12, value: new BN(1000000000) }] }]
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
          totalSupply: '0',
          maxSupply: '100000000000'
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
      hex: '8a0000000001011787945f9d715eb56da23be847e1db7aada29c70ba4ef0eb59c9ed20d60526910b00000000fdffffff03005a6202000000001600149271f58284fc922b7e466cff87a53bb838d11feb00000000000000000e6a0c0187e8f0a4110201260008002e8af50500000000160014bd6cfd84d53025c8891862ec49b0036d06405d0f024730440220323458ac63a77caf8c7764fcba4bd1a13510a6ea93d68731d0d438ab1814fce102204ff539ae5a90ad9c5cb036bb5db64391a86e56fc8e9cb33f282c30d4c8f0b24001210281c11974da83e7d9ff9f47a3c32e3baa7975b5127eb447b86a2f7fd4c9d12fec00000000',
      rbf: true,
      numOutputs: 3,
      script: Buffer.from('6a0c0187e8f0a411020126000800', 'hex'),
      asset: {
        allocation: [{ assetGuid: '2369540753', values: [{ n: 1, value: new BN(40000000) }, { n: 0, value: new BN(10000000) }] }], ethaddress: Buffer.from('', 'hex')
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
          totalSupply: '0',
          maxSupply: '100000000000'
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
      error: 'DUST_OUTPUT',
      rbf: true
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
      hex: '8d0000000001021787945f9d715eb56da23be847e1db7aada29c70ba4ef0eb59c9ed20d60526910900000000fdffffff2270b1a47a133755ff6dbcb34a32cc31b42c999c70dec6b133ced8e6e36d589f0300000000fdffffff0326010000000000001600149271f58284fc922b7e466cff87a53bb838d11feb0000000000000000226a200187cabdbd5b0201080058149667de58c15475626165eaa4c9970e409e1181d0da75f50500000000160014bd6cfd84d53025c8891862ec49b0036d06405d0f02483045022100feedbf6fb386e1e85ab75548cd05ce6b3d0631d94251b74b1b6858b26cb5cf51022065d002db388406800d120d5f925cd809ca1c5ea4e48c8181e51eaf044dd1aa38012102b7d4e03f4230eb2406328be6bf9dbd400083b929c07a4b0b3601589b324306740247304402204a3c490f7d8a7c3853b0bf5bcfa6773bf5d279368ffd065b53aa4f123959368802203220ea27742ae2e6a4e30a847d8d1f2ea405ed56e90ea95d81c0b5fd2215d3af012103b7eeb47fdd1c2084ef795fac22bf24185e7295d2efa3178b69b6eca409810fba00000000',
      rbf: true,
      numOutputs: 3,
      script: Buffer.from('6a200187cabdbd5b0201080058149667de58c15475626165eaa4c9970e409e1181d0', 'hex'),
      asset: {
        allocation: [{ assetGuid: '2305793883', values: [{ n: 1, value: new BN(10000000) }, { n: 0, value: new BN(90000000) }] }],
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
      hex: '8d0000000001021787945f9d715eb56da23be847e1db7aada29c70ba4ef0eb59c9ed20d60526910800000000fdffffff30c550116b2a1276ea4834ce314a32ead21037da82b96cfb293f6b5b52fe6e380100000000fdffffff0326010000000000001600149271f58284fc922b7e466cff87a53bb838d11feb0000000000000000236a210187cabdbd5b020109008240149667de58c15475626165eaa4c9970e409e1181d0fe65f50500000000160014bd6cfd84d53025c8891862ec49b0036d06405d0f02483045022100a98b3409974adf45898d6d851de42e8b8a45283479796b08c1cc377d121a1c380220213c1d71199801c5a11548bd554e04f6deafaed38d50cc3435813cce71ade616012102b7d4e03f4230eb2406328be6bf9dbd400083b929c07a4b0b3601589b3243067402473044022019be4588e62423da06373cac03b20654df637124ff8df698710fac8b7fed9a5b02202c17cb9e2d8b370910e7e2850a4bbcf9776df34bdfe6dd3fd75d3bb66f6a342c012103c86473f098d9bb69d31a7851372f9ded7b11691a77c253279e987373164b2ad200000000',
      rbf: true,
      numOutputs: 3,
      script: Buffer.from('6a210187cabdbd5b020109008240149667de58c15475626165eaa4c9970e409e1181d0', 'hex'),
      asset: {
        allocation: [{ assetGuid: '2305793883', values: [{ n: 1, value: new BN(100000000) }, { n: 0, value: new BN(490000000) }] }],
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
          totalSupply: '0',
          maxSupply: '100000000000'
        },
        {
          assetGuid: '2369540753',
          decimals: 8,
          totalSupply: '0',
          maxSupply: '100000000000'
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
      hex: '8e000000000102684c965ed8b542a614743b91faa18989dd4ad5bd66a2326a2f648b2602fbdb640000000000fdffffff2270b1a47a133755ff6dbcb34a32cc31b42c999c70dec6b133ced8e6e36d589f0100000000fdffffff04a0d7f50500000000160014bd6cfd84d53025c8891862ec49b0036d06405d0f52180000000000001600149271f58284fc922b7e466cff87a53bb838d11feb26010000000000001600149271f58284fc922b7e466cff87a53bb838d11feb0000000000000000136a110287cabdbd5b01015887e8f0a41101020802483045022100be38747a13b8aa5f6980da4ed538d3cd1b8313e5c854785cc462c4567d13174b02206104688396377d2c722cb7cbb73c93f8ccf18ae231069ae4ede1774b6d985598012103b7eeb47fdd1c2084ef795fac22bf24185e7295d2efa3178b69b6eca409810fba024730440220127a840a0ab98f765e7796b31e8402df3066b3454699d199eab8340cd678d57602202bb7c2e1b241c76aa83e8d29aed3c4e86d749be343efccbf9c28ab18cbb92b77012103c86473f098d9bb69d31a7851372f9ded7b11691a77c253279e987373164b2ad200000000',
      rbf: true,
      version: syscointx.utils.SYSCOIN_TX_VERSION_ALLOCATION_SEND,
      numOutputs: 4, // 4 because new opreturn will be created + 1 for second asset change
      script: Buffer.from('6a110287cabdbd5b01015887e8f0a411010208', 'hex'),
      asset: {
        allocation: [{ assetGuid: '2305793883', values: [{ n: 1, value: new BN(90000000) }] }, { assetGuid: '2369540753', values: [{ n: 2, value: new BN(10000000) }] }]
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
        { txid: '64dbfb02268b642f6a32a266bdd54add8989a1fa913b7414a642b5d85e964c68', vout: 0, address: 'tsys1qh4k0mpx4xqju3zgcvtkynvqrd5ryqhg0yr9uk8', path: "m/84'/1'/0'/0/10", value: '100000000' },
        { txid: '9f586de3e6d8ce33b1c6de709c992cb431cc324ab3bc6dff5537137aa4b17022', vout: 1, address: 'tsys1qjfcltq5yljfzkljxdnlc0ffmhqudz8ltq0z695', path: "m/84'/1'/0'/0/5", value: '6900', assetInfo: { assetGuid: '2369540753', value: '10000000' } }
      ],
      assets: [
        {
          assetGuid: '2305793883',
          decimals: 8,
          totalSupply: '0',
          maxSupply: '100000000000'
        },
        {
          assetGuid: '2369540753',
          decimals: 8,
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
      hex: '8c000000000101684c965ed8b542a614743b91faa18989dd4ad5bd66a2326a2f648b2602fbdb640000000000fdffffff03a8020000000000001600146a7e3ca88d8f80b0832a25b977766dfdc0fa8d4b0000000000000000fd94096a4d90090288dea1914b01006487cabdbd5b0102583c3bfe141fcbe313f2afd31be1b63dd3a0147235161e637407fbb8605d3d294fee524852fb7df5a6c27106f4bc47e740e6a6751e66bce1f98363ff2eecbf8c0d7102fd9f03f9039cf871a04442f3f69add48df0531fe3c0025103b53fcf3fe38060e5f29366caec8855e4fa0229f7b7e69c0b5793f8a61c06f5cc09b0f4938561856c632ee56c3b2c4d6d153808080808080a07720fff5e8eabef55fa129ee55b3b0d82875e2b25b8f26e22cf6b5c4f9cec7ab8080808080808080f901f180a03ee147749c5b769bc5d1a53e4f37567506d417de4ec4e67722130eda4638427da043caa62b40dad61bce4d50fb62ea485729a6687c3aa13895cf4ba234b92afe82a0b79958e4aa63104da4599ebb91e712375e6adfc89abc14b9533c5778f107e7d8a01bc7f80f81a8d281253ac882bb89aca6131e5794bfcbdccde990bb6d5be6cb2fa0aedad62f1426b68e395a59e06bf242fb28b882af67589bce3495a99650058ec4a0c21a7e0b9d0948bb6b65a5e73f5f01173064d20e4819ca4884d1eabc22bf737da090087708c533b10af8925eebf398c005fc16cb6a515111f2be4f328f762949d0a02827daacd6a52ae6c74a78791ff0c5e33a7a85f5ca0a47cdfbcd5219f75f705ca0af7ecf31d56575155d272cd813bf7d7ac435f62b0538c31771e407dafef6be53a09b74707c3abdbfa305cb61f23c940f063f553f17d0bd3013126aad357193353ea067a52ed59820bb48f8010d2b2bb0ee92803b1a00a8341fd4c3269b065ed070d9a0bf0e9b45955283e6e04b71eda63bfc7b55d9f54527943aa1c159b4161b1e1daea0ecabd4c00deacf9a7ff25be942c9f468628eb776fbec23a9ca0d8fc256f14a31a0df406c7ac7f38c2ea1d9bdb06c2e51db3de8cf0e655a8e0e683e19ca1ddf83d3a08360ec6c5e26614f144520ed9d0b577640381f0f38b5429b67422f75d603ad5a80f9013220b9012ef9012b82051f843b9aca008307a120940765efb302d504751c652c5b1d65e8e9edf2e70f80b8c454c988ff00000000000000000000000000000000000000000000000000000002540be400000000000000000000000000000000000000000000000000000000009be8894b0000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000002c62637274317130667265323430737939326d716b386b6b377073616561366b74366d3537323570377964636a00000000000000000000000000000000000000002ca0dccb6e077c3f6252d199202113893407119d4ba09667113f2d20c63a31487b87a01e0a059e50f08f2772781691f2c9e43a9503a167c98cf467b1afc177b74d84e6010b7102fd5405f90551f871a0cab13def05783d763febde31920bd234d0486c26955c2937e0486db909a28eeea09cf564a668a29a5f1cc5d6ef8e19988dfd2b30d290672f0ffc4200e608cb65ac808080808080a029b8ed2258c53562954c87bcd7f60671029680d2a19ef8bcd3ad470ea48d57d18080808080808080f901f180a07c21ca39872e6b8f611bc6b1b295c24f988b5cf944625eabf5236b37ea3b9f01a0edb9e63fdc31ba41f11a8b2fb8000ad1357b3c0b27a8483968d75e93e7b488a1a02231847aa3c5dde2f2a1851a66aabec65e5eaae8c28110756f122c72be1fba05a08fa87809e5b7f989e78ccbe1a6bc4924115d5747529af879f2fe196f959b64fca091f1bf748061eba21a413b72d70afccb8daebb5906d5cd9dda06d5f877065d5ba0d7e6c82dd1c25eb2f90b02f038beaff98c260d46992d0b3c1eac7d51552c7417a01d5c43deb2e3794292cdffb04f82ab25bc4e75f5e0cab928b66582e08026f5b1a0d7323a87dc8fbc66c7b34810d2cad92fc0da168d962b4556e825a3266a148b74a0af31f0b7cdcd6a855ac7678ef2b8fcb1afeda918b0c8e4696a4013f2b75ca402a0f9d63f2db8ab6d3c3e12073ac2910ee575832bde3e4586f18e59dd26a16adb7ca0f0c91e059c43780617d304fe8992511f096ccc35232da1f25127db53ba4fb05aa052030932d0a9026efd2a3ada67f33d401cd9a97ddb24c606af3a0a0c24e432aba0142af9b4686c6ca30b0ac39133fa76d8682b7bbbec488e62e652d3f25419777da0940f31617e91cfbabaa9d0d1638949f8125f80a43027122778522675194a4e65a0edc4c7d2cf30150fdf7e502d0ef06c80c85fc37260134a112493c6183f62f4b580f902e720b902e3f902e00183192ee2b9010000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000200000000000000008000000000000000000000100200000000000000000010000000000000200000000000000000000000000000000000010000000000000000000000000000004000000000000000000000000400004001000000000020000000000000000000000000080000000000000408000000040000000000000000002000000000000000000000000000000000000000000000000000000000010000000000000000010000000000000000000000000000000000000000000f901d5f89b94f2bb7bfa19e7c4b6bb333ee1afdf8e5e8f9b3561f863a0ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3efa0000000000000000000000000b0ea8c9ee8aa87efd28a12de8c034f947c144053a00000000000000000000000000765efb302d504751c652c5b1d65e8e9edf2e70fa000000000000000000000000000000000000000000000000000000002540be400f89b94f2bb7bfa19e7c4b6bb333ee1afdf8e5e8f9b3561f863a08c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925a0000000000000000000000000b0ea8c9ee8aa87efd28a12de8c034f947c144053a00000000000000000000000000765efb302d504751c652c5b1d65e8e9edf2e70fa00000000000000000000000000000000000000000000000000000000000000000f899940765efb302d504751c652c5b1d65e8e9edf2e70fe1a09c6dea23fe3b510bb5d170df49dc74e387692eaa3258c691918cd3aa94f5fb74b860000000000000000000000000b0ea8c9ee8aa87efd28a12de8c034f947c14405300000000000000000000000000000000000000000000000000000002540be4000000000000000000000000000000000000000000000000000000080800000002842ab40a9c4770c8ec74158aadcf943e8158128fdd1ba8cef9c7cb8eda732692a958499bf48fcce17672b58aa9037bd3dafeb6231880722d909c60bacfaaa8d46e78f505000000001600140f8137adebd136ebb5d3c9796e79916ddcff77cb0248304502210099eddaf7dc1d998c78918fe21506cb866e0bcef901b15e0b28d818573ba1ab0a02201a03370f6ff70b3357627f924a672ac6aef1cd7ed16aa7c7ab2b07a482beaac5012103b7eeb47fdd1c2084ef795fac22bf24185e7295d2efa3178b69b6eca409810fba00000000',
      rbf: true,
      version: syscointx.utils.SYSCOIN_TX_VERSION_ALLOCATION_MINT,
      numOutputs: 3,
      script: Buffer.from('6a4d90090288dea1914b01006487cabdbd5b0102583c3bfe141fcbe313f2afd31be1b63dd3a0147235161e637407fbb8605d3d294fee524852fb7df5a6c27106f4bc47e740e6a6751e66bce1f98363ff2eecbf8c0d7102fd9f03f9039cf871a04442f3f69add48df0531fe3c0025103b53fcf3fe38060e5f29366caec8855e4fa0229f7b7e69c0b5793f8a61c06f5cc09b0f4938561856c632ee56c3b2c4d6d153808080808080a07720fff5e8eabef55fa129ee55b3b0d82875e2b25b8f26e22cf6b5c4f9cec7ab8080808080808080f901f180a03ee147749c5b769bc5d1a53e4f37567506d417de4ec4e67722130eda4638427da043caa62b40dad61bce4d50fb62ea485729a6687c3aa13895cf4ba234b92afe82a0b79958e4aa63104da4599ebb91e712375e6adfc89abc14b9533c5778f107e7d8a01bc7f80f81a8d281253ac882bb89aca6131e5794bfcbdccde990bb6d5be6cb2fa0aedad62f1426b68e395a59e06bf242fb28b882af67589bce3495a99650058ec4a0c21a7e0b9d0948bb6b65a5e73f5f01173064d20e4819ca4884d1eabc22bf737da090087708c533b10af8925eebf398c005fc16cb6a515111f2be4f328f762949d0a02827daacd6a52ae6c74a78791ff0c5e33a7a85f5ca0a47cdfbcd5219f75f705ca0af7ecf31d56575155d272cd813bf7d7ac435f62b0538c31771e407dafef6be53a09b74707c3abdbfa305cb61f23c940f063f553f17d0bd3013126aad357193353ea067a52ed59820bb48f8010d2b2bb0ee92803b1a00a8341fd4c3269b065ed070d9a0bf0e9b45955283e6e04b71eda63bfc7b55d9f54527943aa1c159b4161b1e1daea0ecabd4c00deacf9a7ff25be942c9f468628eb776fbec23a9ca0d8fc256f14a31a0df406c7ac7f38c2ea1d9bdb06c2e51db3de8cf0e655a8e0e683e19ca1ddf83d3a08360ec6c5e26614f144520ed9d0b577640381f0f38b5429b67422f75d603ad5a80f9013220b9012ef9012b82051f843b9aca008307a120940765efb302d504751c652c5b1d65e8e9edf2e70f80b8c454c988ff00000000000000000000000000000000000000000000000000000002540be400000000000000000000000000000000000000000000000000000000009be8894b0000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000002c62637274317130667265323430737939326d716b386b6b377073616561366b74366d3537323570377964636a00000000000000000000000000000000000000002ca0dccb6e077c3f6252d199202113893407119d4ba09667113f2d20c63a31487b87a01e0a059e50f08f2772781691f2c9e43a9503a167c98cf467b1afc177b74d84e6010b7102fd5405f90551f871a0cab13def05783d763febde31920bd234d0486c26955c2937e0486db909a28eeea09cf564a668a29a5f1cc5d6ef8e19988dfd2b30d290672f0ffc4200e608cb65ac808080808080a029b8ed2258c53562954c87bcd7f60671029680d2a19ef8bcd3ad470ea48d57d18080808080808080f901f180a07c21ca39872e6b8f611bc6b1b295c24f988b5cf944625eabf5236b37ea3b9f01a0edb9e63fdc31ba41f11a8b2fb8000ad1357b3c0b27a8483968d75e93e7b488a1a02231847aa3c5dde2f2a1851a66aabec65e5eaae8c28110756f122c72be1fba05a08fa87809e5b7f989e78ccbe1a6bc4924115d5747529af879f2fe196f959b64fca091f1bf748061eba21a413b72d70afccb8daebb5906d5cd9dda06d5f877065d5ba0d7e6c82dd1c25eb2f90b02f038beaff98c260d46992d0b3c1eac7d51552c7417a01d5c43deb2e3794292cdffb04f82ab25bc4e75f5e0cab928b66582e08026f5b1a0d7323a87dc8fbc66c7b34810d2cad92fc0da168d962b4556e825a3266a148b74a0af31f0b7cdcd6a855ac7678ef2b8fcb1afeda918b0c8e4696a4013f2b75ca402a0f9d63f2db8ab6d3c3e12073ac2910ee575832bde3e4586f18e59dd26a16adb7ca0f0c91e059c43780617d304fe8992511f096ccc35232da1f25127db53ba4fb05aa052030932d0a9026efd2a3ada67f33d401cd9a97ddb24c606af3a0a0c24e432aba0142af9b4686c6ca30b0ac39133fa76d8682b7bbbec488e62e652d3f25419777da0940f31617e91cfbabaa9d0d1638949f8125f80a43027122778522675194a4e65a0edc4c7d2cf30150fdf7e502d0ef06c80c85fc37260134a112493c6183f62f4b580f902e720b902e3f902e00183192ee2b9010000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000200000000000000008000000000000000000000100200000000000000000010000000000000200000000000000000000000000000000000010000000000000000000000000000004000000000000000000000000400004001000000000020000000000000000000000000080000000000000408000000040000000000000000002000000000000000000000000000000000000000000000000000000000010000000000000000010000000000000000000000000000000000000000000f901d5f89b94f2bb7bfa19e7c4b6bb333ee1afdf8e5e8f9b3561f863a0ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3efa0000000000000000000000000b0ea8c9ee8aa87efd28a12de8c034f947c144053a00000000000000000000000000765efb302d504751c652c5b1d65e8e9edf2e70fa000000000000000000000000000000000000000000000000000000002540be400f89b94f2bb7bfa19e7c4b6bb333ee1afdf8e5e8f9b3561f863a08c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925a0000000000000000000000000b0ea8c9ee8aa87efd28a12de8c034f947c144053a00000000000000000000000000765efb302d504751c652c5b1d65e8e9edf2e70fa00000000000000000000000000000000000000000000000000000000000000000f899940765efb302d504751c652c5b1d65e8e9edf2e70fe1a09c6dea23fe3b510bb5d170df49dc74e387692eaa3258c691918cd3aa94f5fb74b860000000000000000000000000b0ea8c9ee8aa87efd28a12de8c034f947c14405300000000000000000000000000000000000000000000000000000002540be4000000000000000000000000000000000000000000000000000000080800000002842ab40a9c4770c8ec74158aadcf943e8158128fdd1ba8cef9c7cb8eda732692a958499bf48fcce17672b58aa9037bd3dafeb6231880722d909c60bacfaaa8d4', 'hex'),
      asset: {
        allocation: [{ assetGuid: '2615707979', values: [{ n: 0, value: new BN(10000000000) }] }, { assetGuid: '2305793883', values: [{ n: 2, value: new BN(90000000) }] }],
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
      hex: '8b000000000101684c965ed8b542a614743b91faa18989dd4ad5bd66a2326a2f648b2602fbdb640000000000fdffffff0326010000000000001600146a7e3ca88d8f80b0832a25b977766dfdc0fa8d4ba0bb0d00000000000b6a090188dea1914b010056ea7e0100000000001600140f8137adebd136ebb5d3c9796e79916ddcff77cb0247304402207142f2787b29f183b580483bddf1e9d2e1a999e76030dc19f0f65bb1dfcdbaca02204dfe0bf04e7da125da9b77a713be43fb574e20e7280bc545e56fc5f00e7961b4012103b7eeb47fdd1c2084ef795fac22bf24185e7295d2efa3178b69b6eca409810fba00000000',
      rbf: true,
      version: syscointx.utils.SYSCOIN_TX_VERSION_SYSCOIN_BURN_TO_ALLOCATION,
      numOutputs: 3,
      script: Buffer.from('6a090188dea1914b010056', 'hex'),
      asset: {
        allocation: [{ assetGuid: '2615707979', values: [{ n: 0, value: new BN(900000) }] }]
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
          totalSupply: '0',
          maxSupply: '100000000000'
        },
        {
          assetGuid: '2369540753',
          decimals: 8,
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
      hex: '8b000000000101684c965ed8b542a614743b91faa18989dd4ad5bd66a2326a2f648b2602fbdb640000000000fdffffff0326010000000000001600146a7e3ca88d8f80b0832a25b977766dfdc0fa8d4ba0bb0d0000000000136a110288dea1914b01005687cabdbd5b0102589a7e0100000000001600140f8137adebd136ebb5d3c9796e79916ddcff77cb02483045022100e2a719deecf9ac3207fc935d1afc954c6d7fe0776b6e1a8796de1e639908a84b0220257b1ea4cf9b46cd49e3d486cc97a9a4478eb97b74a6ddf33bc6b3bf171e1c3a012103b7eeb47fdd1c2084ef795fac22bf24185e7295d2efa3178b69b6eca409810fba00000000',
      rbf: true,
      version: syscointx.utils.SYSCOIN_TX_VERSION_SYSCOIN_BURN_TO_ALLOCATION,
      numOutputs: 3,
      script: Buffer.from('6a110288dea1914b01005687cabdbd5b010258', 'hex'),
      asset: {
        allocation: [{ assetGuid: '2615707979', values: [{ n: 0, value: new BN(900000) }] }, { assetGuid: '2305793883', values: [{ n: 2, value: new BN(90000000) }] }]
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
          totalSupply: '0',
          maxSupply: '100000000000'
        },
        {
          assetGuid: '2369540753',
          decimals: 8,
          totalSupply: '0',
          maxSupply: '100000000000'
        }
      ]
    },
    sysChangeAddress: 'tsys1qp7qn0t0t6ymwhdwne9uku7v3dhw07a7tra8hzl',
    assetMap: new Map([
      ['2615707979', { changeAddress: 'tsys1qjfcltq5yljfzkljxdnlc0ffmhqudz8ltq0z695', outputs: [{ value: new BN(90000000), address: 'tsys1qdflre2yd37qtpqe2ykuhwandlhq04r2td2t9ae' }] }]
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
      hex: '8b000000000101684c965ed8b542a614743b91faa18989dd4ad5bd66a2326a2f648b2602fbdb640000000000fdffffff0426010000000000001600146a7e3ca88d8f80b0832a25b977766dfdc0fa8d4b804a5d05000000000d6a0b0188dea1914b02005803585a8fae4e020000001600140f8137adebd136ebb5d3c9796e79916ddcff77cb26010000000000001600149271f58284fc922b7e466cff87a53bb838d11feb024730440220466e78688043a0bb770447dc7587735620a249132dc534e1ba6790d95500d2ad022038fe5f744903008e5e21e9afc58c0b40dab0d6d07c38e41d91655546582a8ba3012103b7eeb47fdd1c2084ef795fac22bf24185e7295d2efa3178b69b6eca409810fba00000000',
      rbf: true,
      version: syscointx.utils.SYSCOIN_TX_VERSION_SYSCOIN_BURN_TO_ALLOCATION,
      numOutputs: 4,
      script: Buffer.from('6a0b0188dea1914b0200580358', 'hex'),
      asset: {
        allocation: [{ assetGuid: '2615707979', values: [{ n: 0, value: new BN(90000000) }, { n: 3, value: new BN(90000000) }] }]
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
      hex: '8e00000000010264eb3b2b92402ba48a4532a856d2b6a291aedc0742be95bdd9654dddf4365f390100000000ffffffff30c550116b2a1276ea4834ce314a32ead21037da82b96cfb293f6b5b52fe6e380100000000ffffffff0300e1f50500000000160014bd6cfd84d53025c8891862ec49b0036d06405d0fa8a23001000000001600149271f58284fc922b7e466cff87a53bb838d11feb00000000000000000b6a090187cabdbd5b010158024730440220536f39ffd2086abd2c117fefe8fb82a2f5927996da0e7d0e9e8088c0f6f64c0e0220417220f4cda26f6776e8a09e564985996e1e4f829b0dfdf2636a40ab68caa906012103c86473f098d9bb69d31a7851372f9ded7b11691a77c253279e987373164b2ad20247304402207174322a226c07821cc94fed990747671192fa3daa07d42707b9d923d22d663e02206c7079fe22b87c7c8cacee7258c8bf80a7d0f94f41873760e064726e1882aa23012103c86473f098d9bb69d31a7851372f9ded7b11691a77c253279e987373164b2ad200000000',
      rbf: false,
      version: syscointx.utils.SYSCOIN_TX_VERSION_ALLOCATION_SEND,
      numOutputs: 3, // 3 because new opreturn will be created
      script: Buffer.from('6a090187cabdbd5b010158', 'hex'),
      asset: {
        allocation: [{ assetGuid: '2305793883', values: [{ n: 1, value: new BN(90000000) }] }]
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
      hex: '8e00000000010235addfbfd1abfcb55234f51b1ecf8e967df9353b87a9bacdba63a5358803f1440000000000fdffffff4629e5a0b015fc8c0585693539c7cc79b27b6afb21d0bf993e182531c236053f0000000000fdffffff0326010000000000001600148dc01f0d18640370e091198979398466abed8a8700000000000000000d6a0b0188b5aa803802003b0227a8de64ca13000000160014c27fb464acece67abe8e8289a2c9cb2d60cabecd024730440220786016ff2daf6839f94050db2fb5a2f25644e3ad1f87de6c84607063f3293fde02201becb3023c42b4016549e8941fc1ec5e3a93b4813e5bbe866df18a9a07119c40012103e493f90c55de11c1b3aa3fc13b337807c7c1e121a2767856cfd6946e18c7fcc102473044022020ad3e302e0302322fc00e05b84e69f519cb19e0209af631ef805c0123c5da0602202de01aa0efa25e2953d7fffb8f209a2dd0e0ed045abcf9b84c78caf3bc9a83f4012103e493f90c55de11c1b3aa3fc13b337807c7c1e121a2767856cfd6946e18c7fcc100000000',
      rbf: true,
      numOutputs: 3,
      script: Buffer.from('6a0b0188b5aa803802003b0227', 'hex'),
      asset: {
        allocation: [{ assetGuid: '2529870008', values: [{ n: 0, value: new BN(600000000) }, { n: 2, value: new BN(400000000) }] }]
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
      hex: '8e00000000010235addfbfd1abfcb55234f51b1ecf8e967df9353b87a9bacdba63a5358803f1440000000000fdffffff4629e5a0b015fc8c0585693539c7cc79b27b6afb21d0bf993e182531c236053f0000000000fdffffff0326010000000000001600148dc01f0d18640370e091198979398466abed8a8700000000000000000d6a0b0188b5aa803802003b0227a8de64ca13000000160014c27fb464acece67abe8e8289a2c9cb2d60cabecd024730440220786016ff2daf6839f94050db2fb5a2f25644e3ad1f87de6c84607063f3293fde02201becb3023c42b4016549e8941fc1ec5e3a93b4813e5bbe866df18a9a07119c40012103e493f90c55de11c1b3aa3fc13b337807c7c1e121a2767856cfd6946e18c7fcc102473044022020ad3e302e0302322fc00e05b84e69f519cb19e0209af631ef805c0123c5da0602202de01aa0efa25e2953d7fffb8f209a2dd0e0ed045abcf9b84c78caf3bc9a83f4012103e493f90c55de11c1b3aa3fc13b337807c7c1e121a2767856cfd6946e18c7fcc100000000',
      rbf: true,
      numOutputs: 3,
      script: Buffer.from('6a0b0188b5aa803802003b0227', 'hex'),
      asset: {
        allocation: [{ assetGuid: '2529870008', values: [{ n: 0, value: new BN(600000000) }, { n: 2, value: new BN(400000000) }] }]
      },
      receivingIndex: 0,
      changeIndex: 3
    }
  }
]
