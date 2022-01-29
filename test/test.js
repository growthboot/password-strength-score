const TestHelpers = require('./test-helpers.js');

const password = process.argv.slice(2).join(' ');
if (password == "")
	console.log("Add a parameter like: test.js somepw123");
else
	TestHelpers.showScore(password);