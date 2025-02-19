const mongoose = require('mongoose');
require('./author.model');

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  language: { type: String, required: true },
  publish_date: { type: Date },
  isbn: { type: String },
  reviews: {
    type: [{
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      rating: {
        type: Number,
        min: 1,
        max: 5
      },
      review_text: {
        type: String
      },
      review_date: {
        type: Date,
        default: Date.now
      }
    }]
  },

  author: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Author' }],
  genre: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Genre' }],
  cover_image: {type: mongoose.Schema.Types.ObjectId, ref: 'Image'},
  price: {type: Number, required: true},
  on_sale: {
    type: Boolean,
    default: false
  },
  discount: {
    type: Number,
    default: 0
  }
});


module.exports = mongoose.model('Book', BookSchema, 'Books');
