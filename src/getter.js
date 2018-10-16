import request from 'request-promise-native';
import fs from 'fs-extra';
import path from 'path';
import logger from './logger';

import {
    indexFileLocation,
    outputFolderSchemaDefinitions,
} from './constants';

logger.info( 'Starting fetch of schema.org vocabs.' )

const writeExportLine = ( schemaName ) => ( `export ${schemaName} from '../schemaDefinitions/${schemaName}.json'; \n` );

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
        console.error( 'Error retrieving: ', theName )
        throw new Error ( e );
    }

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

    downloadData( everything );

    logger.info( 'Schema.org saved locally. Have fun!.' )
}


getEverything();
