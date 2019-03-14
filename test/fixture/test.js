import Context from '../context'
import SnapshotContext from '../../src'

/** @type {Object.<string, (c: Context, s: SnapshotContext)>} */
const T = {
  context: [
    Context,
    SnapshotContext,
  ],
  async 'matches against snapshot with success'(
    { FIXTURE_SNAPSHOTS, textName }, { setDir, test },
  ) {
    setDir(FIXTURE_SNAPSHOTS)
    await test(textName, 'test')
  },
  async 'matches against snapshot with error'(
    { FIXTURE_SNAPSHOTS, textName }, { setDir, test },
  ) {
    setDir(FIXTURE_SNAPSHOTS)
    await test(textName, 'test2')
  },
  async 'matches against snapshot with new lines with error'(
    { FIXTURE_SNAPSHOTS, newLines }, { setDir, test },
  ) {
    setDir(FIXTURE_SNAPSHOTS)
    await test(newLines, 'draw a straight line\nthen drink some wine')
  },
}

export default T
