module.exports = Object.assign(
  {},
  require('./get-kyc'),
  require('./health-check'),
  require('./health-submission'),
  require('./submit-kyc'),
  require('./supported-currencies'),
  require('./transaction-status'),
  require('./wallet-balance'),
  require('./wallet-balances'),
  require('./wallet-deposit'),
  require('./wallet-interest'),
  require('./wallet-withdraw'),
)