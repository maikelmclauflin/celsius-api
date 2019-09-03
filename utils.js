const fs = require('fs')
const path = require('path')
module.exports = {
  readDataFile,
}

function readDataFile (...structure) {
  const p = path.join(__dirname, 'data', ...structure)
  return JSON.parse(fs.readFileSync(p).toString())
}
