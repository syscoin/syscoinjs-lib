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
        totalSupply: 0,
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
    hex: '83000000000101fd29f5152c7f5dba90d73dd25165a5da6ce4b94ce034845df080fcd879c9f5a70100000000ffffffff020000000000000000676a4c6401b8c0ca9601010000080087142b1e58b979e4b2d72d8bca5bb4646ccc032ddbfc001f7b2264657363223a22626d563349484231596d787059335a686248566c227d1b7b2264657363223a226348566962476c6a646d46736457553d227d822400007fff18f564ca1300000016001459fa0d5c63fe35cc86157031a24d38b0cc61b94f02483045022100db15352b7aa65a3dc991a03e7c5300e0d0aaec13eadf3fe4794c3f3195c013fe022034dcddc6b10e35613bae5e33f8c838ea6be78dd54ebad3d7675bba32538def4f012103e4d8568a37e0afb8f220178b640454e91c9e9e7e2425be9e43142a7c3140e2e900000000',
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
    rbf: true
  },
  feeRate: new BN(10),
  utxoObj: {
    utxos: [
      { txId: 'befed752e1444b66fd91dd121f772d0f2f081c579f04b419eb18960dcd55e84f', vout: 2, script: Buffer.from('0014fb1a61908e16c8c5ad306b6d8ef11a6cc4f91ff5', 'hex'), value: 84900000000 },
      { txId: '5e9c72abf1d3df7ac5f673de603cd7946b25e58de8e8f87a852ba291790a5181', vout: 0, script: Buffer.from('001462621943decf05bd265f6c352db0e42f73a60f68', 'hex'), value: 99999593, assetInfo: { assetGuid: 1635229536, value: 0 } }
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
  assetMap: new Map([
    [1635229536, { changeAddress: 'bc1qc7slrfxkknqcq2jevvvkdgvrt8080852dfjewde450xdlk4ugp7szw5tk9', outputs: [{ value: new BN(1000000000), address: 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq' }, { value: new BN(0), address: 'bc1qc7slrfxkknqcq2jevvvkdgvrt8080852dfjewde450xdlk4ugp7szw5tk9' }] }]
  ]),
  expected: {
    rbf: true,
    numOutputs: 3,
    script: Buffer.from('6a0b01609f776102000a020000', 'hex'),
    asset: {
      allocation: [{ assetGuid: 1635229536, values: [{ n: 0, value: new BN(1000000000) }, { n: 2, value: new BN(0) }], notarysig: Buffer.from('') }]
    }
  }
},
{
  description: 'send asset allocation',
  version: syscointx.utils.SYSCOIN_TX_VERSION_ALLOCATION_SEND,
  txOpts: {
    rbf: true
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
        maxSupply: 100000000000
      }
    ]
  },
  sysChangeAddress: 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq',
  assetMap: new Map([
    [1635229536, { changeAddress: 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq', outputs: [{ value: new BN(600000000), address: 'bc1qc7slrfxkknqcq2jevvvkdgvrt8080852dfjewde450xdlk4ugp7szw5tk9' }] }]
  ]),
  expected: {
    rbf: true,
    numOutputs: 3,
    script: Buffer.from('6a0b01609f776102003b022700', 'hex'),
    asset: {
      allocation: [{ assetGuid: 1635229536, values: [{ n: 0, value: new BN(600000000) }, { n: 2, value: new BN(400000000) }], notarysig: Buffer.from('') }]
    }
  }
},
{
  description: 'send multi asset allocations with notarization',
  version: syscointx.utils.SYSCOIN_TX_VERSION_ALLOCATION_SEND,
  feeRate: new BN(10),
  utxoObj: {
    utxos: [
      { txId: 'c6e7702f1ab817bacf81e5678ba89e0b43a8a7b6f56c4c055aa8aeda87197a62', vout: 0, script: Buffer.from('0014712a0433b3be8c2860db2d313c44fa1967542780', 'hex'), value: 980, assetInfo: { assetGuid: 1635229536, value: 100000000 } },
      { txId: 'c6e7702f1ab817bacf81e5678ba89e0b43a8a7b6f56c4c055aa8aeda87197a63', vout: 0, script: Buffer.from('0014712a0433b3be8c2860db2d313c44fa1967542781', 'hex'), value: 980, assetInfo: { assetGuid: 1635229537, value: 200000000 } },
      { txId: 'c6e7702f1ab817bacf81e5678ba89e0b43a8a7b6f56c4c055aa8aeda87197a64', vout: 0, script: Buffer.from('0014712a0433b3be8c2860db2d313c44fa1967542782', 'hex'), value: 980, assetInfo: { assetGuid: 1635229538, value: 300000000 } },
      { txId: 'c6e7702f1ab817bacf81e5678ba89e0b43a8a7b6f56c4c055aa8aeda87197a65', vout: 0, script: Buffer.from('0014712a0433b3be8c2860db2d313c44fa1967542783', 'hex'), value: 980, assetInfo: { assetGuid: 1635229539, value: 400000000 } },
      { txId: 'c6e7702f1ab817bacf81e5678ba89e0b43a8a7b6f56c4c055aa8aeda87197a66', vout: 0, script: Buffer.from('0014712a0433b3be8c2860db2d313c44fa1967542784', 'hex'), value: 980, assetInfo: { assetGuid: 1635229540, value: 500000000 } },
      { txId: 'c6e7702f1ab817bacf81e5678ba89e0b43a8a7b6f56c4c055aa8aeda87197a67', vout: 0, script: Buffer.from('0014712a0433b3be8c2860db2d313c44fa1967542785', 'hex'), value: 980, assetInfo: { assetGuid: 1635229541, value: 600000000 } },
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
        notaryKeyID: 'ea6d525c0c955d90d3dbd29a81ef8bfb79003727',
        notaryDetails: {
          endPoint: 'https://test.com',
          instantTransfers: 0,
          HDRequired: 1
        }
      },
      {
        assetGuid: 1635229537,
        decimals: 8,
        pubData: syscointx.utils.encodePubDataFromFields('publicvalue').toString(),
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 255,
        balance: 10000000000,
        totalSupply: 0,
        maxSupply: 100000000000,
        notaryKeyID: 'ea6d525c0c955d90d3dbd29a81ef8bfb79003727',
        notaryDetails: {
          endPoint: 'https://test.com',
          instantTransfers: 0,
          HDRequired: 1
        }
      },
      {
        assetGuid: 1635229538,
        decimals: 8,
        pubData: syscointx.utils.encodePubDataFromFields('publicvalue').toString(),
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 255,
        balance: 10000000000,
        totalSupply: 0,
        maxSupply: 100000000000,
        notaryKeyID: 'ea6d525c0c955d90d3dbd29a81ef8bfb79003727',
        notaryDetails: {
          endPoint: 'https://test.com',
          instantTransfers: 0,
          HDRequired: 1
        }
      },
      {
        assetGuid: 1635229539,
        decimals: 8,
        pubData: syscointx.utils.encodePubDataFromFields('publicvalue').toString(),
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 255,
        balance: 10000000000,
        totalSupply: 0,
        maxSupply: 100000000000,
        notaryKeyID: 'ea6d525c0c955d90d3dbd29a81ef8bfb79003727',
        notaryDetails: {
          endPoint: 'https://test.com',
          instantTransfers: 0,
          HDRequired: 1
        }
      },
      {
        assetGuid: 1635229540,
        decimals: 8,
        pubData: syscointx.utils.encodePubDataFromFields('publicvalue').toString(),
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 255,
        balance: 10000000000,
        totalSupply: 0,
        maxSupply: 100000000000,
        notaryKeyID: 'ea6d525c0c955d90d3dbd29a81ef8bfb79003727',
        notaryDetails: {
          endPoint: 'https://test.com',
          instantTransfers: 0,
          HDRequired: 1
        }
      },
      {
        assetGuid: 1635229541,
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
  assetMap: new Map([
    [1635229536, { changeAddress: 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq', outputs: [{ value: new BN(50000000), address: 'bc1qc7slrfxkknqcq2jevvvkdgvrt8080852dfjewde450xdlk4ugp7szw5tk9' }, { value: new BN(50000000), address: 'bc1qc7slrfxkknqcq2jevvvkdgvrt8080852dfjewde450xdlk4ugp7szw5tk9' }] }],
    [1635229537, { changeAddress: 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq', outputs: [{ value: new BN(200000000), address: 'bc1qc7slrfxkknqcq2jevvvkdgvrt8080852dfjewde450xdlk4ugp7szw5tk9' }] }],
    [1635229538, { changeAddress: 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq', outputs: [{ value: new BN(250000000), address: 'bc1qc7slrfxkknqcq2jevvvkdgvrt8080852dfjewde450xdlk4ugp7szw5tk9' }] }],
    [1635229539, { changeAddress: 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq', outputs: [{ value: new BN(300000000), address: 'bc1qc7slrfxkknqcq2jevvvkdgvrt8080852dfjewde450xdlk4ugp7szw5tk9' }] }],
    [1635229540, { changeAddress: 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq', outputs: [{ value: new BN(350000000), address: 'bc1qc7slrfxkknqcq2jevvvkdgvrt8080852dfjewde450xdlk4ugp7szw5tk9' }] }],
    [1635229541, { changeAddress: 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq', outputs: [{ value: new BN(500000000), address: 'bc1qc7slrfxkknqcq2jevvvkdgvrt8080852dfjewde450xdlk4ugp7szw5tk9' }] }]
  ]),
  expected: {
    rbf: false,
    numOutputs: 12,
    script: Buffer.from('6a4d830106609f77610200300130410000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000619f7761010213410000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000629f7761020380640b30410000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000639f776102041d0509410000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000649f77610206813e07800a410000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000659f7761020831090900', 'hex'),
    asset: {
      allocation: [{ assetGuid: 1635229536, values: [{ n: 0, value: new BN(50000000) }, { n: 1, value: new BN(50000000) }], notarysig: Buffer.alloc(65, 0) },
        { assetGuid: 1635229537, values: [{ n: 2, value: new BN(200000000) }], notarysig: Buffer.alloc(65, 0) },
        { assetGuid: 1635229538, values: [{ n: 3, value: new BN(250000000) }, { n: 11, value: new BN(50000000) }], notarysig: Buffer.alloc(65, 0) },
        { assetGuid: 1635229539, values: [{ n: 4, value: new BN(300000000) }, { n: 5, value: new BN(100000000) }], notarysig: Buffer.alloc(65, 0) },
        { assetGuid: 1635229540, values: [{ n: 6, value: new BN(350000000) }, { n: 7, value: new BN(150000000) }], notarysig: Buffer.alloc(65, 0) },
        { assetGuid: 1635229541, values: [{ n: 8, value: new BN(500000000) }, { n: 9, value: new BN(100000000) }], notarysig: Buffer.from('') }]
    }
  }
},
{
  description: 'send multi asset allocations (varied sys values) with notarization',
  version: syscointx.utils.SYSCOIN_TX_VERSION_ALLOCATION_SEND,
  feeRate: new BN(10),
  utxoObj: {
    utxos: [
      { txId: 'c6e7702f1ab817bacf81e5678ba89e0b43a8a7b6f56c4c055aa8aeda87197a62', vout: 0, script: Buffer.from('0014712a0433b3be8c2860db2d313c44fa1967542780', 'hex'), value: 9800, assetInfo: { assetGuid: 1635229536, value: 100000000 } },
      { txId: 'c6e7702f1ab817bacf81e5678ba89e0b43a8a7b6f56c4c055aa8aeda87197a63', vout: 0, script: Buffer.from('0014712a0433b3be8c2860db2d313c44fa1967542781', 'hex'), value: 9800, assetInfo: { assetGuid: 1635229537, value: 200000000 } },
      { txId: 'c6e7702f1ab817bacf81e5678ba89e0b43a8a7b6f56c4c055aa8aeda87197a64', vout: 0, script: Buffer.from('0014712a0433b3be8c2860db2d313c44fa1967542782', 'hex'), value: 980, assetInfo: { assetGuid: 1635229538, value: 300000000 } },
      { txId: 'c6e7702f1ab817bacf81e5678ba89e0b43a8a7b6f56c4c055aa8aeda87197a65', vout: 0, script: Buffer.from('0014712a0433b3be8c2860db2d313c44fa1967542783', 'hex'), value: 9800, assetInfo: { assetGuid: 1635229539, value: 400000000 } },
      { txId: 'c6e7702f1ab817bacf81e5678ba89e0b43a8a7b6f56c4c055aa8aeda87197a66', vout: 0, script: Buffer.from('0014712a0433b3be8c2860db2d313c44fa1967542784', 'hex'), value: 980, assetInfo: { assetGuid: 1635229540, value: 500000000 } },
      { txId: 'c6e7702f1ab817bacf81e5678ba89e0b43a8a7b6f56c4c055aa8aeda87197a67', vout: 0, script: Buffer.from('0014712a0433b3be8c2860db2d313c44fa1967542785', 'hex'), value: 980, assetInfo: { assetGuid: 1635229541, value: 600000000 } }
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
        notaryKeyID: 'ea6d525c0c955d90d3dbd29a81ef8bfb79003727',
        notaryDetails: {
          endPoint: 'https://test.com',
          instantTransfers: 0,
          HDRequired: 1
        }
      },
      {
        assetGuid: 1635229537,
        decimals: 8,
        pubData: syscointx.utils.encodePubDataFromFields('publicvalue').toString(),
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 255,
        balance: 10000000000,
        totalSupply: 0,
        maxSupply: 100000000000,
        notaryKeyID: 'ea6d525c0c955d90d3dbd29a81ef8bfb79003727',
        notaryDetails: {
          endPoint: 'https://test.com',
          instantTransfers: 0,
          HDRequired: 1
        }
      },
      {
        assetGuid: 1635229538,
        decimals: 8,
        pubData: syscointx.utils.encodePubDataFromFields('publicvalue').toString(),
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 255,
        balance: 10000000000,
        totalSupply: 0,
        maxSupply: 100000000000,
        notaryKeyID: 'ea6d525c0c955d90d3dbd29a81ef8bfb79003727',
        notaryDetails: {
          endPoint: 'https://test.com',
          instantTransfers: 0,
          HDRequired: 1
        }
      },
      {
        assetGuid: 1635229539,
        decimals: 8,
        pubData: syscointx.utils.encodePubDataFromFields('publicvalue').toString(),
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 255,
        balance: 10000000000,
        totalSupply: 0,
        maxSupply: 100000000000,
        notaryKeyID: 'ea6d525c0c955d90d3dbd29a81ef8bfb79003727',
        notaryDetails: {
          endPoint: 'https://test.com',
          instantTransfers: 0,
          HDRequired: 1
        }
      },
      {
        assetGuid: 1635229540,
        decimals: 8,
        pubData: syscointx.utils.encodePubDataFromFields('publicvalue').toString(),
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 255,
        balance: 10000000000,
        totalSupply: 0,
        maxSupply: 100000000000,
        notaryKeyID: 'ea6d525c0c955d90d3dbd29a81ef8bfb79003727',
        notaryDetails: {
          endPoint: 'https://test.com',
          instantTransfers: 1,
          HDRequired: 1
        }
      },
      {
        assetGuid: 1635229541,
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
    numOutputs: 12,
    script: Buffer.from('6a4d830106609f77610200300130410000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000619f7761010213410000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000629f7761020380640b30410000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000639f776102041d0509410000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000649f77610206813e07800a410000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000659f7761020831090900', 'hex'),
    asset: {
      allocation: [{ assetGuid: 1635229536, values: [{ n: 0, value: new BN(50000000) }, { n: 1, value: new BN(50000000) }], notarysig: Buffer.alloc(65, 0) },
        { assetGuid: 1635229537, values: [{ n: 2, value: new BN(200000000) }], notarysig: Buffer.alloc(65, 0) },
        { assetGuid: 1635229538, values: [{ n: 3, value: new BN(250000000) }, { n: 11, value: new BN(50000000) }], notarysig: Buffer.alloc(65, 0) },
        { assetGuid: 1635229539, values: [{ n: 4, value: new BN(300000000) }, { n: 5, value: new BN(100000000) }], notarysig: Buffer.alloc(65, 0) },
        { assetGuid: 1635229540, values: [{ n: 6, value: new BN(350000000) }, { n: 7, value: new BN(150000000) }], notarysig: Buffer.alloc(65, 0) },
        { assetGuid: 1635229541, values: [{ n: 8, value: new BN(500000000) }, { n: 9, value: new BN(100000000) }], notarysig: Buffer.from('') }]
    }
  }
},
{
  description: 'send multi asset allocations with notarization + gas in non-selected asset',
  version: syscointx.utils.SYSCOIN_TX_VERSION_ALLOCATION_SEND,
  txOpts: {
    allowOtherNotarizedAssetInputs: true
  },
  feeRate: new BN(10),
  utxoObj: {
    utxos: [
      { txId: 'c6e7702f1ab817bacf81e5678ba89e0b43a8a7b6f56c4c055aa8aeda87197a62', vout: 0, script: Buffer.from('0014712a0433b3be8c2860db2d313c44fa1967542780', 'hex'), value: 980, assetInfo: { assetGuid: 1635229536, value: 100000000 } },
      { txId: 'c6e7702f1ab817bacf81e5678ba89e0b43a8a7b6f56c4c055aa8aeda87197a63', vout: 0, script: Buffer.from('0014712a0433b3be8c2860db2d313c44fa1967542781', 'hex'), value: 980, assetInfo: { assetGuid: 1635229537, value: 200000000 } },
      { txId: 'c6e7702f1ab817bacf81e5678ba89e0b43a8a7b6f56c4c055aa8aeda87197a64', vout: 0, script: Buffer.from('0014712a0433b3be8c2860db2d313c44fa1967542782', 'hex'), value: 980, assetInfo: { assetGuid: 1635229538, value: 300000000 } },
      { txId: 'c6e7702f1ab817bacf81e5678ba89e0b43a8a7b6f56c4c055aa8aeda87197a65', vout: 0, script: Buffer.from('0014712a0433b3be8c2860db2d313c44fa1967542783', 'hex'), value: 980, assetInfo: { assetGuid: 1635229539, value: 400000000 } },
      { txId: 'c6e7702f1ab817bacf81e5678ba89e0b43a8a7b6f56c4c055aa8aeda87197a66', vout: 0, script: Buffer.from('0014712a0433b3be8c2860db2d313c44fa1967542784', 'hex'), value: 980, assetInfo: { assetGuid: 1635229540, value: 500000000 } },
      { txId: 'c6e7702f1ab817bacf81e5678ba89e0b43a8a7b6f56c4c055aa8aeda87197a67', vout: 0, script: Buffer.from('0014712a0433b3be8c2860db2d313c44fa1967542785', 'hex'), value: 980, assetInfo: { assetGuid: 1635229541, value: 600000000 } },
      { txId: 'c6e7702f1ab817bacf81e5678ba89e0b43a8a7b6f56c4c055aa8aeda87197a68', vout: 0, script: Buffer.from('0014712a0433b3be8c2860db2d313c44fa1967542786', 'hex'), value: 980000, assetInfo: { assetGuid: 1635229542, value: 1000000000 } }
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
        notaryKeyID: 'ea6d525c0c955d90d3dbd29a81ef8bfb79003727',
        notaryDetails: {
          endPoint: 'https://test.com',
          instantTransfers: 0,
          HDRequired: 1
        }
      },
      {
        assetGuid: 1635229537,
        decimals: 8,
        pubData: syscointx.utils.encodePubDataFromFields('publicvalue').toString(),
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 255,
        balance: 10000000000,
        totalSupply: 0,
        maxSupply: 100000000000,
        notaryKeyID: 'ea6d525c0c955d90d3dbd29a81ef8bfb79003727',
        notaryDetails: {
          endPoint: 'https://test.com',
          instantTransfers: 0,
          HDRequired: 1
        }
      },
      {
        assetGuid: 1635229538,
        decimals: 8,
        pubData: syscointx.utils.encodePubDataFromFields('publicvalue').toString(),
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 255,
        balance: 10000000000,
        totalSupply: 0,
        maxSupply: 100000000000,
        notaryKeyID: 'ea6d525c0c955d90d3dbd29a81ef8bfb79003727',
        notaryDetails: {
          endPoint: 'https://test.com',
          instantTransfers: 1,
          HDRequired: 1
        }
      },
      {
        assetGuid: 1635229539,
        decimals: 8,
        pubData: syscointx.utils.encodePubDataFromFields('publicvalue').toString(),
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 255,
        balance: 10000000000,
        totalSupply: 0,
        maxSupply: 100000000000,
        notaryKeyID: 'ea6d525c0c955d90d3dbd29a81ef8bfb79003727',
        notaryDetails: {
          endPoint: 'https://test.com',
          instantTransfers: 0,
          HDRequired: 1
        }
      },
      {
        assetGuid: 1635229540,
        decimals: 8,
        pubData: syscointx.utils.encodePubDataFromFields('publicvalue').toString(),
        symbol: syscointx.utils.encodeToBase64('CAT'),
        updateCapabilityFlags: 255,
        balance: 10000000000,
        totalSupply: 0,
        maxSupply: 100000000000,
        notaryKeyID: 'ea6d525c0c955d90d3dbd29a81ef8bfb79003727',
        notaryDetails: {
          endPoint: 'https://test.com',
          instantTransfers: 0,
          HDRequired: 1
        }
      },
      {
        assetGuid: 1635229541,
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
        notaryKeyID: 'ea6d525c0c955d90d3dbd29a81ef8bfb79003727',
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
        auxFeeKeyID: 'ea6d525c0c955d90d3dbd29a81ef8bfb79003727',
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
