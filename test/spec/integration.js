import spawn from 'spawncommand'
import Context from '../context'
import SnapshotContext from '../../src'

/** @type {Object.<string, (c: Context, s: SnapshotContext)>} */
const T = {
  context: [Context, SnapshotContext],
  async 'runs the test suite'({ testPath }, { test }) {
    const { promise } = spawn('zoroaster', ['-a', testPath])
    const { stdout: s } = await promise
    const res = s.replace(/\033\[.*?m/g, '').replace(new RegExp(process.cwd(), 'g'), '').trim()
    await test('@integration.txt', res)
  },
}

export default T
