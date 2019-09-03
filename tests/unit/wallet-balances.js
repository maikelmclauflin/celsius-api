module.exports = {
  walletBalances,
}

function walletBalances(test, io, {
  API_KEY: apiKey,
}) {
  test('wallet balances', async (t) => {
    const { body: { payload, } } = await io.walletBalances({
      inputs: {
        auth: { apiKey, },
      },
    })
    t.deepEqual([{
      coin: 'BTC',
      amount: '1',
    }, {
      coin: 'LTC',
      amount: '20',
    }, {
      coin: 'DAI',
      amount: '1000',
    }], payload, 'returns a series of balances tied to the wallet')
  })
}
