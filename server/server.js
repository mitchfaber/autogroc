const express = require("express");

const app = express();
app.listen(8080, () => {
	console.log("Server Started");
});
app.get("/", (req, res) => {
	try {
		res.send("Hello world");
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});
