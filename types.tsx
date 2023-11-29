import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { Pokemon } from "./interfaces/Pokemon";

export type RootStackParamList = {
	Home: undefined;
	PokemonDetails: { pokemon: Pokemon };
};

export type MessageNavProps<T extends keyof RootStackParamList> = {
	navigation: StackNavigationProp<RootStackParamList, T>;
	route: RouteProp<RootStackParamList, T>;
};
