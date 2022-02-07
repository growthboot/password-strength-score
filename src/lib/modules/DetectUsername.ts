import { sequencesAsHash, stringsToArrays, SequenceHashType } from './../dictionaries/sequences';

type EmptyableString = string | undefined;

interface ActiveSequence {
	start: number; // the character that was found in the sequence data
	current: number; // the current location being matched in the sequence data
	source_start: number; // the character that was found in the password
}
interface ActiveSequences {
	// key is the index for the sequence data row
	[key: number]: ActiveSequence;
}

export const minimumMatchLength: number = 3; // the minimum number of characters that is considered a match for a username part in a password part

// detect any part of the username in any part of the password within a minimum character limit
export function DetectUsername(characters: string): boolean {
	characters = characters.toLowerCase();

	const sequencesAsArrays:string[][] = stringsToArrays([characters]);
	const sequencesHashed: SequenceHashType[] = sequencesAsHash(sequencesAsArrays);
	
	const intCharacters: number = characters.length;
	const objActiveSequences: ActiveSequences = {};

	// detective sequences
	let intCharacter: number;
	for (intCharacter=0; intCharacter!=intCharacters; intCharacter++) {
		const strCharacter: string = characters[intCharacter];
		sequencesHashed.forEach((sequence: SequenceHashType, index: number) => {
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
						if (meetsMinimumCriteria(objActiveSequence)) {
							return true;
						}
						objActiveSequence.start = intCharacterLocation;
						objActiveSequence.source_start = intCharacter;
					}
					objActiveSequence.current = intCharacterLocation;
				}
			} else if (objActiveSequences[index]) {
				const objActiveSequence: ActiveSequence = objActiveSequences[index];
				if (objActiveSequence.current != intCharacterLocation-1) {
					if (meetsMinimumCriteria(objActiveSequence)) {
						return true;
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
		if (meetsMinimumCriteria(objActiveSequence)) {
			return true;
		}
	});
	return false;
}

function meetsMinimumCriteria(objActiveSequence: ActiveSequence): boolean {
	return objActiveSequence.current - objActiveSequence.start >= minimumMatchLength;
}