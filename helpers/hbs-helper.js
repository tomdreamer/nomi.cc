const hbs = require("hbs");
const moment = require("moment");

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

// shorten a text {{truncate string length}}
hbs.registerHelper("truncate", function(str, len) {
	if (str.length > len && str.length > 0) {
		var new_str = str + " ";
		new_str = str.substr(0, len);
		new_str = str.substr(0, new_str.lastIndexOf(" "));
		new_str = new_str.length > 0 ? new_str : str.substr(0, len);

		return new hbs.SafeString(new_str + "...");
	}
	return str;
});

// change format date {{formatDate string}}
// https://devhints.io/moment
hbs.registerHelper("formatDate", function(dateString) {
	return new hbs.SafeString(
		moment(dateString)
			.fromNow()
			.toUpperCase()
		//moment(dateString).format("MMM D").toUpperCase()
	);
});

// capitalize first character {{capitalize string}}
hbs.registerHelper("capitalize", function(string) {
	if (typeof string !== "string") return "";
	return string.charAt(0).toUpperCase() + string.slice(1);
});

// put set value for a HTML5 select item {{optionSelectArray array string}}
hbs.registerHelper("optionSelectArray", function(array, string) {
	if (array.indexOf(string) > -1) {
		return `value="${string}" selected`;
		// NIZARFIXME https://stackoverflow.com/a/10654345 see edit furniture form html
	}
	return "";
});

// Convert boolean to check/ed  HTML5 {{ booleanToCheck boolean }}
hbs.registerHelper("booleanToCheck", function(boolean) {
	if (!boolean) {
		let str = " value=\"off\"";
		return str;
	}
	let str = " value=\"on\" checked";
	return str;

	// NIZARFIXME https://stackoverflow.com/a/10654345
});

// show only user first character {{firsCharOnly string}}
hbs.registerHelper("firstCharOnly", function(input) {
	//
	// with a return..
});
