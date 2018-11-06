#!/usr/bin/env node

import request from 'request-promise-native';
import fs from 'fs-extra';
import path from 'path';
import logger from './logger';

import {
    indexFileLocation,
    outputFolderSchemaDefinitions,
} from './constants';

logger.info( 'Starting fetch of schema.org vocabs.' )

const writeExportLine = ( schemaName ) => (
    `Object.defineProperty(exports, "${schemaName}", {
      enumerable: true,
      get: function () {
        return _${schemaName}2.default;
      }
    }); \n

    var _${schemaName}2 = _interopRequireDefault(require("../schemaDefinitions/${schemaName}.json"));
    `
);

const writeStartLine = `"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true
});`
const writeEndLine = `function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }`



const downloadData = async ( schemaObject ) =>
{
    const theName = schemaObject.name;
    if( ! theName )
        throw new Error( 'No name!' )

    const link = `https://schema.org/${theName}.jsonld`;


    if( schemaObject.children )
    {
        schemaObject.children.forEach(
            ( item ) => downloadData( item )
        );
    }

    logger.trace( 'Requesting, ', theName );

    try
    {
        const retrievedSchema =  await request( link );
        logger.trace( theName, 'Retrieved' );
        const fileOutputLocation = path.resolve( outputFolderSchemaDefinitions, theName + '.json' );
        // writes file.catch
        fs.outputFile( fileOutputLocation, retrievedSchema );
        logger.trace( theName, 'json schema file written' );
        // writes line to index.js
        fs.ensureFileSync( indexFileLocation );
        fs.appendFileSync( indexFileLocation, writeExportLine( theName ) );
        logger.trace( theName, 'json schema added to index' );

    }
    catch ( e )
    {
        logger.error( 'Error retrieving: ', theName )
        // throw new Error ( e );
    }

    return;

};

const getEverything = async () =>
{
    logger.info( 'Getting the master tree for schema.org.' )
    const everythingLink = 'https://schema.org/docs/tree.jsonld';
    let everything;
    try
    {
        everything =  await request( everythingLink );

        everything = JSON.parse( everything );

        logger.info( 'Got master list... parsing.' )
    }
    catch ( e )
    {
        logger.error( 'Problems getting the everything link...' )
    }


    fs.ensureFileSync( indexFileLocation );
    fs.appendFileSync( indexFileLocation, writeStartLine );
    await downloadData( everything );

    fs.appendFileSync( indexFileLocation, writeEndLine );

    logger.info( 'Schema.org saved locally. Have fun!.' )
}


getEverything();
