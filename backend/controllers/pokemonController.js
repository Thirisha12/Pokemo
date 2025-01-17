const Pokemon = require('../models/pokemonModel');

// Get list of Pokémon
const getAllPokemon = async (req, res) => {
    const { page = 1, type, name } = req.query;
    const limit = 10;
    const offset = (page - 1) * limit;

    const where = {};

    if (type) where.type = type;
    if (name) where.name = { $regex: name, $options: 'i' }; // Case-insensitive search

    try {
        const pokemonList = await Pokemon.find(where) // Mongoose method to find
            .skip(offset)
            .limit(limit); // Pagination

        res.json(pokemonList);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving Pokémon list', error });
    }
};

// Get Pokémon details
const getPokemonById = async (req, res) => {
    try {
        const pokemon = await Pokemon.findById(req.params.id); // Mongoose method to find by ID
        if (!pokemon) return res.status(404).json({ message: 'Pokémon not found' });
        res.json(pokemon);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving Pokémon details', error });
    }
};

// Get similar Pokémon based on type
const getSimilarPokemon = async (req, res) => {
    try {
        const pokemon = await Pokemon.findById(req.params.id); // Mongoose method to find by ID
        if (!pokemon) return res.status(404).json({ message: 'Pokémon not found' });

        const similarPokemon = await Pokemon.find({
            type: pokemon.type
        }).limit(5); // Find similar Pokémon based on type

        res.json(similarPokemon);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving similar Pokémon', error });
    }
};

module.exports = { getAllPokemon, getPokemonById, getSimilarPokemon };
