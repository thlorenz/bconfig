'use strict';
/*jshint asi: true */

var test    =  require('tape')
var path    =  require('path')
var bconfig =  require('..')

var fixtures =  path.join(__dirname, 'fixtures')
  , entry    =  path.join(fixtures, 'index.js')
  , jquery   =  path.join(fixtures, 'vendor', 'jquery.js')

function inspect(obj, depth) {
  console.log(require('util').inspect(obj, false, depth || 5, true));
}

test('\n remote with deps and shim without deps', function (t) {
  var config = bconfig(require.resolve('./fixtures/conf-remote-with-deps-shim-no-deps'))

  inspect(config);
  
  t.deepEqual(
      config
    , { baseUrl: '.',
        entry: entry,
        shim:
        { jquery:
            { path: jquery,
              exports: '$' } },
        remote:
        { runnel:
            { deps: { jquery: 'jquery' },
              exports: 'runnel',
              url: 'https://raw.github.com/thlorenz/runnel/master/index.js' } } }
  )
  t.end()  
})
