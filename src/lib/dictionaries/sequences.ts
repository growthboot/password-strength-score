// common character sequences
const defaultSequences:string[] = [
	// top numbers
	'`1234567890-=',
	'~!@#$%^&*()_+',
	 // num pad
	'7418529630.',
	// alphabet
	'abcdefghijklmnopqrstuvwxyz',
	'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
	// common keyboard placement
	'qwertyuiop[]\\',
	'asdfghjkl;\'',
	'zxcvbnm,./', 
	'QWERTYUIOP{}|',
	'ASDFGHJKL:"',
	'ZXCVBNM<>?',
	'1qaz',
	'2wsx',
	'3edc',
	'4rfv',
	'5tgb',
	'6yhn',
	'7ujm',
	'8ik,',
	'9ol.',
	'0p;/',
	'-[\'',
	'=]',
	'!QAZ',
	'@WSX',
	'#EDC',
	'$RFV',
	'%TGB',
	'^YHN',
	'&UJM',
	'*IK<',
	'(OL>',
	')P:?',
	'_{"',
	'+}'
];

export interface SequenceHashType {
	[key: string]: number;
}

export let CommonSequences: SequenceHashType[] = processSequences(defaultSequences);

export function ImportSequences(sequences: string[]): void {
	const newSequences = processSequences(sequences);
	newSequences.forEach((sequence: SequenceHashType) => CommonSequences.push(sequence));
}

export function processSequences(sequences: string[]): SequenceHashType[] {
	// convert all the sequences values to arrays so that they can be looped and evaluated
	let sequencesAsArrays:string[][] = stringsToArrays(sequences);
	// create a duplicate of all values reversed so that the search can easily evaluate at combination backwords
	sequencesAsArrays = sequencesAsArrays.concat(reverseArrayValues(sequencesAsArrays));
	// create a hash map of all characters
	const sequencesHashed: SequenceHashType[] = sequencesAsHash(sequencesAsArrays);
	return sequencesHashed;
}

export function stringsToArrays(sequences: string[]): string[][] {
	const result: string[][] = [];
	sequences.forEach((sequence: string, index: number) => {
		result[index] = sequence.split("");
	});
	return result;
}

function reverseArrayValues(sequences: string[][]):string[][] {
	const result:string[][] = [];
	sequences.forEach((sequence: string[]) => {
		result.push(sequence.slice().reverse());
	});
	return result;
}

export function sequencesAsHash(sequences: string[][]): SequenceHashType[] {
	const result: SequenceHashType[] = [];
	sequences.forEach((sequence: string[], index: number) => {
		result[index] = arrayToHash(sequence);
	});
	return result;
}

function arrayToHash(sequence: string[]): SequenceHashType {
	const objHash: SequenceHashType = {};
	sequence.forEach((character: string, index: number) => {
		objHash[character] = index;
	});
	return objHash;
}