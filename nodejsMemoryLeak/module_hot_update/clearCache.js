const path = require('path');
const http = require('http');
const adminPort = 12346;
const adminAdress = '0.0.0.0';

let mod1 = require('./mod1.js');
let mod2 = require('./mod2.js');

exports.clear = function (moduleName) {
	moduleName = require.resolve(moduleName);
	for(let key in require.cache){
		let mod = require.cache[key];
		let children = mod.children || [];
		while(true){
			let deleteIndex = -1;
			for(let i = 0; i < children.length; ++i){
				if(children[i].id == moduleName){
					deleteIndex = i;
					break;
				}
			}
			if(deleteIndex == -1){
				break;
			}else{
				children.splice(deleteIndex, 1);
			}
		}
		if(mod.parent && mod.parent.id == moduleName){
			mod.parent = null;
		}
	}
	if(require.cache[moduleName]){
		require.cache[moduleName].children = [];
		require.cache[moduleName].parent = null;
	}
	delete require.cache[moduleName];
};

exports.clear2 = function (moduleName) {
	moduleName = require.resolve(moduleName);
	for (key in require.cache) {

	       if (key == moduleName) {

	           const mod = require.cache[key];

	           if (!/\.node$/i.test(key)) {

	               const parentChildren = mod.parent && mod.parent.children;
	               if (parentChildren) {
	                   const idx = parentChildren.indexOf(mod);
	                   if (idx >= 0) {
	                       parentChildren.splice(idx, 1);
	                   }
	               }
	               delete require.cache[key];

	           } else {
	               mod.resolveFilenameCache = {};
	               require.cache[key].parent = null;
	           }
	       }
	   }
}