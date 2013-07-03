'use strict';

var bconfig = require('..');
var util = require('util');

var config = bconfig(require.resolve('./fixtures/requirejs-config'));
console.log(util.inspect(config, null, 5));
