import { equal } from 'zoroaster/assert'
import context, { Context } from '../context'  // eslint-disable-line no-unused-vars
import snapshotContext, { SnapshotContext } from '../../src' // eslint-disable-line no-unused-vars


/**
 * @type {Object<string, (ctx: Context, sCtx: SnapshotContext)>}
 */
const snapshotContextTestSuite = {
  context: [context, snapshotContext],
  'should be a function'() {
    equal(typeof snapshotContext, 'function')
  },
  async 'can test json snapshot'(ctx, sCtx) {
    await sCtx.test(ctx.json, {
      data: 'test',
    })
  },
  async 'can test text snapshot'(ctx, sCtx) {
    await sCtx.test(ctx.text, 'test')
  },
}

export default snapshotContextTestSuite
