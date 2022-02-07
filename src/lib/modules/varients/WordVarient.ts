import { WordsIndex } from './../../dictionaries/words';

interface LetterHash {
	[key: string]: boolean;
}

interface WordVarientType {
	length: number;
	word: string;
	start: number;
	end: number;
}
export type EmptyableString = string | undefined;

export function WordVarient(characters: string): number {
	characters = characters.toLowerCase();
	// leet speak conversions
	characters = characters.replace('@', 'a');
	characters = characters.replace('$', 's');
	characters = characters.replace('0', 'o');
	characters = characters.replace('!', 'i');
	characters = characters.replace('1', 'l');
	characters = characters.replace('3', 'e');
	characters = characters.replace('7', 't');
	characters = characters.replace('5', 's');
	// find the common words
	const arrWords: WordVarientType[] = [];
	for (var intStart: number = 0; intStart<characters.length-1; intStart++) {
		for (var intEnd: number = intStart+1; intEnd<characters.length+1; intEnd++) {
			var strPart: string = characters.substring(intStart, intEnd);
			if (WordsIndex[strPart]) {
				arrWords.push({
					length: strPart.length,
					word: strPart,
					start: intStart,
					end: intEnd
				});
			}
		}
	}
	arrWords.sort(function (a, b) {
		return b.length - a.length;
	});

	// remove the words but keep track of how many words were removed
	const arrCharacters: EmptyableString[] = characters.split("");
	let intWordsRemoved: number = 0;
	arrWords.forEach(objWord => {
		let boolACharacterRemoved: boolean = false;
		for (var intCharacter: number = objWord.start; intCharacter!=objWord.end; intCharacter++) {
			if (arrCharacters[intCharacter] !== undefined) {
				arrCharacters[intCharacter] = undefined;
				boolACharacterRemoved = true;
			}
		}
		if (boolACharacterRemoved) {
			intWordsRemoved++;
		}
	});

	// add the remaining caracters with the words removed
	let points: number = 0;
	arrCharacters.forEach(character => {
		if (character !== undefined)
			points++;
	});
	points += intWordsRemoved;

	return points/characters.length;
}
