var chash = require('../index.js');
var jshash = require('../hash.js');
var chars = [
	'z', 'Z',
	'x', 'X',
	'c', 'C',
	'v', 'V',
	'b', 'B',
	'n', 'N',
	'm', 'M',
	'a', 'A',
	's', 'S',
	'd', 'D',
	'f', 'F',
	'g', 'G',
	'h', 'H',
	'j', 'J',
	'k', 'K',
	'l', 'L',
	'q', 'Q',
	'w', 'W',
	'e', 'E',
	'r', 'R',
	't', 'T',
	'y', 'Y',
	'u', 'U',
	'i', 'I',
	'o', 'O',
	'p', 'P',
	'`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=',
	'~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+',
	'[', ']', '\\', '{', '}', '|', ';', '\'', ':', '"', ',', '.', '/', '<', '>', '?', ' '
];
/*
	生成一个随机的字符
*/
function generateRandomChar() {
	var index = Math.floor(Math.random() * chars.length);
	return chars[index];

}
/*
	生产长度为len的随机字符串
*/
function generateRandomStr(len) {
	var res = [];
	for(var i = 0; i < len; ++i){
		res.push(generateRandomChar());
	}
	return res.join();
}
function bootstrap(begin, end, step) {
	for(var i = begin; i < end; i+=step){
		var str = generateRandomStr(i);
		var cBegin = Date.now();
		var cHashRes = chash(str);
		var cEnd = Date.now();
		var jsBegin = Date.now();
		var jsHashRes = jshash(str);
		var jsEnd = Date.now();
		console.log(`str len: ${i}, chash: ${cHashRes}, ccost: ${cEnd - cBegin}ms, jshash: ${jsHashRes}, jscost: ${jsEnd - jsBegin}ms`);
	}
}

bootstrap(1000000, 2000000, 100);

