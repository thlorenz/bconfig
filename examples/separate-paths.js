'use strict';

var bconfig = require('..');
var util = require('util');
var separatePathsAndShim = true;

var config = bconfig(require.resolve('./fixtures/requirejs-config'), separatePathsAndShim);
console.log(util.inspect(config, null, 5));
