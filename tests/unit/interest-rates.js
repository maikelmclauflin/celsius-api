module.exports = {
  interestRates,
}

function interestRates(test, io, {
  API_KEY: apiKey,
}) {
  test('interest rates', async (t) => {
    const { body: { payload, }, } = await io.interestRates({
      inputs: {
        auth: { apiKey, },
      },
    })
    t.deepEqual({
      rates: [{
        eligibleForInterest: true,
        eligibleForCelPay: true,
        name: 'USDT ERC20',
        interestRate: '0.3',
      }]
    }, payload, 'returns an address for a coin to be deposited into')
  })
}
