const sjs = require('..')
const tape = require('tape')

// Test data
const testMnemonic = 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about'

tape('HDSigner - Non-Sequential Account Support', function (t) {
  t.test('createAccountAtIndex creates accounts at arbitrary indexes', function (st) {
    const HDSigner = new sjs.utils.HDSigner(testMnemonic, null, true)

    // Account 0 is created by default in constructor
    st.ok(HDSigner.Signer.accounts.has(0), 'Account 0 exists by default')

    // Create accounts at non-sequential indexes
    const index5 = HDSigner.createAccountAtIndex(5, 84)
    const index10 = HDSigner.createAccountAtIndex(10, 84)
    const index20 = HDSigner.createAccountAtIndex(20, 84)

    st.equal(index5, 5, 'Account 5 created successfully')
    st.equal(index10, 10, 'Account 10 created successfully')
    st.equal(index20, 20, 'Account 20 created successfully')

    // Verify we can get all account indexes
    const indexes = HDSigner.getAccountIndexes()
    st.deepEqual(indexes, [0, 5, 10, 20], 'getAccountIndexes returns correct indexes')

    // Verify we can switch between accounts
    HDSigner.setAccountIndex(5)
    st.equal(HDSigner.Signer.accountIndex, 5, 'Successfully switched to account 5')

    const addr5 = HDSigner.Signer.createAddress(0, false, 84)
    st.ok(addr5.startsWith('tsys1'), 'Address from account 5 generated correctly')

    HDSigner.setAccountIndex(20)
    st.equal(HDSigner.Signer.accountIndex, 20, 'Successfully switched to account 20')

    const addr20 = HDSigner.Signer.createAddress(0, false, 84)
    st.ok(addr20.startsWith('tsys1'), 'Address from account 20 generated correctly')
    st.notEqual(addr5, addr20, 'Different accounts produce different addresses')

    st.end()
  })

  t.test('createAccount finds next available index', function (st) {
    const HDSigner = new sjs.utils.HDSigner(testMnemonic, null, true)

    // Create accounts at specific indexes (0 already exists)
    HDSigner.createAccountAtIndex(2, 84)
    HDSigner.createAccountAtIndex(5, 84)

    // createAccount should use max index + 1, which is 6
    const nextIndex = HDSigner.createAccount(84)
    st.equal(nextIndex, 6, 'createAccount uses max index + 1 (6)')

    // Next createAccount should be 7
    const nextIndex2 = HDSigner.createAccount(84)
    st.equal(nextIndex2, 7, 'createAccount uses max index + 1 (7)')

    // Next should be 8
    const nextIndex3 = HDSigner.createAccount(84)
    st.equal(nextIndex3, 8, 'createAccount uses max index + 1 (8)')

    const indexes = HDSigner.getAccountIndexes()
    st.deepEqual(indexes, [0, 2, 5, 6, 7, 8], 'All accounts tracked correctly')

    st.end()
  })

  t.test('deterministic address generation across signers', function (st) {
    // Create first signer
    const HDSigner1 = new sjs.utils.HDSigner(testMnemonic, null, true)

    // Create non-sequential accounts
    HDSigner1.createAccountAtIndex(0, 84)
    HDSigner1.createAccountAtIndex(7, 84)
    HDSigner1.createAccountAtIndex(15, 84)

    // Get addresses from each account
    const addresses1 = {}
    for (const index of [0, 7, 15]) {
      HDSigner1.setAccountIndex(index)
      addresses1[index] = {
        receiving0: HDSigner1.Signer.createAddress(0, false, 84),
        receiving1: HDSigner1.Signer.createAddress(1, false, 84),
        change0: HDSigner1.Signer.createAddress(0, true, 84),
        change1: HDSigner1.Signer.createAddress(1, true, 84)
      }
    }

    // Create second signer with same mnemonic
    const HDSigner2 = new sjs.utils.HDSigner(testMnemonic, null, true)

    // Recreate same accounts in different order
    HDSigner2.createAccountAtIndex(15, 84)
    HDSigner2.createAccountAtIndex(7, 84)
    HDSigner2.createAccountAtIndex(0, 84)

    // Verify same addresses are generated
    for (const index of [0, 7, 15]) {
      HDSigner2.setAccountIndex(index)
      st.equal(
        HDSigner2.Signer.createAddress(0, false, 84),
        addresses1[index].receiving0,
        `Account ${index} receiving[0] address matches`
      )
      st.equal(
        HDSigner2.Signer.createAddress(1, false, 84),
        addresses1[index].receiving1,
        `Account ${index} receiving[1] address matches`
      )
      st.equal(
        HDSigner2.Signer.createAddress(0, true, 84),
        addresses1[index].change0,
        `Account ${index} change[0] address matches`
      )
      st.equal(
        HDSigner2.Signer.createAddress(1, true, 84),
        addresses1[index].change1,
        `Account ${index} change[1] address matches`
      )
    }

    st.end()
  })

  t.test('error handling for invalid account operations', function (st) {
    const HDSigner = new sjs.utils.HDSigner(testMnemonic, null, true)

    // Create account 5 (account 0 already exists from constructor)
    HDSigner.createAccountAtIndex(5, 84)

    // Try to switch to non-existent account
    const originalLog = console.log
    let logOutput = ''
    console.log = (msg) => { logOutput = msg }

    // Current account index should be 0
    const currentIndex = HDSigner.Signer.accountIndex

    // Try to switch to account 3 (which doesn't exist)
    HDSigner.setAccountIndex(3)

    // Check if warning was logged
    st.ok(logOutput.includes('Account does not exist'), 'Warning logged for non-existent account')

    // Account index should remain unchanged
    st.equal(HDSigner.Signer.accountIndex, currentIndex, 'Account index unchanged when switching to non-existent account')

    console.log = originalLog

    // Test invalid index
    try {
      HDSigner.createAccountAtIndex(-1, 84)
      st.fail('Should throw error for negative index')
    } catch (e) {
      st.equal(e.message, 'Invalid account index', 'Correct error for negative index')
    }

    try {
      HDSigner.createAccountAtIndex(2147483648, 84) // > BIP32 limit
      st.fail('Should throw error for index beyond BIP32 limit')
    } catch (e) {
      st.equal(e.message, 'Invalid account index', 'Correct error for index beyond limit')
    }

    // Test error when accessing non-existent account
    HDSigner.Signer.accountIndex = 99 // Force invalid index
    try {
      HDSigner.getAccountXpub()
      st.fail('Should throw error when getting xpub for non-existent account')
    } catch (e) {
      st.ok(e.message.includes('Account 99 not found'), 'Correct error for non-existent account xpub')
    }

    try {
      HDSigner.Signer.createAddress(0, false, 84)
      st.fail('Should throw error when creating address for non-existent account')
    } catch (e) {
      st.ok(e.message.includes('Account 99 not found'), 'Correct error for non-existent account address')
    }

    st.end()
  })

  t.test('getAccountIndexes returns sorted indexes', function (st) {
    const HDSigner = new sjs.utils.HDSigner(testMnemonic, null, true)

    // Create accounts in random order
    HDSigner.createAccountAtIndex(15, 84)
    HDSigner.createAccountAtIndex(3, 84)
    HDSigner.createAccountAtIndex(7, 84)
    HDSigner.createAccountAtIndex(1, 84)
    HDSigner.createAccountAtIndex(10, 84)

    // getAccountIndexes should return sorted array
    const indexes = HDSigner.getAccountIndexes()
    st.deepEqual(indexes, [0, 1, 3, 7, 10, 15], 'Account indexes are sorted')

    st.end()
  })

  t.test('account methods work with Map storage', function (st) {
    const HDSigner = new sjs.utils.HDSigner(testMnemonic, null, true)

    // Verify accounts is a Map
    st.ok(HDSigner.Signer.accounts instanceof Map, 'accounts is stored as Map')

    // Create some accounts
    HDSigner.createAccountAtIndex(5, 84)
    HDSigner.createAccountAtIndex(10, 84)

    // Test Map methods work
    st.equal(HDSigner.Signer.accounts.size, 3, 'Map size is correct (0, 5, 10)')
    st.ok(HDSigner.Signer.accounts.has(5), 'Map has() works')
    st.ok(!HDSigner.Signer.accounts.has(3), 'Map has() returns false for non-existent')

    // Test iteration
    const accountIndexes = []
    for (const [index, account] of HDSigner.Signer.accounts) {
      accountIndexes.push(index)
      st.ok(account, `Account at index ${index} exists`)
    }
    st.deepEqual(accountIndexes.sort((a, b) => a - b), [0, 5, 10], 'Can iterate over Map')

    st.end()
  })

  t.end()
})
