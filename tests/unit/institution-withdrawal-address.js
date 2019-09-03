const utils = require('../../utils')
const uuidV4 = require('uuid/v4')
module.exports = {
  institutionWithdrawalAddress,
}

function institutionWithdrawalAddress (test, io, {
  API_KEY: apiKey,
}) {
  test('institution withdrawal address', async (t) => {
    const { body: { payload, }, } = await io.institutionWithdrawalAddress({
      inputs: {
        auth: { apiKey, },
        payload: { id: uuidV4(), }
      },
    })
    t.deepEqual({
      address: '0x0000000000000000000000000000000000000000',
    }, payload, 'insitituion withdrawal address is returned')
  })
}