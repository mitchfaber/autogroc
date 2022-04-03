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
			ingredients: [],
		},
	],
	ingredients: [{ name: { type: String } }],
});

module.exports = mongoose.model("Plan", planSchema);
