import { assert } from 'zoroaster/assert'
import spawncommand from 'spawncommand'
import context, { Context } from '../context' // eslint-disable-line no-unused-vars

/** @type {Object.<string, (ctx: Context)>} */
const t = {
  context,
  async 'runs the test suite'(ctx) {
    const { promise } = spawncommand('zoroaster', ['--babel', ctx.testPath])
    const { stdout } = await promise
    assert(/Executed 2 tests: 1 error./.test(stdout))
  },
}

export default t
