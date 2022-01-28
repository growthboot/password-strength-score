var PasswordStrengthScore = require('../lib/index');

function showScore(input) {
	const strength = PasswordStrengthScore.test(input);
	console.log(`
		Password: ${input}
		Score: ${strength.score}
		Quality: ${strength.quality}
	`);
}

console.log(`

Tests:
`);

showScore("test");
showScore("testtesttest");
showScore("testtesttest123asd");
showScore("test1234");
showScore("1234qwer");

console.log(`

Test finished.
`)