import React from "react";
import { Text, Box } from "@gluestack-ui/themed";
import { styles } from "../constants/Styles";

export default function PokemonStats(pokemonData: string[]) {
	return (
		<Box
			style={{
				flexDirection: "column",
				alignItems: "center",
				paddingHorizontal: 20,
				marginTop: 10,
			}}>
			<Text style={styles.textStyle}>Base stats:</Text>
			{pokemonData["stats"] &&
				pokemonData["stats"].map((stat: any) => (
					<Text
						style={{
							fontSize: 20,
							paddingVertical: 10,
							color: "white",
						}}
						key={stat.stat.name}>
						{stat.stat.name.at(0)?.toUpperCase() +
							stat.stat.name.slice(1) +
							": " +
							stat.base_stat}
					</Text>
				))}
		</Box>
	);
}
