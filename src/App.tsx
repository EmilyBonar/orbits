import React from "react";
import "./App.css";

function App() {
	return (
		<div className="flex flex-row w-screen h-screen bg-indigo-900">
			<div className="grid flex-1 place-items-center">
				<Path />
			</div>
			<div className="h-full bg-white w-96"></div>
		</div>
	);
}

export default App;

function Path() {
	const size = "700px";
	return (
		<div
			className="max-h-full border-white rounded-full border-40"
			style={{ width: size, height: size }}
		></div>
	);
}
