import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";

library.add(fas);
export default function IngredientTable({ ingredients, removeIngredient, recipes }) {
	return (
		<table className="table">
			<thead>
				<tr>
					<th scope="col">Item Name</th>
					<th scope="col">Recipe</th>
					<th scope="col">Remove</th>
				</tr>
			</thead>
			<tbody>
				{ingredients.map((e) => {
					return (
						<tr key={uuidv4()}>
							<td>{e.name}</td>
							<td></td>
							<td>
								<button onClick={() => removeIngredient(e.name)} className="btn btn-link text-danger">
									<FontAwesomeIcon icon={["fas", "minus-circle"]} />
								</button>
							</td>
						</tr>
					);
				})}
				{recipes.map((e) => {
					console.log(e.ingredients);
					return e.ingredients.map((i) => {
						console.log(ingredients);
						return (
							<tr key={uuidv4()}>
								<td>{i.name}</td>
								<td>{e.name}</td>
								<td></td>
							</tr>
						);
					});
				})}
			</tbody>
		</table>
	);
}
