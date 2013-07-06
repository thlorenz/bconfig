'use strict';

module.exports = {
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
      deps: { jquery: 'jQuery'},
      exports: 'runnel'
    }
  }
};
