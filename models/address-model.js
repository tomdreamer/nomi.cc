const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const addressSchema = new Schema({

	streetNumber: {
		type: String,
		required: true,
		minlength: 1,
		maxlength: 32
	},
	streetName: {
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
	}
});

const Address = mongoose.model("Address", addressSchema);

module.exports = Address;