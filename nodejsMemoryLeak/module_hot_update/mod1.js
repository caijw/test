
exports.str = function () {
	return 'mod1_' + require('./bigModule.js').str;
}