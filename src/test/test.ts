// accepts parameters in console for checking passwords
import { showScore } from './test-helpers';

const password = process.argv.slice(2).join(' ');
if (password == "")
	console.log("Add a parameter like: test.ts somepw123");
else
	showScore(password);