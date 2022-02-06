import { CharacterVarient } from './lib/modules/varients/CharacterVarient';
import { SequenceVarient } from './lib/modules/varients/SequenceVarient';
import { TypeVarient } from './lib/modules/varients/TypeVarient';
import { CaseVarient } from './lib/modules/varients/CaseVarient';
import { WordVarient } from './lib/modules/varients/WordVarient';

interface VarientScoresGroup {
	character: number;
	sequence: number;
	type: number;
	case: number;
	word: number;
	length: number;
}

// customizable settings
export let minLength: number = 8;

export function setMinLength(value: number): void {
	minLength = value;
}

export function PasswordStrengthScore(characters: string) {
	const scores: VarientScoresGroup = varientScores(characters);
	const score: number = defaultScoreCalculation(scores);
	return {
		score,
		scores,
		quality: qualify_score(score, characters)
	};
}

function defaultScoreCalculation(scores: VarientScoresGroup): number {
	const scalerVal = 0.4;
	const wordVal = scores.word*2;
	const sequenceVal = scores.sequence;
	const characterVal = scores.character;
	const typeVal = Math.min(1.5, (scores.type+0.5)*2);
	const caseVal = Math.min(1.5, (scores.case+0.5)*2);
	console.log('adjusted', {
		wordVal,
		sequenceVal,
		characterVal,
		typeVal,
		caseVal
	});
	return scores.length 
		* scalerVal // scales the score so the best password roughly hits a 10
		* wordVal 
		* sequenceVal 
		* characterVal
		* typeVal
		* caseVal
}

function varientScores(characters: string): VarientScoresGroup {
	return {
		character: CharacterVarient(characters),
		sequence: SequenceVarient(characters),
		type: TypeVarient(characters),
		case: CaseVarient(characters),
		word: WordVarient(characters),
		length: characters.length
	}
}

function qualify_score(intScore: number, strCharacters: string): string {
	if (intScore > 9) {
		return 'very-strong';
	} else if (intScore > 6) {
		return 'strong';
	} else if (intScore > 5) {
		return 'okay';
	} else if (intScore > 4) {
		return 'almost';
	} else {
		return 'too-weak';
	}
}