import { config } from "@gluestack-ui/config";
import { GluestackUIProvider, Heading, Text } from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import PokemonCard from "./PokemonCard";
import { Pokemon } from "../interfaces/Pokemon";

const pokemonURL = "https://pokeapi.co/api/v2/pokemon?limit=5&offset=0";

export default function Home() {
	const [pokemons, setPokemons] = useState<Pokemon[]>([]);
	const fetchPokemons = async () => {
		const res = await fetch(pokemonURL);
		const data = await res.json();
		setPokemons(data.results);
		//console.log(pokemons);
	};
	useEffect(() => {
		fetchPokemons();
	}, []);
	for (let i = 0; i < pokemons.length; i++) {
		pokemons[i].id = i + 1;
	}

	return (
		<GluestackUIProvider config={config}>
			<SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
				<Heading
					style={{
						padding: 10,
						fontSize: 40,
						paddingTop: 20,
					}}>
					Gen 1 Pokédex
				</Heading>
				<ScrollView>
					{pokemons.map((pokemon, index) => (
						<PokemonCard {...pokemon} key={pokemon.name} />
					))}
				</ScrollView>
			</SafeAreaView>
		</GluestackUIProvider>
	);
}
