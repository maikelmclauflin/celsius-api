module.exports = {
  getKYC,
}

function getKYC(test, io, {
  API_KEY: apiKey,
}) {
  test('get kyc status', async (t) => {
    const { body: { payload, } } = await io.getKYC({
      inputs: {
        auth: { apiKey, },
      },
    })
    t.deepEqual({
      status: 'pending',
      reasons: {}
    }, payload, 'returns an address for a coin to be deposited into')
  })
}
