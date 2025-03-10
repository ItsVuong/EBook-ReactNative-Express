const mongoose = require('mongoose');

const GenreSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});


module.exports = mongoose.model('Genre', GenreSchema, 'Genres');
