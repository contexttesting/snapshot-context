import { throws } from 'zoroaster/assert'
import Context from '../context'
import SnapshotContext from '../../src'

/**
 * @type {Object<string, (c:Context, s:SnapshotContext)>}
 */
const T = {
  context: [Context, SnapshotContext],
  async 'captures correct stack'({ jsonName, FIXTURE_SNAPSHOTS }, { test, setDir }) {
    setDir(FIXTURE_SNAPSHOTS)
    await throws({
      async fn() {
        await test(jsonName, {
          data: 'test-2',
        })
      },
      stack: /at !?captures correct stack/,
    })
  },
  async 'captures correct stack for text'({ textName, FIXTURE_SNAPSHOTS }, { test, setDir }) {
    setDir(FIXTURE_SNAPSHOTS)
    await throws({
      async fn() {
        await test(textName, 'test-2')
      },
      stack: /at !?captures correct stack for text/,
    })
  },
}

export default T