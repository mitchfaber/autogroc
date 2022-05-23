const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({
	author: {
		type: String,
		required: true,
	},
	startDate: {
		type: String,
		required: true,
		default: Date.now,
	},
	endDate: {
		type: String,
		required: true,
		default: Date.now,
	},
	recipes: [
		{
			name: {
				type: String,
			},
			ingredients: [{ name: { type: String }, checked: { type: Boolean, required: true, default: false } }],
		},
	],
	ingredients: [{ name: { type: String }, checked: { type: Boolean, required: true, default: false } }],
	complete: {
		type: Boolean,
		required: true,
		default: false,
	},
});

module.exports = mongoose.model("Plan", planSchema);
