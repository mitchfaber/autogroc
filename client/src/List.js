import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import DateRange from "./DateRange";
import Table from "./Table";

// This exports the whole icon packs for Brand and Solid.
library.add(fas);

export default function List() {
	const [selectedRecID, setSelectedRecID] = useState("nothing");
	const [selectedRecText, setselectedRecText] = useState("nothing");
	const [ingredients, setIngredients] = useState([{ recName: "Butter Chicken", ingName: "Chicken" }]);
	const [input, setInput] = useState("");

	function changedRec(e) {
		setSelectedRecID(e.target.value);
		if (e.target.value !== "nothing") {
			setselectedRecText(e.target[e.target.value].text);
		} else {
			setselectedRecText("nothing");
		}
	}

	function removeIngredient(ingName) {
		setIngredients([
			(prevIng) => {
				prevIng.find((ing) => {
					ing.ingName = ingName;
					console.log(ing);
				});
			},
		]);
	}

	function addIngredient() {
		setInput("");
	}

	function addRecipe() {
		console.log(selectedRecText);
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
							<option value="nothing">Select a recipe to add</option>
							<option value="1">Chicken and Potatoes</option>
							<option value="2">Tacos</option>
							<option value="3">Chicken Alfredo</option>
							<option value="4">Butter Chicken</option>
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
							<tr>
								<td>Butter Chicken</td>
								<td>
									<button href="#" className="btn btn-link text-danger">
										<FontAwesomeIcon icon={["fas", "minus-circle"]} />
									</button>
								</td>
								<td>
									<input className="form-control" type="text" />
								</td>
							</tr>
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
						<Table ingredients={ingredients} removeIngredient={removeIngredient}></Table>
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
