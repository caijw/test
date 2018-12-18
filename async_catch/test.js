let transportSend = function () {
	throw new Error('not opened');
}

let connecttionSend = function () {
	transportSend();
	return new Promise(function (resolve, reject) {
		setTimeout(function () {
			resolve(123);
		}, 10000);
	});
};

let newPage = async function () {
	let targetId = await connecttionSend();
	let page = {};
	return page;
};

let getNewPage = async function () {
	let page = await newPage();
	return page;
}

function case1() {

	return new Promise(async function (resolve, reject) {
		try{
			let page = await getNewPage();
		}catch(e){
			console.log('catch get new page error');
			console.error(e);
			return;
		}
		// debugger
		console.log('get new page success');
		resolve(1);
	});
}

let case1Wrap = async function () {
	try{
		let tmp = await case1();
	}catch(e){
		console.log('case1 error');
		console.error(e);
	}
};

case1Wrap();


