const express = require("express");
const router = express.Router();
const Plan = require("../Models/Plan");

// getting all meal plans
router.get("/", async (req, res) => {
	try {
		const plans = await Plan.find();
		res.send(plans);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});
router.post("/add", async (req, res) => {
	const plan = new Plan({
		author: req.body.author,
		startDate: req.body.start,
		endDate: req.body.end,
		recipes: req.body.recipes,
		ingredients: req.body.ingredients,
	});

	try {
		const newPlan = await plan.save();
		res.status(201).json(newPlan);
	} catch (err) {
		res.status(400).json({ messgae: err.message });
	}
});
module.exports = router;
