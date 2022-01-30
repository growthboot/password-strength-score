import { PasswordStrengthScore } from '../lib/index';

export function showScore(input: string): void {
	const strength = PasswordStrengthScore(input);
	console.log(`
		Password: ${input}
		Score: ${strength.score}
		Quality: ${strength.quality}
	`);	
}