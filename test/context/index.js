import { resolve } from 'path'

const FIXTURES = resolve(__dirname, '../fixtures')
const SNAPSHOT_DIR = resolve(FIXTURES, 'snapshots')

const jsonName = 'test.json'
const textName = 'test.txt'
const textNewLinesName = 'test-new-lines.txt'

export const Context = {
  /**
   * Path to the snapshots directory.
   */
  SNAPSHOT_DIR,
  /**
   * Name of the JSON file.
   */
  jsonName,
  /**
   *  Name of the test file.
   */
  textName,
  /**
   * Path to a JSON fixture.
   */
  json: resolve(SNAPSHOT_DIR, jsonName),
  /**
   * Path to a text fixture.
   */
  text: resolve(SNAPSHOT_DIR, textName),
  /**
   * Path to a test.
   */
  testPath: resolve(FIXTURES, 'test.js'),
  /**
   * Name of the test file with new lines.
   */
  textNewLinesName,
  /**
   * Path to a snapshot with new lines.
   */
  newLines: resolve(SNAPSHOT_DIR, textNewLinesName),
}

export default function () {
  Object.assign(this, Context)
}

