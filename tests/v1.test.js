import tests from './abstracted'
import grpc from './grpc.test'

const grpcTests = tests('grpc', grpc)
grpcTests.healthSubmission()
grpcTests.healthCheck()
grpcTests.walletBalances()
grpcTests.walletBalance()
grpcTests.walletInterest()
grpcTests.walletDeposit()
grpcTests.walletWithdraw()
grpcTests.transactionStatus()
grpcTests.getKYC()
grpcTests.submitKYC()
grpcTests.supportedCurrencies()
grpcTests.interestRates()
grpcTests.community()
grpcTests.institutionUsers()
grpcTests.institutionUser()
grpcTests.institutionWithdrawalAddress()
grpcTests.institutionMetadata()
