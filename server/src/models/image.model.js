const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  name: {type: String, required: true},
  path: { type: String, required: true },
  createAt: { type: Date, default: Date.now },
  mimetype: {type: String}
});

module.exports = mongoose.model('Image', ImageSchema, 'Images');
