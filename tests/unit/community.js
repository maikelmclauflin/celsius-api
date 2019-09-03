const utils = require('../../utils')
module.exports = {
  community,
}

function community (test, io) {
  test('community', async (t) => {
    const { body: { payload, }, } = await io.community()
    const communityJSON = utils.readDataFile('community.json')
    t.deepEqual(communityJSON, payload, 'community json should be returned')
  })
}