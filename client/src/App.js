import Navbar from "./Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./Homepage";
import List from "./List";
import Recipes from "./Recipes";
import Recipe from "./Recipe";
function App() {
	return (
		<div>
			<Router>
				<Navbar />
				<Routes>
					<Route path="/" element={<Homepage />} />
					<Route path="/create-list" element={<List />} />
					<Route path="/plan/:id" element={<List />} />
					<Route path="/recipes" element={<Recipes />} />
					<Route path="/recipes/:name" element={<Recipe />} />
					<Route path="/recipes/new" element={<Recipe />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
