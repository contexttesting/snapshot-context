import { equal } from 'zoroaster/assert'
import context, { Context } from '../context' // eslint-disable-line no-unused-vars
import snapshotContext, { SnapshotContext } from '../../src' // eslint-disable-line no-unused-vars
import { resolve } from 'path'

const SNAPSHOT_DIR = resolve(__dirname, '../snapshot')

/** @type {Object<string, (ctx: Context, sCtx: SnapshotContext)>} */
const T = {
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
  async 'can print color of strings correctly'({ text }, { setDir, test }) {
    try {
      await test(text, 'make')
    } catch ({ erte }) {
      setDir(SNAPSHOT_DIR)
      await test('correct-color.txt', erte)
    }
  },
}

export default T
