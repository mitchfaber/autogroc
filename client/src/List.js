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
				<div className="col-2 mt-3 mb-3 input-group">
					<select
						onChange={changedRec}
						value={selectedRec}
						className="btn btn-outline-secondary "
						aria-label="Default select example">
						<option value="1">One</option>
						<option value="2">Two</option>
						<option value="3">Three</option>
					</select>
				</div>
			</div>
			<div className="row">
				<div className="col-lg-3">
					<form>
						<textarea className="form-control" rows="15" placeholder="Enter items separated by commas"></textarea>
					</form>
				</div>
				<div className="col-lg-6">
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
