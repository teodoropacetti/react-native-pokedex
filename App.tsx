import { config } from "@gluestack-ui/config";
import { GluestackUIProvider, Heading, Text } from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import PokemonCard from "./components/PokemonCard";
import { Pokemon } from "./interfaces/Pokemon";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./components/Home";

const pokemonURL = "https://pokeapi.co/api/v2/pokemon?limit=5&offset=0";

export default function App() {
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
		<NavigationContainer>
			<Home />
		</NavigationContainer>
	);
}
