import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

// This exports the whole icon packs for Brand and Solid.
library.add(fas);

export default function List() {
	const [selectedRec, setSelectedRec] = useState();
	function changedRec(e) {
		setSelectedRec(e.target.value);
	}
	return (
		<div className="container">
			<div className="row">
				<div className="col-sm">
					<div className="mt-3 mb-3 input-group">
						<select
							onChange={changedRec}
							value={selectedRec}
							className="btn btn-outline-secondary "
							aria-label="Default select example">
							<option value="1">One</option>
							<option value="2">Two</option>
							<option value="3">Three</option>
						</select>
						<div className="input-gorup append">
							<span className="input-group-text">
								<a href="#" className=" text-secondary">
									<FontAwesomeIcon icon={["fas", "plus"]} />
								</a>
							</span>
						</div>
					</div>
				</div>
				<div className="col-sm">
					<form>
						<div className="mt-3 mb-3 input-group">
							<input className="form-control" type="text" />
							<div className="input-group-append">
								<span className="input-group-text">
									<a href="#" className=" text-secondary">
										<FontAwesomeIcon icon={["fas", "plus"]} />
									</a>
								</span>
							</div>
						</div>
					</form>
					<table className="table">
						<thead>
							<tr>
								<th scope="col">Item Name</th>
								<th scope="col">Recipe</th>
								<th scope="col">Remove</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Chicken</td>
								<td>Butter Chicken</td>
								<td>
									<a href="#" className="text-danger">
										<FontAwesomeIcon icon={["fas", "minus-circle"]} />
									</a>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
