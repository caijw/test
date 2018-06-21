'use strict';
// Flags: --expose-gc

const binding = require(`./build/Release/binding.node`);
const assert = require('assert');

function getBuffer() {
	return new Promise(function (resolve, reject) {
		setTimeout(function () {
			resolve(binding.newExternalBuffer());
		}, 100);
		
	});
}

var job = async function () {
	for(let i = 0 ; i < 10000000000; ++i){
		 var buf = await getBuffer();
		 console.log('get ' + i + ' buffer');
		 assert.strictEqual(buf.length, 3000000);
	}
}

job();