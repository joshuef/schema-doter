"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _commander = _interopRequireDefault(require("commander"));

var _package = _interopRequireDefault(require("../package.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander.default.version(_package.default.version).allowUnknownOption() // .option( '-s, --src-dir [dir]', 'Source directory to upload' )
.option('-l, --log-level [level]', 'More logs please.') // TODO: Separate these out...?
// .option( '-g, --get [uri]', 'safe://<uri><to><get>' )
.parse(process.argv);

var _default = _commander.default;
exports.default = _default;