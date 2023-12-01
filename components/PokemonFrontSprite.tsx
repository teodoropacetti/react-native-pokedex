const pokemonImageBaseURL =
	"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

import { Box, Image } from "@gluestack-ui/themed";
export default function PokemonFrontSprite(basicPokemonInfo: string[]) {
	return (
		<Box>
			<Image
				source={{
					uri: pokemonImageBaseURL + basicPokemonInfo["id"] + ".png",
				}}
				alt={basicPokemonInfo["name"]}
				width={250}
				height={250}
			/>
		</Box>
	);
}
