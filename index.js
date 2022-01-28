import { words } from './words.js';

var wordsHash = {};
words.split(/,/).forEach(word => {
	wordsHash[word] = true;
});

console.log('test');

export function getPasswordScore(letters) {
	var arrWordsFound = findWords(letters);
	var intWordPenalty = 0;
	arrWordsFound.forEach(word => {
		intWordPenalty += word.length-1;
	});
	var intTestScore = letters.length-intWordPenalty;
	if (hasBothCases(letters))
		intTestScore++;
	if (hasSpecialCharacter(letters))
		intTestScore++;
	if (/[0-9]/.test(letters))
		intTestScore++;
	var intRepeatPenelty = Math.ceil(findRepeatedWords(letters).length / 2);
	console.log('intRepeatPenelty', intRepeatPenelty);
	intTestScore -= intRepeatPenelty;
	return intTestScore;
}

function hasSpecialCharacter(str) {
	const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~ ]/;
	return specialChars.test(str);
}

function hasBothCases(letters) {
	return letters.toLowerCase() != letters.toUpperCase();
}

function findWords(word) {
	var arrWordsFound = [];
	for (var intStart=0; intStart!=word.length-1; intStart++) {
		for (var intEnd=intStart+1; intEnd!=word.length+1; intEnd++) {
			var strPart = word.substring(intStart, intEnd);
			if (wordsHash[strPart]) {
				arrWordsFound.push(strPart);
			}
		}
	}
	return arrWordsFound;
}

function findRepeatedWords(letters) {
	var arrWordsFound = [];
	var objLetterHash = {};
	for (var intStart=0; intStart!=letters.length-1; intStart++) {
		for (var intEnd=intStart+1; intEnd!=letters.length+1; intEnd++) {
			if (intEnd-intStart < 2)
				continue;
			var strPart = letters.substring(intStart, intEnd);
			if (objLetterHash[strPart]) {
				arrWordsFound.push(strPart);
			} else {
				objLetterHash[strPart] = true;
			}
		}
	}
	return arrWordsFound;
}

function findLetterSequences() {
	var arrSequences = [
		'0123456789',
		'abcdefghijklmnopqrstuvwxyz',
		'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
		'qwertyuiopasdfghjklzxcvbnm',
		'QWERTYUIOPASDFGHJKLZXCVBNM',
		'qazwsxedcrfvtgbyhnujmikolp'
	];
}