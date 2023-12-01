// usePokemonGradientColors.js
import { useState, useEffect } from "react";
import { typeColors } from "../constants/TypeColors";
import { adjustSaturation } from "./AdjustSaturation";

const usePokemonGradientColors = (pokemonData) => {
	const [gradientColors, setGradientColors] = useState([]);

	useEffect(() => {
		let types = [];
		if (pokemonData["types"]) {
			types = pokemonData["types"].map((type) => type.type.name);
		}

		// If there's only one type, pick two variations of that color for the gradient
		let colors: string[] = [];
		if (types.length === 1) {
			const baseColor = typeColors[types[0]] || "#000000";
			// Adjust saturation for the first color
			const color1 = adjustSaturation(baseColor, 0.9);
			// Adjust saturation for the second color
			const color2 = adjustSaturation(baseColor, 0.9);

			colors = [color1, color2];
		} else {
			// If there are multiple types, use the regular logic to get colors
			colors = types.map((type) => typeColors[type]);
		}

		// Now, you can set the gradient colors using the 'colors' array
		setGradientColors(colors);
	}, [pokemonData, typeColors, adjustSaturation]);

	return gradientColors;
};

export default usePokemonGradientColors;
