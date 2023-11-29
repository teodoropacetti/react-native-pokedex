import { Pokemon } from "../interfaces/Pokemon";
import { useRoute } from "@react-navigation/native";
import { Box, Heading, Image } from "@gluestack-ui/themed";
import { StyleSheet } from "react-native";
import { useEffect, useState } from "react";

const pokemonImageBaseURL =
	"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

export default function PokemonDetails(pokemon: Pokemon) {
	const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
	const route = useRoute();
	const basicPokemonInfo = route.params["pokemon"];
	const formattedNumber = ("00" + basicPokemonInfo["id"]).slice(-3);

	// Get the pokemon's data from the basicPokemonInfo url field
	const pokemonURL =
		"https://pokeapi.co/api/v2/pokemon/" + basicPokemonInfo["name"];

	const fetchPokemonData = async () => {
		try {
			//console.log("Here");
			const res = await fetch(pokemonURL);
			const data = await res.json();
			setPokemonData(data);
			//console.log(data); // Log the data directly
		} catch (error) {
			console.error("Error fetching Pokemon data:", error);
		}
	};

	useEffect(() => {
		fetchPokemonData();
	}, []);

	console.log(pokemonData);

	return (
		<Box alignItems="center">
			{/* Display pokemon's name with the first letter uppercased*/}
			<Heading style={styles.nameStyle}>
				{basicPokemonInfo.name.at(0)?.toUpperCase() +
					basicPokemonInfo.name.slice(1)}
			</Heading>
			{/* Display pokemon's id */}
			<Heading style={styles.idStyle}>{"#" + formattedNumber}</Heading>

			{/* Display pokemon's image */}
			<Image
				source={{
					uri: pokemonImageBaseURL + basicPokemonInfo["id"] + ".png",
				}}
				alt={basicPokemonInfo["name"]}
				width={250}
				height={250}
			/>
		</Box>
	);
}

const styles = StyleSheet.create({
	nameStyle: {
		fontSize: 30,
		paddingTop: 50,
	},
	idStyle: {
		fontSize: 20,
		paddingTop: 10,
	},
});
