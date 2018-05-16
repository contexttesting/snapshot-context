import { equal } from 'zoroaster/assert'
import context, { Context } from '../context' // eslint-disable-line no-unused-vars
import snapshotContext, { SnapshotContext } from '../../src' // eslint-disable-line no-unused-vars

/** @type {Object<string, (ctx: Context, sCtx: SnapshotContext)>} */
const snapshotContextTestSuite = {
  context: [
    context,
    snapshotContext,
  ],
  'is a function'() {
    equal(typeof snapshotContext, 'function')
  },
  async 'can test json snapshot'({ json }, { test }) {
    await test(json, {
      data: 'test',
    })
  },
  async 'can test text snapshot'({ text }, { test }) {
    await test(text, 'test')
  },
  async 'can test text snapshot with new lines'({ newLines }, { test }) {
    await test(newLines, 'draw a straight line\n\nthen drink some wine')
  },
}

export default snapshotContextTestSuite
