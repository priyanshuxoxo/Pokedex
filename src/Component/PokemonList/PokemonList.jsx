import { useEffect, useState } from "react";
import axios from "axios";
import "./PokemonList.css";
import Pokemon from "../Pokemon/Pokemon";
function PokemonList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const POKEDEX_URL = "https://pokeapi.co/api/v2/pokemon";
  async function downloadPokemons() {
    const response = await axios.get(POKEDEX_URL); //this download list of 20 pokemons
    const pokemonResults = response.data.results; // we get the array of pokemons fromr results
    console.log(pokemonResults);

    const pokemonResultPromise = pokemonResults.map((pokemon) =>
      axios.get(pokemon.url)
    );
    const pokemonData = await axios.all(pokemonResultPromise);
    console.log(pokemonData);
    const res = pokemonData.map((pokeData) => {
      const pokemon = pokeData.data;
      return {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.other.dream_world.front_default,
        types: pokemon.types,
      };
    });
    console.log(res);

    setPokemonList(res);
    setIsLoading(false);
  }
  useEffect(() => {
    downloadPokemons();
  }, []);

  return (
    <div className="pokemon-list-wrapper">
      Pokemon List :{" "}
      {isLoading
        ? "Data Loading"
        : pokemonList.map((p) => (
            <Pokemon name={p.name} image={p.image} key={p.id} />
          ))}
    </div>
  );
}

export default PokemonList;
