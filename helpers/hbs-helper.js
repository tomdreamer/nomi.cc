const hbs = require("hbs");

// produce a random integer {{random min max}}
hbs.registerHelper("random", function(min, max) {
	if (!Number.isInteger(min)) {
		throw new TypeError("expected minimum to be a number");
	}
	if (!Number.isInteger(max)) {
		throw new TypeError("expected maximum to be a number");
	}
	return Math.floor(Math.random() * max) + min;
});

// show only user first letter {{firstLetterOnly string}}
hbs.registerHelper("firstLetterOnly", function(input) {
	//
	// with a return..
});
