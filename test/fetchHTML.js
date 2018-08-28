const _assert = require('assert')

const fetchHTML = require('../src/fetchHTML')

describe('#fetchHTML', () => {
  it('should be a function', () => {
    _assert.strictEqual(typeof fetchHTML, 'function')
  })
})
