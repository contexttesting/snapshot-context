import { equal } from 'zoroaster/assert'
import context from '../context'
import snapshotContext, { SnapshotContext } from '../../src' // eslint-disable-line no-unused-vars

/**
 * @type {Object<string, (ctx: Context, sCtx: SnapshotContext)>}
 */
const snapshotContextTestSuite = {
  context: [context, snapshotContext],
  'should be a function'() {
    equal(typeof snapshotContext, 'function')
  },
  async 'can test json snapshot'({ json }, sCtx) {
    await sCtx.test(json, {
      data: 'test',
    })
  },
  async 'can test text snapshot'({ text }, sCtx) {
    await sCtx.test(text, 'test')
  },
  async 'can test text snapshot with new lines'({ newLines }, sCtx) {
    await sCtx.test(newLines, 'draw a straight line\n\nthen drink some wine')
  },
}

export default snapshotContextTestSuite
