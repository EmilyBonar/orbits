import React, { useEffect, useState } from "react";
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
			<div className="flex flex-col items-center h-full gap-4 overflow-scroll bg-white divide-y w-96">
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
		"bg-red-600",
		"bg-yellow-600",
		"bg-green-600",
		"bg-blue-600",
		"bg-indigo-600",
		"bg-purple-600",
		"bg-pink-600",
		"bg-gray-600",
	];
	let color = colors[props.index % colors.length];
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
		<div className="flex flex-col items-center p-2">
			<FrequencySlider
				index={props.index}
				changeFrequency={props.changeFrequency}
			/>
			<fieldset
				className="flex flex-row gap-4"
				onChange={(e) =>
					props.changeDirection((e.target as HTMLInputElement).value)
				}
			>
				<legend>Choose direction</legend>
				<RadioButton direction="clockwise" index={props.index} />
				<RadioButton direction="counter-clockwise" index={props.index} />
			</fieldset>
		</div>
	);
}

function FrequencySlider(props: { index: number; changeFrequency: Function }) {
	const [freq, setFreq] = useState(0.5);
	useEffect(() => props.changeFrequency(freq), [freq]);
	return (
		<div className="flex flex-col m-2 text-center">
			<label htmlFor="frequency">
				<span className="text-2xl">{freq} </span>
				<span className="text-gray-600">rotations/sec</span>
			</label>
			<input
				type="range"
				id="frequency"
				min={0.1}
				max={2}
				step={0.1}
				onChange={(e) => setFreq(e.target.valueAsNumber)}
				defaultValue={0.5}
			></input>
		</div>
	);
}

function RadioButton(props: {
	direction: "clockwise" | "counter-clockwise";
	index: number;
}) {
	return (
		<div>
			<input
				type="radio"
				id={`direction-${props.direction}-${props.index}`}
				name={`direction-${props.index}`}
				value={props.direction}
				defaultChecked={props.direction == "clockwise"}
			></input>
			<label htmlFor={`direction-${props.direction}-${props.index}`}>
				<img
					className="w-12"
					src={
						props.direction == "clockwise"
							? clockwiseIcon
							: counterclockwiseIcon
					}
				></img>
			</label>
		</div>
	);
}

function AddButton(props: { addOrbiter: Function }) {
	return (
		<button
			onClick={() => props.addOrbiter()}
			className="p-3 text-gray-900 bg-blue-100 rounded"
		>
			Add Orbiter
		</button>
	);
}
