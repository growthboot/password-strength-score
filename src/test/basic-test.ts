import { showScore } from './test-helpers';

console.log(`

Tests:
`);
showScore("aaaaaaaa");
showScore("aaaaaaaaaaaaaaaaaaaa");
showScore("a!0");
showScore("a!00");
showScore("aaa!!!000");
showScore("aaaa!!!!0000");
showScore("aaaa!!!00");
showScore("aaaaaaa!0");
showScore("aaaaa!!!!!0");
showScore("aaaaaaaa!0");
showScore("asdfqwer1234");
showScore("soccerball");
showScore("soccerball123");
showScore("soccerball@!099");
showScore("soccerBall@!099");
showScore("soccerB0ll@!099");
showScore("GGdisskwAwSDaaa");
showScore("TXiLTD5ZJqhWdgM");
showScore("gs@dH0i$l#7A823");
showScore("gA@1pF!2cZ#3hT$4"); // the strongest score

console.log(`

Test finished.
`)