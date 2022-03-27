import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import DateRange from "./DateRange";
import IngredientTable from "./IngredientTable";
import { v4 as uuidv4 } from "uuid";

// This exports the whole icon packs for Brand and Solid.
library.add(fas);

export default function List() {
	const [selectedRecID, setSelectedRecID] = useState("nothing");
	const [selectedRecText, setselectedRecText] = useState("nothing");
	const [ingredients, setIngredients] = useState([{ ingName: "Monsters" }, { ingName: "Formula" }]);
	const [recipes, setRecipes] = useState([]);
	const [input, setInput] = useState("");

	function changedRec(e) {
		setSelectedRecID(e.target.value);
		if (e.target.value !== "nothing") {
			setselectedRecText(e.target.value);
		} else {
			console.log(e);
			setselectedRecText("nothing");
		}
	}

	function removeIngredient(ingName) {
		setIngredients(ingredients.filter((ingredient) => ingredient.ingName !== ingName));
	}

	function addIngredient() {
		setIngredients((prevIng) => [...prevIng, { ingName: input }]);
		setInput("");
	}

	function getRecipes() {}

	function getIngredients() {}

	function addRecipe() {
		setRecipes((prevRec) => [
			...prevRec,
			{
				recName: "Butter Chicken",
				ingredients: ["Chicken", "Chili Powder"],
			},
		]);
		console.log(selectedRecText);
	}

	function removeRecipe(recName) {
		setRecipes(recipes.filter((recipe) => recipe.recName !== recName));
	}

	return (
		<div className="container">
			<div className="row">
				<div className="col-12 col-md-6">
					<div className="mt-3 mb-3 input-group">
						<select
							onChange={changedRec}
							value={selectedRecID}
							className="btn btn-outline-secondary "
							aria-label="Default select example">
							<option value="nothing">Select a recipe</option>
							<option value="Butter Chicken">Butter Chicken</option>
							{/* {recipes.map((e) => {
								return (
									<option key={uuidv4} value={e.recName}>
										{e.recName}
									</option>
								);
							})} */}
						</select>
						<div className="input-gorup append">
							<span className="input-group-text">
								<button onClick={addRecipe} className="btn btn-link text-secondary">
									<FontAwesomeIcon icon={["fas", "plus"]} />
								</button>
							</span>
						</div>
					</div>

					<table className="table">
						<thead>
							<tr>
								<th scope="col">Recipe</th>
								<th scope="col">Remove</th>
								<th scope="col">Notes</th>
							</tr>
						</thead>
						<tbody>
							{recipes.map((e) => {
								return (
									<tr key={uuidv4}>
										<td>{e.recName}</td>
										<td>
											<button onClick={() => removeRecipe(e.recName)} className="btn btn-link text-danger">
												<FontAwesomeIcon icon={["fas", "minus-circle"]} />
											</button>
										</td>
										<td>
											<input className="form-control" type="text" />
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
				<div className="col-12 col-md-6">
					<div className="mt-3 mb-3 input-group">
						<input className="form-control" type="text" value={input} onInput={(e) => setInput(e.target.value)} />
						<div className="input-group-append">
							<span className="input-group-text">
								<button onClick={addIngredient} className="btn btn-link text-secondary">
									<FontAwesomeIcon icon={["fas", "plus"]} />
								</button>
							</span>
						</div>
					</div>
					<div style={{ overflow: "auto", height: "500px" }}>
						<IngredientTable
							recipes={recipes}
							ingredients={ingredients}
							removeIngredient={removeIngredient}></IngredientTable>
					</div>
					<DateRange></DateRange>
					<button className="mb-3 btn btn-primary" type="submit">
						Submit
					</button>
				</div>
			</div>
		</div>
	);
}
