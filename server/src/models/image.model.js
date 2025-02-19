const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  path: { type: String, required: true },
  url: { type: String, required: true },
  caption: { type: String, required: true },
  createAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Image', ImageSchema, 'Images');

