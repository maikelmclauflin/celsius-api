const utils = require('../../utils')
module.exports = {
  institutionUser,
}

function institutionUser (test, io, {
  API_KEY: apiKey,
}) {
  test('institution user', async (t) => {
    const { body: { payload, }, } = await io.institutionUser({
      inputs: {
        auth: { apiKey, },
      },
    })
    const insitutionUserJSON = utils.readDataFile('institution_user.json')
    t.deepEqual(insitutionUserJSON, payload, 'insitituion user should be returned')
  })
}