const utils = require('../../utils')
const uuidV4 = require('uuid/v4')
module.exports = {
  institutionMetadata,
}

function institutionMetadata (test, io, {
  API_KEY: apiKey,
}) {
  test('institution metadata', async (t) => {
    const id = uuidV4()
    const { body: { payload, }, } = await io.institutionMetadata({
      inputs: {
        auth: { apiKey, },
        payload: { id, }
      },
    })
    t.deepEqual(id, payload, 'insitituion metadata is returned')
  })
}