'use strict';

module.exports = {
  baseUrl :  '.',
  entry   :  'index.js', // pretend that exists
  paths   :  {
    jquery :  'vendor/jquery-oops',
  },
  shim: {
    jquery: {
      exports: '$'
    }
  }
};
