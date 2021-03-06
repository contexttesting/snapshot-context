## 1 May 2019

### [2.4.0](https://github.com/contexttesting/snapshot-context/compare/v2.3.0...v2.4.0)

- [package] Publish the `module` field with _src_.

## 30 April 2019

### [2.3.0](https://github.com/contexttesting/snapshot-context/compare/v2.2.2...v2.3.0)

- [deps] Install `@zoroaster/deep-equals` instead of `assert-diff`.

## 11 April 2019

### [2.2.2](https://github.com/contexttesting/snapshot-context/compare/v2.2.1...v2.2.2)

- [deps] Remove `wrote`, install `@wrote/read`, `@wrote/write` and `@wrote/ensure-path`.
- [deps] Unlock dependencies.

## 27 March 2019

### [2.2.1](https://github.com/contexttesting/snapshot-context/compare/v2.2.0...v2.2.1)

- [fix] Do not trim the snapshot when reading it.

## 21 March 2019

### [2.2.0](https://github.com/contexttesting/snapshot-context/compare/v2.1.1...v2.2.0)

- [feature] Update snapshot in interactive mode.

## 16 March 2019

### 2.1.1

- [fix] Remove TTY check for `stdin`.

### 2.1.0

- [feature] Add frame if terminal has space for it, check for TTY and allow to pass the name of the test.

## 14 March 2019

### 2.0.5

- [feature] Automatically set `SNAPSHOT_DIR` to `test/snapshot`.

## 13 August 2018

### 2.0.4

- [package] Build with `alamode`.

## 3 August 2018

### 2.0.3

- [fix] Correctly use `askSingle` from `reloquent`.

### 2.0.2

- [fix] Rename export to `SnapshotContext` for _VS Code_, install missing dev dependency.
- [package] Build w/ `bestie`, remove `@babel`.

## 24 May 2018

### 2.0.1

- [j] fix jsdoc (answer with `y`)

### 2.0.0

- [f] rewrite as a class with jsdoc for zoroaster@2.1
- [t] test integration snapshot with snapshot context from src
- [d] launch.json
- [p] install zoroaster@2.1

## 20 May 2018

### 1.1.7

- [build] add source maps to the build

## 16 May 2018

### 1.1.6

- [dependencies] update to new `erotic` with `transparent` mode.

### 1.1.5

- [package] `test-all` script with `yarn-s`
- [readme] badge and snippet

### 1.1.4

- [feature] correct error stack which starts when `test` was called.
- [fix] correct color difference (reverse `actual` w/ `expected`)
- [tests] add and refactor some tests to have correct types & exports
- [mop] `test-build` script and `BABEL_ENV=test-build` set-up to test build

## 15 May 2018

### 1.1.3

- [fix] highlight additional or missing new lines in the snapshot.

## 11 May 2018

### 1.1.2

- [package] set `files` to `build`
- [fix] build the feature

## 10 May 2018

### 1.1.1

- [fix] print strings without `inspect` when prompting
- [dep] use [`erte`](https://artdeco.bz/erte) for color diff of strings
- [test] add integration test

## 4 May 2018

### 1.1.0

- [feature] `setDir`: allow to set a directory.

### 1.0.0

- Create `snapshot-context` with [`mnp`][https://mnpjs.org]
- [repository]: `src`, `test`
