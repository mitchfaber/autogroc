import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlaneArrival, fas } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

library.add(fas);

export default function Homepage() {
	const [loading, setLoading] = useState(false);
	const [plans, setPlans] = useState();
	let id;
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
				<div
					className="modal fade"
					id="alertModal"
					tabIndex="-1"
					role="dialog"
					aria-labelledby="alertModalLabel"
					aria-hidden="true">
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title" id="alertModalLabel">
									Delete Meal plan?
								</h5>
								<button type="button" className="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div className="modal-body">Are you sure you would like to delete the incomplete plan?</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-secondary" data-dismiss="modal">
									Close
								</button>
								<button
									type="button"
									onClick={() => deletePlan(id)}
									data-dismiss="modal"
									className="btn btn-danger">
									Delete
								</button>
							</div>
						</div>
					</div>
				</div>
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
														{plan.complete && (
															<FontAwesomeIcon
																className="text-success"
																icon={["fas", "square-check"]}
																size="xl"
															/>
														)}
													</td>
													<td>
														{plan.startDate} - {plan.endDate}
													</td>
													<td>
														<Link className="btn btn-primary" to={`/plan/${plan._id}/check`}>
															<FontAwesomeIcon icon={["fas", "list-check"]} />
														</Link>
													</td>
													<td>
														<Link className="btn btn-warning" to={`/plan/${plan._id}/edit`}>
															<FontAwesomeIcon icon={["fas", "pen-to-square"]} />
														</Link>
													</td>
													<td>
														{plan.complete ? (
															<button
																className="btn btn-danger"
																onClick={() => deletePlan(plan._id)}>
																<FontAwesomeIcon icon={["fas", "trash"]} />
															</button>
														) : (
															<button
																data-toggle="modal"
																data-target="#alertModal"
																className="btn btn-danger"
																onClick={() => (id = plan._id)}>
																<FontAwesomeIcon icon={["fas", "trash"]} />
															</button>
														)}
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
