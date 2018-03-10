const fs = require('fs-extra')
const path = require('path')

module.exports = name => {
  let dir = path.join(`~/.cpm`, name.replace(/:/g, '_'))
  fs.ensureDirSync(dir)
  return dir
}
