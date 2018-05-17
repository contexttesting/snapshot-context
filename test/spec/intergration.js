import { ok } from 'assert'
import spawn from 'spawncommand'
import context, { Context } from '../context' // eslint-disable-line no-unused-vars

/** @type {Object.<string, (ctx: Context)>} */
const T = {
  context,
  async 'runs the test suite'({ testPath }) {
    const { promise } = spawn('zoroaster', ['--babel', testPath])
    const { stdout } = await promise
    ok(/Executed 3 tests: 2 errors./.test(stdout))
  },
}

export default T
