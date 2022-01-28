# Password Strength Score by GrowthBoot

## Check how brute-force-able a password is

## Installation

    npm install growthboot-password-strength-score

## How is this checker different

Password validation has been added to software over the decades as a counter measure to brute-force attacks on user credentials. It can be used to either block someone from entering a password that is unacceptible (too short), or help people pick stronger passwords like a strong password creation guide.
The most common approch to this so far has been to simply set various requirements for a password like: minimum length, using upper and lower cased letters, using numbers, etc... So the question is, how well does this achieve our goal?
Given that our goal is to out smart brute-force attacks, one problem is that it actually reduces the total amount of variations a password can be, therefor reducing the amount of guesses a brute-force attacker needs to make. Another problem is that people often do the same thing and circomvent the rules by simply entering the characters that the rules require at the end of the password, like "passw0rd!A". If people commonly do variations like this, it actually still makes passwords quite guessable. The intentions are good though, add more possible variations to the password to make sure the password is harder to guess. So that's it then really, the rigid approch to add character requirement can go out the window, and our goal can shift be instead amount making the rules intreduce rewards for variations and unpredictability. 
This is what this library aims to achieve, it rewards points by detecting the variablity of the characters and it rewards a score based on that. It also introduces a common word dictionary that has almost 3000 commonly used english words and treats those words as a single character or a point.

## How the password score is calculated
	- common words count as a single point (single character)
	- duplication of characters negativily impacts score
	- use of special characters gives a bonus point
	- cominations of letters & numbers gives a bonus point
	- checks for sequences based on number and alpha order
	- checks for sequences based on keyword letter placement
	- implement a minimum character limit
	- use of combination of lower case and upper case gives bonus points

## How scores are graded
	0-8: too-short
	9-14: almost
	15: okay
	16-18: strong
	19+: very-strong


## Usage
```js
const PasswordStrengthScore = require('growthboot-password-strength-score');
const strength = PasswordStrengthScore.test("testpassword123");
console.log(`
	Score: ${strength.score}
	Quality: ${strength.quality}
`);
```