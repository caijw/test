
async function func() {
	return new Promise(function (resolve, reject) {
		setTimeout(function () {
			reject({
				code: -1,
				message: 'hello world'
			});
		}, 4000);
	});
}

async function a() {
	try{
		let a = await func();
	}catch(e){
		console.log('catch await func: ', e);
	}
	
}


a();
