const mongoose = require('mongoose');

const pokemonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    type: {
        type: String,
        required: true
    },
    height: {
        type: Number,
        required: false
    },
    weight: {
        type: Number,
        required: false
    },
    hp: {
        type: Number,
        required: false
    },
    attack: {
        type: Number,
        required: false
    },
    defense: {
        type: Number,
        required: false
    },
    special_attack: {
        type: Number,
        required: false
    },
    special_defense: {
        type: Number,
        required: false
    }
});

// Create model from the schema
const Pokemon = mongoose.model('Pokemon', pokemonSchema);

module.exports = Pokemon;
