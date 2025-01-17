import React, { useState, useEffect } from "react";
import axios from "axios";

const PokemonList = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=1000");
        const pokemonArray = await Promise.all(
          res.data.results.map(async (pokemon) => {
            const pokemonDetail = await axios.get(pokemon.url);
            return pokemonDetail.data;
          })
        );
        setPokemonData(pokemonArray);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Pokémon data", error);
      }
    };

    fetchPokemonData();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="pokemon-list">
      <h1>Pokémon List</h1>
      <div className="pokemon-grid">
        {pokemonData.map((pokemon) => (
          <div key={pokemon.id} className="pokemon-card">
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <h3>{pokemon.name}</h3>
            <p>ID: {pokemon.id}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonList;
