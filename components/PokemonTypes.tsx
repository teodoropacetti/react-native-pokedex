import { Badge, Box, set } from "@gluestack-ui/themed";
import { Pokemon } from "../interfaces/Pokemon";
import { StyleSheet, Text } from "react-native";
import { useState } from "react";

export default function PokemonTypes(pokemon: Pokemon) {
	const typeColors: { [key: string]: string } = {
		normal: "#A8A77A",
		fire: "#EE8130",
		water: "#6390F0",
		electric: "#F7D02C",
		grass: "#7AC74C",
		ice: "#96D9D6",
		fighting: "#C22E28",
		poison: "#A33EA1",
		ground: "#E2BF65",
		flying: "#A98FF3",
		psychic: "#F95587",
		bug: "#A6B91A",
		rock: "#B6A136",
		ghost: "#735797",
		dragon: "#6F35FC",
		dark: "#705746",
		steel: "#B7B7CE",
		fairy: "#D685AD",
	};
	const [pokemonTypes, setPokemonTypes] = useState<string[]>([]);
	const fetchPokemonTypes = async () => {
		const res = await fetch(pokemon.url);
		const data = await res.json();
		const types = data.types.map((type: any) => type.type.name);
		setPokemonTypes(types);
		//console.log(pokemonTypes);
	};
	fetchPokemonTypes();
	return (
		<Box style={{ flexDirection: "row" }}>
			{pokemonTypes.map((type, index) => (
				<Badge
					style={[
						styles.typeBadge,
						{ backgroundColor: typeColors[type] || "gray" },
					]}
					key={index}>
					<Text style={styles.typeFont}>
						{type.at(0)?.toUpperCase() + type.slice(1)}
					</Text>
				</Badge>
			))}
		</Box>
	);
}

const styles = StyleSheet.create({
	typeBadge: {
		backgroundColor: "#9AF0FF",
		borderRadius: 10,
		marginRight: 3,
		marginTop: 5,
		justifyContent: "center",
		alignItems: "center",
	},
	typeFont: {
		fontSize: 20,
		color: "white",
		padding: 3,
	},
});
