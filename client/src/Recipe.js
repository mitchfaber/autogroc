import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import IngredientTable from "./IngredientTable";

library.add(fas);

export default function Recipe() {
	const [name, setName] = useState("");
	const [ingredient, setIngredient] = useState("");
	const [ingredients, setIngredients] = useState([]);
	const [recipe, setRecipe] = useState();

	useEffect(() => {
		setIngredient("");
	}, [ingredients]);

	useEffect(() => {
		submitRecipe();
	}, [recipe]);

	function addIngredient() {
		setIngredients((prevIng) => [...prevIng, { name: ingredient }]);
	}

	function createRecipe() {
		console.log(ingredients);
		setRecipe({ author: "Mitch Faber", name: name, ingredients: ingredients });
	}

	function submitRecipe() {
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(recipe),
		};
		fetch("http://localhost:8080/recipe/add", requestOptions)
			.then((res) => res.json())
			.then((result) => console.log(result));
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
							value={name}
							onInput={(e) => setName(e.target.value)}
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
