import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import IngredientTable from "./IngredientTable";
import { useParams } from "react-router";

library.add(fas);

export default function Recipe() {
	const [recName, setRecName] = useState("");
	const [ingredient, setIngredient] = useState("");
	const [ingredients, setIngredients] = useState([]);
	const [recipe, setRecipe] = useState();
	let { name } = useParams();

	useEffect(() => {
		if (name !== undefined) {
			setRecName(name);
			fetch(`http://localhost:8080/recipe/${name}`)
				.then((res) => res.json())
				.then((result) => {
					setIngredients(result.ingredients);
					setRecName(name);
				});
		}
	}, []);

	useEffect(() => {
		setIngredient("");
	}, [ingredients]);

	useEffect(() => {
		if (recipe !== undefined) {
			console.log(recipe);
			submitRecipe();
		}
	}, [recipe]);

	function addIngredient() {
		setIngredients((prevIng) => [...prevIng, { name: ingredient }]);
	}

	function createRecipe() {
		console.log(ingredients);
		setRecipe({ author: "Mitch Faber", name: recName, ingredients: ingredients });
	}

	function submitRecipe() {
		if (name !== undefined) {
			const requestOptions = {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(recipe),
			};
			// Make sure to use {name} so if user changes recipe name, it still works.
			// TODO: Switch to using ID. Requires ServerSide changes as well.
			console.log();
			fetch(`http://localhost:8080/recipe/patch/${name}`, requestOptions);
		} else {
			const requestOptions = {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(recipe),
			};
			// Make sure to use {name} so if user changes recipe name, it still works.
			// TODO: Switch to using ID. Requires ServerSide changes as well.
			fetch(`http://localhost:8080/recipe/add`, requestOptions)
				.then((res) => res.json())
				.then((result) => console.log(result));
		}
	}

	function removeIngredient(name) {
		setIngredients(ingredients.filter((ingredient) => ingredient.name !== name));
	}

	return (
		<div className="container">
			<div className="row">
				<div className="col-12 col-md-4">
					<div className="mt-3 mb-3 input-group">
						<input
							className="form-control"
							placeholder="recipe name"
							type="text"
							value={recName}
							onInput={(e) => setRecName(e.target.value)}
						/>
					</div>
					<div className="mt-3 mb-3 input-group">
						<input
							className="form-control"
							placeholder="ingredient"
							type="text"
							value={ingredient}
							onInput={(e) => setIngredient(e.target.value)}
						/>
						<div className="input-group-append">
							<span className="input-group-text">
								<button onClick={addIngredient} className="btn btn-link text-secondary">
									<FontAwesomeIcon icon={["fas", "plus"]} />
								</button>
							</span>
						</div>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col-12 col-md-4">
					<IngredientTable ingredients={ingredients} removeIngredient={removeIngredient} />
					<button onClick={createRecipe} className="btn btn-primary">
						Submit
					</button>
				</div>
			</div>
		</div>
	);
}
