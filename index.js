'use strict';

const Path = require('path');
const Analyzer = require('./app/work/analyzer');
const Optimizer = require('./app/work/optimizer');
const Config = require('./app/config/config');
const Util = require('./app/helper/util');
const Debug = require('./app/helper/debug');


const _analyzer = new Analyzer(Path.resolve(__dirname, Config.path.cache));
const _optimizer = new Optimizer();


/**
 * usage
 * node index.js root=./test-files
 * node index.js file=abc.svg
 */
const _params = Util.getParams(process.argv);

const runFolders = () => {
  // continue
  if(_analyzer.getItemList().length > 0){
    goNextFile();
  }else{
    Debug.at('start analyzing ' + _params.root, 'index');
    // try NOT use absolute path to save space in cache file
    _analyzer.load(_params.root, () => {
      Debug.at('finish analyzing, ' + _analyzer.getItemList().length + ' items found', 'index');
      //
      goNextFile();
    });
  }
};

const runFiles = () => {
  Debug.at(_params.file, 'index.runFile');
  // NOTICE: use relative path only for scripts run
  // _optimizer.shuffleIDs(Path.resolve(__dirname, _params.file));
  _optimizer.shuffleIDs(_params.file);
}

const goNextFile = () => {
  const length = _analyzer.getItemList().length;
  const str = _analyzer.pop();
  if(str){
    Debug.at(length + ' ' + str, 'index.goNextFile');
    _optimizer.shuffleIDs(str, goNextFile);
  }
};

// init
if(_params.root){
  runFolders();
}else if(_params.file){
  runFiles();
};

// console.log(_analyzer.getItemList());
