import { CommonSequences, SequenceHashType } from './../../dictionaries/sequences';

type EmptyableString = string | undefined;

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

// detect the variation based on common character sequences
export function SequenceVarient(characters: string): number {
	characters = characters.toLowerCase();
	const intCharacters: number = characters.length;
	const objActiveSequences: ActiveSequences = {};
	const arrSequencesFound: LoggedSequence[] = [];
	// detective sequences
	let intCharacter: number;
	for (intCharacter=0; intCharacter!=intCharacters; intCharacter++) {
		const strCharacter: string = characters[intCharacter];
		CommonSequences.forEach((sequence: SequenceHashType, index: number) => {
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