const _ = require('lodash')

module.exports = {
  auth,
  healthSubmission,
  healthCheck,
  walletBalances,
  walletBalance,
  walletInterest,
  walletDeposit,
  walletWithdraw,
}

function auth (isAuthed) {
  return async (payload) => {
    if (await isAuthed(payload.apiKey)) {
      throw new Error('apiKey is not authed')
    }
    return _.omit(payload, 'apiKey')
  }
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
