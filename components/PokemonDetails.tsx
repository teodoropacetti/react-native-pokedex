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
import PokemonBaseInfo from "./PokemonBaseInfo";
import PokemonStats from "./PokemonStats";
import PokemonFrontSprite from "./PokemonFrontSprite";

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
						<PokemonFrontSprite {...basicPokemonInfo} />
						<Box
							style={{
								flexDirection: "row",
								paddingVertical: 10,
							}}>
							<PokemonTypes {...basicPokemonInfo} />
						</Box>
						<Box
							style={{
								flexDirection: "column",
								justifyContent: "space-between",
								width: "100%",
								backgroundColor: "#6785b5",
								borderTopEndRadius: 40,
								borderTopStartRadius: 40,
								marginTop: 10,
							}}>
							{/* First Box */}
							<PokemonBaseInfo {...pokemonData} />

							{/* Second Box */}
							<PokemonStats {...pokemonData} />
						</Box>
					</Box>
				</LinearGradient>
			</ScrollView>
		</GestureHandlerRootView>
	);
}
