import { equal, assert } from 'zoroaster/assert'
import context, { Context } from '../context' // eslint-disable-line no-unused-vars
import snapshotContext from '../../src'

const snapshotContextTestSuite = {
  context,
  'should be a function'() {
    equal(typeof snapshotContext, 'function')
  },
  'should call package without error'() {
    assert.doesNotThrow(() => {
      snapshotContext()
    })
  },
  /**
   * @param {Context} api
   */
  async 'calls test context method'(api) {
    await api.example()
  },
}

export default snapshotContextTestSuite
