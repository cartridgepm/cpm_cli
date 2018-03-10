const brain = require('../')
const fs   = require('fs-extra')


brain(fs.readFileSync(`${__dirname}/../../packages/node_carbon.yml`, 'utf8'))
