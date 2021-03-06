const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const furnitureSchema = new Schema(
	{
		name: {
			type: String,
			unique: true,
			required: true,
			minlength: 3,
			maxlength: 64
		},
		serialNumber: {
			type: String,
			required: true,
			minlength: 32,
			maxlength: 36
		},
		type: {
			type: String,
			enum: ["desk", "storage", "table", "lamp", "seating"]
		},
		description: { type: String },
		size: {
			width: {
				type: Number,
				required: true,
				default: 0
			},
			height: {
				type: Number,
				required: true,
				default: 0
			},
			depth: {
				type: Number,
				required: true,
				default: 0
			}
		},
		stdPrice: {
			type: Number,
			required: true,
			default: 0
		},
		file: {
			type: String,
			default: null
		},
		pictures: {
			url: [String],
			default: ["https://dummyimage.com/1920x1080/cccccc/f2f2f2&text=Default"]
		},
		material: [
			{
				type: String,
				enum: ["wood", "copper", "steel", "iron", "fiber", "cloth"],
				required: true
			}
		],
		isActive: {
			type: Boolean,
			default: false
		},
		creator: { type: Schema.Types.ObjectId, ref: "User", required: true }
	},
	{
		timestamps: true
	}
);

const Furniture = mongoose.model("Furniture", furnitureSchema);

module.exports = Furniture;
