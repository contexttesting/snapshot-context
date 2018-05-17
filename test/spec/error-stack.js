import { ok } from 'assert'
import { equal } from 'zoroaster/assert'
import context, { Context } from '../context' // eslint-disable-line no-unused-vars
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
      const e = new Error('should have thrown')
      e.trow = e
      throw e
    } catch ({ stack, trow }) {
      if (trow) throw trow
      const [, captureTest ] = stack.split(/\n\s+at /)
      ok(/^captures correct stack/.test(captureTest))
    }
  },
  async 'captures correct stack for text'({ text }, { test }) {
    equal(typeof snapshotContext, 'function')
    try {
      await test(text, 'test-2')
      const e = new Error('should have thrown')
      e.trow = e
      throw e
    } catch ({ stack, trow }) {
      if (trow) throw trow
      const [, captureTest ] = stack.split(/\n\s+at /)
      ok(/^captures correct stack/.test(captureTest))
    }
  },
}

export default T
