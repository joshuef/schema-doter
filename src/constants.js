import path from 'path';

export const outputFolderSchemaDefinitions = path.resolve( __dirname, '..', 'schemaDefinitions' );
export const indexFileLocation = path.resolve( outputFolderSchemaDefinitions, 'precompile.js' );

export const logFileName = 'schema-doter.log'
