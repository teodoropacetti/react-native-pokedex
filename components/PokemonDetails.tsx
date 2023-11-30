import { useRoute } from "@react-navigation/native";
import { Box, Heading, Image, Text } from "@gluestack-ui/themed";
import { useEffect, useState } from "react";
import PokemonTypes from "./PokemonTypes";
import {
	GestureHandlerRootView,
	ScrollView,
} from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "../constants/Styles";
import usePokemonGradientColors from "../helpers/UsePokemonGradientColors";

const pokemonImageBaseURL =
	"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

export default function PokemonDetails() {
	const [pokemonData, setPokemonData] = useState<string[]>([]);
	const route = useRoute();

	const basicPokemonInfo = route.params["pokemon"];
	const formattedNumber = ("00" + basicPokemonInfo["id"]).slice(-3);

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

	const gradientColors = usePokemonGradientColors(pokemonData);

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<ScrollView>
				<LinearGradient colors={gradientColors} style={{ flex: 1 }}>
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
