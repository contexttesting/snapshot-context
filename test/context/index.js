import { join, resolve } from 'path'

const FIXTURES = 'test/fixture'
const FIXTURE_SNAPSHOTS = 'test/fixture/snapshot'

const SNAPSHOT_DIR = 'test/snapshot'

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
   * Absolute path to a JSON fixture.
   */
  json: resolve(FIXTURE_SNAPSHOTS, jsonName),
  /**
   * Absolute Path to a text fixture.
   */
  text: resolve(FIXTURE_SNAPSHOTS, textName),
  /**
   * Path to a test suite file.
   */
  testPath: join(FIXTURES, 'test.js'),
  /**
   * Name of the test file with new lines.
   */
  textNewLinesName,
  /**
   * Path to a snapshot with new lines.
   */
  newLines: resolve(FIXTURE_SNAPSHOTS, textNewLinesName),
}
