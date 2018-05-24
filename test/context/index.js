import { resolve } from 'path'

const FIXTURES = resolve(__dirname, '../fixtures')
const FIXTURE_SNAPSHOTS = resolve(FIXTURES, 'snapshots')

const SNAPSHOT_DIR = resolve(__dirname, '../snapshot')

const jsonName = 'test.json'
const textName = 'test.txt'
const textNewLinesName = 'test-new-lines.txt'

export default {
  /**
   * Path to fixture snapshots. Used in integration test.
   */
  FIXTURE_SNAPSHOTS,
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
  json: resolve(FIXTURE_SNAPSHOTS, jsonName),
  /**
   * Path to a text fixture.
   */
  text: resolve(FIXTURE_SNAPSHOTS, textName),
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
  newLines: resolve(FIXTURE_SNAPSHOTS, textNewLinesName),
}
