import Password1 from '../index';

const password = "ouibounjour23";

console.log("Before the dictionary addition:");
let strength = Password1.test(password);
console.log(strength);

console.log("After the dictionary addition:");
Password1.dictionary(['bounjour','beaucoup','bonne']);
strength = Password1.test(password);
console.log(strength);