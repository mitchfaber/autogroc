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
router.get("/:id", async (req, res) => {
	try {
		const plan = await Plan.findById(req.params.id);
		if (plan !== undefined) {
			res.send(plan);
		} else {
			res.send(404);
		}
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});
// delete a meal plan
router.delete("/delete/:id", async (req, res) => {
	try {
		const plan = Plan.findById(req.params.id);
		if (plan !== undefined) {
			await Plan.findByIdAndDelete(req.params.id);
			res.send(202);
		} else {
			res.send(404);
		}
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});
router.patch("/patch/:id", async (req, res) => {
	try {
		const plan = await Plan.findById(req.params.id);
		if (plan !== undefined) {
			if (req.body.startDate != null) {
				plan.startDate = req.body.startDate;
			}
			if (req.body.endDate != null) {
				plan.endDate = req.body.endDate;
			}
			if (req.body.recipes != null) {
				plan.recipes = req.body.recipes;
			}
			if (req.body.recipes != null) {
				plan.recipes = req.body.recipes;
			}
			if (req.body.ingredients != null) {
				plan.ingredients = req.body.ingredients;
			}
			await plan.save();
			res.send(200);
		} else {
			res.send(404);
		}
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});
// adding a new meal plan
router.post("/add", async (req, res) => {
	try {
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
		res.status(400).json({ message: err.message });
	}
});

module.exports = router;
