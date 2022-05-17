import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import IngredientTable from "./IngredientTable";
import { v4 as uuidv4 } from "uuid";

export default function CheckList() {
	let { id } = useParams();
	const [loading, setLoading] = useState(true);
	function getPlan() {
		fetch(`http://localhost:8080/plan/${id}`)
			.then((res) => res.json())
			.then((result) => {
				setLoading(false);
				console.log(result);
			});
	}
	useEffect(() => {
		getPlan();
	}, []);
	if (loading === false) {
		return <div className="container">CheckList</div>;
	} else {
		return <div className="container">Loading...</div>;
	}
}
