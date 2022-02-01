import { wordsIndex, WordHash } from './words';
import { commonSequences, SequenceHash } from './sequences';

const symbolsRegex: RegExp = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

// customizable settings
export let minLength: number = 8;

export function setMinLength(value: number): void {
	minLength = value;
}

export function PasswordStrengthScore(characters: string) {
	let intTestScore: number = 0;
	intTestScore+=typeVarient(characters);
	//intTestScore+=sequenceVarient(characters);
	//intTestScore+=wordVarient(characters);
	//intTestScore+=caseVarient(characters);
	//intTestScore+=characterVarient(characters);

	//if (hasSpecialCharacter(characters))
	//	intTestScore++;
	//if (/[0-9]/.test(characters))
	//	intTestScore++;
	//const intRepeatPenelty = Math.ceil(findRepeatedWords(characters).length / 2);
	//console.log('intRepeatPenelty', intRepeatPenelty);
	//intTestScore -= intRepeatPenelty;
	//const score = characters.length + Math.max(0, intTestScore);
	const score: number = intTestScore;
	return {
		score,
		quality: qualify_score(score, characters)
	};
}

export interface LetterHash {
	[key: string]: boolean;
}

// detect the variation of characters used
function characterVarient(characters: string): number {
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

interface ActiveSequence {
	start: number; // the character that was found in the sequence data
	current: number; // the current location being matched in the sequence data
	source_start: number; // the character that was found in the password
}
interface LoggedSequence {
	start: number; // the character that was found in the sequence data
	end: number; // the character that the sequence ends at from the sequence data
	source_start: number; // the character that was found in the password
	source_end: number; // the last character that matched the sequence data from the password
	length: number; // end - start which is the total length of the match
	index: number; // the current row of the sequence data	
}

interface ActiveSequences {
	// key is the index for the sequence data row
	[key: number]: ActiveSequence;
}

type EmptyableString = string | undefined;

// detect the variation based on common character sequences
function sequenceVarient(characters: string): number {
	const intCharacters: number = characters.length;
	const objActiveSequences: ActiveSequences = {};
	const arrSequencesFound: LoggedSequence[] = [];
	// detective sequences
	let intCharacter: number;
	for (intCharacter=0; intCharacter!=intCharacters; intCharacter++) {
		const strCharacter: string = characters[intCharacter];
		commonSequences.forEach((sequence: SequenceHash, index: number) => {
			const intCharacterLocation: number = sequence[strCharacter];
			if (intCharacterLocation != undefined) {
				//console.log('intCharacterLocation', {intCharacterLocation, strCharacter, index, sequence: JSON.stringify(sequence)});
				if (!objActiveSequences[index]) {
					objActiveSequences[index] = {
						start: intCharacterLocation,
						current: intCharacterLocation,
						source_start: intCharacter
					}
				} else {
					const objActiveSequence: ActiveSequence = objActiveSequences[index];
					if (objActiveSequence.current != intCharacterLocation-1) {
						if (objActiveSequence.start != objActiveSequence.current) {
							arrSequencesFound.push({
								start: objActiveSequence.start,
								end: objActiveSequence.current,
								index: index,
								length: objActiveSequence?.current - objActiveSequence.start + 1,
								source_start: objActiveSequence.source_start,
								source_end: intCharacter-1
							});
						}
						objActiveSequence.start = intCharacterLocation;
						objActiveSequence.source_start = intCharacter;
					}
					objActiveSequence.current = intCharacterLocation;
				}
			} else if (objActiveSequences[index]) {
				const objActiveSequence: ActiveSequence = objActiveSequences[index];
				if (objActiveSequence.current != intCharacterLocation-1) {
					if (objActiveSequence.start != objActiveSequence.current) {
						arrSequencesFound.push({
							start: objActiveSequence.start,
							end: objActiveSequence.current,
							index: index,
							length: objActiveSequence.current - objActiveSequence.start + 1,
							source_start: objActiveSequence.source_start,
							source_end: intCharacter-1
						});
					}
				}
				// sequence over
				delete objActiveSequences[index];
			}
		});
	}
	// close up open sequences for when the characters run out
	var objActiveIndex: string[] = Object.keys(objActiveSequences);
	objActiveIndex.forEach((indexVal: string) => {
		const index: number = parseInt(indexVal);
		var objActiveSequence: ActiveSequence = objActiveSequences[index];
		if (objActiveSequence.start != objActiveSequence.current) {
			arrSequencesFound.push({
				start: objActiveSequences[index].start,
				end: objActiveSequences[index].current,
				index: index * 1,
				length: objActiveSequences[index].current - objActiveSequences[index].start + 1,
				source_start: objActiveSequences[index].source_start,
				source_end: intCharacter-1
			});
		}
	});
	if (!arrSequencesFound.length)
		return 1;
	const arrCharacters: EmptyableString[] = characters.split("");

	let intWordsRemoved: number = 0;
	arrSequencesFound.forEach(objSequence => {
		let boolACharacterRemoved: boolean = false;
		for (var intCharacter: number = objSequence.source_start; intCharacter!=objSequence.source_end+1; intCharacter++) {
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

// find the variation of different types of characters
function typeVarient(characters: string): number {
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

// detect how much veriation there is in the capitlaization of characters
function caseVarient(characters: string): number {
	const intCharacters: number = characters.length;
	let intTotalCharacters: number = 0;
	let intCaseVarient: number = 0;
	for (let intLetter: number = 0; intLetter!=intCharacters; intLetter++) {
		const strChar: string = characters[intLetter];
		if (symbolsRegex.test(strChar) || /[0-9 ]/.test(strChar)) // skip characters that cant be capitalized
			continue;
		const isUpper: boolean = strChar === strChar.toUpperCase(); // this method of case detection should also work on none english language
		if (isUpper)
			intCaseVarient++;
		else
			intCaseVarient--;
		intTotalCharacters++;
	}
	if(intCaseVarient < 0) intCaseVarient *= -1;
	const intTotalVariations: number = intTotalCharacters - intCaseVarient;
	return 1-(intCaseVarient / intTotalCharacters);
}

interface WordVarientType {
	length: number;
	word: string;
	start: number;
	end: number;
}

function wordVarient(characters: string): number {
	// find the common words
	const arrWords: WordVarientType[] = [];
	for (var intStart: number = 0; intStart<characters.length-1; intStart++) {
		for (var intEnd: number = intStart+1; intEnd<characters.length+1; intEnd++) {
			var strPart: string = characters.substring(intStart, intEnd);
			if (wordsIndex[strPart]) {
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

function findRepeatedWords(characters: string): string[] {
	var arrWordsFound: string[] = [];
	var objLetterHash: LetterHash = {};
	for (var intStart: number = 0; intStart!=characters.length-1; intStart++) {
		for (var intEnd: number = intStart+1; intEnd!=characters.length+1; intEnd++) {
			if (intEnd-intStart < 2)
				continue;
			var strPart: string = characters.substring(intStart, intEnd);
			if (objLetterHash[strPart]) {
				arrWordsFound.push(strPart);
			} else {
				objLetterHash[strPart] = true;
			}
		}
	}
	return arrWordsFound;
}


function qualify_score(intScore: number, strCharacters: string): string {
	if (strCharacters.length < minLength) {
		return 'too-short';
	} else if (intScore < 14) {
		return 'almost';
	} else if (intScore > 18) {
		return 'very-strong';
	} else if (intScore > 15) {
		return 'strong';
	} else {
		return 'okay';
	}
}