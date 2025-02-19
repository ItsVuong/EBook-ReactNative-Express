const mongoose = require('mongoose')

const AuthorSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  bio: { type: String, required: true },
  birth_date: { type: Date },
  nationality: { type: String },
});


module.exports = mongoose.model('Author', AuthorSchema, 'Authors');

