const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// const Address = require("../models/address-model.js")

const userSchema = new Schema({
	name: {
		type: String,
		required: true,
		minlength: 2,
		maxlength: 64
	},
	surname: {
		type: String,
		required: true,
		minlength: 2,
		maxlength: 64
	},
	email: {
		type: String,
		required: true,
		unique: true,
		match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
		// https://stackoverflow.com/a/46181/3468846
		minlength: 5,
		maxlength: 254
	},
	phoneNum: {
		type: String,
		// match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
		minlength: 3,
		maxlength: 26
		// https://www.regextester.com/1978
		// format : +33698912549 or 003365591035
	},
	description: {
		type: String,
		minlength: 600,
		maxlength: 1200
	},
	//PB avec le match: a traiter
	picture: {
		type: String,
		// match: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
		// https://stackoverflow.com/a/3809435/3468846
		default: "http://example.com/avatar.jpg"
	},
	company: {
		type: String,
		maxlength: 64
	},
	//Ne fonctionne pas pour le moment... A revoir
	// addresses: [Address],
	// https://stackoverflow.com/a/22714554/3468846

	terms: {
		type: Boolean,
		default: false
	},
	isActive: {
		type: Boolean,
		default: false
	},
	role: {
		type: String,
		required: true,
		enum: ["admin", "editor", "designer", "crafter", "customer"],
		default: "customer"
	},
	encryptedPassword: {
		type: String,
		required: true
	}
}, {
	timestamps: true
});

const User = mongoose.model("User", userSchema);

module.exports = User;