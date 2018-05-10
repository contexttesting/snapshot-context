import context, { Context } from '../context' // eslint-disable-line no-unused-vars
import snapshotContext, { SnapshotContext } from '../../src' // eslint-disable-line no-unused-vars

/** @type {Object.<string, (ctx: Context, api: SnapshotContext)>} */
const t = {
  context: [
    context,
    snapshotContext,
  ],
  async 'matches against snapshot with success'(ctx, api) {
    api.setDir(ctx.SNAPSHOT_DIR)
    await api.test(ctx.textName, 'test')
  },
  async 'matches against snapshot with error'(ctx, api) {
    api.setDir(ctx.SNAPSHOT_DIR)
    await api.test(ctx.textName, 'test2')
  },
}

export default t
