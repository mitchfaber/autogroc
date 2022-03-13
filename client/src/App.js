import Navbar from "./Navbar";
import { BrowserRouter as Router, Switch, Route, Routes, Link } from "react-router-dom";
import Homepage from "./Homepage";
import List from "./List";
function App() {
	return (
		<div>
			<Router>
				<Navbar />
				<Routes>
					<Route path="/" element={<Homepage />} />
				</Routes>
				<Routes>
					<Route path="/create-list" element={<List />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
