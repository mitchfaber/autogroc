const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.listen(8080, () => {
	console.log("Server Started");
});
app.get("/", (req, res) => {
	try {
		res.json({ message: "Hello world" });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});
