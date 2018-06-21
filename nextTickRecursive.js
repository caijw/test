function func() {
	console.log('nextTick');
	process.nextTick(func);
}
process.nextTick(func);