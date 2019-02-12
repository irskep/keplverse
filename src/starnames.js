// with apologies to https://www.springhole.net/writing_roleplaying_randomators/greekyish-names.htm
import tracery from 'tracery-grammar';

const grammar = tracery.createGrammar({
	'starname': [
		'#greek# #numseq#',
		'#greek#-#numseq#',
		'#letters# #numseq#',
		'#letters# #greek#',
		'#letters# #greek# #numseq# #letters#',
	],

	'numseq': [
		'#numbers#', '#numbers#', '#numbers#',
		'#letters#', '#letters#',	'#letters#',

		'#numbers# #letter#',
		'#numbers#-#letterorletters#',
		'#letterorletters# #numbers#',
		'#numbers##numbers#',
		'#letterorletters##letterorletters#',
		'#numbers#-#letter##number#',
		'#numbers#-#number#',
	],

	'letterorletters': [
		'#letter#', '#letter#', '#letter#', '#letter#',
		'#letters#', '#letters#',
	],

	'letters': [
		'#letter##letter#',
		'#letter##letter##letter#',
	],

	'numbers': [
		'#number#',
		'#number##number#', '#number##number#',
		'#number##number##number#',
	],

	'letter': [
		'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
		'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
	],

	'number': ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],

	'greek': [
		"#firstconsonant##ending-mv#",
		"#firstconsonant##ending-mv#",
		"#firstvowel##midletters##ending#",
		"#firstvowel##midletters##ending#",
		"#firstconsonant##vowel##midletters##ending#",
		"#firstconsonant##vowel##midletters##ending#",
		"#firstconsonant##vowel##midletters##ending#",
		"#firstvowel##midletters##vowel##midletters##ending#",
	],

	'firstvowel': [
		"A",
		"Ae",
		"Ai",
		"E",
		"Eio",
		"Eu",
		"I",
		"Ia",
		"O",
		"Ou",
	],

	'firstconsonant': [
		"B", "B", "B",
		"Br",
		"D", "D", "D",
		"Dr",
		"G", "G", "G",
		"Gl",
		"H", "H", "H",
		"K", "K", "K",
		"Kh",
		"Kh",
		"Kh",
		"Kl",
		"Kr",
		"L", "L", "L",
		"M", "M", "M",
		"N", "N", "N",
		"P", "P", "P",
		"Ph", "Ph", "Ph",
		"Phr",
		"Pr",
		"R", "R", "R",
		"Rh",
		"S", "S", "S",
		"T", "T", "T",
		"Th", "Th", "Th",
		"Tr",
		"X", "X", "X",
		"Z", "Z", "Z",
	],

	'vowel': [
		"a", "a",
		"e", "e",
		"ei",
		"eo",
		"eu",
		"i",
		"io",
		"o",
		"ou",
		"y",
	],

	'midletters': [
		"b", "b", "b",
		"g", "g", "g",
		"gn",
		"k", "k", "k",
		"kh",
		"kh",
		"kh",
		"kl",
		"kr",
		"l",
		"l",
		"l",
		"lk",
		"m", "m", "m",
		"mbr",
		"mn",
		"mp",
		"mph",
		"n", "n", "n",
		"nd",
		"ndr",
		"nt",
		"nth",
		"p", "p", "p", "p",
		"ph",
		"phr",
		"pp",
		"ps",
		"r", "r", "r",
		"rkh",
		"rg",
		"rm",
		"rrh",
		"rs",
		"s", "s", "s",
		"ss",
		"sp",
		"st",
		"sth",
		"t", "t", "t",
		"th", "th", "th",
		"tl",
		"tr",
		"x",
	],

	'ending': [
		"#ending-1v#",
		"#ending-mv#", "#ending-mv#", "#ending-mv#",
	],

	'ending-1v': [
		"a",
		"e",
		"o",
	],

	'ending-mv': [
		"aos",
		"as",
		"aeus",
		"es",
		"ia",
		"ia",
		"ike",
		"ios",
		"on",
		"ys",
	],
});

export default grammar;