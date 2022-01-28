# Password Strength Score by GrowthBoot

## Check how brute-force-able a password is

## Installation

    npm install growthboot-password-strength-score

## How is this checker different

	Instead of making sure all passwords have used specific characters, simply make sure this password is unique enough using a scoring system.

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
var PasswordStrengthScore = require('../lib/index');
const strength = PasswordStrengthScore.test(input);
console.log(`
	Password: ${input}
	Score: ${strength.score}
	Quality: ${strength.quality}
`);
```