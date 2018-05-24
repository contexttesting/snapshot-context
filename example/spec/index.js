import erte from 'erte'
import { resolve } from 'path'
import SnapshotContext from '../../src'

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
    stringContext,
    SnapshotContext,
    SNAPSHOT_DIR,
  ],
  async 'replaces new lines'({ s, t }, { setDir, test }, snapshotDir) {
    setDir(snapshotDir)
    const res = erte(s, t)
    await test('new-lines.txt', res)
  },
  // absolute path without set-dir
  async 'replaces reverse new lines'({ s, t }, { test }, snapshotDir) {
    const res = erte(t, s)
    const path = resolve(snapshotDir, 'new-lines-reverse.txt')
    await test(path, res)
  },
  async 'shows difference of objects'(_, { setDir, test }, snapshotDir) {
    setDir(snapshotDir)
    await test('versions.json', process.versions)
  },
  async 'shows difference of strings'(_, { setDir, test }, snapshotDir) {
    setDir(snapshotDir)
    const actual = `This version of Node.js is: ${process.version}`
    await test('string.txt', actual)
  },
}

export default T
