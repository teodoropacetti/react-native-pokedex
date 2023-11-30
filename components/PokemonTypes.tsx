import { Badge, Box } from "@gluestack-ui/themed";
import { Pokemon } from "../interfaces/Pokemon";
import { Text } from "react-native";
import { useEffect, useState } from "react";
import { typeColors } from "../constants/TypeColors";
import { styles } from "../constants/Styles";

export default function PokemonTypes(pokemon: Pokemon) {
	const [pokemonTypes, setPokemonTypes] = useState<string[]>([]);
	try {
		const fetchPokemonTypes = async () => {
			const res = await fetch(pokemon.url);
			const data = await res.json();
			const types = data.types.map((type: any) => type.type.name);
			setPokemonTypes(types);
			//console.log(pokemonTypes);
		};
		useEffect(() => {
			fetchPokemonTypes();
		}, []);
	} catch (error) {
		console.error("Error fetching Pokemon types:", error);
	}

	return (
		<Box style={{ flexDirection: "row" }}>
			{pokemonTypes.map((type, index) => (
				//console.log(type),
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
