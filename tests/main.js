const brain = require('../lib/brain')
const fs   = require('fs-extra')


brain.install(fs.readFileSync(`${__dirname}/../../packages/node/latest.yml`, 'utf8'))
