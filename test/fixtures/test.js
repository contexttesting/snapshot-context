import context, { Context } from '../context' // eslint-disable-line no-unused-vars
import snapshotContext, { SnapshotContext } from '../../src' // eslint-disable-line no-unused-vars

/** @type {Object.<string, (ctx: Context, api: SnapshotContext)>} */
const T = {
  context: [
    context,
    snapshotContext,
  ],
  async 'matches against snapshot with success'(
    { SNAPSHOT_DIR, textName }, { setDir, test },
  ) {
    setDir(SNAPSHOT_DIR)
    await test(textName, 'test')
  },
  async 'matches against snapshot with error'(
    { SNAPSHOT_DIR, textName }, { setDir, test },
  ) {
    setDir(SNAPSHOT_DIR)
    await test(textName, 'test2')
  },
  async 'matches against snapshot with new lines with error'(
    { SNAPSHOT_DIR, newLines }, { setDir, test },
  ) {
    setDir(SNAPSHOT_DIR)
    await test(newLines, 'draw a straight line\nthen drink some wine')
  },
}

export default T
