module.exports = {
  walletBalance,
}

function walletBalance(test, io, {
  API_KEY: apiKey,
}) {
  test('wallet balance', async (t) => {
    const { body: { payload } } = await io.walletBalance({
      inputs: {
        auth: { apiKey, },
        payload: { coin: 'BTC', },
      },
    })
    t.deepEqual({
      coin: 'BTC',
      amount: '1',
    }, payload, 'returns a balances of a particular coin tied to that wallet')
  })
}
