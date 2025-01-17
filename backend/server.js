const express = require('express');
const mongoose = require('./config/dbConfig'); // Ensure path is correct
const pokemonRoutes = require('./routes/pokemonRoutes');

const app = express();
app.use(express.json());

// API routes
app.use('/api', pokemonRoutes);

// Start the server
app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});
