import React from "react";
import { Badge, Box, Text } from "@gluestack-ui/themed";
import { Image } from "@gluestack-ui/themed";
import { Pokemon } from "../interfaces/Pokemon";
import { StyleSheet, TouchableOpacity } from "react-native";
import PokemonTypes from "./PokemonTypes";

const pokemonImageBaseURL =
	"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

export default function PokemonCard(pokemon: Pokemon) {
	const formattedNumber = ("00" + pokemon.id).slice(-3);
	return (
		<TouchableOpacity
			onPress={() => {
				console.log("Pressed");
			}}>
			<Box padding={10}>
				<Box
					key={pokemon.name}
					borderWidth={0}
					borderRadius={8}
					borderColor="gray.200"
					bg="#9AF0FF"
					width="100%"
					flexDirection="row"
					alignItems="center"
					justifyContent="space-between"
					paddingLeft={20}>
					<Box>
						<Text
							style={{
								fontSize: 30,
								paddingTop: 10,
								color: "white",
							}}>
							{"#" +
								formattedNumber +
								"\n\n" +
								pokemon.name.at(0)?.toUpperCase() +
								pokemon.name.slice(1)}
						</Text>
						<Box style={{ flexDirection: "row" }}>
							<PokemonTypes {...pokemon} />
						</Box>
					</Box>

					<Image
						source={{
							uri: pokemonImageBaseURL + pokemon.id + ".png",
						}}
						alt={pokemon.name}
						width={180}
						height={180}
					/>
				</Box>
			</Box>
		</TouchableOpacity>
	);
}
