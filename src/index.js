import { resolve } from 'path'
import erte from 'erte'
import { equal } from 'assert'
import { confirm } from 'reloquent'
import { inspect } from 'util'
import { deepEqual } from 'assert-diff'
import { read, write, createWritable, ensurePath, writeJSON, readJSON } from 'wrote'
import erotic from 'erotic'
import frame from 'frame-of-mind'

const isJSON = p => /\.json$/.test(p)

/**
 * SnapshotContext allows to match the test result against a snapshot. The default snapshot location is `test/snapshot`.
 */
export default class SnapshotContext {
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
  async prompt(snapshot, name) {
    if (!process.stdin.isTTY) {
      throw new Error('The terminal is not TTY to save snapshots.')
    }
    if (typeof snapshot == 'string') {
      let maxWidth = snapshot.split('\n').reduce((acc, current) => {
        if (current.length > acc) return current.length
      }, 0)
      if (process.stdout.isTTY && process.stdout.columns - 4 >= maxWidth) {
        console.log(frame(snapshot)) // eslint-disable-line no-console
      } else {
        console.log(snapshot) // eslint-disable-line no-console
      }
    } else {
      console.log(inspect(snapshot, { colors: true })) // eslint-disable-line
    }
    const answer = await confirm(`Save snapshot${name ? ` for ${name}` : ''}?`)
    return answer
  }
  async promptAndSave(path, actual, name) {
    if (!actual) throw new Error('Give snapshot to save')
    const res = await this.prompt(actual, name)
    if (res) {
      await this.save(path, actual)
    } else {
      throw new Error('Could not test missing snapshot')
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
   * @param {string} name The name of the test.
   */
  async test(path, actual, name) {
    if (!actual) throw new Error('Pass the actual value for snapshot.')
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
        await this.promptAndSave(path, actual, name)
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
