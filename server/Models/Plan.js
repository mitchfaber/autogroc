const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({
	author: {
		type: String,
		required: true,
	},
	startDate: {
		type: Date,
		required: true,
		default: Date.now,
	},
	endDate: {
		type: Date,
		required: true,
		default: Date.now,
	},
	recipes: [
		{
			name: {
				type: String,
			},
			ingredients: {
				type: Array,
			},
		},
	],
	ingredients: [
		{
			name: {
				type: String,
			},
		},
	],
});

module.exports = mongoose.model("Plan", planSchema);
