import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

library.add(fas);

export default function Recipes() {
	const [loading, setLoading] = useState(false);
	const [recipes, setRecipes] = useState([]);
	useEffect(() => {
		getRecipes();
	}, []);

	function getRecipes() {
		setLoading(true);
		fetch("http://localhost:8080/recipe")
			.then((res) => res.json())
			.then((results) => {
				setRecipes(results);
				setLoading(false);
			});
	}

	function deleteRecipe(name) {
		fetch(`http://localhost:8080/recipe/delete/${name}`, { method: "DELETE" })
			.then((res) => res.json())
			.then((results) => {
				getRecipes();
			});
	}

	if (loading) {
		return <div className="container">Loading...</div>;
	} else {
		return (
			<div className="container">
				<div className="row">
					<div className="col-4">
						<table className="table">
							<thead>
								<tr>
									<th>Name</th>
									<th>Edit</th>
									<th>Delete</th>
								</tr>
							</thead>
							<tbody>
								{recipes.map((recipe) => {
									return (
										<tr key={uuidv4()}>
											<td>{recipe.name}</td>
											<td>
												<Link className="btn" to={`/recipes/${recipe.name}`}>
													<FontAwesomeIcon icon={["fas", "pen-to-square"]} />
												</Link>
											</td>
											<td>
												<button onClick={() => deleteRecipe(recipe.name)} className="btn btn-danger">
													<FontAwesomeIcon icon={["fas", "trash"]} />
												</button>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>
				<div className="row">
					<div className="col-2">
						<Link to="/recipes/new" className="btn btn-primary">
							New
						</Link>
					</div>
				</div>
			</div>
		);
	}
}
