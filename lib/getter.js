#!/usr/bin/env node
"use strict";

var _requestPromiseNative = _interopRequireDefault(require("request-promise-native"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _path = _interopRequireDefault(require("path"));

var _logger = _interopRequireDefault(require("./logger"));

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_logger.default.info('Starting fetch of schema.org vocabs.');

const writeExportLine = schemaName => `Object.defineProperty(exports, "${schemaName}", {
      enumerable: true,
      get: function () {
        return _${schemaName}2.default;
      }
    }); \n

    var _${schemaName}2 = _interopRequireDefault(require("../schemaDefinitions/${schemaName}.json"));
    `;

const writeStartLine = `"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true
});`;
const writeEndLine = `function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }`;

const downloadData = async schemaObject => {
  const theName = schemaObject.name;
  if (!theName) throw new Error('No name!');
  const link = `https://schema.org/${theName}.jsonld`;

  if (schemaObject.children) {
    schemaObject.children.forEach(item => downloadData(item));
  }

  _logger.default.trace('Requesting, ', theName);

  try {
    const retrievedSchema = await (0, _requestPromiseNative.default)(link);

    _logger.default.trace(theName, 'Retrieved');

    const fileOutputLocation = _path.default.resolve(_constants.outputFolderSchemaDefinitions, theName + '.json'); // writes file.catch


    _fsExtra.default.outputFile(fileOutputLocation, retrievedSchema);

    _logger.default.trace(theName, 'json schema file written'); // writes line to index.js


    _fsExtra.default.ensureFileSync(_constants.indexFileLocation);

    _fsExtra.default.appendFileSync(_constants.indexFileLocation, writeExportLine(theName));

    _logger.default.trace(theName, 'json schema added to index');
  } catch (e) {
    _logger.default.error('Error retrieving: ', theName); // throw new Error ( e );

  }

  return;
};

const getEverything = async () => {
  _logger.default.info('Getting the master tree for schema.org.');

  const everythingLink = 'https://schema.org/docs/tree.jsonld';
  let everything;

  try {
    everything = await (0, _requestPromiseNative.default)(everythingLink);
    everything = JSON.parse(everything);

    _logger.default.info('Got master list... parsing.');
  } catch (e) {
    _logger.default.error('Problems getting the everything link...');
  }

  _fsExtra.default.ensureFileSync(_constants.indexFileLocation);

  _fsExtra.default.appendFileSync(_constants.indexFileLocation, writeStartLine);

  await downloadData(everything);

  _fsExtra.default.appendFileSync(_constants.indexFileLocation, writeEndLine);

  _logger.default.info('Schema.org saved locally. Have fun!.');
};

getEverything();