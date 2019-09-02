const dotenv = require('dotenv')
dotenv.config()
const {
  GRPC_ENABLED: grpcEnabled,
  API_KEY,
} = process.env

const GRPC_ENABLED = !!grpcEnabled

module.exports = {
  GRPC_ENABLED,
  API_KEY,
}
