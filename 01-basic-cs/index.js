'use strict'

const _ = require('lodash') // https://lodash.com/docs/4.17.4
const assert = require('assert')

const database = require('./database.json')

const mappedHats = database.reduce((previous, current) => {
  current.hats.forEach(hat => {
    // eslint-disable-next-line no-prototype-builtins
    if (previous.hasOwnProperty(_.kebabCase(hat.name))) {
      previous[_.kebabCase(hat.name)].amount += 1
    } else {
      previous[_.kebabCase(hat.name)] = { amount: 1 }
    }
  })
  return previous
}, {})

const sorted = Object.values(mappedHats).sort((a, b) => {
  return b.amount - a.amount
})

const total = sorted[0].amount + sorted[1].amount + sorted[2].amount

// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`)

console.log('Success!')

/**
 * Time and space complexity in O() notation is:
 *   - time complexity: O(n)
 *   - space complexity: O(n)
 */
