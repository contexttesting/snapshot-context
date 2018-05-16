import { resolve } from 'path'
import snapshotContext, { SnapshotContext } from '../../src' // eslint-disable-line
import erte from 'erte'

const SNAPSHOT_DIR = resolve(__dirname, '../snapshot')

const stringContext = {
  /**
   * A string with 1 new line
   */
  s: 'I am all in a sea of wonders.\nI doubt;\nI fear;\n',
  /**
   * A string with 2 new lines
   */
  t: 'I am all in a sea of wonders.\n\nI doubt;\n\nI fear;\n\n',
}

/** @type {Object.<string, (ctxString: stringContext ctx: SnapshotContext)>} */
const T = {
  context: [
    function () {
      Object.assign(this, stringContext)
    },
    snapshotContext,
  ],
  async 'replaces new lines'({ s, t }, { setDir, test }) {
    setDir(SNAPSHOT_DIR)
    const res = erte(s, t)
    await test('new-lines.txt', res)
  },
  // absolute path without set-dir
  async 'replaces reverse new lines'({ s, t }, { test }) {
    const res = erte(t, s)
    const path = resolve(SNAPSHOT_DIR, 'new-lines-reverse.txt')
    await test(path, res)
  },
  async 'shows difference of objects'(_, { setDir, test }) {
    setDir(SNAPSHOT_DIR)
    await test('versions.json', process.versions)
  },
  async 'shows difference of strings'(_, { setDir, test }) {
    setDir(SNAPSHOT_DIR)
    const actual = `This version of Node.js is: ${process.version}`
    await test('strings.txt', actual)
  },
}

export default T
