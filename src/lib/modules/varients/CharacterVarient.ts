// detect the variation of characters used
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
	return intCharacterVarient/intCharacters;
}