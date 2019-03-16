
exports.str = function () {
	return 'mod2_' + require('./bigModule.js').str;
}