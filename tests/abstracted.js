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
    transactionStatus,
    getKYC,
    submitKYC,
  }

  function healthSubmission() {
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

  function healthCheck() {
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

  function walletBalances() {
    test('wallet balances', async (t) => {
      const { body: { payload, } } = await io.walletBalances({
        inputs: {
          auth: { apiKey: API_KEY, },
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
      }], payload, 'returns a series of balances tied to the wallet')
    })
  }

  function walletBalance() {
    test('wallet balance', async (t) => {
      const { body: { payload } } = await io.walletBalance({
        inputs: {
          auth: { apiKey: API_KEY, },
          payload: { coin: 'BTC', },
        },
      })
      t.deepEqual({
        coin: 'BTC',
        amount: '1',
      }, payload, 'returns a balances of a particular coin tied to that wallet')
    })
  }

  function walletInterest() {
    test('wallet interest', async (t) => {
      const { body: { payload, }, } = await io.walletInterest({
        inputs: {
          auth: { apiKey: API_KEY, },
          payload: { coin: 'BTC', },
        },
      })
      t.deepEqual({
        amount: '0.02',
      }, payload, 'returns that a wallet has earned')
    })
  }

  function walletDeposit() {
    test('wallet deposit', async (t) => {
      const { body: { payload } } = await io.walletDeposit({
        inputs: {
          auth: { apiKey: API_KEY, },
          payload: { coin: 'BTC', },
        },
      })
      t.deepEqual({
        address: '165evuMw1EgQ8uvUaJ8ioZ3UNLw1pNrpfz',
      }, payload, 'returns an address for a coin to be deposited into')
    })
  }

  function walletWithdraw() {
    test('wallet withdraw', async (t) => {
      const { body: { payload, }, } = await io.walletWithdraw({
        inputs: {
          auth: { apiKey: API_KEY, },
          payload: {
            coin: 'BTC',
            address: '165evuMw1EgQ8uvUaJ8ioZ3UNLw1pNrpfz',
            amount: '1',
          },
        },
      })
      t.deepEqual({
        transaction_id: '139f3821d947bce9c96c42e5dc0066fd064609d5dcb0d151ae3dbe517e7b6e80',
      }, payload, 'returns an address for a coin to be deposited into')
    })
  }

  function transactionStatus() {
    test('transaction status', async (t) => {
      const { body: { payload, } } = await io.transactionStatus({
        inputs: {
          auth: { apiKey: API_KEY, },
          payload: { transaction_id: '139f3821d947bce9c96c42e5dc0066fd064609d5dcb0d151ae3dbe517e7b6e80', },
        },
      })
      t.deepEqual({
        transaction_id: '139f3821d947bce9c96c42e5dc0066fd064609d5dcb0d151ae3dbe517e7b6e80',
        state: 'complete',
      }, payload, 'returns an address for a coin to be deposited into')
    })
  }

  function getKYC() {
    test('get kyc status', async (t) => {
      const { body: { payload, } } = await io.getKYC({
        inputs: {
          auth: { apiKey: API_KEY, },
        },
      })
      t.deepEqual({
        status: 'pending',
        reasons: {}
      }, payload, 'returns an address for a coin to be deposited into')
    })
  }

  function submitKYC() {
    test('submit kyc status', async (t) => {
      const { body: { payload, }, } = await io.submitKYC({
        inputs: {
          auth: { apiKey: API_KEY, },
          payload: {
            first_name: 'john',
            last_name: 'doe',
            middle_name: 'shmoe',
            title: 'dev',
            date_of_birth: '1999-01-01',
            citizenship: 'USA',
            country: 'USA',
            state: 'CA',
            city: 'San Francisco',
            building_number: '5',
            flat_number: '510',
            itin: '31d0d89e-a5ea-4c83-b558-331b77ec6f4f',
            national_id: 'df9ca59c-619a-4ce4-95bd-7aefee044154',
            ssn: '8821dfe9-e1e5-4e8f-a6b8-9c7f409d6682',
            gender: 'male',
            phone_number: '1234567890',
            document_type: 'passport',
            document_front_image: new ArrayBuffer(),
            document_back_image: new ArrayBuffer(),
          },
        },
      })
      t.deepEqual({
        message: 'Kyc started.',
      }, payload, 'returns an address for a coin to be deposited into')
    })
  }
}
