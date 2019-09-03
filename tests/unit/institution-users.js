const utils = require('../../utils')
module.exports = {
  institutionUsers,
}

function institutionUsers (test, io, {
  API_KEY: apiKey,
}) {
  test('institution users', async (t) => {
    const { body: { payload, }, } = await io.institutionUsers({
      inputs: {
        auth: { apiKey, },
      },
    })
    const user = utils.readDataFile('institution_user.json')
    t.deepEqual([user, user, user], payload, 'insitituion user should be returned')
  })
}