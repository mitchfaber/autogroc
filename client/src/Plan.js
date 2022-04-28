import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import IngredientTable from "./IngredientTable";
import { v4 as uuidv4 } from "uuid";

// This exports the whole icon packs for Solid.
library.add(fas);

export default function Plan() {
	const [selectedRecID, setSelectedRecID] = useState("nothing");
	const [selectedRecText, setselectedRecText] = useState("nothing");
	const [ingredients, setIngredients] = useState([]);
	const [recipes, setRecipes] = useState([]);
	const [recNames, setRecNames] = useState([]);
	const [input, setInput] = useState("");
	const [plan, setPlan] = useState();
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState(false);
	const [errorCode, setErrorCode] = useState("");
	let { id } = useParams();

	useEffect(() => {
		getRecipes();
		if (id !== undefined) {
			getPlan();
		}
	}, []);

	function keyDown(e) {
		if (e.key === "Enter") {
			addIngredient(input);
		}
	}

	function getPlan() {
		fetch(`http://localhost:8080/plan/${id}`)
			.then((res) => res.json())
			.then((result) => {
				setIngredients(result.ingredients);
				setRecipes(result.recipes);
				setStartDate(result.startDate);
				setEndDate(result.endDate);
			});
	}

	useEffect(() => {
		recipes.forEach((recipe) => {
			console.log(recipe.name);
			setRecNames(recNames.filter((recName) => recName.name !== recipe.name));
		});
	}, [recipes]);

	function changedRec(e) {
		setSelectedRecID(e.target.value);
		if (e.target.value !== "nothing") {
			setselectedRecText(e.target.value);
		} else {
			setselectedRecText("nothing");
		}
	}

	useEffect(() => {
		if (plan !== undefined) {
			if (id === undefined) {
				const requestOptions = {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(plan),
				};
				fetch("http://localhost:8080/plan/add", requestOptions).then((res) => {
					if (res.status === 200 || res.status === 201) {
						setSubmitted(true);
						setError(false);
					} else {
						setErrorCode(res.message);
						setSubmitted(false);
						setError(true);
					}
				});
			} else {
				const requestOptions = {
					method: "PATCH",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(plan),
				};
				fetch(`http://localhost:8080/plan/patch/${id}`, requestOptions).then((res) => {
					if (res.status === 200 || res.status === 201) {
						setSubmitted(true);
						setError(false);
					} else {
						setErrorCode(res.message);
						setSubmitted(false);
						setError(true);
					}
				});
			}
		}
	}, [plan]);

	function createPlan() {
		if (startDate === "" || endDate === "") {
			setError(true);
			setErrorCode("Dates missing");
		} else {
			if (recipes.length <= 0 && ingredients.length <= 0) {
				setError(true);
				setErrorCode("Nothing entered for list");
			} else {
				setPlan({
					author: "Mitch Faber",
					startDate: startDate,
					endDate: endDate,
					recipes: recipes,
					ingredients: ingredients,
				});
			}
		}
	}

	function removeIngredient(name) {
		setIngredients(ingredients.filter((ingredient) => ingredient.name !== name));
	}

	function addIngredient(newIng) {
		setIngredients((prevIng) => [...prevIng, { name: newIng }]);
		setInput("");
	}

	function getRecipes() {
		fetch("http://localhost:8080/recipe", { method: "GET" })
			.then((res) => res.json())
			.then((results) => {
				results.forEach((rec) => {
					setRecNames((prevRecNames) => [...prevRecNames, { name: rec.name }]);
				});
			});
	}

	function addRecipe() {
		if (selectedRecText !== "" && selectedRecText !== "Select a recipe" && selectedRecText !== "nothing") {
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
					setselectedRecText("nothing");
				});
		}
	}

	function removeRecipe(recName) {
		setRecipes(recipes.filter((recipe) => recipe.name !== recName));
		setRecNames((prevName) => [...prevName, { name: recName }]);
	}

	return (
		<div className="container">
			<div className="row">
				{submitted && <div className="mt-3 alert alert-success">Plan Saved</div>}
				{error && <div className="mt-3 alert alert-danger">Error submitting plan: {errorCode}</div>}
				<div className="col-12 col-md-6">
					<div className="mt-3 mb-3 input-group">
						<select onChange={changedRec} value={selectedRecID} className="btn btn-outline-secondary ">
							<option value="nothing">Select a recipe</option>
							{recNames.map((e) => {
								return (
									<option key={uuidv4()} value={e.name}>
										{e.name}
									</option>
								);
							})}
						</select>
						<span className="input-group-text">
							<button onClick={addRecipe} className="btn btn-link text-secondary">
								<FontAwesomeIcon icon={["fas", "plus"]} />
							</button>
						</span>
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
						<input
							className="form-control"
							type="text"
							value={input}
							onKeyDown={keyDown}
							onInput={(e) => setInput(e.target.value)}
						/>
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
