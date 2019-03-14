const { resolve } = require('path');
let erte = require('erte'); if (erte && erte.__esModule) erte = erte.default;
const { equal } = require('assert');
const { askSingle } = require('reloquent');
const { inspect } = require('util');
const { deepEqual } = require('assert-diff');
const { read, write, createWritable, ensurePath, writeJSON, readJSON } = require('wrote');
let erotic = require('erotic'); if (erotic && erotic.__esModule) erotic = erotic.default;

const isJSON = p => /\.json$/.test(p)

/**
 * SnapshotContext allows to match the test result against a snapshot. The default snapshot location is `test/snapshot`.
 */
               class SnapshotContext {
  constructor() {
    this.snapshotsDir = 'test/snapshot'
  }
  /**
   * Set the directory to save snapshots in.
   * @param {string} dir The directory.
   */
  setDir(dir) {
    this.snapshotsDir = dir
  }
  async save(path, snapshot) {
    const p = resolve(this.snapshotsDir, path)
    await ensurePath(p)
    if (isJSON(p)) {
      await writeJSON(p, snapshot, { space: 2 })
    } else {
      const ws = await createWritable(p)
      await write(ws, snapshot)
    }
  }
  async prompt(snapshot) {
    if (typeof snapshot == 'string') {
      console.log(snapshot) // eslint-disable-line no-console
    } else {
      console.log(inspect(snapshot, { colors: true })) // eslint-disable-line
    }
    const answer = await askSingle('save snapshot?')
    return answer
  }
  async promptAndSave(path,
    actual,
    err = new Error('could not test missing snapshot')
  ) {
    if (!actual) throw new Error('give snapshot to save')
    const res = await this.prompt(actual)
    if (res) {
      await this.save(path, actual)
    } else {
      throw err
    }
  }
  async read(path) {
    const p = resolve(this.snapshotsDir, path)
    if (isJSON(p)) {
      const snapshot = await readJSON(p)
      return snapshot
    } else {
      const snapshot = await read(p)
      return snapshot.trim()
    }
  }
  /**
   * Test the snapshot by reading the file and matching it against the given actual value. If filename ends with `.json`, the data will be serialised as a JSON, and then parsed back and deep-equal will be performed. Otherwise, string comparison is made with red/green highlighting. If no file exists, a prompt will be shown to save a snapshot. Answer with **y** to accept the snapshot and pass the test. There's no update possibility which means files must be deleted by hand and new snapshots taken.
   * @param {string} path Path to the file
   * @param {string} actual Expected result
   */
  async test(path, actual) {
    if (!actual) throw new Error('pass the actual value')
    const cb = erotic(true)
    const json = isJSON(path)
    let expected
    try {
      expected = await this.read(path)
      if (json) {
        deepEqual(actual, expected)
      } else {
        equal(actual, expected)
      }
    } catch (err) {
      if (err.code == 'ENOENT') {
        await this.promptAndSave(path, actual)
        return
      }
      if (!json) {
        const s = erte(expected, actual)
        console.log(s) // eslint-disable-line no-console
        const e = cb('The string didn\'t match the snapshot.')
        e.erte = s
        throw e
      }
      const e = cb(err)
      throw e
    }
  }
}


module.exports = SnapshotContext