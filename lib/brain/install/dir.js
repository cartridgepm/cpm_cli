const fs = require('fs-extra')
const path = require('path')

module.exports = name => {
  let dir = path.join(`${process.env.CPM_PATH}`, name.replace(/:/g, '_'))
  fs.ensureDirSync(dir)
  return dir
}
