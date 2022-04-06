const express = require("express");
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
		const recipe = await Recipe.findOne({ name: req.params.name });
		if (recipe !== undefined) {
			res.send(recipe);
		} else {
			res.send(404);
		}
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

router.delete("/delete/:name", async (req, res) => {
	try {
		const recipe = await Recipe.findOne({ name: req.params.name });
		if (recipe !== undefined) {
			recipe.remove();
			res.json({ message: "Deleted Recipe" });
		} else {
			res.send(404);
		}
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

router.patch("/patch/:name", async (req, res) => {
	try {
		const recipe = await Recipe.findOne({ name: req.params.name });
		if (recipe !== undefined) {
			if (req.body.name !== undefined) {
				recipe.name = req.body.name;
			}
			if (req.body.ingredients !== undefined) {
				recipe.ingredients = req.body.ingredients;
			}
			await recipe.save();
			res.send(200);
		} else {
			res.send(404);
		}
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

router.post("/add", async (req, res) => {
	try {
		console.log("\n\n" + req.body.name);
		const recipe = new Recipe({
			author: req.body.author,
			name: req.body.name,
			ingredients: req.body.ingredients,
		});
		const newRecipe = await recipe.save();
		res.status(201).json(newRecipe);
	} catch (err) {
		res.status(400).json({ messgae: err.message });
	}
});
module.exports = router;
