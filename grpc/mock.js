const _ = require('lodash')
const utils = require('../utils')

module.exports = {
  auth,
  unwrap,
  healthSubmission,
  healthCheck,
  walletBalances,
  walletBalance,
  walletInterest,
  walletDeposit,
  walletWithdraw,
  transactionStatus,
  getKYC,
  submitKYC,
  supportedCurrencies,
  interestRates,
  community,
}

function auth (isAuthed) {
  return async (request) => {
    const { auth, payload, } = request
    const authed = await isAuthed(auth.apiKey)
    if (!authed) {
      throw new Error('apiKey is not authed')
    }
    return request
  }
}

function unwrap (request) {
  return request.payload || {}
}

async function healthSubmission (payload) {
  return {
    originalMessage: payload.message,
  }
}

async function healthCheck (payload) {
  return {
    originalMessage: payload.message,
  }
}

async function walletBalances () {
  const balances = await lookupBalances()
  return balances
}

async function walletBalance (payload) {
  const balances = await lookupBalances()
  return _.find(balances, {
    coin: payload.coin,
  })
}

async function walletInterest (payload) {
  const rate = {
    BTC: 10000
  }
  const interest = 200
  return {
    amount: '' + (interest / rate[payload.coin]),
  }
}

async function walletDeposit (payload) {
  return {
    address: '165evuMw1EgQ8uvUaJ8ioZ3UNLw1pNrpfz'
  }
}

async function walletWithdraw (payload) {
  return {
    transaction_id: '139f3821d947bce9c96c42e5dc0066fd064609d5dcb0d151ae3dbe517e7b6e80',
  }
}

async function lookupBalances () {
  return new Promise((resolve) => setTimeout(() => resolve([{
    coin: 'BTC',
    amount: '1',
  }, {
    coin: 'LTC',
    amount: '20',
  }, {
    coin: 'DAI',
    amount: '1000',
  }])))
}

async function transactionStatus () {
  return {
    transaction_id: '139f3821d947bce9c96c42e5dc0066fd064609d5dcb0d151ae3dbe517e7b6e80',
    state: 'complete',
  }
}

async function getKYC () {
  return {
    status: 'pending',
    reasons: {},
  }
}

async function submitKYC (payload) {
  return {
    message: 'Kyc started.'
  }
}

async function supportedCurrencies () {
  return {
    currencies: [{
      eligibleForInterest: true,
      eligibleForCelPay: true,
      eligibleForLoan: false,
      name: 'USDT ERC20',
      walletType: 'ETH',
      isStableCoin: true,
      decimals: 6,
      depositable: true,
      utxo: false,
      usd: '1.0015900712',
      interestRate: '0.0810',
    }]
  }
}

async function interestRates () {
  return {
    rates: [{
      eligibleForInterest: true,
      eligibleForCelPay: true,
      name: 'USDT ERC20',
      interestRate: '0.3',
    }]
  }
}

async function community () {
  return utils.readDataFile('community.json')
}
