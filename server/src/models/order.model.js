const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  books: [{
    book_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
      required: true
    },
    price: {
      type: Number,  // The price of the book at the time of order
      required: true
    },
  }],
  total_amount: {
    type: Number,  // Total cost for the order (after discounts, taxes, etc.)
    required: true
  },
  order_date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Order', OrderSchema, 'Orders');
