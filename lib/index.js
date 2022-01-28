const words = require('./words.js');

let minLength = 8;

const wordsHash = {};
words.split(/,/).forEach(word => {
	wordsHash[word] = true;
});


module.exports = {
	test: function (letters) {
		const arrWordsFound = findWords(letters);
		let intWordPenalty = 0;
		arrWordsFound.forEach(word => {
			intWordPenalty += word.length-1;
		});
		let intTestScore = letters.length-intWordPenalty;
		if (hasBothCases(letters))
			intTestScore++;
		if (hasSpecialCharacter(letters))
			intTestScore++;
		if (/[0-9]/.test(letters))
			intTestScore++;
		const intRepeatPenelty = Math.ceil(findRepeatedWords(letters).length / 2);
		//console.log('intRepeatPenelty', intRepeatPenelty);
		intTestScore -= intRepeatPenelty;
		const score = letters.length + Math.max(0, intTestScore);
		return {
			score,
			quality: qualify_score(score, letters)
		};
	}
}

function qualify_score(intScore, strLetters) {
	if (strLetters.length < minLength) {
		return 'too-short';
	} else if (intScore < 14) {
		return 'almost';
	} else if (intScore > 18 && strPassowrd.length >= 10) {
		return 'very-strong';
	} else if (intScore > 15) {
		return 'strong';
	} else {
		return 'okay';
	}
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