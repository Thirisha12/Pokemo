import React, { useState, useEffect } from 'react';
import './App.css';

// Define a mapping of Pokémon types to background colors
const typeColors = {
  grass: '#78C850',
  bug: '#A8B820',
  fire: '#F08030',
  ice: '#98D8D8',
  water: '#6890F0',
  electric: '#F8D030',
  ground: '#E0C068',
  rock: '#B8A038',
  fairy: '#EE99AC',
  fighting: '#C03028',
  psychic: '#F85888',
  ghost: '#705898',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  flying: '#A890F0',
  poison: '#A040A0',
  normal: '#A8A878'
};

// HomePage Component
const HomePage = ({ pokemonList, onPokemonClick, onSearch, onFilter, onSort, onNextClick, onPrevClick, pagination }) => {
  return (
    <div className="home-page">
      <h1>POKEPEDIA</h1>
      <div className="filters">
        <input type="text" placeholder="Search Pokemon" onChange={(e) => onSearch(e.target.value)} />
        <select onChange={(e) => onFilter(e.target.value)}>
         <option value="">Filter by Type</option>
          <option value="poison">Poison</option>
          <option value="bug">Bug</option>
          <option value="fire">Fire</option>
          <option value="ice">Ice</option>
          <option value="grass">Grass</option>
          <option value="electric">Electric</option>
          <option value="fairy">Fairy</option>
          <option value="normal">Normal</option>
          <option value="ghost">Ghost</option>
          <option value="dragon">Dragon</option>
          <option value="dark">Dark</option>
          <option value="rock">Rock</option>
          <option value="fighting">Fighting</option>
          <option value="psychic">Psychic</option>
          <option value="steel">Steel</option>
          <option value="flying">Flying</option>
        </select>
        <button onClick={() => onSort('asc')}>Sort by Name (Asc)</button>
        <button onClick={() => onSort('desc')}>Sort by Name (Desc)</button>
      </div>

      <div className="pokemon-grid">
        {pokemonList.slice(pagination.start, pagination.end).map((pokemon) => (
          <div className="pokemon-card" key={pokemon.id} onClick={() => onPokemonClick(pokemon)}>
            <div className='id3'><img src={pokemon.image} alt={pokemon.name} /></div>
            <h3 className='id1'>#{pokemon.id}   </h3>
            <h3 className='id2'>{pokemon.name}</h3>
            <div className="pokemon-types">
              {pokemon.type.map((type) => (
                <span
                  key={type}
                  className="pokemon-type"
                  style={{ backgroundColor: typeColors[type] }}
                >
                  {type}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={onPrevClick} disabled={pagination.start === 0}>Previous</button>
        <button onClick={onNextClick} disabled={pagination.end >= pokemonList.length}>Next</button>
      </div>
    </div>
  );
};

// PokemonPage Component
const PokemonPage = ({ pokemon, similarPokemons, onPokemonClick, onHomeClick }) => {
  return (
    <div className="pokemon-page">
      <h1>POKEPEDIA</h1>
      <div className="pokemon-detail">
        <div className='pok'>
          <div className='img-div'>
            <img className="clicked-pokemon-img" src={pokemon.image} alt={pokemon.name} />
            <h2>#{pokemon.id}&nbsp;&nbsp;{pokemon.name}</h2>
          </div>
          <div className='pok2'>
            <div className='pok1'>
              <div className="pokemo-types">
                {pokemon.type.map((type) => (
                  <span
                    key={type}
                    className="pokemo-type"
                    style={{ backgroundColor: typeColors[type] }}
                  >
                    {type}
                  </span>
                ))}
              </div>
              <p>Height: {pokemon.height}m</p>
              <p>Weight: {pokemon.weight}kg</p>
            </div>
            <div className="stats">
              <h3>Stats</h3>
              {Object.keys(pokemon.stats).map((stat) => {
                const statValue = pokemon.stats[stat];
                return (
                  <div key={stat} className="stat-bar-container">
                    <span>{stat}: </span>
                    <div
                      className="stat-bar"
                      style={{ width: `${statValue}%`, backgroundColor: '#2a75bb' }}
                    ></div>
                    <span>{statValue}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="similar-pokemon">
          <h3 className='sim'>Similar Pokémon</h3>
          <div className="similar-pokemon-grid">
            {similarPokemons.map((sim) => (
              <div className="pokemon-card" key={sim.id} onClick={() => onPokemonClick(sim)}>
                <div className='id3'><img src={sim.image} alt={sim.name} /></div>
                <h4 className='id1'>#{sim.id}   </h4>
                <h4 className='id2'>{sim.name}</h4>
                <div className="pokemon-types">
                  {sim.type.map((type) => (
                    <span
                      key={type}
                      className="pokemon-type"
                      style={{ backgroundColor: typeColors[type] }}
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <button onClick={onHomeClick}>Back to Home</button>
    </div>
  );
};

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [pagination, setPagination] = useState({ start: 0, end: 10 });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonData = async () => {
      let allPokemons = [];
      let nextUrl = 'https://pokeapi.co/api/v2/pokemon?limit=500';  // Increase the limit or fetch in batches
      while (nextUrl) {
        const response = await fetch(nextUrl);
        const data = await response.json();
        const fetchedPokemons = await Promise.all(
          data.results.map(async (pokemon) => {
            const details = await fetch(pokemon.url).then((res) => res.json());
            const images = details.sprites.other.dream_world;
            
            const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
            
            // Ensure fallback image in case the image URL is missing
            const imageUrl = images?.front_default || details.sprites.front_default || 'default_image_url.png'; 
    
            return {
              id: details.id,
              name: capitalize(details.name),
              image: imageUrl,
              type: details.types.map((type) => type.type.name),
              height: details.height,
              weight: details.weight,
              stats: {
                hp: details.stats[0].base_stat,
                attack: details.stats[1].base_stat,
                defense: details.stats[2].base_stat,
                specialAttack: details.stats[3].base_stat,
                specialDefense: details.stats[4].base_stat,
              }
            };
          })
        );
        allPokemons = allPokemons.concat(fetchedPokemons);
        nextUrl = data.next;  // Get the URL for the next page of Pokémon
      }
      setPokemonList(allPokemons);
      setFilteredList(allPokemons);
      setLoading(false); // Set loading to false after data is fetched
    };    
    fetchPokemonData();
  }, []);

  const onPokemonClick = (pokemon) => {
    const lastImage = pokemon.images ? pokemon.images.front_default : pokemon.image;
    setSelectedPokemon({
      ...pokemon,
      image: lastImage
    });
    setCurrentPage('pokemon');
    window.scrollTo(0, 0);  // Scroll to the top
  };

  const onHomeClick = () => {
    setSelectedPokemon(null);
    setCurrentPage('home');
    window.scrollTo(0, 0);  // Scroll to the top
  };

  const onSearch = (term) => {
    setSearchTerm(term);
    filterPokemons(term, selectedType);
  };

  const onFilter = (type) => {
    setSelectedType(type);
    filterPokemons(searchTerm, type);
  };

  const filterPokemons = (term, type) => {
    let filtered = pokemonList;
    if (term) {
      filtered = filtered.filter((pokemon) => pokemon.name.toLowerCase().includes(term.toLowerCase()));
    }
    if (type) {
      filtered = filtered.filter((pokemon) => pokemon.type.includes(type));
    }
    setFilteredList(filtered);
    setPagination({ start: 0, end: 10 });
  };

  const onSort = (order) => {
    setSortOrder(order);
    const sortedPokemons = [...filteredList].sort((a, b) => {
      if (order === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setFilteredList(sortedPokemons);
  };

  const onNextClick = () => {
    if (pagination.end < filteredList.length) {
      setPagination({ start: pagination.start + 10, end: pagination.end + 10 });
    }
  };

  const onPrevClick = () => {
    if (pagination.start > 0) {
      setPagination({ start: pagination.start - 10, end: pagination.end - 10 });
    }
  };

  const getSimilarPokemons = (pokemon) => {
    return pokemonList.filter((sim) => sim.type.some((type) => pokemon.type.includes(type)) && sim.id !== pokemon.id);
  };

  return (
    <div className="app">
      {loading ?(
        <div className="loading-container show">
          <div className="loading-spinner"></div>
          <div className="loading-text">Loading Pokémon...</div>
        </div>
      ) : currentPage === 'home' ? (
        <HomePage
          pokemonList={filteredList}
          onPokemonClick={onPokemonClick}
          onSearch={onSearch}
          onFilter={onFilter}
          onSort={onSort}
          onNextClick={onNextClick}
          onPrevClick={onPrevClick}
          pagination={pagination}
        />
      ) : (
        <PokemonPage
          pokemon={selectedPokemon}
          similarPokemons={getSimilarPokemons(selectedPokemon)}
          onPokemonClick={onPokemonClick}
          onHomeClick={onHomeClick}
        />
      )}
    </div>
  );
}
export default App;
