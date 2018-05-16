import { ok } from 'assert'
import { equal } from 'zoroaster/assert'
import context from '../context'
import snapshotContext, { SnapshotContext } from '../../src' // eslint-disable-line no-unused-vars

/** @type {Object<string, (ctx: Context, sCtx: SnapshotContext)>} */
const T = {
  context: [
    context,
    snapshotContext,
  ],
  async 'captures correct stack'({ json }, { test }) {
    equal(typeof snapshotContext, 'function')
    try {
      await test(json, {
        data: 'test-2',
      })
      throw new Error('should have thrown')
    } catch (err) {
      const [, test, captureTest ] = err.stack.split(/\n\s+at /)
      ok(/test/.test(test))
      ok(/captures correct stack/.test(captureTest))
    }
  },

  // async 'can test text snapshot'({ text }, { test }) {
  //   await test(text, 'test')
  // },
  // async 'can test text snapshot with new lines'({ newLines }, { test }) {
  //   await test(newLines, 'draw a straight line\n\nthen drink some wine')
  // },
}

export default T
