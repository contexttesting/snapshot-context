import spawn from 'spawncommand'
import strip from 'strip-ansi'
import Context from '../context'
import SnapshotContext from '../../src'

/** @type {Object.<string, (c: Context, s: SnapshotContext)>} */
const T = {
  context: [
    Context,
    SnapshotContext,
  ],
  async 'runs the test suite'({ testPath, SNAPSHOT_DIR }, { test, setDir }) {
    setDir(SNAPSHOT_DIR)
    const { promise } = spawn('zoroaster', ['-b', testPath])
    const { stdout: s } = await promise
    const res = strip(s).replace(new RegExp(process.cwd(), 'g'), '').trim()
    await test('@integration.txt', res)
  },
}

export default T
