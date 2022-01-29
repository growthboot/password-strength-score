// common character sequences
var arrSequences = [
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
// convert strings to arrays
arrSequences.forEach((sequence, index) => {
	arrSequences[index] = sequence.split("");
});
// duplicate string reversed
const reversed = [];
arrSequences.forEach(sequence => {
	reversed.push(sequence.reverse());
});
arrSequences = arrSequences.concat(reversed);
function arrayToHash(arrSequence) {
	const objHash = {};
	arrSequence.forEach((character, index) => {
		objHash[character] = index;
	});
	return objHash;
}
arrSequences.forEach((sequence, index) => {
	arrSequences[index] = arrayToHash(sequence);
})
module.exports = arrSequences;