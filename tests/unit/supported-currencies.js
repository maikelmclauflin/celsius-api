module.exports = {
  supportedCurrencies,
}

function supportedCurrencies(test, io) {
  test('supported currencies', async (t) => {
    const { body: { payload, }, } = await io.supportedCurrencies()
    t.deepEqual({
      currencies: [{"eligibleForInterest":true,"eligibleForCelPay":true,"eligibleForLoan":false,"name":"USDT ERC20","walletType":"ETH","isStableCoin":true,"decimals":6,"depositable":true,"utxo":false,"usd":"1.0015900712","interestRate":"0.0810"}]
    }, payload, 'returns an address for a coin to be deposited into')
  })
}
