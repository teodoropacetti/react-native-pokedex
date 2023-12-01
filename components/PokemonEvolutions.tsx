import { useEffect } from "react";
import { Text, View } from "react-native";

const pokemonSpeciesURL = "https://pokeapi.co/api/v2/pokemon-species/";

export default function PokemonEvolutions(pokemonData: string[]) {
	// Get the pokemon species from pokemonSpeciesURL + pokemonData['name']
	// Get the url of the evolution chain from the pokemon species
	// Get the evolution chain from the url

	console.log(pokemonData);

	const fetchEvolutionChain = async () => {
		try {
			const res = await fetch(pokemonSpeciesURL + pokemonData["name"]);
			const data = await res.json();
			const evolutionChainURL = data["evolution-chain"]["url"];
			const res2 = await fetch(evolutionChainURL);
			const data2 = await res2.json();
			console.log(data2);
		} catch (error) {
			console.error("Error fetching evolution chain:", error);
		}
	};
	useEffect(() => {
		fetchEvolutionChain();
	}, []);

	return (
		<View>
			<Text>Evolution</Text>
		</View>
	);
}
