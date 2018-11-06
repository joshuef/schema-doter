"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bristol = _interopRequireDefault(require("bristol"));

var _palin = _interopRequireDefault(require("palin"));

var _commander = _interopRequireDefault(require("commander"));

var _cliOptions = _interopRequireDefault(require("./cli-options"));

var _path = _interopRequireDefault(require("path"));

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 	levels = error, warn, info, debug, and trace
let logLevel = _cliOptions.default.logLevel;
if (!logLevel) logLevel = 'warn';
if (typeof logLevel === 'boolean') logLevel = 'trace';

const rootFolder = _path.default.basename(_path.default.dirname(__dirname));

_bristol.default.addTarget('file', {
  file: _path.default.resolve(process.cwd(), _constants.logFileName)
}).withLowestSeverity('debug').withHighestSeverity('error');

_bristol.default.addTarget('console').withFormatter(_palin.default, {
  //shorten log output to contents of this folder.
  rootFolderName: rootFolder,
  objectDepth: 4 // more js output

}).withLowestSeverity(logLevel).withHighestSeverity('error');

process.on('uncaughtTypeError', err => {
  _bristol.default.error('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');

  _bristol.default.error('whoops! there was an uncaught type error:');

  _bristol.default.error(err);

  _bristol.default.error(err.file);

  _bristol.default.error(err.line);
});
process.on('uncaughtException', err => {
  _bristol.default.error('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');

  _bristol.default.error('whoops! there was an uncaught error:');

  _bristol.default.error(err);

  _bristol.default.error(err.file);

  _bristol.default.error(err.line);
});
process.on('unhandledRejection', (reason, p) => {
  _bristol.default.error('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');

  _bristol.default.error('Unhandled Rejection:');

  _bristol.default.error(reason);
});
var _default = _bristol.default;
exports.default = _default;