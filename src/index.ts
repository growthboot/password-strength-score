import { WordsIndex } from './lib/dictionaries/words';
import { ImportSequences } from './lib/dictionaries/sequences';
import { CharacterVarient } from './lib/modules/varients/CharacterVarient';
import { SequenceVarient } from './lib/modules/varients/SequenceVarient';
import { TypeVarient } from './lib/modules/varients/TypeVarient';
import { CaseVarient } from './lib/modules/varients/CaseVarient';
import { WordVarient } from './lib/modules/varients/WordVarient';
import { DetectUsername } from './lib/modules/DetectUsername';

export type PasswordScore = 'very-strong' | 'strong' | 'okay' | 'almost' | 'too-weak';

export interface VarientScoresGroup {
	character: number;
	sequence: number;
	type: number;
	case: number;
	word: number;
	length: number;
	usernameDetected?: boolean;
}

export interface PasswordTestResult {
	score: number;
	scores: VarientScoresGroup;
	quality: PasswordScore;
}

// customizable settings
export let minLength: number = 8;

export function setMinLength(value: number): void {
	minLength = value;
}

export default {
	test(characters: string): PasswordTestResult {
		const scores: VarientScoresGroup = varientScores(characters);
		const score: number = defaultScoreCalculation(scores);
		if (username) {
			scores.usernameDetected = DetectUsername(username);
		}
		return {
			score,
			scores,
			quality: qualify_score(score, characters)
		};
	},
	dictionary(list: string[]): void {
		list.forEach((item: string) => WordsIndex[item] = true);
	},
	sequences(list: string[]): void {
		ImportSequences(list);
	},
	username(value: string) {
		username = value;
	},
	calculation() {

	}
}

let username: string;

function defaultScoreCalculation(scores: VarientScoresGroup): number {
	const scalerVal = 0.4;
	const wordVal = scores.word*2;
	const sequenceVal = scores.sequence;
	const characterVal = scores.character;
	const typeVal = Math.min(1.5, (scores.type+0.5)*2);
	const caseVal = Math.min(1.5, (scores.case+0.5)*2);
	if (scores.usernameDetected !== undefined) {
		if (scores.usernameDetected)
			return 0;
	}
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

function qualify_score(intScore: number, strCharacters: string): PasswordScore {
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