const symbolsRegex: RegExp = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

// detect how much veriation there is in the capitlaization of characters
export function CaseVarient(characters: string): number {
	const intCharacters: number = characters.length;
	let intTotalCharacters: number = 0;
	let intCaseVarient: number = 0;
	for (let intLetter: number = 0; intLetter!=intCharacters; intLetter++) {
		const strChar: string = characters[intLetter];
		if (symbolsRegex.test(strChar) || /[0-9 ]/.test(strChar)) // skip characters that cant be capitalized
			continue;
		const isUpper: boolean = strChar === strChar.toUpperCase(); // this method of case detection should also work on none english language
		if (isUpper)
			intCaseVarient++;
		else
			intCaseVarient--;
		intTotalCharacters++;
	}
	if(intCaseVarient < 0) intCaseVarient *= -1;
	const intTotalVariations: number = intTotalCharacters - intCaseVarient;
	return 1-(intCaseVarient / intTotalCharacters);
}