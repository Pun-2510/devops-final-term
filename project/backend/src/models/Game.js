const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  name: { type: String, required: true },

  genre: String,

  description: String,

  releaseYear: Number,

  rating: { type: Number, min: 0, max: 10 },

  price: { type: Number, default: 0 },

  publisher: String,

  developer: String,

  imageUrl: String,

  platforms: [String],

  tags: [String],

  systemRequirements: {
    minimum: String,
    recommended: String,
  },

  trailerUrl: String,
});

module.exports = mongoose.model('Game', gameSchema);