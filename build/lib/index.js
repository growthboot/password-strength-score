"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordStrengthScore = exports.setMinLength = exports.minLength = void 0;
var words_js_1 = require("./words.js");
var sequences_js_1 = require("./sequences.js");
// customizable settings
exports.minLength = 8;
function setMinLength(value) {
    exports.minLength = value;
}
exports.setMinLength = setMinLength;
function PasswordStrengthScore(characters) {
    var intTestScore = 0;
    //intTestScore+=
    intTestScore += sequenceVarient(characters);
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
    var score = intTestScore;
    return {
        score: score,
        quality: qualify_score(score, characters)
    };
}
exports.PasswordStrengthScore = PasswordStrengthScore;
// detect the variation of characters used
function characterVarient(characters) {
    var intCharacters = characters.length;
    var intCharacterVarient = 0;
    var objLetterHash = {};
    for (var intLetter = 0; intLetter != intCharacters; intLetter++) {
        var strChar = characters[intLetter];
        if (!objLetterHash[strChar]) {
            intCharacterVarient++;
            objLetterHash[strChar] = true;
        }
    }
    return intCharacterVarient / intCharacters;
}
// detect the variation based on common character sequences
function sequenceVarient(characters) {
    var intCharacters = characters.length;
    var objActiveSequences = {};
    var arrSequencesFound = [];
    // detective sequences
    var intCharacter;
    var _loop_1 = function () {
        var strCharacter = characters[intCharacter];
        sequences_js_1.commonSequences.forEach(function (sequence, index) {
            var intCharacterLocation = sequence[strCharacter];
            if (intCharacterLocation != undefined) {
                //console.log('intCharacterLocation', {intCharacterLocation, strCharacter, index, sequence: JSON.stringify(sequence)});
                if (!objActiveSequences[index]) {
                    objActiveSequences[index] = {
                        start: intCharacterLocation,
                        current: intCharacterLocation,
                        source_start: intCharacter
                    };
                }
                else {
                    var objActiveSequence = objActiveSequences[index];
                    if (objActiveSequence.current != intCharacterLocation - 1) {
                        if (objActiveSequence.start != objActiveSequence.current) {
                            arrSequencesFound.push({
                                start: objActiveSequence.start,
                                end: objActiveSequence.current,
                                index: index,
                                length: (objActiveSequence === null || objActiveSequence === void 0 ? void 0 : objActiveSequence.current) - objActiveSequence.start + 1,
                                source_start: objActiveSequence.source_start,
                                source_end: intCharacter - 1
                            });
                        }
                        objActiveSequence.start = intCharacterLocation;
                        objActiveSequence.source_start = intCharacter;
                    }
                    objActiveSequence.current = intCharacterLocation;
                }
            }
            else if (objActiveSequences[index]) {
                var objActiveSequence = objActiveSequences[index];
                if (objActiveSequence.current != intCharacterLocation - 1) {
                    if (objActiveSequence.start != objActiveSequence.current) {
                        arrSequencesFound.push({
                            start: objActiveSequence.start,
                            end: objActiveSequence.current,
                            index: index,
                            length: objActiveSequence.current - objActiveSequence.start + 1,
                            source_start: objActiveSequence.source_start,
                            source_end: intCharacter - 1
                        });
                    }
                }
                // sequence over
                delete objActiveSequences[index];
            }
        });
    };
    for (intCharacter = 0; intCharacter != intCharacters; intCharacter++) {
        _loop_1();
    }
    // close up open sequences for when the characters run out
    var objActiveIndex = Object.keys(objActiveSequences);
    objActiveIndex.forEach(function (indexVal) {
        var index = parseInt(indexVal);
        var objActiveSequence = objActiveSequences[index];
        if (objActiveSequence.start != objActiveSequence.current) {
            arrSequencesFound.push({
                start: objActiveSequences[index].start,
                end: objActiveSequences[index].current,
                index: index * 1,
                length: objActiveSequences[index].current - objActiveSequences[index].start + 1,
                source_start: objActiveSequences[index].source_start,
                source_end: intCharacter - 1
            });
        }
    });
    if (!arrSequencesFound.length)
        return 1;
    var arrCharacters = characters.split("");
    var intWordsRemoved = 0;
    arrSequencesFound.forEach(function (objSequence) {
        var boolACharacterRemoved = false;
        for (var intCharacter = objSequence.source_start; intCharacter != objSequence.source_end + 1; intCharacter++) {
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
    var points = 0;
    arrCharacters.forEach(function (character) {
        if (character !== undefined)
            points++;
    });
    points += intWordsRemoved;
    return points / characters.length;
}
// find the variation of different types of characters
function typeVarient(characters) {
    return -1;
}
// detect how much veriation there is in the capitlaization of characters
function caseVarient(characters) {
    var intCharacters = characters.length;
    var intTotalCharacters = 0;
    var intCaseVarient = 0;
    for (var intLetter = 0; intLetter != intCharacters; intLetter++) {
        var strChar = characters[intLetter];
        if (strChar.match(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~ 0-9]/)) // skip characters that cant be capitalized
            continue;
        var isUpper = strChar === strChar.toUpperCase(); // this method of case detection should also work on none english language
        if (isUpper)
            intCaseVarient++;
        else
            intCaseVarient--;
        intTotalCharacters++;
    }
    if (intCaseVarient < 0)
        intCaseVarient *= -1;
    var intTotalVariations = intTotalCharacters - intCaseVarient;
    return 1 - (intCaseVarient / intTotalCharacters);
}
function wordVarient(characters) {
    // find the common words
    var arrWords = [];
    for (var intStart = 0; intStart < characters.length - 1; intStart++) {
        for (var intEnd = intStart + 1; intEnd < characters.length + 1; intEnd++) {
            var strPart = characters.substring(intStart, intEnd);
            if (words_js_1.wordsIndex[strPart]) {
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
    var arrCharacters = characters.split("");
    var intWordsRemoved = 0;
    arrWords.forEach(function (objWord) {
        var boolACharacterRemoved = false;
        for (var intCharacter = objWord.start; intCharacter != objWord.end; intCharacter++) {
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
    var points = 0;
    arrCharacters.forEach(function (character) {
        if (character !== undefined)
            points++;
    });
    points += intWordsRemoved;
    return points / characters.length;
}
function findRepeatedWords(characters) {
    var arrWordsFound = [];
    var objLetterHash = {};
    for (var intStart = 0; intStart != characters.length - 1; intStart++) {
        for (var intEnd = intStart + 1; intEnd != characters.length + 1; intEnd++) {
            if (intEnd - intStart < 2)
                continue;
            var strPart = characters.substring(intStart, intEnd);
            if (objLetterHash[strPart]) {
                arrWordsFound.push(strPart);
            }
            else {
                objLetterHash[strPart] = true;
            }
        }
    }
    return arrWordsFound;
}
function qualify_score(intScore, strCharacters) {
    if (strCharacters.length < exports.minLength) {
        return 'too-short';
    }
    else if (intScore < 14) {
        return 'almost';
    }
    else if (intScore > 18) {
        return 'very-strong';
    }
    else if (intScore > 15) {
        return 'strong';
    }
    else {
        return 'okay';
    }
}
