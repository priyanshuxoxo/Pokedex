import axios from "axios";
import { useEffect, useState } from "react";

function usePokemonDetails(id, pokemonName) {
  const [pokemon, setPokemon] = useState({});
  async function downloadPokemons() {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id || pokemonName}`
      );
      console.log("details", response.data);
      const typeName = response.data?.types?.[0]?.type?.name;
      let similarPokemons = [];
      if (typeName) {
        const pokemonOfSameTypes = await axios.get(
          `https://pokeapi.co/api/v2/type/${typeName}`
        );
        similarPokemons = pokemonOfSameTypes.data.pokemon;
        console.log("similar", similarPokemons);
      } else {
        console.log("No types found for this pokemon");
      }
      setPokemon({
        name: response.data.name,
        image: response.data.sprites.other.dream_world.front_default,
        weight: response.data.weight,
        height: response.data.height,
        types: response.data.types.map((t) => t.type.name),
        similarPokemons: similarPokemons,
      });

      // console.log(response.data.types);

      setPokemonListState((prev) => ({
        ...prev,
        type: typeName || "",
      }));
    } catch (error) {
      console.log("Something Went Wrong", error);
      return;
    }
  }
  const [pokemonListState, setPokemonListState] = useState({});
  useEffect(() => {
    downloadPokemons();
    console.log("list", pokemon.types, pokemonListState);
  }, [pokemonListState.pokedexUrl]);
  return [pokemon, pokemonListState];
}

export default usePokemonDetails;
