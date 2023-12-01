import { styles } from "../constants/Styles";
import { Box, Text } from "@gluestack-ui/themed";

export default function PokemonBaseInfo(pokemonData: string[]) {
	return (
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
			<Text style={styles.textStyle}>
				Height: {pokemonData["height"] / 10} m
			</Text>
			<Text style={styles.textStyle}>
				Weight: {pokemonData["weight"] / 10} kg
			</Text>
			<Text style={styles.textStyle}>
				Base Experience: {pokemonData["base_experience"]}
			</Text>
			<Text style={styles.textStyle}>
				Abilities:{" "}
				{pokemonData["abilities"] &&
					pokemonData["abilities"]
						.map((ability: any) => ability.ability.name)
						.join(", ")}
			</Text>
		</Box>
	);
}
