import React, { useState } from "react";
import { Link } from "react-router-dom";
export default function Navbar() {
	const [activePage, setActivePage] = useState();
	function changePage(e) {
		setActivePage(e.target.id);
	}
	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
			<div className="container">
				<Link id="home" to="/" onClick={changePage} className="navbar-brand">
					Auto groc
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarText"
					aria-controls="navbarText"
					aria-expanded="false"
					aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarText">
					<ul className="navbar-nav mr-auto">
						<li className="nav-item">
							<Link
								id="create-list"
								to="/create-list"
								className={activePage === "create-list" ? "nav-link active" : "nav-link"}
								onClick={changePage}>
								Create List
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}
