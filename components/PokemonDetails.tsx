import { useRoute } from "@react-navigation/native";
import { Box, Heading, Image, Text } from "@gluestack-ui/themed";
import { StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import PokemonTypes from "./PokemonTypes";
import {
	GestureHandlerRootView,
	ScrollView,
} from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { adjustSaturation } from "../helpers/AdjustSaturation";
import { typeColors } from "../constants/TypeColors";
import { styles } from "../constants/Styles";

const pokemonImageBaseURL =
	"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

export default function PokemonDetails() {
	const [pokemonData, setPokemonData] = useState<string[]>([]);
	const route = useRoute();
	const [gradientColors, setGradientColors] = useState([
		"#00FF00",
		"#FF00FF",
	]);

	const basicPokemonInfo = route.params["pokemon"];
	const formattedNumber = ("00" + basicPokemonInfo["id"]).slice(-3);

	// Get the pokemon's data from the basicPokemonInfo url field
	const pokemonURL =
		"https://pokeapi.co/api/v2/pokemon/" + basicPokemonInfo["name"];

	const fetchPokemonData = async () => {
		try {
			const res = await fetch(pokemonURL);
			const data = await res.json();
			setPokemonData(data);
		} catch (error) {
			console.error("Error fetching Pokemon data:", error);
		}
	};

	useEffect(() => {
		fetchPokemonData();
	}, []);

	// Pick two colors associated with the pokemon's types, set them in state gradientColors, and use them to create a gradient background
	useEffect(() => {
		let types = [];
		console.log(pokemonData["types"]);
		if (pokemonData["types"]) {
			types = pokemonData["types"].map((type: any) => type.type.name);
		}
		console.log(types);

		// If there's only one type, pick two variations of that color for the gradient
		let colors;
		if (types.length === 1) {
			const baseColor = typeColors[types[0]] || "#000000";
			// Adjust saturation for the first color
			const color1 = adjustSaturation(baseColor, 0.6);
			// Adjust saturation for the second color
			const color2 = adjustSaturation(baseColor, 0.2);

			colors = [color1, color2];
		} else {
			// If there are multiple types, use the regular logic to get colors
			colors = types.map((type: string) => typeColors[type]);
		}

		// Now, you can set the gradient colors using the 'colors' array
		setGradientColors(colors);
	}, [pokemonData]);

	// Helper function to adjust saturation

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<ScrollView>
				<LinearGradient
					colors={gradientColors} // Specify your gradient colors
					style={{ flex: 1 }}>
					<Box alignItems="center">
						{/* Display pokemon's name with the first letter uppercased*/}
						<Heading style={styles.nameStyle}>
							{basicPokemonInfo.name.at(0)?.toUpperCase() +
								basicPokemonInfo.name.slice(1)}
						</Heading>
						{/* Display pokemon's id */}
						<Heading style={styles.idStyle}>
							{"#" + formattedNumber}
						</Heading>

						{/* Display pokemon's image */}
						<Image
							source={{
								uri:
									pokemonImageBaseURL +
									basicPokemonInfo["id"] +
									".png",
							}}
							alt={basicPokemonInfo["name"]}
							width={250}
							height={250}
						/>
						<Box
							style={{
								flexDirection: "row",
							}}>
							<PokemonTypes {...basicPokemonInfo} />
						</Box>
						<Box
							style={{
								flexDirection: "column", // Use flexDirection: 'row' to make children (the two boxes) side by side
								justifyContent: "space-between", // Align the two boxes to each end of the container
								width: "90%", // Adjust the width as needed
							}}>
							{/* First Box */}
							<Box
								style={{
									flexDirection: "column",
									alignItems: "center",
									borderRadius: 10,
									borderWidth: 0,
									backgroundColor: "#6785b5",
									paddingHorizontal: 20,
									marginVertical: 10,
								}}>
								<Text
									style={{
										fontSize: 20,
										paddingVertical: 10,
										color: "white",
									}}>
									Height: {pokemonData["height"] / 10} m
								</Text>
								<Text
									style={{
										fontSize: 20,
										paddingVertical: 10,
										color: "white",
									}}>
									Weight: {pokemonData["weight"] / 10} kg
								</Text>
								<Text
									style={{
										fontSize: 20,
										paddingVertical: 10,
										color: "white",
									}}>
									Base Experience:{" "}
									{pokemonData["base_experience"]}
								</Text>
								<Text
									style={{
										fontSize: 20,
										paddingVertical: 10,
										color: "white",
									}}>
									Abilities:{" "}
									{pokemonData["abilities"] &&
										pokemonData["abilities"]
											.map(
												(ability: any) =>
													ability.ability.name
											)
											.join(", ")}
								</Text>
							</Box>

							{/* Second Box */}
							<Box
								style={{
									flexDirection: "column",
									alignItems: "center",
									borderRadius: 10,
									borderWidth: 0,
									backgroundColor: "#6785b5",
									paddingHorizontal: 20,
									marginVertical: 10,
								}}>
								<Text
									style={{
										fontSize: 20,
										paddingVertical: 10,
										color: "white",
									}}>
									Base stats:
								</Text>
								{pokemonData["stats"] &&
									pokemonData["stats"].map((stat: any) => (
										<Text
											style={{
												fontSize: 20,
												paddingVertical: 10,
												color: "white",
											}}
											key={stat.stat.name}>
											{stat.stat.name
												.at(0)
												?.toUpperCase() +
												stat.stat.name.slice(1) +
												": " +
												stat.base_stat}
										</Text>
									))}
							</Box>
						</Box>
					</Box>
				</LinearGradient>
			</ScrollView>
		</GestureHandlerRootView>
	);
}
