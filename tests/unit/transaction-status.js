module.exports = {
  transactionStatus,
}

function transactionStatus(test, io, {
  API_KEY: apiKey,
}) {
  test('transaction status', async (t) => {
    const { body: { payload, } } = await io.transactionStatus({
      inputs: {
        auth: { apiKey, },
        payload: { transaction_id: '139f3821d947bce9c96c42e5dc0066fd064609d5dcb0d151ae3dbe517e7b6e80', },
      },
    })
    t.deepEqual({
      transaction_id: '139f3821d947bce9c96c42e5dc0066fd064609d5dcb0d151ae3dbe517e7b6e80',
      state: 'complete',
    }, payload, 'returns an address for a coin to be deposited into')
  })
}
