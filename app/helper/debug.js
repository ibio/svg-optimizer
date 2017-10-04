'use strict';
const Util = require('./util');

const obj = {};

const arrow = '->';

const getName = (path) => {
	const str = path || '';
	return path ? 'at [' + path + ']' : 'at';
}

obj.at = (content, path) => {
	return console.log(Util.getDate(), getName(path), arrow, content);
}

obj.warn = (content, path) => {
	return console.warn(Util.getDate(), getName(path), arrow, content);
}

obj.trace = (result) => {
	return console.trace(result);
}

module.exports = obj;