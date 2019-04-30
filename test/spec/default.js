import { equal, throws } from 'zoroaster/assert'
import TempContext from 'temp-context'
import Context from '../context'
import SnapshotContext from '../../src'

/**
 * @type {Object<string, (c:Context, s:SnapshotContext, t:TempContext)>}
 */
const T = {
  context: [Context, SnapshotContext, TempContext],
  'is a function'() {
    equal(typeof SnapshotContext, 'function')
  },
  async 'can test json snapshot'({ json }, { test }) {
    await test(json, {
      data: 'test',
    })
  },
  async 'fails json snapshot'(_, { test, setDir }, { write, TEMP }) {
    setDir(TEMP)
    await write('snapshot.json',
      JSON.stringify({ data: 'test-expected' }))
    await throws({
      fn: test,
      args: ['snapshot.json', {
        data: 'test-actual',
      }],
      message: /test-expected[\s\S]+test-actual/,
    })
  },
  async 'can test text snapshot'({ text }, { test }) {
    await test(text, 'test')
  },
  async 'can test text snapshot with new lines'({ newLines }, { test }) {
    await test(newLines, 'draw a straight line\n\nthen drink some wine\n')
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
