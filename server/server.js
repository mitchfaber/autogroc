const express = require("express");

const app = express();
app.listen(8080, () => {
	console.log("Server Started");
});
app.get("/", (req, res) => {
	try {
		console.log("Hey 3");
		res.send("Hello world");
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});
