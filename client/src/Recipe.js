import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";
import IngredientTable from "./IngredientTable";

library.add(fas);

export default function Recipe() {
	const [name, setName] = useState("");
	const [ingredient, setIngredient] = useState("");
	const [ingredients, setIngredients] = useState([]);

	useEffect(() => {
		setIngredient("");
	}, [ingredients]);

	function addIngredient() {
		setIngredients((prevIng) => [...prevIng, { name: ingredient }]);
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
					<button className="btn btn-primary">Submit</button>
				</div>
			</div>
		</div>
	);
}
