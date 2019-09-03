module.exports = {
  walletInterest,
}

function walletInterest(test, io, {
  API_KEY: apiKey,
}) {
  test('wallet interest', async (t) => {
    const { body: { payload, }, } = await io.walletInterest({
      inputs: {
        auth: { apiKey, },
        payload: { coin: 'BTC', },
      },
    })
    t.deepEqual({
      amount: '0.02',
    }, payload, 'returns that a wallet has earned')
  })
}
