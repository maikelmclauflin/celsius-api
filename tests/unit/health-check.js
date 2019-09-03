const uuidV4 = require('uuid/v4')
module.exports = {
  healthCheck,
}

function healthCheck(test, io) {
  test('health check', async (t) => {
    const message = uuidV4()
    const { body: { payload, }, } = await io.healthCheck({
      inputs: {
        payload: { message, },
      },
    })
    t.deepEqual({
      originalMessage: message,
      request: {},
    }, payload, 'health check returns a health status object')
  })
}
