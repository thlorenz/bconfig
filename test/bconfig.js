'use strict';
/*jshint asi: true */

var test    =  require('tape')
var path    =  require('path')
var bconfig =  require('..')

var fixtures =  path.join(__dirname, 'fixtures')
  , entry    =  path.join(fixtures, 'index.js')
  , jquery   =  path.join(fixtures, 'vendor', 'jquery.js')

test('\n remote with deps and shim without deps', function (t) {
  var config = bconfig(require.resolve('./fixtures/conf-remote-with-deps-shim-no-deps'))

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
            { deps: { jquery: 'jQuery' },
              exports: 'runnel',
              url: 'https://raw.github.com/thlorenz/runnel/master/index.js' } } }
  )
  t.end()  
})

test('\n remote with deps and shim with deps', function (t) {
  var config = bconfig(require.resolve('./fixtures/conf-remote-with-deps-shim-with-deps'))

  t.deepEqual(
      config
    , { baseUrl: '.',
        entry: '/Users/thlorenz/dev/projects/bconfig/test/fixtures/index.js',
        shim:
        { jquery:
            { path: '/Users/thlorenz/dev/projects/bconfig/test/fixtures/vendor/jquery.js',
              exports: '$' },
          jqueryui:
            { path: '/Users/thlorenz/dev/projects/bconfig/test/fixtures/vendor/jquery-ui.js',
              exports: null,
              depends: { jquery: 'jQuery' } } },
        remote:
        { runnel:
            { deps: { jquery: 'jQuery' },
              exports: 'runnel',
              url: 'https://raw.github.com/thlorenz/runnel/master/index.js' } } }
  )
  t.end()  
})

test('\n shim pointing to file that does not exist', function (t) {
  try {
    var config = bconfig(require.resolve('./fixtures/conf-shim-pointing-to-not-existing'))
  } catch (err) {
    t.ok(/Unable to find .+jquery-oops/.test(err.message), 'throws error with message indicating the file that was not found')
    t.end()  
  }
})
