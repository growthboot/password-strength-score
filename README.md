# Password Strength Score by GrowthBoot

## Check how brute-force-able a password is

## Installation

    npm install growthboot-password-strength-score

## How is this checker different

Password validation has been added to software over the decades as a countermeasure to brute-force attacks on passwords. It can be used to block someone from entering a password that is too easy for brute-force attackers to guess.

The most common brute-force countermeasure so far has been to simply set various character requirements for a password like minimum length, using uppercase and lowercase letters, using numbers, etc... So the question is, how well does this achieve our goal of making passwords hard to guess?

Given that our goal is to outsmart brute-force attacks, one problem is that it reduces the total amount of variations a password can be, therefore reducing the number of guesses a brute-force attacker theoretically needs to make. 

Another problem is that people often do the same thing and simply enter the characters that the rules require at the end of the password, like "passw0rd!A". If people commonly do variations like this, it actually still makes passwords quite guessable. 

The intentions are good though, add more possible variations to the password to make sure the password is harder to guess. It's just that doesn't directly translate to stronger passwords. Instead, we should introduce rewards for variations and unpredictability, something brute-force attacks are unlikely to guess easily.

This is what this library aims to achieve, it rewards points by detecting the variability of the characters and it rewards a score based on that. It also introduces a common word dictionary that has almost 3000 commonly used English words and treats those words as a single character. It also searches for common substitutions and leetspeak alternates for each word provided in the dictionary.

## Extra Features
	- add to or replace the dictionary
	- provide the username to prevent any part of it from being used in the password
	- manipulate how the score is calculated with a custom algorithm

## How the password score is calculated

There are 5 algorithms that look for different types of variability and scores the password with a percentage on how variable it is. 100% means there is 100% variability in the specific category and 0% means there is no variability.

So let's say we're using the case algorithm, a string with 100% case variability would look something like "AaBbCc". This is because there are an equal number of uppercase letters as there are lowercase. So the case is 100% variable.

The 5 algorithms used are:
	- sequence: Looks for letters are found from the sequence dictionary, which includes number sequences and keyboard letter placements.
	- type: Looks for character type variability, such as symbols, numbers, and letters. 
	- case: How much do the letters in the password vary their uppercase and lowercase letters.
	- word: Looks through all parts of the password, for words found in the provided word dictionary. This also corrects leet speak symbol/number replacement.
	- character: Looks at how diverse of range of characters you used and rewards you a perfect score if you used no repeating characters.

These algorithms can then be used and combined to create a score that targets 0-10 which is then graded using the chart below.

It's possible that over time, the scoring can change slightly due to improvements on the algorithms but what should never change is the labels used to translate the scores into simple labels that can be used to direct the user to a satisfactory or strong password.

## How scores are graded
	0-4: too-weak
	4-5: almost
	5-6: okay
	6-9: strong
	9+: very-strong

## Installation

npm install growthboot-password-strength-score

## Usage
```js
const PasswordStrengthScore = require('growthboot-password-strength-score');
const strength = PasswordStrengthScore.test("testpassword123");
console.log(`
	Score: ${strength.score}
	Quality: ${strength.quality}
`);
```