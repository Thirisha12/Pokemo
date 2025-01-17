const express = require('express');
const { getAllPokemon, getPokemonById, getSimilarPokemon } = require('../controllers/pokemonController');
const router = express.Router();

router.get('/pokemon', getAllPokemon);
router.get('/pokemon/:id', getPokemonById);
router.get('/pokemon/:id/similar', getSimilarPokemon);

module.exports = router;
