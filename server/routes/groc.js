const express = require("express");
const router = express.Router();

// getting all recipes
router.get("/", async (req, res) => {
	try {
		const recipes = await Recipe.find();
		res.send(recipes);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});
module.exports = router;
