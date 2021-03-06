const GRPC = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')
const debug = require('../debug')
const utils = require('../utils')
const protopath = utils.protosPath()
const packageDefinition = protoLoader.loadSync(protopath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
})
const V1Package = new GRPC.loadPackageDefinition(packageDefinition) // eslint-disable-line
const grpcClient = new V1Package.v1.V1('localhost:50051', GRPC.credentials.createInsecure())

module.exports = {
  healthSubmission: clientWrap('HealthSubmission'),
  healthCheck: clientWrap('HealthCheck'),
  walletBalances: clientWrap('WalletBalances'),
  walletBalance: clientWrap('WalletBalance'),
  walletInterest: clientWrap('WalletInterest'),
  walletDeposit: clientWrap('WalletDeposit'),
  walletWithdraw: clientWrap('WalletWithdraw'),
  transactionStatus: clientWrap('TransactionStatus'),
  getKYC: clientWrap('GetKYC'),
  submitKYC: clientWrap('SubmitKYC'),
  supportedCurrencies: clientWrap('SupportedCurrencies'),
  interestRates: clientWrap('InterestRates'),
  community: clientWrap('Community'),
  institutionUsers: clientWrap('InstitutionUsers'),
  institutionUser: clientWrap('InstitutionUser'),
  institutionMetadata: clientWrap('InstitutionMetadata'),
  institutionWithdrawalAddress: clientWrap('InstitutionWithdrawalAddress'),
}

function call (transfer, transform) {
  return async (options = {}) => {
    const {
      inputs = {},
      expect = 200
    } = options
    const res = {
      status: 200,
      text: '',
      body: ''
    }
    let err = null
    try {
      res.body = await transfer(inputs)
      res.text = res.body
    } catch (e) {
      err = e
    }
    if (err && expect === 200) {
      throw new Error(`expected ${expect}: ${err.message} ${err.stack}`)
    } else if (!err && expect !== 200) {
      throw new Error(`expected ${expect}`)
    }
    return res
  }
}

function clientWrap (key, opts = {}) {
  const {
    stream
  } = opts
  return call((arg) => new Promise((resolve, reject) => {
    if (!grpcClient[key]) {
      reject(new Error(`unable to call: ${key}`))
    }
    const call = grpcClient[key](arg, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
    if (!stream) {
      return
    }
    const result = []
    // treat stream like unary
    call.on('data', (data) => result.push(data))
    call.on('error', (err) => {
      debug(`error: ${key}`, arg)
      reject(err)
    })
    call.on('end', () => resolve(result))
  }))
}
