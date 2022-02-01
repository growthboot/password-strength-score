import { CharacterVarient } from './modules/varients/CharacterVarient';
import { SequenceVarient } from './modules/varients/SequenceVarient';
import { TypeVarient } from './modules/varients/TypeVarient';
import { CaseVarient } from './modules/varients/CaseVarient';
import { WordVarient } from './modules/varients/WordVarient';

type VarientType = 'character' | 'sequence' | 'type' | 'case' | 'word';

interface VarientScoresGroup {
	[key: string]: number;
}

// customizable settings
export let minLength: number = 8;

export function setMinLength(value: number): void {
	minLength = value;
}

export function PasswordStrengthScore(characters: string) {
	let intTestScore: number = 0;
	//intTestScore+=typeVarient(characters);
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

export function varientScores(characters: string): VarientScoresGroup {
	return {
		character: CharacterVarient(characters),
		sequence: SequenceVarient(characters),
		type: TypeVarient(characters),
		case: CaseVarient(characters),
		word: WordVarient(characters)
	}
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