import React, { useState } from "react";
import "./App.css";
import clockwiseIcon from "./clockwise.svg";
import counterclockwiseIcon from "./counter-clockwise.svg";

interface OrbitDetails {
	period: number;
	direction: "clockwise" | "counter-clockwise";
}

class DefaultOrbit implements OrbitDetails {
	period = 2;
	direction: "clockwise" | "counter-clockwise" = "clockwise";
}

function App() {
	const size = 500;
	const [orbits, setOrbits] = useState<OrbitDetails[]>([new DefaultOrbit()]);
	return (
		<div className="flex flex-row w-screen h-screen overflow-hidden bg-indigo-900">
			<div className="grid flex-1 place-items-center">
				<div className="" style={{ width: size, height: size }}>
					<Path />
					{orbits.map((orbit, index) => (
						<Orbiter
							key={index}
							size={size}
							direction={orbit.direction}
							period={orbit.period}
							index={index}
						/>
					))}
				</div>
			</div>
			<div className="flex flex-col items-center h-full gap-4 overflow-scroll bg-white w-96">
				{orbits.map((orbit, index) => (
					<OrbitController
						key={index}
						changeFrequency={(frequency: number) => {
							let localOrbits = orbits;
							localOrbits[index].period = 1 / frequency;
							setOrbits([...localOrbits]);
						}}
						changeDirection={(direction: "clockwise" | "counter-clockwise") => {
							let localOrbits = orbits;
							localOrbits[index].direction = direction;
							setOrbits([...localOrbits]);
						}}
						index={index}
					/>
				))}
				<AddButton
					addOrbiter={() => {
						setOrbits([...orbits, new DefaultOrbit()]);
					}}
				/>
			</div>
		</div>
	);
}

export default App;

function Path() {
	return (
		<div className="w-full h-full col-span-1 row-span-1 border-white rounded-full border-40"></div>
	);
}

function Orbiter(props: {
	size: number;
	direction: "clockwise" | "counter-clockwise";
	period: number;
	index: number;
}) {
	const colors = [
		"bg-gray-600",
		"bg-red-600",
		"bg-yellow-600",
		"bg-green-600",
		"bg-blue-600",
		"bg-indigo-600",
		"bg-purple-600",
		"bg-pink-600",
	];
	let color = colors[Math.floor(Math.random() * colors.length)];
	return (
		<div
			className="relative w-full h-full col-span-1 row-span-1"
			style={{
				top: `-${props.size * (props.index + 1)}px`,
				animation: `${props.direction} ${props.period}s linear infinite`,
			}}
		>
			<div
				className={`relative w-8 h-8 origin-center ${color} rounded-full top-1`}
				style={{ left: `${props.size / 2 - 32 / 2}px` }}
			></div>
		</div>
	);
}

function OrbitController(props: {
	changeFrequency: Function;
	changeDirection: Function;
	index: number;
}) {
	return (
		<div className="p-4">
			<input
				type="range"
				id="frequency"
				min={0.1}
				max={2}
				step={0.1}
				onChange={(e) => props.changeFrequency(e.target.value)}
				defaultValue={0.5}
			></input>
			<label htmlFor="frequency">frequency</label>
			<fieldset
				className="flex flex-row"
				onChange={(e) =>
					props.changeDirection((e.target as HTMLInputElement).value)
				}
			>
				<legend>Choose direction</legend>
				<input
					type="radio"
					id={`direction-clockwise-${props.index}`}
					name={`direction-${props.index}`}
					value="clockwise"
					defaultChecked
				></input>
				<label htmlFor={`direction-clockwise-${props.index}`}>
					<img className="w-12" src={clockwiseIcon}></img>
				</label>
				<input
					type="radio"
					id={`direction-counter-clockwise-${props.index}`}
					name={`direction-${props.index}`}
					value="counter-clockwise"
				></input>
				<label htmlFor={`direction-counter-clockwise-${props.index}`}>
					<img className="w-12" src={counterclockwiseIcon}></img>
				</label>
			</fieldset>
		</div>
	);
}

function AddButton(props: { addOrbiter: Function }) {
	return <button onClick={() => props.addOrbiter()}>Add Orbiter</button>;
}
