import { ok } from 'assert'
import Context from '../context'
import SnapshotContext from '../../src'

/** @type {Object<string, (c: Context, s: SnapshotContext)>} */
const T = {
  context: [
    Context,
    SnapshotContext,
  ],
  async 'captures correct stack'({ json }, { test }) {
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
