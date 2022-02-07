import Password1 from '../index';

export function showScore(input: string): void {
	const strength = Password1.test(input);
	console.log(`
		Password: ${input}
		Score: ${strength.score}
		Quality: ${strength.quality}
		Scores: ${JSON.stringify(strength.scores)}
	`);	
}