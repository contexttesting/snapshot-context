import { resolve } from 'path'

const FIXTURES = resolve(__dirname, '../fixtures')

/**
 * @typedef {Object} Context
 * @property {string} json Path to a JSON fixture.
 * @property {string} text Path to a text fixture.

 */

export default async function context () {
  this.json = resolve(FIXTURES, 'snapshots/test.json')
  this.text = resolve(FIXTURES, 'snapshots/test.txt')
}

/**
 * @type {Context}
 */
export const Context = {}
