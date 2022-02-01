const symbolsRegex: RegExp = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

// find the variation of different types of characters
export function TypeVarient(characters: string): number {
	const arrCharacters: string[] = characters.split("");
	const intCharacters: number = arrCharacters.length;
	let intSymbols: number = 0; // symbols including spaces because spaces are rarely used in passwords much like symbols
	let intNumbers: number = 0;
	let intLetters: number = 0;
	arrCharacters.forEach((strCharacter: string) => {
		if (/[0-9]/.test(strCharacter)) {
			intNumbers++;
		} else if (symbolsRegex.test(strCharacter) || strCharacter == ' ') {
			intSymbols++;
		} else {
			intLetters++;
		}
	});
	// best score is types are even dispersed causing the most variation
	const intExpectedAverage = Math.round(intCharacters / 3); // 3 types
	let intScore: number = 0;
	intScore += Math.abs(intExpectedAverage-intNumbers);
	intScore += Math.abs(intExpectedAverage-intSymbols);
	intScore += Math.abs(intExpectedAverage-intLetters);
	intScore = intScore / intCharacters;
	intScore = Math.min(1, intScore);
	intScore = 1-intScore;
	return intScore;
}