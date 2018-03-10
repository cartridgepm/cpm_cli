const assert = require('assert')
const path = require('path')
const dir = require('../../install/dir')

describe('Check if the dir is as expected', function() {
  it('return the same dir as expected',  function() {
      assert.equal(path.join(process.env.CPM_PATH, 'node_carbon'), dir('node:carbon'))
  })
})
