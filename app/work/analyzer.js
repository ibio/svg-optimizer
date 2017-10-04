'use strict';

const File = require('../helper/file');
const Util = require('../helper/util');

// TODO: for massive folders analytics
const CACHE_DIRS = 'dirs';
const CACHE_FILES = 'files';

// NOTICE: since this is the constructor, we need use keyword 'function'
// the 'class' method also needs to use keyword 'function'
const Analyzer = function(cachePath, cacheSplitor) {
  this._cachePath = cachePath;
  this._cacheSplitor = cacheSplitor;
  //
  if(!File.isDir(this._cachePath)){
    File.makeDir(this._cachePath);
  }
  const dirStr = File.read(this._cachePath + '/' + CACHE_DIRS);
  //
  if(dirStr){
    this._dirList = dirStr.split(this._cacheSplitor || ',') || [];
  }else{
    this._dirList = [];
  }

  //
  const fileStr = File.read(this._cachePath + '/' + CACHE_FILES);
  if(fileStr){
    this._fileList = fileStr.split(this._cacheSplitor || ',') || [];
  }else{
    this._fileList = [];  
  }
}

// root folder
Analyzer.prototype.load = function(rootPath, callback) {
  this._dirList.push(rootPath);
  this._checkNextDir(() => {
    const str = this._fileList.join(this._cacheSplitor);
    //
    File.write(this._cachePath + '/' + CACHE_FILES, str, callback);
    // callback && callback();
  });
}

Analyzer.prototype.getItemList = function() {
  return this._fileList;
}

Analyzer.prototype.pop = function(callback) {
  const result = this._fileList.pop();
  const str = this._fileList.join(this._cacheSplitor);
  // save to cache
  File.write(this._cachePath + '/' + CACHE_FILES, str, callback);
  return result;
}

Analyzer.prototype.clear = function() {
  File.write(this._cachePath + '/' + CACHE_FILES, '');
  File.write(this._cachePath + '/' + CACHE_DIRS, '');
  File.write(this._cachePath + '/' + CACHE_FILES, '');
  this._dirList = [];
  this._fileList = [];
}

Analyzer.prototype._checkNextDir = function(callback) {
  const dir = this._dirList.shift();
  // sync way for now
  // for current folder
  const list = File.getAllFiles(dir) || [];
  list.forEach(item => {
    const path = dir + '/' + item;
    // BFS to get all files
    if(File.isDir(path)){
      this._dirList.push(path);
    }else{
      // svg only
      if(Util.isSVG(item)){
        this._fileList.push(path);
      }
    }
  });
  //
  if(this._dirList.length > 0){
    // to avoid RangeError: Maximum call stack size exceeded
    process.nextTick(() => {this._checkNextDir(callback);});
  }else{
    callback && callback();
  }
}

module.exports = Analyzer;