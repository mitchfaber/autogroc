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
	library.add(far);
	library.add(fas);

	function getPlan() {
		fetch(`http://localhost:8080/plan/${id}`)
			.then((res) => res.json())
			.then((result) => {
				console.log(result);
				setIngredients(result.ingredients);
				setLoading(false);
			});
	}

	useEffect(() => {
		getPlan();
	}, []);
	if (loading === false) {
		return (
			<div className="container">
				<div className="row">
					<table>
						<tbody>
							{ingredients.map((ing) => {
								return (
									<tr key={uuidv4()}>
										<td>
											<button class="btn">
												<FontAwesomeIcon icon={["far", "circle"]} />
											</button>
										</td>
										<td>{ing.name}</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
		);
	} else {
		return <div className="container">Loading...</div>;
	}
}
