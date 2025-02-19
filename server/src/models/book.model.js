const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  language: { type: String, required: true },
  publish_date: { type: Date },
  language: { type: Sring },
  isbn: { type: String },
  reviews: {
    type: [{
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
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

  author: [{ type: Schema.Types.ObjectId, ref: 'Authors' }],
  genre: [{ type: Schema.Types.ObjectId, ref: 'Genres' }],
  cover_images: [{type: Schema.Types.ObjectId, ref: 'Images'}],
});


export default model('Book', BookSchema, 'Books');

