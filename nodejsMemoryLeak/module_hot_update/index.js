const heapdump = require('heapdump');
const clearCache = require('./clearCache.js');
const http = require('http');
const moduleName = './bigModule.js';
const listenPort = 12345;
const listenAddress = '0.0.0.0';
const adminPort = 12346;
const adminAddress = '127.0.0.1';
let debug = false;

process.title = 'a_hello_node';

let httpServer = http.createServer(function (request, response) {

	var mod1 = require('./mod1.js');
	var mod2 = require('./mod2.js');
	mod1.str();
	mod2.str();
	if(Math.random() * 10 > 5){
		response.end(mod1.str());
	}else{
		response.end(mod2.str());
	}
	clearCache.clear(moduleName);
	// clearCache.clear2(moduleName);
	console.log('----------request end----------');
	console.log(process.memoryUsage());
});


httpServer.listen(listenPort, listenAddress, function (err) {
	if(err){
		console.error(`http listen ${listenPort}:${listenAddress} error:`, err);
	}else{
		console.log(`http listen ${listenPort}:${listenAddress} success`);
	}
});

let adminHttpServer = http.createServer(function (request, response) {
	let url = request.url;
	if(url == '/debug'){
		debug = true;
	}
	response.end('ok');
});

adminHttpServer.listen(adminPort, adminAddress, function (err) {
	if(err){
		console.error(`http listen ${adminAddress}:${adminPort} error:`, err);
	}else{
		console.log(`http listen ${adminAddress}:${adminPort} success`);
	}
});


setInterval(function () {
	console.log(process.memoryUsage());
	if(debug){
		debug = false;
		debugger;
	}
}, 3000);


