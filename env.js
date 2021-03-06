const dotenv = require('dotenv')
const uuidV4 = require('uuid/v4')
dotenv.config()
const {
  GRPC_ENABLED: grpcEnabled,
  API_KEY,
} = process.env

const GRPC_ENABLED = !!grpcEnabled

module.exports = {
  GRPC_ENABLED,
  API_KEY,
  BAD_API_KEY: uuidV4(),
}
