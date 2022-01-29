const PasswordStrengthScore = require('../lib/index');

module.exports = {
	showScore: (input) => {
		const strength = PasswordStrengthScore.test(input);
		console.log(`
			Password: ${input}
			Score: ${strength.score}
			Quality: ${strength.quality}
		`);
	}
};