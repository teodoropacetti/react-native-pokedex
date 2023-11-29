import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./components/Home";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PokemonDetails from "./components/PokemonDetails";

const Stack = createNativeStackNavigator();

const pokemonURL = "https://pokeapi.co/api/v2/pokemon?limit=5&offset=0";

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName="Home"
				screenOptions={{ headerShown: false }}>
				<Stack.Screen name="Home" component={Home} />
				<Stack.Screen
					name="PokemonDetails"
					component={PokemonDetails}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
