const utils = require('../../utils')
module.exports = {
  supportedCurrencies,
}

function supportedCurrencies(test, io) {
  test('supported currencies', async (t) => {
    const { body: { payload, }, } = await io.supportedCurrencies()
    const supported = utils.readDataFile('supported_currencies.json')
    t.deepEqual(supported, payload, 'returns an address for a coin to be deposited into')
  })
}
