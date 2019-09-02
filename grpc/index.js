const path = require('path')
const grpc = require('grpc')
const _ = require('lodash')
const workers = require('./workers')
const env = require('../env')
const protoLoader = require('@grpc/proto-loader')
const v1FilePath = path.join(__dirname, '..', 'protos', 'v1.proto')
const options = {
  keepCase: true,
  longs: String,
  enums: Array,
  defaults: true,
  oneofs: true
}
module.exports = start

async function start () {
  if (!env.GRPC_ENABLED) {
    return
  }
  const v1Definition = protoLoader.loadSync(v1FilePath, options)
  const v1Proto = grpc.loadPackageDefinition(v1Definition)
  const server = new grpc.Server()
  const auth = workers.auth((key) => env.API_KEY === key)
  server.addService(v1Proto.v1.V1.service, {
    HealthSubmission: urnaryHandler([workers.healthSubmission]),
    HealthCheck: urnaryHandler([workers.healthCheck]),
    WalletBalances: streamHandler([auth, workers.walletBalances]),
    WalletBalance: urnaryHandler([auth, workers.walletBalance]),
    WalletInterest: urnaryHandler([auth, workers.walletInterest]),
    WalletDeposit: urnaryHandler([auth, workers.walletDeposit]),
    WalletWithdraw: urnaryHandler([auth, workers.walletWithdraw]),
  })
  server.bind('localhost:50051', grpc.ServerCredentials.createInsecure())
  server.start()
  return server
}

function mapHistory (fn) {
  return async function (target) {
    return target.map(fn)
  }
}

function convertDateToString (key) {
  return (item) => {
    const pass = item[key]
    const { lastUpdated, date } = item
    return {
      lastUpdated: lastUpdated.toISOString(),
      date: date.toISOString(),
      [key]: pass
    }
  }
}

function backfillEmptyRates ({
  fxrates,
  altrates,
  rates
}) {
  return {
    fxrates,
    altrates: backfill1(altrates),
    rates: backfill1(rates)
  }
}

function backfill1 (rates) {
  return _.mapValues(rates, (hash, base) => _.mapValues(hash, (value, key) => key === base ? '1' : value))
}

function streamHandler (fns) {
  return async function (stream) {
    try {
      const result = await runList(stream.request, fns)
      result.forEach((item) => stream.write(item))
    } catch (err) {
      const {
        code = 500,
        message,
        status = grpc.status.UNKNOWN,
      } = err
      stream.emit('error', {
        code,
        message,
        status
      })
    }
    stream.end()
  }
}

async function currencyUpdate (result) {
  await currency.update()
  return result
}

async function runList (memo, fns) {
  let result = memo
  for (let i = 0; i < fns.length; i++) {
    result = await fns[i](result, result.filter || {})
    if (!result && !_.isString(result)) {
      throw Object.assign(new Error('not found'), {
        code: 404,
        status: grpc.status.NOT_FOUND
      })
    }
  }
  return result
}

function urnaryHandler (fns) {
  return async function (call, callback) {
    try {
      callback(null, await runList(call.request, fns))
    } catch (e) {
      callback(e, null)
    }
  }
}

function wrapLastUpdated (payload) {
  return {
    lastUpdated: currency.lastUpdated(),
    payload
  }
}