# Schema Doter


<!-- |Linux/OS X|Windows|Coverage Status|
|:---:|:---:|:---:|
|[![Build Status](https://travis-ci.org/joshuef/node-cli-starter.svg?branch=master)](https://travis-ci.org/joshuef/node-cli-starter)|[![Build status](https://ci.appveyor.com/api/projects/status/uqlsh2o5e5qxfw2s?svg=true)](https://ci.appveyor.com/project/joshuef/node-cli-starter)|[![Coverage Status](https://coveralls.io/repos/github/joshuef/node-cli-starter/badge.svg?branch=master)](https://coveralls.io/github/joshuef/node-cli-starter?branch=master)| -->


Get schema.org as a useable JS module. 

Automatically fetches latest http://schema.org/docs/full.html jsonld schemas, and saves them as json for simple import as modules into your project.

## About 

Another schema.org package!? 

Yes.

It pulls schema.org schemas so you can use them whenever you need via js modules.

This is actually quite similar to https://www.npmjs.com/package/schema.org, but provides a simple method for import.


## Setup:

Install using yarn (needed for postinstall script/retrieval) `yarn`

## Use 

When using:

```js
import { Book } from './schema-doter';

console.log( 'This is the book schema', Book )
```

## TODO 

- Publish as npm package?
    - Setup main script / build / etc
- Add tests
- setup CI
