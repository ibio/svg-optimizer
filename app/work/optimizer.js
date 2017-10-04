'use strict';

const File = require('../helper/file');
const Util = require('../helper/util');
const SVGO = require('svgo');

// NOTICE: since this is the constructor, we need use keyword 'function'
// the 'class' method also needs to use keyword 'function'
const Optimizer = function(config) {
  this._config = config;
}

/**
 * make no duplicated ids within the folders (including the sub-folders)
 */
Optimizer.prototype.shuffleIDs = function(path, callback) {
  const svgo = new SVGO(
    {full: true, plugins: [
        // NOTICE: in order to make prefix effect, must set minify true
        {cleanupIDs: {minify: true, prefix: Util.getFileName(path) + '_'}}
      ]
    }
  );
  //
  const data = File.read(path);
  svgo.optimize(data, result => {
    File.write(path, result.data, callback);
  });
}


module.exports = Optimizer;