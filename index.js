'use strict';

var path  =  require('path');
var fs    =  require('fs');
var xtend =  require('xtend');

function pathify(base, hash, key) {
  return path.resolve(base, hash[key]);
}

function separatePaths (base, config) {
  var local= {};
  var remote= {};

  function notFound (p) {
    throw new Error('Cannot find ' + p + ' specified in config paths');
  }

  Object.keys(config.paths)
    .forEach(function (k) { 
      var val = config.paths[k];

      if (/http[s]*:\/\//.test(val)) return remote[k] = val;
          
      var p    =  pathify(base, config.paths, k);
      var js   =  p + '.js';
      var json =  p + '.json';

      // sync is ok here since this runs when the module is required
      if (fs.existsSync(p))    return local[k] = p;
      if (path.extname(p))     return notFound(p);

      if (fs.existsSync(js))   return local[k] = js;
      if (fs.existsSync(json)) return local[k] = json;

      throw new Error('Unable to find ' + p);
    });

  config.paths = { local: local, remote: remote };
}

function extractShims(config) {
  var paths = config.paths.local;

  return Object.keys(config.shim).reduce(function (acc, k) {
    var conf = config.shim[k];
    var localPath = config.paths.local[k];
    
    if (!localPath) return acc;

    acc[k] = { path: localPath, exports: conf.exports };
    if (conf.deps) acc[k].depends = conf.deps;
    return acc;
  }, {});
}

function extractRemotes(config) {
  var shim        =  config.shim
    , remotePaths =  config.paths.remote;

  return Object.keys(shim)
    .map(function (k) {
      var conf = shim[k];
      var remotePath = remotePaths[k];

      if (!remotePath) return null;
      return xtend(conf, { key: k, url: remotePath });
    })
    .filter(function (x) { return !!x; });
}  

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
module.exports  =  function (configPath, keepPathsAndShimSeparate) {
  var config    =  require(configPath);
  var configDir =  path.dirname(configPath);
  var base      =  path.join(configDir, config.baseUrl);
  config.entry  =  pathify(base, config, 'entry');

  separatePaths(base, config);

  if (keepPathsAndShimSeparate) return config;

  var aggregated = xtend(config, { shim: extractShims(config), remote: extractRemotes(config) });
  delete aggregated.paths;
  return aggregated;
};

