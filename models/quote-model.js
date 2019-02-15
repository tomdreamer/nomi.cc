const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// const Address = require("../models/address-model.js")

const quoteSchema = new Schema(
    {
    designer: 
    { type: Schema.Types.ObjectId, ref: "User", required: true },
    furniture: 
    { type: Schema.Types.ObjectId, ref: "User", required: true },
    crafter:
    { type: Schema.Types.ObjectId, ref: "User", required: true },
    },
    {
        timestamps: true
    },
    );
const Quote = mongoose.model("Quote", quoteSchema);

module.exports = Quote;
