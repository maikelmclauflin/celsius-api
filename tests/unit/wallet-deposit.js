module.exports = {
  walletDeposit,
}

function walletDeposit(test, io, {
  API_KEY: apiKey,
}) {
  test('wallet deposit', async (t) => {
    const { body: { payload } } = await io.walletDeposit({
      inputs: {
        auth: { apiKey, },
        payload: { coin: 'BTC', },
      },
    })
    t.deepEqual({
      address: '165evuMw1EgQ8uvUaJ8ioZ3UNLw1pNrpfz',
    }, payload, 'returns an address for a coin to be deposited into')
  })
}
