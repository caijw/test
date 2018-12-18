let taskResult = [
	{
		done: true,
		data: {
			index: [0]
		},
		used: false
	},
	{
		done: true,
		data: {
			index: [1]
		},
		used: false
	},
	{
		done: true,
		data: {
			index: [2]
		},
		used: false
	},
	{
		done: true,
		data: {
			index: [3]
		},
		used: false
	}
];
let task = function () {
	return new Promise(function (resolve, reject) {
		setTimeout(function () {
			for(let i = 0; i < taskResult.length; ++i){
				if(!taskResult[i].used){
					taskResult[i].used = true;
					if(taskResult[i].done){
						resolve(taskResult[i].data);
					}else{
						reject(taskResult[i].data);
					}
					break;
				}
			}
		}, 1000);
	});
}

let runTasks = function () {
	return task().then(function (data1) {
		console.log('task1 done');
		let hasTask = false;
		for(let i = 0; i < taskResult.length; ++i){
			if(!taskResult[i].used){
				hasTask = true;
			}
		}
		if(hasTask){
			return task().then(function (data2) {
				data2.index = data1.index.concat(data2.index);
				console.log('task2 done resolve data1 data2');
				return Promise.resolve(data2);
			}, function (data2) {
				console.log('task2 fail resolve data1');
				return Promise.resolve(data1);
			});
		}else{
			console.log('no task2 resolve data1');
			return Promise.resolve(data1);
		}
	}, function (data1) {
		console.log('task1 fail');
		return Promise.reject(data1);
	});

}

runTasks().then(function (data) {
	console.log('runTasks done, data: ', data);
}, function (data) {
	console.log('runTasks fail, data: ', data);
})

