import React, { useState } from "react";
import { Link } from "react-router-dom";
export default function Navbar() {
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-primary">
			<div className="container">
				<Link to="/" className="navbar-brand">
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
						<li className="nav-item nav-link">
							<Link to="/create-list">Create List</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}
