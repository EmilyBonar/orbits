import React from "react";
import "./App.css";

function App() {
	const size = 400;
	return (
		<div className="flex flex-row w-screen h-screen bg-indigo-900">
			<div className="grid flex-1 place-items-center">
				<div className="" style={{ width: size, height: size }}>
					<Path />
					<Orbiter size={size} />
				</div>
			</div>
			<div className="h-full bg-white w-96"></div>
		</div>
	);
}

export default App;

function Path() {
	return (
		<div className="w-full h-full col-span-1 row-span-1 border-white rounded-full border-40"></div>
	);
}

function Orbiter(props: { size: number }) {
	return (
		<div
			className="relative w-full h-full col-span-1 row-span-1"
			style={{
				top: `-${props.size}px`,
				animation: "reverse-orbit 2s linear infinite",
			}}
		>
			<div
				className="relative w-8 h-8 origin-center bg-black rounded-full top-1"
				style={{ left: `${props.size / 2 - 32 / 2}px` }}
			></div>
		</div>
	);
}
