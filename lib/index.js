const wordsHash = require('./words.js');
const commonSequences = require('./sequences.js');

console.log({commonSequences});
// customizable settings
let minLength = 8;

module.exports = {
	minLength: function(value) {
		minLength = value;
	},
	test: function (characters) {
		let intTestScore = 0;
		//intTestScore+=
		sequenceVarient(characters);
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
		const score = intTestScore;
		return {
			score,
			quality: qualify_score(score, characters)
		};
	}
}

// detect the variation of characters used
function characterVarient(characters) {
	const intCharacters = characters.length;
	let intCharacterVarient = 0;
	const objLetterHash = {};
	for (let intLetter=0; intLetter!=intCharacters; intLetter++) {
		const strChar = characters[intLetter];
		if (!objLetterHash[strChar]) {
			intCharacterVarient++;
			objLetterHash[strChar] = true;
		}
	}
	return intCharacterVarient/intCharacters;
}

// detect the variation based on common character sequences
function sequenceVarient(characters) {
	const intCharacters = characters.length;
	const objActiveSequences = {};
	const arrSequencesFound = [];
	for (let intCharacter=0; intCharacter!=intCharacters; intCharacter++) {
		const strCharacter = characters[intCharacter];
		console.log('strCharacter', strCharacter);
		commonSequences.forEach((sequence, index) => {
			const intIndexFound = sequence[strCharacter];
			if (intIndexFound) {
				if (!objActiveSequences[index]) {
					objActiveSequences[index] = {
						start: intIndexFound,
						current: intIndexFound
					}
				} else {
					if (objActiveSequences[index].current != intIndexFound-1) {
						if (objActiveSequences[index].start != objActiveSequences[index].current) {
							arrSequencesFound.push({
								start: objActiveSequences[index].start,
								end: objActiveSequences[index].current,
								index: index
							});
						}
						objActiveSequences[index].start = intIndexFound;
					}
					objActiveSequences[index].current = intIndexFound;
				}
			} else if (objActiveSequences[index]) {
				// sequence over
				delete objActiveSequences[index];
			}
		});
	}
	var objActiveIndex = Object.keys(objActiveSequences);
	objActiveIndex.forEach(index => {
		var objActiveSequence = objActiveSequences[index];
		if (objActiveSequence.start != objActiveSequence.current) {
			arrSequencesFound.push({
				start: objActiveSequences[index].start,
				end: objActiveSequences[index].current,
				index: index
			});
		}
	})
	console.log({arrSequencesFound});
}

function typeVarient(characters) {

}

// detect how much veriation there is in the capitlaization of characters
function caseVarient(characters) {
	const intCharacters = characters.length;
	let intTotalCharacters = 0;
	let intCaseVarient = 0;
	for (let intLetter=0; intLetter!=intCharacters; intLetter++) {
		const strChar = characters[intLetter];
		if (strChar.match(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~ 0-9]/)) // skip characters that cant be capitalized
			continue;
		const isUpper = strChar === strChar.toUpperCase(); // this method of case detection should also work on none english language
		if (isUpper)
			intCaseVarient++;
		else
			intCaseVarient--;
		intTotalCharacters++;
	}
	if(intCaseVarient < 0) intCaseVarient *= -1;
	const intTotalVariations = intTotalCharacters - intCaseVarient;
	return 1-(intCaseVarient / intTotalCharacters);
}

function wordVarient(characters) {
	// find the common words
	const arrWords = [];
	for (var intStart=0; intStart<characters.length-1; intStart++) {
		for (var intEnd=intStart+1; intEnd<characters.length+1; intEnd++) {
			var strPart = characters.substring(intStart, intEnd);
			if (wordsHash[strPart]) {
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
	const arrCharacters = characters.split("");
	let intWordsRemoved = 0;
	arrWords.forEach(objWord => {
		let boolACharacterRemoved = false;
		for (var intCharacter=objWord.start; intCharacter!=objWord.end; intCharacter++) {
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
	let points = 0;
	arrCharacters.forEach(character => {
		if (character !== undefined)
			points++;
	});
	points += intWordsRemoved;

	return points/characters.length;
}

function findRepeatedWords(characters) {
	var arrWordsFound = [];
	var objLetterHash = {};
	for (var intStart=0; intStart!=characters.length-1; intStart++) {
		for (var intEnd=intStart+1; intEnd!=characters.length+1; intEnd++) {
			if (intEnd-intStart < 2)
				continue;
			var strPart = characters.substring(intStart, intEnd);
			if (objLetterHash[strPart]) {
				arrWordsFound.push(strPart);
			} else {
				objLetterHash[strPart] = true;
			}
		}
	}
	return arrWordsFound;
}


function qualify_score(intScore, strCharacters) {
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