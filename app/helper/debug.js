'use strict';
const Util = require('./util');

// TODO: save it to local file

const obj = {};

const arrow = '->';

const getName = (path, type) => {
	const str = path || '';
	return path ? type + ' [' + path + ']' : type;
}

obj.at = (content, path) => {
	return console.log(Util.getDate(), getName(path, 'at'), arrow, content);
}

obj.warn = (content, path) => {
	return console.warn(Util.getDate(), getName(path, 'WARN'), arrow, content);
}

obj.trace = (result) => {
	return console.trace(result);
}

module.exports = obj;