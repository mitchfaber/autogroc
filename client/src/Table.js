import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";

library.add(fas);
export default function Table({ ingredients, removeIngredient }) {
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
					console.log(e);
					return (
						<tr key={uuidv4()}>
							<td>{e.ingName}</td>
							<td>{e.recName}</td>
							<td>
								<button onClick={() => removeIngredient(e.ingName)} className="btn btn-link text-danger">
									<FontAwesomeIcon icon={["fas", "minus-circle"]} />
								</button>
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}
