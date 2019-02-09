const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const manufacturerSchema = new Schema({
	name: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 64
	},
	address: {
		type: String,
		required: true,
		minlength: 2,
		maxlength: 128
	},
	description: {
		type: String,
		minlength: 600,
		maxlength: 1200
	},
	email: {
		type: String,
		match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
		// https://stackoverflow.com/a/46181/3468846
		minlength: 5,
		maxlength: 254
	},
	phone: {
		type: String,
		match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
		required: true,
		minlength: 3,
		maxlength: 26
		// https://www.regextester.com/1978
		// format : +33698912549
	},
	pictures: {
		type: [String],
		match: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
		// https://stackoverflow.com/a/3809435/3468846
	},
	latitude: {
		type: Number,
		match: /^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/,
		maxlength: 9
		// https://stackoverflow.com/a/31408260/3468846
		// format: 47.824905
	},
	longitude: {
		type: Number,
		match: /^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/,
		maxlength: 9
		// https://regex101.com/ && https://www.npmjs.com/package/node-geocoder
		// format: 2.351833
	},
	isActive: {
		type: Boolean,
		default: false
	},
}, {
	timestamps: true
});

const Manufacturer = mongoose.model("Manufacturer", manufacturerSchema);

module.exports = Manufacturer;