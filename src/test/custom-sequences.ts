import Password1 from '../index';

const password = "pyfgaoeu123";

console.log("Before the sequences addition:");
let strength = Password1.test(password);
console.log(strength);

console.log("After the sequences addition:");
Password1.sequences(['pyfgcrl', 'aoeuidhns', 'qjkxbmwvz']); // the Dvorak keyboard layout
strength = Password1.test(password);
console.log(strength);