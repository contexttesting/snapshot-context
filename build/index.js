"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = context;
exports.SnapshotContext = void 0;

var _path = require("path");

var _erte = _interopRequireDefault(require("erte"));

var _assert = require("assert");

var _reloquent = _interopRequireDefault(require("reloquent"));

var _util = require("util");

var _assertDiff = require("assert-diff");

var _wrote = require("wrote");

var _erotic = _interopRequireDefault(require("erotic"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
      if (typeof snapshot == 'string') {
        console.log(snapshot); // eslint-disable-line no-console
      } else {
        console.log((0, _util.inspect)(snapshot, {
          colors: true
        })); // eslint-disable-line
      }

      const {
        promise
      } = (0, _reloquent.default)('save snapshot? ');
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
      const cb = (0, _erotic.default)(true);
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
          const s = (0, _erte.default)(expected, actual);
          console.log(s); // eslint-disable-line no-console

          const e = cb('The string didn\'t match the snapshot.');
          e.erte = s;
          throw e;
        }

        const e = cb(err);
        throw e;
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