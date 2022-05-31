require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
mongoose.connect(process.env.DATABASE_URL, { useNewURLParser: true });
const db = mongoose.connection;
db.on("error", (error) => {
	console.log("error" + error);
});
db.once("open", (error) => {
	console.log("Databse Open");
});

app.use(cors());
app.use(express.json());

const recRouter = require("./routes/RecipeRoute");
app.use("/recipe", recRouter);

const planRouter = require("./routes/PlanRoute");
app.use("/plan", planRouter);

app.listen(8080, () => {
	console.log("Server Started");
});
