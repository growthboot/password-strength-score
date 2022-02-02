// detect the variation of characters used
// the worst score should be yelded from a string with only a single character like 'aaaaaaaa'
// the point is reduce the score when there is a lack of variation in characters
// the score gets worse when more characters a provided like 'aaaaaaaaaaa' because there's actually less variation considering the more letters which are all the same
interface LetterHash {
	[key: string]: boolean;
}

export function CharacterVarient(characters: string): number {
	const intCharacters: number = characters.length;
	let intCharacterVarient: number = 0;
	const objLetterHash: LetterHash = {};
	for (let intLetter: number=0; intLetter!=intCharacters; intLetter++) {
		const strChar: string = characters[intLetter];
		if (!objLetterHash[strChar]) {
			intCharacterVarient++;
			objLetterHash[strChar] = true;
		}
	}
	return 1-((intCharacters-intCharacterVarient)/intCharacters);
}