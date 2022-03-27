const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
	author: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	ingredients: [
		{
			name: { type: String },
		},
	],
});

module.exports = mongoose.model("Recipe", recipeSchema);
