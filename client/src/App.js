import Navbar from "./Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./Homepage";
import Plan from "./Plan";
import Recipes from "./Recipes";
import Recipe from "./Recipe";
import CheckList from "./CheckList";

function App() {
	return (
		<div>
			<Router>
				<Navbar />
				<Routes>
					<Route path="/" element={<Homepage />} />
					<Route path="/create-list" element={<Plan />} />
					<Route path="/plan/:id" element={<Plan />} />
					<Route path="/plan/:id/view" element={<Plan />} />
					<Route path="/plan/:id/check" element={<CheckList />} />
					<Route path="/recipes" element={<Recipes />} />
					<Route path="/recipes/:name" element={<Recipe />} />
					<Route path="/recipes/new" element={<Recipe />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
