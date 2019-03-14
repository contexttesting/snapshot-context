import { equal } from 'zoroaster/assert'
import Context from '../context'
import SnapshotContext from '../../src'

/**
 * @type {Object<string, (c:Context, s:SnapshotContext)>}
 */
const T = {
  context: [Context, SnapshotContext],
  'is a function'() {
    equal(typeof SnapshotContext, 'function')
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
  async 'can print color of strings correctly'({ text, SNAPSHOT_DIR }, { setDir, test }) {
    try {
      await test(text, 'make')
    } catch ({ erte }) {
      setDir(SNAPSHOT_DIR)
      await test('correct-color.txt', erte)
    }
  },
}

export default T
