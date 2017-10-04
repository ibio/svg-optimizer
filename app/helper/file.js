'use strict';

const FS = require('fs');
const Debug = require('./debug');

const obj = {};

//default is sync method
obj.getAllFiles = (path, async) => {
  if(async){
    return new Promise(function(resolve, reject){
      FS.readdir(path, 'utf8', function(err, files){
        if(err === null){
          resolve(files);
        }else if(err.code == 'ENOENT'){
          Debug.warn('Not Found ' + err.code, 'File.getAllFile');
          reject(err.code);
        }else{
          Debug.warn('Other Error ' + err.code, 'File.getAllFiles');
          reject(err.code);
        }
      });
    });
  //for relative small group of files
  }else{
    return FS.readdirSync(path);
  }
}

obj.isDir = (path) => {
  // if(async){
  //FS.lstat(path, callback)
  let stat = {};
  try{
    stat = FS.lstatSync(path);
  }catch(err){
    Debug.warn(err.code, 'File.isDir');
  }
  return (typeof stat.isDirectory === 'function') && stat.isDirectory();
}

obj.read = (path) => {
  let file = '';
  try{
    file = FS.readFileSync(path);
  }catch(e){
    // __filename
    Debug.warn(path + ' '+ e.code, 'File.read');
  }
  if(Buffer.isBuffer(file)){
    file = file.toString();
  }
  return file;
}

//NOTICE: path starts at root: './'
obj.write = (path, data, callback) => {
  // NOTICE: process.exit(); will affect this, and this won't fire
  if(callback){
    FS.writeFile(path, data, 'utf8', (writeErr) => {
      if(writeErr){
        Debug.warn(writeErr.code, 'File.write');
        callback && callback(writeErr);
      }else{
        callback && callback();
      }
    });
  }else{
    FS.writeFileSync(path, data);
  }
}

obj.makeDir = (path) => {
  FS.mkdirSync(path);
  Debug.at('created ' + path, 'File.makeDir');
}

module.exports = obj;
