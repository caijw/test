var hash = require('./build/Release/hash.node');

module.exports = function (str) {
	var hash1 = hash(str);
	return hash1;
};