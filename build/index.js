"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

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
/**
 * SnapshotContext allows to match the test result against a snapshot.
 */


class SnapshotContext {
  constructor() {
    this.snapshotsDir = '';
  }
  /**
   * Set the directory to save snapshots in.
   * @param {string} dir The directory.
   */


  setDir(dir) {
    this.snapshotsDir = dir;
  }

  async save(path, snapshot) {
    const p = (0, _path.resolve)(this.snapshotsDir, path);
    await (0, _wrote.ensurePath)(p);

    if (isJSON(p)) {
      await (0, _wrote.writeJSON)(p, snapshot, {
        space: 2
      });
    } else {
      const ws = await (0, _wrote.createWritable)(p);
      await (0, _wrote.write)(ws, snapshot);
    }
  }

  async prompt(snapshot) {
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
  }

  async promptAndSave(path, actual, err = new Error('could not test missing snapshot')) {
    if (!actual) throw new Error('give snapshot to save');
    const res = await this.prompt(actual);

    if (res) {
      await this.save(path, actual);
    } else {
      throw err;
    }
  }

  async read(path) {
    const p = (0, _path.resolve)(this.snapshotsDir, path);

    if (isJSON(p)) {
      const snapshot = await (0, _wrote.readJSON)(p);
      return snapshot;
    } else {
      const snapshot = await (0, _wrote.read)(p);
      return snapshot.trim();
    }
  }
  /**
   * Test the snapshot by reading the file and matching it against the given actual value. If filename ends with `.json`, the data will be serialised as a JSON, and then parsed back and deep-equal will be performed. Otherwise, string comparison is made with red/green highlighting. If no file exists, a prompt will be shown to save a snapshot. Answer with **y** to accept the snapshot and pass the test. There's no update possibility which means files must be deleted by hand and new snapshots taken.
   * @param {string} path Path to the file
   * @param {string} actual Expected result
   */


  async test(path, actual) {
    if (!actual) throw new Error('pass the actual value');
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

}

exports.default = SnapshotContext;
//# sourceMappingURL=index.js.map