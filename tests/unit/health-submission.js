const uuidV4 = require('uuid/v4')
module.exports = {
  healthSubmission,
}

function healthSubmission(test, io) {
  test('health submission', async (t) => {
    const message = uuidV4()
    const { body: { payload, }, } = await io.healthSubmission({
      inputs: {
        payload: { message, }
      },
    })
    t.deepEqual({
      request: {},
      originalMessage: message,
    }, payload, 'health check returns a health status object')
  })
}
