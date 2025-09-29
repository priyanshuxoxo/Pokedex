import axios from "axios";
import { useEffect, useState } from "react";

function usePokemonList() {
  const [pokemonListState, setPokemonListState] = useState({
    pokemonList: [],
    isLoading: true,
    pokedexUrl: "https://pokeapi.co/api/v2/pokemon",
    nextUrl: "",
    prevUrl: "",
    type: "",
  });

  async function downloadPokemons() {
    // setIsLoading(true);

    if (pokemonListState.type) {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/type/${pokemonListState.type}`
      );
      setPokemonListState((state) => ({
        ...state,
        pokemonList: response.data.pokemon,
      }));
    } else {
      setPokemonListState({ ...pokemonListState, isLoading: true });
      const response = await axios.get(pokemonListState.pokedexUrl); //this download list of 20 pokemons
      const pokemonResults = response.data.results; // we get the array of pokemons fromr results
      console.log(pokemonResults);

      setPokemonListState((state) => ({
        ...state,
        nextUrl: response.data.next,
        prevUrl: response.data.previous,
      }));
      const pokemonResultPromise = pokemonResults.map((pokemon) =>
        axios.get(pokemon.url)
      );
      const pokemonData = await axios.all(pokemonResultPromise);
      console.log(pokemonData);
      const pokeListResult = pokemonData.map((pokeData) => {
        const pokemon = pokeData.data;
        return {
          id: pokemon.id,
          name: pokemon.name,
          image: pokemon.sprites.other.dream_world.front_default,
          types: pokemon.types,
        };
      });
      console.log(pokeListResult);

      // setPokemonList(res);
      setPokemonListState((state) => ({
        ...state,
        pokemonList: pokeListResult,
        isLoading: false,
      }));
    }
  }

  useEffect(() => {
    downloadPokemons();
  }, [pokemonListState.pokedexUrl]);
  return [pokemonListState, setPokemonListState];
}

export default usePokemonList;
