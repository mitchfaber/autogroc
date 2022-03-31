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
// adding a new meal plan
router.post("/add", async (req, res) => {
	try {
		console.log(req.body);
		const plan = new Plan({
			author: req.body.author,
			startDate: req.body.startDate,
			endDate: req.body.endDate,
			recipes: req.body.recipes,
			ingredients: req.body.ingredients,
		});
		const newPlan = await plan.save();
		res.status(201).json(newPlan);
	} catch (err) {
		res.status(400).json({ messgae: err.message });
	}
});
module.exports = router;
