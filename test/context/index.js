import { resolve } from 'path'

const FIXTURES = resolve(__dirname, '../fixtures')
const SNAPSHOT_DIR = resolve(FIXTURES, 'snapshots')

/**
 * @typedef {Object} Context
 * @property {string} SNAPSHOT_DIR Path to the snapshots dir
 * @property {string} jsonName Name of the JSON file.
 * @property {string} textName Name of the test file.
 * @property {string} json Path to a JSON fixture.
 * @property {string} text Path to a text fixture.
 * @property {string} testPath Path to a test.
 */

export default async function context () {
  this.SNAPSHOT_DIR = SNAPSHOT_DIR
  this.jsonName = 'test.json'
  this.textName = 'test.txt'
  this.json = resolve(SNAPSHOT_DIR, this.jsonName)
  this.text = resolve(SNAPSHOT_DIR, this.textName)
  this.testPath = resolve(FIXTURES, 'test.js')
}

/**
 * @type {Context}
 */
export const Context = {}
