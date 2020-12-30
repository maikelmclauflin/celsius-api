const GRPC = require('grpc')
const _ = require('lodash')
const utils = require('../utils')
const mock = require('./mock')
const {
  GRPC_ENABLED,
  API_KEY,
} = require('../env')
const protoLoader = require('@grpc/proto-loader')
const v1FilePath = utils.protosPath()
const options = {
  keepCase: true,
  longs: String,
  enums: Array,
  defaults: true,
  oneofs: true
}
module.exports = start

async function start () {
  if (!GRPC_ENABLED) {
    return
  }
  const v1Definition = protoLoader.loadSync(v1FilePath, options)
  const v1Package = GRPC.loadPackageDefinition(v1Definition)
  const server = new GRPC.Server()
  const auth = mock.auth((key) => API_KEY === key)
  const { unwrap } = mock
  server.addService(v1Package.v1.V1.service, {
    HealthSubmission: urnary(unwrap, mock.healthSubmission),
    HealthCheck: urnary(unwrap, mock.healthCheck),
    WalletBalances: urnary(auth, unwrap, mock.walletBalances),
    WalletBalance: urnary(auth, unwrap, mock.walletBalance),
    WalletInterest: urnary(auth, unwrap, mock.walletInterest),
    WalletDeposit: urnary(auth, unwrap, mock.walletDeposit),
    WalletWithdraw: urnary(auth, unwrap, mock.walletWithdraw),
    TransactionStatus: urnary(auth, unwrap, mock.transactionStatus),
    GetKYC: urnary(auth, unwrap, mock.getKYC),
    SubmitKYC: urnary(auth, unwrap, mock.submitKYC),
    SupportedCurrencies: urnary(mock.supportedCurrencies),
    InterestRates: urnary(auth, mock.interestRates),
    Community: urnary(mock.community),
    InstitutionUsers: urnary(auth, mock.institutionUsers),
    InstitutionMetadata: urnary(auth, unwrap, mock.institutionMetadata),
    InstitutionWithdrawalAddress: urnary(auth, mock.institutionWithdrawalAddress),
    InstitutionUser: urnary(auth, mock.institutionUser),
  })
  server.bind('localhost:50051', GRPC.ServerCredentials.createInsecure())
  server.start()
  return server
}

// function mapHistory (fn) {
//   return async function (target) {
//     return target.map(fn)
//   }
// }

// function convertDateToString (key) {
//   return (item) => {
//     const pass = item[key]
//     const { lastUpdated, date } = item
//     return {
//       lastUpdated: lastUpdated.toISOString(),
//       date: date.toISOString(),
//       [key]: pass
//     }
//   }
// }

// function stream (fns) {
//   return async function (stream) {
//     try {
//       const result = await runList(stream.request, fns)
//       result.forEach((item) => stream.write(item))
//     } catch (err) {
//       const {
//         code = 500,
//         message,
//         status = GRPC.status.UNKNOWN,
//       } = err
//       stream.emit('error', {
//         code,
//         message,
//         status
//       })
//     }
//     stream.end()
//   }
// }

async function runList (memo, fns) {
  let result = memo
  for (let i = 0; i < fns.length; i++) {
    result = await fns[i](result)
    if (!result && !_.isString(result)) {
      throw Object.assign(new Error('not found'), {
        code: 404,
        status: GRPC.status.NOT_FOUND
      })
    }
  }
  return result
}

function urnary (...fns) {
  return async function (call, callback) {
    try {
      const payload = await runList(call.request, fns)
      callback(null, {
        code: 0,
        payload,
      })
    } catch (e) {
      callback(e, null)
    }
  }
}
