"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = context;
exports.SnapshotContext = void 0;

var _path = require("path");

var _diff = require("diff");

var _assert = require("assert");

var _reloquent = _interopRequireDefault(require("reloquent"));

var _util = require("util");

var _assertDiff = require("assert-diff");

var _wrote = require("wrote");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function c(t, color) {
  switch (color) {
    case 'red':
      return `\x1b[31m${t}\x1b[0m`;

    case 'green':
      return `\x1b[32m${t}\x1b[0m`;

    case 'grey':
      return t;

    default:
      return t;
  }
}

const isJSON = p => /\.json$/.test(p);

async function context() {
  let snapshotsDir = '';
  Object.assign(this, {
    setDir(dir) {
      snapshotsDir = dir;
    },

    save: async (path, snapshot) => {
      const p = (0, _path.resolve)(snapshotsDir, path);
      await (0, _wrote.ensurePath)(p);

      if (isJSON(p)) {
        await (0, _wrote.writeJSON)(p, snapshot, {
          space: 2
        });
      } else {
        const ws = await (0, _wrote.createWritable)(p);
        await (0, _wrote.write)(ws, snapshot);
      }
    },
    prompt: async snapshot => {
      console.log((0, _util.inspect)(snapshot, {
        colors: true
      })); // eslint-disable-line

      const {
        promise
      } = (0, _reloquent.default)('save snapshot?');
      const answer = await promise;
      return answer == 'y';
    },
    promptAndSave: async (path, actual, err = new Error('could not test missing snapshot')) => {
      if (!actual) throw new Error('give snapshot to save');
      const res = await this.prompt(actual);

      if (res) {
        await this.save(path, actual);
      } else {
        throw err;
      }
    },
    read: async path => {
      const p = (0, _path.resolve)(snapshotsDir, path);

      if (isJSON(p)) {
        const snapshot = await (0, _wrote.readJSON)(p);
        return snapshot;
      } else {
        const snapshot = await (0, _wrote.read)(p);
        return snapshot.trim();
      }
    },
    test: async (path, actual) => {
      const json = isJSON(path);
      let expected;

      try {
        expected = await this.read(path);

        if (json) {
          (0, _assertDiff.deepEqual)(actual, expected);
        } else {
          (0, _assert.equal)(actual, expected);
        }
      } catch (err) {
        if (err.code == 'ENOENT') {
          await this.promptAndSave(path, actual);
          return;
        }

        if (!json) {
          const diff = (0, _diff.diffChars)(actual, expected);
          diff.forEach(({
            added,
            removed,
            value
          }) => {
            const color = added ? 'green' : removed ? 'red' : 'grey';
            const p = added || removed ? value.replace(/ /g, '_') : value;
            const colored = c(p, color);
            process.stderr.write(colored);
          });
          console.log();
          throw new Error('strings did not match');
        }

        throw err;
      }
    }
  });
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


const SnapshotContext = {};
exports.SnapshotContext = SnapshotContext;