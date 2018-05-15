import context from '../context' // eslint-disable-line no-unused-vars
import snapshotContext, { SnapshotContext } from '../../src' // eslint-disable-line no-unused-vars

/** @type {Object.<string, (ctx: context, api: SnapshotContext)>} */
const T = {
  context: [
    context,
    snapshotContext,
  ],
  async 'matches against snapshot with success'({ SNAPSHOT_DIR, textName }, api) {
    api.setDir(SNAPSHOT_DIR)
    await api.test(textName, 'test')
  },
  async 'matches against snapshot with error'({ SNAPSHOT_DIR, textName }, api) {
    api.setDir(SNAPSHOT_DIR)
    await api.test(textName, 'test2')
  },
  async 'matches against snapshot with new lines with error'({ SNAPSHOT_DIR, newLines }, api) {
    api.setDir(SNAPSHOT_DIR)
    await api.test(newLines, 'draw a straight line\nthen drink some wine')
  },
}

export default T
