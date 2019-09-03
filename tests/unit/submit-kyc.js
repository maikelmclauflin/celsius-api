const utils = require('../../utils')
module.exports = {
  submitKYC,
}

function submitKYC(test, io, {
  API_KEY: apiKey,
}) {
  test('submit kyc status', async (t) => {
    const sending = Object.assign(utils.readDataFile('user.json'), {
      document_front_image: new ArrayBuffer(),
      document_back_image: new ArrayBuffer(),
    })
    const { body: { payload, }, } = await io.submitKYC({
      inputs: {
        auth: { apiKey, },
        payload: sending,
      },
    })
    t.deepEqual({
      message: 'Kyc started.',
    }, payload, 'returns an address for a coin to be deposited into')
  })
}