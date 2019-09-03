module.exports = {
  walletWithdraw,
}

function walletWithdraw(test, io, {
  API_KEY: apiKey,
}) {
  test('wallet withdraw', async (t) => {
    const { body: { payload, }, } = await io.walletWithdraw({
      inputs: {
        auth: { apiKey, },
        payload: {
          coin: 'BTC',
          address: '165evuMw1EgQ8uvUaJ8ioZ3UNLw1pNrpfz',
          amount: '1',
        },
      },
    })
    t.deepEqual({
      transaction_id: '139f3821d947bce9c96c42e5dc0066fd064609d5dcb0d151ae3dbe517e7b6e80',
    }, payload, 'returns an address for a coin to be deposited into')
  })
}
