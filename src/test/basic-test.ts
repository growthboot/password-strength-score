const TestHelpers = require('./test-helpers.ts');

console.log(`

Tests:
`);

TestHelpers.showScore("test");
TestHelpers.showScore("testtesttest");
TestHelpers.showScore("testtesttest123asd");
TestHelpers.showScore("test1234");
TestHelpers.showScore("1234qwer");

console.log(`

Test finished.
`)