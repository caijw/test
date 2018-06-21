const fs = require('fs');

function func() {
	console.log('nextTick');
}


fs.readFile(__filename, () => {
  setTimeout(() => {
    console.log('timeout');
  }, 0);
  setImmediate(() => {
    console.log('immediate');
  });
  process.nextTick(func)
});