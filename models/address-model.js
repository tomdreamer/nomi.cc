const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const addressSchema = new Schema({

	streetAdress: {
		type: String,
		required: true,
		minlength: 1,
		maxlength: 32
	},
	city: {
		type: String,
		required: true,
	},
	miscDetails: {
		type: String,
	},
	zipcode: {
		type: String,
		required: true,
		minlength: 2,
		maxlength: 11
	},
	country: {
		type: String,
	},
});

const Address = mongoose.model("Address", addressSchema);

module.exports = Address;