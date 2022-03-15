import React, { useEffect, useState } from "react";

export default function Homepage() {
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		setLoading(true);
		console.log("hi");
		// fetch("http://localhost:8080")
		// 	.then((res) => res.json())
		// 	.then((result) => {
		// 		setItems(result);
		// 	})
		// 	.then(() => {
		// 		setLoading(false);
		// 	});
		setLoading(false);
	}, []);
	if (loading) {
		return <div className="container">loading</div>;
	} else {
		return <div className="container">Homepage</div>;
	}
}
