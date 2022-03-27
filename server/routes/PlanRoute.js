const express = require("express");
const router = express.Router();
const Plan = require("../Models/Plan");

// getting all meal plans
router.get("/", async (req, res) => {
	try {
		const recipes = await Plan.find();
		res.send(recipes);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});
// router.post("/add", async (req, res) => {

// });
module.exports = router;
