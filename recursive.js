function func() {
	// console.log('func');
	func();
}

process.nextTick(func);

