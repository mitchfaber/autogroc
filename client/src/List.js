import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import IngredientTable from "./IngredientTable";
import { v4 as uuidv4 } from "uuid";

// This exports the whole icon packs for Brand and Solid.
library.add(fas);

export default function List() {
	const [selectedRecID, setSelectedRecID] = useState("nothing");
	const [selectedRecText, setselectedRecText] = useState("nothing");
	const [ingredients, setIngredients] = useState([]);
	const [recipes, setRecipes] = useState([]);
	const [recNames, setRecNames] = useState([]);
	const [input, setInput] = useState("");
	const [plan, setPlan] = useState({});
	const [startDate, setStartDate] = useState();
	const [endDate, setEndDate] = useState();

	useEffect(() => {
		getRecipes();
	}, []);

	function changedRec(e) {
		setSelectedRecID(e.target.value);
		if (e.target.value !== "nothing") {
			setselectedRecText(e.target.value);
		} else {
			console.log(e);
			setselectedRecText("nothing");
		}
	}

	function createPlan() {
		setPlan({
			author: "Mitch Faber",
			startDate: startDate,
			endDate: endDate,
			recipes: recipes,
			ingredients: ingredients,
		});
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(plan),
		};
		fetch("http://localhost:8080/plan/add", requestOptions).then((res) => {
			console.log(res);
		});
	}

	function removeIngredient(ingName) {
		setIngredients(ingredients.filter((ingredient) => ingredient.ingName !== ingName));
	}

	function addIngredient(newIng) {
		setIngredients((prevIng) => [...prevIng, { ingName: newIng }]);
		setInput("");
	}

	function getRecipes() {
		fetch("http://localhost:8080/recipe", { method: "GET" })
			.then((res) => res.json())
			.then((results) => {
				results.map((rec) => {
					console.log(rec.name);
					setRecNames((prevRecNames) => [...prevRecNames, { name: rec.name }]);
				});
			});
	}

	function getIngredients() {}

	function addRecipe() {
		console.log(selectedRecText);
		fetch("http://localhost:8080/recipe/" + selectedRecText, { method: "GET" })
			.then((res) => res.json())
			.then((results) => {
				setRecipes((prevRec) => [
					...prevRec,
					{
						name: results.name,
						ingredients: results.ingredients,
					},
				]);
				setRecNames(recNames.filter((recName) => recName.name !== results.name));
				// console.log(recNames);
			});
	}

	function removeRecipe(recName) {
		setRecipes(recipes.filter((recipe) => recipe.name !== recName));
		setRecNames((prevName) => [...prevName, { name: recName }]);
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
							{recNames.map((e) => {
								return (
									<option key={uuidv4()} value={e.name}>
										{e.name}
									</option>
								);
							})}
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
									<tr key={uuidv4()}>
										<td>{e.name}</td>
										<td>
											<button onClick={() => removeRecipe(e.name)} className="btn btn-link text-danger">
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
								<button onClick={() => addIngredient(input)} className="btn btn-link text-secondary">
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
					<div className="mb-3 row">
						<div className="col">
							<label>Start date</label>
							<input
								className="form-control"
								value={startDate}
								onInput={(e) => setStartDate(e.target.value)}
								type="date"
							/>
						</div>
						<div className="col">
							<label>End date</label>
							<input
								className="form-control"
								value={endDate}
								onInput={(e) => setEndDate(e.target.value)}
								type="date"
							/>
						</div>
					</div>
					<button onClick={createPlan} className="mb-3 btn btn-primary" type="submit">
						Submit
					</button>
				</div>
			</div>
		</div>
	);
}
