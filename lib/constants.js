"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logFileName = exports.indexFileLocation = exports.outputFolderSchemaDefinitions = void 0;

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const outputFolderSchemaDefinitions = _path.default.resolve(__dirname, '..', 'schemaDefinitions');

exports.outputFolderSchemaDefinitions = outputFolderSchemaDefinitions;

const indexFileLocation = _path.default.resolve(outputFolderSchemaDefinitions, 'index.js');

exports.indexFileLocation = indexFileLocation;
const logFileName = 'schema-doter.log';
exports.logFileName = logFileName;