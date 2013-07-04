# bconfig [![build status](https://secure.travis-ci.org/thlorenz/bconfig.png)](http://travis-ci.org/thlorenz/bconfig)

Structures a requirejs config into shim and remote objects to easier interface with browserify.

- returned shim object is compatible with [browserify-shim](https://github.com/thlorenz/browserify-shim)
- returned remote is compatible with [bromote](https://github.com/thlorenz/bromote)

**requirejs config:**

```js
module.exports = {
  baseUrl :  '.',
  entry   :  'index.js', // pretend that exists
  paths   :  {
    jquery :  'vendor/jquery',

    // let's pretend we are in the nineties and still use modules that aren't on npm
    runnel :  'https://raw.github.com/thlorenz/runnel/master/index.js' 
  },
  shim: {
    jquery: {
      exports: '$'
    },
    runnel: {
      // doesn't really depend on it, but for demonstration purposes
      deps: { jquery: 'jquery'},
      exports: 'runnel'
    }
  }
};
```

**Conversion Script:**
```js
var bconfig = require('bconfig');
var util = require('util');

var config = bconfig(require.resolve('./fixtures/requirejs-config'));
console.log(util.inspect(config, null, 5));
```

**Output:**

```
{ baseUrl: '.',
  entry: '/Users/.../dev/projects/bconfig/examples/fixtures/index.js',
  shim:
   { jquery:
      { path: '/Users/.../dev/projects/bconfig/examples/fixtures/vendor/jquery.js',
        exports: '$' } },
  remote:
   { runnel:
      { deps: { jquery: 'jquery' },
        exports: 'runnel',
        url: 'https://raw.github.com/thlorenz/runnel/master/index.js' } } }
```

## Installation

    npm install bconfig

## API

###*bconfig (configPath, keepPathsAndShimSeparate)*

```
/**
 * Analyzes a requirejs config and creates local shims/paths for local files and remote shims/paths for urls found in paths.
 * 
 * @name exports
 * @function
 * @param configPath {String} Full Path to requirejs config
 * @param keepPathsAndShimSeparate {Boolean} 
 *       if true, only paths will be split into local and remote, 
 *       otherwise aggregated shim and remote objects with all relevant information are returned
 * @return {Object} a more browserify friendly version of the config
 */
```

**Note:** keeping paths and shims separate is not recommended in general, but may have its use cases

## License

MIT
