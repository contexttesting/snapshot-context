import { resolve } from 'path'
import erte from 'erte'
import { equal } from 'assert'
import reloquent from 'reloquent'
import { inspect } from 'util'
import { deepEqual } from 'assert-diff'
import { read, write, createWritable, ensurePath, writeJSON, readJSON } from 'wrote'

const isJSON = p => /\.json$/.test(p)

export default async function context() {
  let snapshotsDir = ''
  Object.assign(this, {
    setDir(dir) {
      snapshotsDir = dir
    },
    save: async (path, snapshot) => {
      const p = resolve(snapshotsDir, path)
      await ensurePath(p)
      if (isJSON(p)) {
        await writeJSON(p, snapshot, { space: 2 })
      } else {
        const ws = await createWritable(p)
        await write(ws, snapshot)
      }
    },
    prompt: async (snapshot) => {
      if (typeof snapshot == 'string') {
        console.log(snapshot) // eslint-disable-line no-console
      } else {
        console.log(inspect(snapshot, { colors: true })) // eslint-disable-line
      }
      const { promise } = reloquent('save snapshot? ')
      const answer = await promise
      return answer == 'y'
    },
    promptAndSave: async (
      path,
      actual,
      err = new Error('could not test missing snapshot'),
    ) => {
      if (!actual) throw new Error('give snapshot to save')
      const res = await this.prompt(actual)
      if (res) {
        await this.save(path, actual)
      } else {
        throw err
      }
    },
    read: async (path) => {
      const p = resolve(snapshotsDir, path)
      if (isJSON(p)) {
        const snapshot = await readJSON(p)
        return snapshot
      } else {
        const snapshot = await read(p)
        return snapshot.trim()
      }
    },
    test: async (path, actual) => {
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
          const s = erte(actual, expected)
          console.log(s) // eslint-disable-line no-console
          const err = new Error('The string didn\'t match the snapshot.')
          throw err
        }
        throw err
      }
    },
  })
}

/**
 * @typedef {Object} SnapshotContext
 * @property {(path: string) => Promise<string>} read
 * @property {(path: string, snapshot: string) => Promise<string>} save
 * @property {(path: string) => Promise<boolean>} prompt
 * @property {(path: string, actual: string) => Promise} test Test a snapshot.
 * @property {(path: string)} setDir Set the directory to save snapshots.
 */


/**
 * @type {SnapshotContext}
 */
export const SnapshotContext = {}

