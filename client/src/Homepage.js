import React, { useEffect, useState } from "react";

export default function Homepage() {
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		setLoading(true);
		console.log("hi");
		fetch("http://localhost:8080")
			.then((res) => res.json())
			.then((result) => {
				setItems(result);
			})
			.then(() => {
				setLoading(false);
			});
	}, []);
	if (loading) {
		return <div>loading</div>;
	} else {
		return <div className="container">Homepage {items.message}</div>;
	}
}
