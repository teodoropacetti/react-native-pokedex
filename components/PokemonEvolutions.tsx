import { Box } from "@gluestack-ui/themed";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

const pokemonSpeciesURL = "https://pokeapi.co/api/v2/pokemon-species/";

export default function PokemonEvolutions(pokemonData: string[]) {
	// Get the pokemon species from pokemonSpeciesURL + pokemonData['name']
	// Get the url of the evolution chain from the pokemon species
	// Get the evolution chain from the url

	const [evolutionChain, setEvolutionChain] = useState<string[]>([]);

	const fetchEvolutionChain = async () => {
		try {
			const res = await fetch(
				pokemonSpeciesURL + pokemonData["forms"].at(0)["name"]
			);
			const data = await res.json();
			const evolutionChainURL = data["evolution_chain"]["url"];
			const res2 = await fetch(evolutionChainURL);
			const data2 = await res2.json();
			setEvolutionChain(data2);
		} catch (error) {
			console.error("Error fetching evolution chain:", error);
		}
	};
	useEffect(() => {
		fetchEvolutionChain();
	}, []);

	return (
		<Box>
			<Text>Evolution Chain:</Text>
			{evolutionChain ? (
				<Text>{JSON.stringify(evolutionChain)}</Text>
			) : (
				<Text>Loading evolution chain...</Text>
			)}
		</Box>
	);
}
