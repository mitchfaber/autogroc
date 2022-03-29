const express = require("express");
const { rawListeners } = require("../Models/Recipe");
const router = express.Router();
const Recipe = require("../Models/Recipe");

// getting all recipes
router.get("/", async (req, res) => {
	try {
		const recipes = await Recipe.find();
		res.send(recipes);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

router.get("/:name", async (req, res) => {
	try {
		const recipes = await Recipe.findOne({ name: req.params.name });
		res.send(recipes);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

router.delete("/:name", async (req, res) => {
	try {
		const recipes = await Recipe.findOne({ name: req.params.name });
		recipes.remove();
		res.json({ message: "Deleted Book" });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

router.post("/add", async (req, res) => {
	const recipe = new Recipe({
		author: req.body.author,
		name: req.body.name,
		ingredients: req.body.ingredients,
	});

	try {
		const newRecipe = await recipe.save();
		res.status(201).json(newRecipe);
	} catch (err) {
		res.status(400).json({ messgae: err.message });
	}
});
module.exports = router;
