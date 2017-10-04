'use strict';

const Path = require('path');
const SGF = require('staged-git-files');
const Analyzer = require('./app/work/analyzer');
const Optimizer = require('./app/work/optimizer');
const Config = require('./app/config/config');
const Util = require('./app/helper/util');
const Debug = require('./app/helper/debug');



const _analyzer = new Analyzer(Path.resolve(__dirname, Config.path.cache));
const _optimizer = new Optimizer();

let _fileList = [];


/**
 * usage
 * node index.js folder=./test-files
 * node index.js file=abc.svg
 */
const init = () => {
  const params = Util.getParams(process.argv);
  if(params.folder){
    runFolders(params.folder);
  }else if(params.file){
    runFiles(params.file);
  }else if(params.commit){
    runStagedFiles(params.commit);
  }
};

const runStagedFiles = (data) => {
  SGF((err, result) => {
    result.forEach((item) => {
      // svg only
      if(Util.isSVG(item.filename)){
        _fileList.push(item.filename);
      }
    });
    //
    Debug.at('run pre-commit, ' + _fileList.length + ' item(s) found', 'index.getStagedFiles');
    goNextSingleFile();
  });
}

const runFolders = (data) => {
  // console.log(_analyzer.getItemList());
  // continue
  if(_analyzer.getItemList().length > 0){
    goNextFolderFile();
  }else{
    Debug.at('start analyzing ' + data, 'index.runFolders');
    // try NOT use absolute path to save space in cache file
    _analyzer.load(data, () => {
      Debug.at('finish analyzing, ' + _analyzer.getItemList().length + ' item(s) found', 'index.runFolders');
      //
      goNextFolderFile();
    });
  }
};

const runFiles = (data) => {
  Debug.at(data, 'index.runFile');
  _fileList = data.split(',') || [];
  goNextSingleFile();
}

const goNextFolderFile = () => {
  const length = _analyzer.getItemList().length;
  const str = _analyzer.pop();
  if(str){
    Debug.at(length + ' ' + str, 'index.goNextFolderFile');
    // NOTICE: use relative path only for scripts run
    // _optimizer.shuffleIDs(Path.resolve(__dirname, _params.file));
    _optimizer.shuffleIDs(str, goNextFolderFile);
  }
};

const goNextSingleFile = () => {
  const length = _fileList.length;
  const str = _fileList.pop();
  if(str){
    Debug.at(length + ' ' + str, 'index.goNextSingleFile');
    _optimizer.shuffleIDs(str, goNextSingleFile);
  }
};

// start here
init();

module.exports = { Analyzer, Optimizer };
