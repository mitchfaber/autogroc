import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import IngredientTable from "./IngredientTable";
import { v4 as uuidv4 } from "uuid";
import { far } from "@fortawesome/free-regular-svg-icons";

export default function CheckList() {
	let { id } = useParams();
	const [loading, setLoading] = useState(true);
	const [ingredients, setIngredients] = useState([]);
	const [complete, setComplete] = useState(false);
	const [plan, setPlan] = useState();
	library.add(far);
	library.add(fas);

	function checkItem(e) {
		const newIngs = [...ingredients];
		const ing = newIngs.find((ing) => ing.name === e.currentTarget.value);
		ing.checked = !ing.checked;
		setIngredients(newIngs);
	}

	function getPlan() {
		fetch(`http://localhost:8080/plan/${id}`)
			.then((res) => res.json())
			.then((result) => {
				setIngredients(result.ingredients);
				setPlan(result);
				setComplete(result.complete);
				console.log(result);
				result.recipes.forEach((recipe) => {
					console.log(recipe.ingredients);
					setIngredients((prevIng) => [...prevIng, ...recipe.ingredients]);
					console.log(ingredients);
				});
				setLoading(false);
				//setIngredients([...ingredients, result.recipes.ingredients]);
			});
	}

	useEffect(() => {
		getPlan();
	}, []);

	useEffect(() => {
		// checks to see if all the ingredients have been checked off to mark the list as complete.
		if (ingredients.filter((e) => e.checked === false).length === 0) {
			setComplete(true);
		} else {
			setComplete(false);
		}
		const requestOptions = {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(plan),
		};
		fetch(`http://localhost:8080/plan/patch/${id}`, requestOptions)
			.then((res) => res.json())
			.then((result) => console.log(result));
	}, [ingredients]);

	useEffect(() => {
		console.log(complete);
	}, [complete]);

	if (loading === false) {
		return (
			<div className="container">
				<div className="row">
					{complete && <div className="mt-3 alert alert-success">Plan Complete!</div>}
					<div className="list-group">
						{ingredients.map((ing) => {
							return (
								<div key={uuidv4()} className="d-flex align-items-center ">
									<button className="btn" onClick={checkItem} value={ing.name}>
										{ing.checked ? (
											<FontAwesomeIcon icon={["far", "circle-check"]} />
										) : (
											<FontAwesomeIcon icon={["far", "circle"]} />
										)}
									</button>
									{ing.name}
								</div>
							);
						})}
					</div>
				</div>
			</div>
		);
	} else {
		return <div className="container">Loading...</div>;
	}
}
