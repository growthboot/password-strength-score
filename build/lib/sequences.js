"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonSequences = void 0;
// common character sequences
var defaultSequences = [
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
exports.commonSequences = processSequences(defaultSequences);
function processSequences(sequences) {
    // convert all the sequences values to arrays so that they can be looped and evaluated
    var sequencesAsArrays = stringsToArrays(sequences);
    // create a duplicate of all values reversed so that the search can easily evaluate at combination backwords
    sequencesAsArrays = sequencesAsArrays.concat(reverseArrayValues(sequencesAsArrays));
    // create a hash map of all characters
    var sequencesHashed = sequencesAsHash(sequencesAsArrays);
    return sequencesHashed;
}
function stringsToArrays(sequences) {
    var result = [];
    sequences.forEach(function (sequence, index) {
        result[index] = sequence.split("");
    });
    return result;
}
function reverseArrayValues(sequences) {
    var result = [];
    sequences.forEach(function (sequence) {
        result.push(sequence.slice().reverse());
    });
    return result;
}
function sequencesAsHash(sequences) {
    var result = [];
    sequences.forEach(function (sequence, index) {
        result[index] = arrayToHash(sequence);
    });
    return result;
}
function arrayToHash(sequence) {
    var objHash = {};
    sequence.forEach(function (character, index) {
        objHash[character] = index;
    });
    return objHash;
}
