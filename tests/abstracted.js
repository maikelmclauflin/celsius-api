const ava = require('ava')
const uuidV4 = require('uuid/v4')
const path = require('path')
const _ = require('lodash')
const Joi = require('@hapi/joi')
const fs = require('fs')
const { API_KEY } = require('../env')
const BAD_API_KEY = uuidV4()
module.exports = generate

function generate(key, io) {
  const t = (msg, ...args) => ava(`${key}: ${msg}`, ...args)
  const test = _.assign(t, ava)
  return {
    healthSubmission,
    healthCheck,
    walletBalances,
    walletBalance,
    walletInterest,
    walletDeposit,
    walletWithdraw,
  }

  function healthSubmission() {
    test('health submission', async (t) => {
      const message = uuidV4()
      const { body } = await io.healthSubmission({
        inputs: {
          message,
        },
      })
      t.deepEqual({
        code: 0,
        request: null,
        originalMessage: message,
      }, body, 'health check returns a health status object')
    })
  }

  function healthCheck() {
    test('health check', async (t) => {
      const message = uuidV4()
      const { body } = await io.healthCheck({
        inputs: {
          message,
        },
      })
      t.deepEqual({
        code: 0,
        originalMessage: message,
        request: null,
      }, body, 'health check returns a health status object')
    })
  }

  function walletBalances() {
    test('wallet balances', async (t) => {
      const { body } = await io.walletBalances({
        inputs: {
          apiKey: API_KEY,
        },
      })
      t.deepEqual([{
        coin: 'BTC',
        amount: '1',
      }, {
        coin: 'LTC',
        amount: '20',
      }, {
        coin: 'DAI',
        amount: '1000',
      }], body, 'returns a series of balances tied to the wallet')
    })
  }

  function walletBalance() {
    test('wallet balance', async (t) => {
      const { body } = await io.walletBalance({
        inputs: {
          apiKey: API_KEY,
          coin: 'BTC',
        },
      })
      t.deepEqual({
        coin: 'BTC',
        amount: '1',
      }, body, 'returns a balances of a particular coin tied to that wallet')
    })
  }

  function walletInterest() {
    test('wallet interest', async (t) => {
      const { body } = await io.walletInterest({
        inputs: {
          apiKey: API_KEY,
          coin: 'BTC',
        },
      })
      t.deepEqual({
        amount: '0.02',
      }, body, 'returns a balances of a particular coin tied to that wallet')
    })
  }

  function walletDeposit() {
    test('wallet deposit', async (t) => {
      const { body } = await io.walletInterest({
        inputs: {
          apiKey: API_KEY,
          coin: 'BTC',
        },
      })
      t.deepEqual({
        code: 0,
        address: '165evuMw1EgQ8uvUaJ8ioZ3UNLw1pNrpfz',
      }, body, 'returns a balances of a particular coin tied to that wallet')
    })
  }

  function walletInterest() {
    test('wallet interest', async (t) => {
      const { body } = await io.walletInterest({
        inputs: {
          apiKey: API_KEY,
          coin: 'BTC',
          address: '165evuMw1EgQ8uvUaJ8ioZ3UNLw1pNrpfz',
          amount: '1',
        },
      })
      t.deepEqual({
        code: 0,
        amount: '0.02',
      }, body, 'returns a balances of a particular coin tied to that wallet')
    })
  }

  function walletDeposit() {
    test('wallet deposit', async (t) => {
      const { body } = await io.walletDeposit({
        inputs: {
          apiKey: API_KEY,
          coin: 'BTC',
        },
      })
      t.deepEqual({
        code: 0,
        address: '165evuMw1EgQ8uvUaJ8ioZ3UNLw1pNrpfz',
      }, body, 'returns an address for a coin to be deposited into')
    })
  }

  function walletWithdraw() {
    test('wallet withdraw', async (t) => {
      const { body } = await io.walletWithdraw({
        inputs: {
          apiKey: API_KEY,
          coin: 'BTC',
          address: '165evuMw1EgQ8uvUaJ8ioZ3UNLw1pNrpfz',
          amount: '1',
        },
      })
      t.deepEqual({
        code: 0,
        transaction_id: '139f3821d947bce9c96c42e5dc0066fd064609d5dcb0d151ae3dbe517e7b6e80',
      }, body, 'returns an address for a coin to be deposited into')
    })
  }
}
