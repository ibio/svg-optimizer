'use strict';
const _ = require('lodash');
//NOTICE: do NOT include other files except tools from node_modules because it may cause circle reference

const obj = {};

//private
const _fillZero = (num) => {
	if(num < 10){
		return '0' + num;
	}
	return num;
}

obj.getDate = (timestamp) => {
    var date = timestamp ? new Date(timestamp) : new Date();
    //2016-04-24 09:44:21
    var currentDate = [date.getFullYear(), _fillZero(date.getMonth() + 1), _fillZero(date.getDate())];
    var currentTime = [_fillZero(date.getHours()), _fillZero(date.getMinutes()), _fillZero(date.getSeconds())];
    return currentDate.join('-') + ' ' + currentTime.join(':');
}

obj.getFileName = (path) => {
	const list = path ? path.split('/') || [] : [];
	const file = list[list.length - 1] || '';
	return file.substr(0, file.lastIndexOf('.'));
}

obj.getParams = (array) => {
	const list = array || [];
	const result = {};
	list.forEach((val) => {
		const pair = val.split('=') || [];
		if(pair[1]){
			result[pair[0]] = pair[1];
		}
	});
	return result;
}

obj.isSVG = (path) => {
	return _.endsWith(path, '.svg');
}

module.exports = obj;