import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

library.add(fas);

export default function Homepage() {
	const [loading, setLoading] = useState(false);
	const [plans, setPlans] = useState();
	useEffect(() => {
		getPlans();
	}, []);

	function getPlans() {
		setLoading(true);
		fetch("http://localhost:8080/plan")
			.then((res) => res.json())
			.then((result) => {
				setPlans(result);
				setLoading(false);
			});
	}

	function deletePlan(id) {
		fetch(`http://localhost:8080/plan/delete/${id}`, { method: "DELETE" }).then((res) => {
			getPlans();
		});
	}

	if (loading) {
		return <div className="container">loading</div>;
	} else {
		return (
			<div className="container">
				<div className="row mt-5">
					<div className="col-6">
						<div>
							<table className="table">
								<tbody>
									{plans &&
										plans.map((plan) => {
											return (
												<tr key={uuidv4()}>
													<td>
														{plan.startDate} - {plan.endDate}
													</td>
													<td>
														<Link className="btn btn-success" to={`/plan/${plan._id}/check`}>
															<FontAwesomeIcon icon={["fas", "list-check"]} />
														</Link>
													</td>
													<td>
														<Link className="btn btn-warning" to={`/plan/${plan._id}/edit`}>
															<FontAwesomeIcon icon={["fas", "pen-to-square"]} />
														</Link>
													</td>
													<td>
														<button onClick={() => deletePlan(plan._id)} className="btn btn-danger">
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
				</div>
			</div>
		);
	}
}
