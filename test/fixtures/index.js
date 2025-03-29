const BN = require('bn.js')
const syscointx = require('syscointx-js')
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
      hex: '8e00000000010235addfbfd1abfcb55234f51b1ecf8e967df9353b87a9bacdba63a5358803f1440000000000fdffffff4629e5a0b015fc8c0585693539c7cc79b27b6afb21d0bf993e182531c236053f0000000000fdffffff03a8020000000000001600148dc01f0d18640370e091198979398466abed8a8700000000000000000d6a0b0188b5aa803802003b022726dd64ca13000000160014c27fb464acece67abe8e8289a2c9cb2d60cabecd02483045022100a34a7760a9d5d615f792b1216bbf59865a06fe7f088d3765781d9836d64418a502202c158f3f4a6bbbc1618f0482859748038ae2a5b29dd80a7921393b4e0f6bb1e1012103e493f90c55de11c1b3aa3fc13b337807c7c1e121a2767856cfd6946e18c7fcc102483045022100b3da33d80c8b73e5f4b57d211c41861acef4dfa415b9df4ce280f9cfdf2bf83102205686dadd9c424841bdfdd2d381480ec3a583c0466d182eb6bcfdeed30adb4e49012102e58139f9d633d5d1d76feb87fc2c44705cc317e83ade1a812f8d2a4ae7be9cb500000000',
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
      hex: '8e000000000102234c67db23a214a4f505016a19327fda100a8f92c7996720632ae0c9968cb2610000000000fdffffff234c67db23a214a4f505016a19327fda100a8f92c7996720632ae0c9968cb2610200000000fdffffff03a8020000000000001600146a7e3ca88d8f80b0832a25b977766dfdc0fa8d4b00000000000000000e6a0c0184d4a2cf5202000202857c3ab0aa79e60a0000160014f97d234b491c64d3d3347d551eb3b1a9693b89d9024730440220513943118de9c74cdff3aace3f9b9d08313d5d0388fa9503f56a498b9e76305d022058bd28c9187c50ee330c4724cdaa66f40d0441caea3b7b1a91146183a1b3d9e601210341e88f7fd83e582b8c673149b25d3879926e0490df8cd9c530560feb536a7fa20247304402201513ed497ae7b30447a949619fe35679dfa6ce6cb2ee25351a29a4b88fc39b54022074966fb17b8dea82d3be73324e9b8e1c55730c460ac5a118a9b773930d10002c012102f249cb8576b8d9c6f0d45bb3ab3b73654911b724f229ec0a5a2f45785e1e47c900000000',
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
      hex: '8e000000000107e073d118d57ec902a8ed14cdb96121f263c0ec6e4150222b73d0f8e664afc2c50000000000fdfffffffb6efdd4f7b12d61a2407ede92a269310bec83978f45c9f0bcf784b920b1da4f0000000000fdffffff22b5f7483a3fc80998660a19064cac2f6c9aeef9c2436c308e919880cdbd1d930000000000fdffffffe184c393f77c969e3ef1b6824bdae939d12c3bd4bb93f74413b992ef1b84d6660000000000fdfffffff2ed472a1d1d28220a7d2cd02eb89652f3b75fdebbc4a219bfd89797578026210000000000fdffffff826608305b2708d5e6421492864c1a18235312f61a4ec506aa2c29fdc09d21570000000000fdffffff42d6e38f8445d79b4a80fcfffbe9f99699852de26c57b05142afa5479c15a2c80000000000fdffffff0ca802000000000000160014e8cc042a7c976ab0068cf0e4fcae4845d41774a7a8020000000000001600149271f58284fc922b7e466cff87a53bb838d11feba802000000000000160014248a521f8561af8f735d0f5e6d13f41177e423bda802000000000000160014248a521f8561af8f735d0f5e6d13f41177e423bda802000000000000160014581c4fc0439986b761b5110ee86a60f8c563f7caa802000000000000160014581c4fc0439986b761b5110ee86a60f8c563f7caa8020000000000001600147326551112dd129f478b4a3fe4fab809c7fb2d0ca8020000000000001600147326551112dd129f478b4a3fe4fab809c7fb2d0ca802000000000000160014413e8fd29b2f671b6058c9f50bf51bf971274e53a802000000000000160014413e8fd29b2f671b6058c9f50bf51bf971274e530000000000000000406a3e0687e8f0a411020b30003081b5a2c92c010113898693d14702028064033080bee4e22a02041d050984dbf5dc380206813e07800a87cabdbd5b020831090942b7f50500000000160014e8cc042a7c976ab0068cf0e4fcae4845d41774a7024730440220143a457dce9b00825fc73d20a6a3c0a0b008a692b26ced4ff2be388aa3598468022057fc3781efb26e3de86f28b7f88b6eb0737f2d72ea7d3a8f9b1c7ddd9ea1eeef01210281c11974da83e7d9ff9f47a3c32e3baa7975b5127eb447b86a2f7fd4c9d12fec024730440220694222d90c16bbb926cefccea134c5af8dc42ced6a4ce1e38b459a9e14b8dbac02202088858db946b4da1b0e9a3491113227c46b9faa39aeede1a1d0f8a105588327012103c86473f098d9bb69d31a7851372f9ded7b11691a77c253279e987373164b2ad202473044022039720aff2a2bf3b4e778413ae22afc42712f7d57ee3a2747ca8289edd2b7820202202874b43116ba67a1f3eaec9276757f87a6387ae11021701f6ec40aee88b0cac0012102f165ced59862353282a8fd32ac10d018c4bc449e6dabc77a7d810ca2be6f69fd0247304402201e8dc2106492e32634f4aa1e2b9042f6b90094f0d87277d3e725a7a8b13b573b02201d4dd8ac8545e7a9e8bd97638a597ad611233e37c92b0b783e08bf935e3c061c0121025eea502cd2da208247cdd27701a2efea1e64aebf7c476362c1a6c0d1416c25f3024830450221009009b565b9175135cb16272a00a54ea5e5a77c4834ca34fa6096fbf61deff0c602206053449885fcdfdb1fb24d43d22c6c57b2f62894c9ae4a7170784d53e496b074012102ccb8a1b346388ff9691d6ee1b2019956e93e5550130cbfe2e866477193b22a3f02483045022100f71972c14867c399347508241904a0124255f5967994970f0ec01576b4e79eed02204e6cf592075374a5f94a165d916ab0bd898fc398b006cccfc999ebef6c5e87a9012102b7d4e03f4230eb2406328be6bf9dbd400083b929c07a4b0b3601589b3243067402483045022100946c793875d0e483f45f84ad8240fb5a3054e56826bd6edef62fb1f7f116939f02202ca56bd359f0864de43e1545191b96a79acf16e56264d5c8116f269fa7a5f63f012103b7eeb47fdd1c2084ef795fac22bf24185e7295d2efa3178b69b6eca409810fba00000000',
      rbf: true,
      numOutputs: 12,
      script: Buffer.from('6a3e0687e8f0a411020b30003081b5a2c92c010113898693d14702028064033080bee4e22a02041d050984dbf5dc380206813e07800a87cabdbd5b0208310909', 'hex'),
      asset: {
        allocation: [{ assetGuid: '2369540753', values: [{ n: 11, value: new BN(50000000) }, { n: 0, value: new BN(50000000) }] },
          { assetGuid: '650700076', values: [{ n: 1, value: new BN(200000000) }] },
          { assetGuid: '2699372871', values: [{ n: 2, value: new BN(250000000) }, { n: 3, value: new BN(50000000) }] },
          { assetGuid: '402223530', values: [{ n: 4, value: new BN(300000000) }, { n: 5, value: new BN(100000000) }] },
          { assetGuid: '1537060536', values: [{ n: 6, value: new BN(350000000) }, { n: 7, value: new BN(150000000) }] },
          { assetGuid: '2305793883', values: [{ n: 8, value: new BN(500000000) }, { n: 9, value: new BN(100000000) }] }]
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
      hex: '8e000000000106e073d118d57ec902a8ed14cdb96121f263c0ec6e4150222b73d0f8e664afc2c50000000000fffffffffb6efdd4f7b12d61a2407ede92a269310bec83978f45c9f0bcf784b920b1da4f0000000000ffffffff22b5f7483a3fc80998660a19064cac2f6c9aeef9c2436c308e919880cdbd1d930000000000ffffffffe184c393f77c969e3ef1b6824bdae939d12c3bd4bb93f74413b992ef1b84d6660000000000fffffffff2ed472a1d1d28220a7d2cd02eb89652f3b75fdebbc4a219bfd89797578026210000000000ffffffff826608305b2708d5e6421492864c1a18235312f61a4ec506aa2c29fdc09d21570000000000ffffffff0ca802000000000000160014e8cc042a7c976ab0068cf0e4fcae4845d41774a7a8020000000000001600149271f58284fc922b7e466cff87a53bb838d11feba802000000000000160014248a521f8561af8f735d0f5e6d13f41177e423bda802000000000000160014248a521f8561af8f735d0f5e6d13f41177e423bda802000000000000160014581c4fc0439986b761b5110ee86a60f8c563f7caa802000000000000160014581c4fc0439986b761b5110ee86a60f8c563f7caa8020000000000001600147326551112dd129f478b4a3fe4fab809c7fb2d0ca8020000000000001600147326551112dd129f478b4a3fe4fab809c7fb2d0ca802000000000000160014413e8fd29b2f671b6058c9f50bf51bf971274e53a802000000000000160014413e8fd29b2f671b6058c9f50bf51bf971274e530000000000000000406a3e0687e8f0a411020b30003081b5a2c92c010113898693d14702028064033080bee4e22a02041d050984dbf5dc380206813e07800a87cabdbd5b02083109094640000000000000160014e8cc042a7c976ab0068cf0e4fcae4845d41774a70247304402203b51c57a011e29682cfa20404b11449d5cfd0cd6db7699537679665ef306676c02205a78397bde82fc6eaefd448c97ef470f3d124a939f0c8db253308a24c6dd410a01210281c11974da83e7d9ff9f47a3c32e3baa7975b5127eb447b86a2f7fd4c9d12fec0247304402203e242a86eb1807d048c9e58907f6476dc8e48655908601a9308b5ea2b7ee49bb02207a931dd01271a2090dd3f12de77dac546e1b7b61ecf4d79379f90293f6b6c6fd012103c86473f098d9bb69d31a7851372f9ded7b11691a77c253279e987373164b2ad202483045022100cc5ffb30aa87da6646709652f7d146d4db30818bcced46b6a7d3ae21c99dbefd0220392dd3a1fd0f03fab95aeb326b7afef48171bbf56e4d23a9bc2b26e35cdc681d012102f165ced59862353282a8fd32ac10d018c4bc449e6dabc77a7d810ca2be6f69fd024730440220543bea8bc1c7755d5a21e50a823327a9a37918ead29df1f41376b8021e54a05b02200960c983b0f0350da080edc5d8ccb34e9c6af014af16a6678e3bc21ebbb4d4a40121025eea502cd2da208247cdd27701a2efea1e64aebf7c476362c1a6c0d1416c25f302483045022100f5622d3f7f8e8dd81b1c5bb1c83eee1c0fdbc4157a1488ced160abfab63ab08a022005cffa7594cdba3f8d481a029850537b55aa0370853d177a3c2b88780b871f48012102ccb8a1b346388ff9691d6ee1b2019956e93e5550130cbfe2e866477193b22a3f024730440220576189168f5f2eec1e592d6cc6300ba8106bca04045fdde0f3323ea819c2cfcf0220633c1ce7b37d49b43e34c27335338e56187edd0b4f8402cf735508cdb168255e012102b7d4e03f4230eb2406328be6bf9dbd400083b929c07a4b0b3601589b3243067400000000',
      rbf: false,
      numOutputs: 12,
      script: Buffer.from('6a3e0687e8f0a411020b30003081b5a2c92c010113898693d14702028064033080bee4e22a02041d050984dbf5dc380206813e07800a87cabdbd5b0208310909', 'hex'),
      asset: {
        allocation: [{ assetGuid: '2369540753', values: [{ n: 11, value: new BN(50000000) }, { n: 0, value: new BN(50000000) }] },
          { assetGuid: '650700076', values: [{ n: 1, value: new BN(200000000) }] },
          { assetGuid: '2699372871', values: [{ n: 2, value: new BN(250000000) }, { n: 3, value: new BN(50000000) }] },
          { assetGuid: '402223530', values: [{ n: 4, value: new BN(300000000) }, { n: 5, value: new BN(100000000) }] },
          { assetGuid: '1537060536', values: [{ n: 6, value: new BN(350000000) }, { n: 7, value: new BN(150000000) }] },
          { assetGuid: '2305793883', values: [{ n: 8, value: new BN(500000000) }, { n: 9, value: new BN(100000000) }] }]
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
      hex: '8e000000000107e073d118d57ec902a8ed14cdb96121f263c0ec6e4150222b73d0f8e664afc2c50000000000fdfffffffb6efdd4f7b12d61a2407ede92a269310bec83978f45c9f0bcf784b920b1da4f0000000000fdffffff22b5f7483a3fc80998660a19064cac2f6c9aeef9c2436c308e919880cdbd1d930000000000fdffffffe184c393f77c969e3ef1b6824bdae939d12c3bd4bb93f74413b992ef1b84d6660000000000fdfffffff2ed472a1d1d28220a7d2cd02eb89652f3b75fdebbc4a219bfd89797578026210000000000fdffffff826608305b2708d5e6421492864c1a18235312f61a4ec506aa2c29fdc09d21570000000000fdffffff687a1987daaea85a054c6cf5b6a7a8430b9ea88b67e581cfba17b81a2f70e7c60000000000fdffffff0da802000000000000160014e8cc042a7c976ab0068cf0e4fcae4845d41774a7a8020000000000001600149271f58284fc922b7e466cff87a53bb838d11feba802000000000000160014248a521f8561af8f735d0f5e6d13f41177e423bda802000000000000160014248a521f8561af8f735d0f5e6d13f41177e423bda802000000000000160014581c4fc0439986b761b5110ee86a60f8c563f7caa802000000000000160014581c4fc0439986b761b5110ee86a60f8c563f7caa8020000000000001600147326551112dd129f478b4a3fe4fab809c7fb2d0ca8020000000000001600147326551112dd129f478b4a3fe4fab809c7fb2d0ca802000000000000160014413e8fd29b2f671b6058c9f50bf51bf971274e53a802000000000000160014413e8fd29b2f671b6058c9f50bf51bf971274e530000000000000000486a460787e8f0a411020b30003081b5a2c92c010113898693d14702028064033080bee4e22a02041d050984dbf5dc380206813e07800a87cabdbd5b0208310909858addbd66010c0a34c60e0000000000160014e8cc042a7c976ab0068cf0e4fcae4845d41774a7a802000000000000160014bd6cfd84d53025c8891862ec49b0036d06405d0f0247304402203013cc2ff5cba9664ee3538477999b365cd77a77a66dd68d6603511a43fab1c302207f118a8bbcf1fffa7543e2fabf157acf105cba9883ad4407c223fbadd21dbb8301210281c11974da83e7d9ff9f47a3c32e3baa7975b5127eb447b86a2f7fd4c9d12fec024730440220223f20f5fdc1d38a6c745c325d903c702061dd2ce290c7108965bec11c6c714c022015f63b01915161df350af891bc823e19bf12e2fe8b583c1087131112029548c3012103c86473f098d9bb69d31a7851372f9ded7b11691a77c253279e987373164b2ad202473044022051f46545e8a7af1edfe73dd08640e25b49549612c1285d218f534137c47e082e02202ecf522e0865ce413d2c6805b601b0d3cde5a72a221916b1b3bdef366a2320d6012102f165ced59862353282a8fd32ac10d018c4bc449e6dabc77a7d810ca2be6f69fd024830450221009bba74c4d08d61621e79b36e4e56e7ca43ae049e24391a5672bac704573a0e6c02203b13d25ba9f8f5df908b921ef495272adec69d112ceaa964f307a50b0454f1c00121025eea502cd2da208247cdd27701a2efea1e64aebf7c476362c1a6c0d1416c25f3024730440220183dc5510557362111398f30ab42a69b6db476fde34dd37ba0e8a398df90589e022037bba09b66c4e711ecea57a227f7af80878d2779339163580730d701aaa710c3012102ccb8a1b346388ff9691d6ee1b2019956e93e5550130cbfe2e866477193b22a3f0247304402201da4a09597c5d989f5372f27a1476ddc606b12cec997d758673fa4221ac520af02202516b54f6691fe3aa768990009f2bb132e0e29ed6839e97b2ecca59512768099012102b7d4e03f4230eb2406328be6bf9dbd400083b929c07a4b0b3601589b32430674024830450221009c5c25c828a0de60906166fce9b62b62c06d9f56cbdb20b8383ee6528c7eee2b02200ce158d634658f18e623b97b3e8c13bc9a4af7688d397253f997aade69976f33012102b7d4e03f4230eb2406328be6bf9dbd400083b929c07a4b0b3601589b3243067400000000',
      rbf: true,
      numOutputs: 13,
      script: Buffer.from('6a460787e8f0a411020b30003081b5a2c92c010113898693d14702028064033080bee4e22a02041d050984dbf5dc380206813e07800a87cabdbd5b0208310909858addbd66010c0a', 'hex'),
      asset: {
        allocation: [{ assetGuid: '2369540753', values: [{ n: 11, value: new BN(50000000) }, { n: 0, value: new BN(50000000) }] },
          { assetGuid: '650700076', values: [{ n: 1, value: new BN(200000000) }] },
          { assetGuid: '2699372871', values: [{ n: 2, value: new BN(250000000) }, { n: 3, value: new BN(50000000) }] },
          { assetGuid: '402223530', values: [{ n: 4, value: new BN(300000000) }, { n: 5, value: new BN(100000000) }] },
          { assetGuid: '1537060536', values: [{ n: 6, value: new BN(350000000) }, { n: 7, value: new BN(150000000) }] },
          { assetGuid: '2305793883', values: [{ n: 8, value: new BN(500000000) }, { n: 9, value: new BN(100000000) }] },
          { assetGuid: '1635229542', values: [{ n: 12, value: new BN(1000000000) }] }]
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
      hex: '8a0000000001021787945f9d715eb56da23be847e1db7aada29c70ba4ef0eb59c9ed20d60526910000000000fdffffff1787945f9d715eb56da23be847e1db7aada29c70ba4ef0eb59c9ed20d60526910b00000000fdffffff0301000000000000001600149271f58284fc922b7e466cff87a53bb838d11feb0000000000000000126a100187e8f0a41102010100a0c2c3b277004c265f841a000000160014bd6cfd84d53025c8891862ec49b0036d06405d0f02473044022021582e2aaf8dcde68969a0724ed3f6b037d5d65d167c12dff8ca8e0f470787b002207043c1e8dc253753c35d990ea638f7b2f38ce1fe73991ee8be4f8c263e8a0f9c01210281c11974da83e7d9ff9f47a3c32e3baa7975b5127eb447b86a2f7fd4c9d12fec02483045022100c6d366bba32804b5b53977e58194696a0fa3409e5bfd70616fa2bde3cf67c3aa022074679b35f4b8b27b119fc9fb3e2a60aee287787f62bb2151c2950fd07e01d05601210281c11974da83e7d9ff9f47a3c32e3baa7975b5127eb447b86a2f7fd4c9d12fec00000000',
      rbf: true,
      numOutputs: 3,
      script: Buffer.from('6a100187e8f0a41102010100a0c2c3b27700', 'hex'),
      asset: {
        allocation: [{ assetGuid: '2369540753', values: [{ n: 1, value: new BN(1) }, { n: 0, value: new BN(999999999) }] }], ethaddress: Buffer.from('', 'hex')
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
      hex: '8d0000000001021787945f9d715eb56da23be847e1db7aada29c70ba4ef0eb59c9ed20d60526910900000000fdffffff2270b1a47a133755ff6dbcb34a32cc31b42c999c70dec6b133ced8e6e36d589f0300000000fdffffff020000000000000000226a200187cabdbd5b0200080158149667de58c15475626165eaa4c9970e409e1181d03678f505000000001600149271f58284fc922b7e466cff87a53bb838d11feb0247304402201d9c26950f0dbf7ebb271e9693d563f224249357f0ff90b3c77610952571378102206f94a510cc00c1dadc1ba07199b316a651b7455739429c73b1b862c63b433096012102b7d4e03f4230eb2406328be6bf9dbd400083b929c07a4b0b3601589b3243067402483045022100cfafd98dd7800106558b5f86ed83ed62504794ddcfa7386e0bd7ab2437b6879002204d24b2667f1627bbb59cbefa1897cf5bb87482c9e9eee42898ffb81876cb3a71012103b7eeb47fdd1c2084ef795fac22bf24185e7295d2efa3178b69b6eca409810fba00000000',
      rbf: true,
      numOutputs: 2,
      script: Buffer.from('6a200187cabdbd5b0200080158149667de58c15475626165eaa4c9970e409e1181d0', 'hex'),
      asset: {
        allocation: [{ assetGuid: '2305793883', values: [{ n: 0, value: new BN(10000000) }, { n: 1, value: new BN(90000000) }] }],
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
      hex: '8d0000000001021787945f9d715eb56da23be847e1db7aada29c70ba4ef0eb59c9ed20d60526910800000000fdffffff30c550116b2a1276ea4834ce314a32ead21037da82b96cfb293f6b5b52fe6e380100000000fdffffff020000000000000000236a210187cabdbd5b020009018240149667de58c15475626165eaa4c9970e409e1181d05a68f505000000001600149271f58284fc922b7e466cff87a53bb838d11feb02483045022100bb4ad65ff7e64f614b6d77c45c58f3a1ed0958f80d2a711e57a3c0dd53e9172202200f6b50508f4918dc6bb34b6af2884953e1fd7eb3bc7f88724f3b327bc45068ba012102b7d4e03f4230eb2406328be6bf9dbd400083b929c07a4b0b3601589b32430674024730440220338bd74584309686a3155e1964395ff3f44c3563f864e94755d0fddbc0327e4e022042b4a8513b8fdb40c6e9b6b3433a8da5d9d84d52a93c44d7745c1b2dadf257d7012103c86473f098d9bb69d31a7851372f9ded7b11691a77c253279e987373164b2ad200000000',
      rbf: true,
      numOutputs: 2,
      script: Buffer.from('6a210187cabdbd5b020009018240149667de58c15475626165eaa4c9970e409e1181d0', 'hex'),
      asset: {
        allocation: [{ assetGuid: '2305793883', values: [{ n: 0, value: new BN(100000000) }, { n: 1, value: new BN(490000000) }] }],
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
      hex: '8e000000000102684c965ed8b542a614743b91faa18989dd4ad5bd66a2326a2f648b2602fbdb640000000000fdffffff2270b1a47a133755ff6dbcb34a32cc31b42c999c70dec6b133ced8e6e36d589f0100000000fdffffff04a0d7f50500000000160014bd6cfd84d53025c8891862ec49b0036d06405d0fd0160000000000001600149271f58284fc922b7e466cff87a53bb838d11feba8020000000000001600149271f58284fc922b7e466cff87a53bb838d11feb0000000000000000136a110287cabdbd5b01015887e8f0a41101020802473044022071a14ae7acc6919c8f65296c839ffb5d2ab01073d361e348cbbc4fb98958531e02206b570c9b71694e9a0aacd61c7504ef86caa3987a8a069c711df197c5dfa07468012103b7eeb47fdd1c2084ef795fac22bf24185e7295d2efa3178b69b6eca409810fba0248304502210083f5614104c4f20812162467ea3e7b67d2bff887d4053f394795bf379fd99c7802206cec94ef3128bd9d1fff843f845b93dadadce60c124f8a60f6193d18a0512155012103c86473f098d9bb69d31a7851372f9ded7b11691a77c253279e987373164b2ad200000000',
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
      hex: '8b000000000101684c965ed8b542a614743b91faa18989dd4ad5bd66a2326a2f648b2602fbdb640000000000fdffffff03a8020000000000001600146a7e3ca88d8f80b0832a25b977766dfdc0fa8d4ba0bb0d00000000000b6a090188dea1914b010056687d0100000000001600140f8137adebd136ebb5d3c9796e79916ddcff77cb024830450221009b6eb4fba6d128c891c630aab76248ae808ccda5903e1bad966b1c8675bc4eaa0220423e6f702c91bea13dcd25d62d448bb2f879ef83bfe9d060db5a5c2c6173f0bf012103b7eeb47fdd1c2084ef795fac22bf24185e7295d2efa3178b69b6eca409810fba00000000',
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
      hex: '8b000000000101684c965ed8b542a614743b91faa18989dd4ad5bd66a2326a2f648b2602fbdb640000000000fdffffff03a8020000000000001600146a7e3ca88d8f80b0832a25b977766dfdc0fa8d4ba0bb0d0000000000136a110288dea1914b01005687cabdbd5b010258187d0100000000001600140f8137adebd136ebb5d3c9796e79916ddcff77cb02483045022100d268506c095b22e9a341aacde7287081e6af97f0006129a88a0870224a4e06af022037f67a79dcde46747e38c038ba3cc3277ee6ba6d128b9a1d896c636b6e9e4158012103b7eeb47fdd1c2084ef795fac22bf24185e7295d2efa3178b69b6eca409810fba00000000',
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
      hex: '8b000000000101684c965ed8b542a614743b91faa18989dd4ad5bd66a2326a2f648b2602fbdb640000000000fdffffff03a8020000000000001600146a7e3ca88d8f80b0832a25b977766dfdc0fa8d4b804a5d05000000000d6a0b0188dea1914b02005802583490ae4e020000001600149271f58284fc922b7e466cff87a53bb838d11feb02473044022028edeb58260aa9d294be3298c9c842a76f60cfac58c9bc287a8c7ef174dd3798022018b9a1bd5821b63cf4726aa1c5d0f6d1b07aebffdfd39b9f195f89058694ab06012103b7eeb47fdd1c2084ef795fac22bf24185e7295d2efa3178b69b6eca409810fba00000000',
      rbf: true,
      version: syscointx.utils.SYSCOIN_TX_VERSION_SYSCOIN_BURN_TO_ALLOCATION,
      numOutputs: 3,
      script: Buffer.from('6a0b0188dea1914b0200580258', 'hex'),
      asset: {
        allocation: [{ assetGuid: '2615707979', values: [{ n: 0, value: new BN(90000000) }, { n: 2, value: new BN(90000000) }] }]
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
      hex: '8e00000000010235addfbfd1abfcb55234f51b1ecf8e967df9353b87a9bacdba63a5358803f1440000000000fdffffff4629e5a0b015fc8c0585693539c7cc79b27b6afb21d0bf993e182531c236053f0000000000fdffffff03a8020000000000001600148dc01f0d18640370e091198979398466abed8a8700000000000000000d6a0b0188b5aa803802003b022726dd64ca13000000160014c27fb464acece67abe8e8289a2c9cb2d60cabecd02483045022100a34a7760a9d5d615f792b1216bbf59865a06fe7f088d3765781d9836d64418a502202c158f3f4a6bbbc1618f0482859748038ae2a5b29dd80a7921393b4e0f6bb1e1012103e493f90c55de11c1b3aa3fc13b337807c7c1e121a2767856cfd6946e18c7fcc10247304402200e869bb6714089c25a3f8454237430044fb269f9d342600fac4d1520788da93002200ce848fd922a27b699ee540eecb7253bb6d88417bd677ebd8f411b2ad3e00ec0012103e493f90c55de11c1b3aa3fc13b337807c7c1e121a2767856cfd6946e18c7fcc100000000',
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
      hex: '8e00000000010235addfbfd1abfcb55234f51b1ecf8e967df9353b87a9bacdba63a5358803f1440000000000fdffffff4629e5a0b015fc8c0585693539c7cc79b27b6afb21d0bf993e182531c236053f0000000000fdffffff03a8020000000000001600148dc01f0d18640370e091198979398466abed8a8700000000000000000d6a0b0188b5aa803802003b022726dd64ca13000000160014c27fb464acece67abe8e8289a2c9cb2d60cabecd02483045022100a34a7760a9d5d615f792b1216bbf59865a06fe7f088d3765781d9836d64418a502202c158f3f4a6bbbc1618f0482859748038ae2a5b29dd80a7921393b4e0f6bb1e1012103e493f90c55de11c1b3aa3fc13b337807c7c1e121a2767856cfd6946e18c7fcc10247304402200e869bb6714089c25a3f8454237430044fb269f9d342600fac4d1520788da93002200ce848fd922a27b699ee540eecb7253bb6d88417bd677ebd8f411b2ad3e00ec0012103e493f90c55de11c1b3aa3fc13b337807c7c1e121a2767856cfd6946e18c7fcc100000000',
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
