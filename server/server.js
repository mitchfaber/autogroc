require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, { useNewURLParser: true });
const db = mongoose.connection;
db.on("error", (error) => {
	console.log("error" + error);
});
db.once("open", (error) => {
	console.log("Databse Open");
});

app.use(express.json());

const grocRouter = require("./routes/groc");
app.use("/groc", grocRouter);

app.listen(8080, () => {
	console.log("Server Started");
});
