const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  payment_method: {
    type: String,  // e.g., 'Credit Card', 'PayPal', 'Stripe', etc.
    required: true
  },
  payment_amount: {
    type: Number,
    required: true
  },
  transaction_id: {
    type: String,
    required: true
  },
  payment_status: {
    type: String,
    enum: ['Pending', 'Completed', 'Failed', 'Refunded'],
    default: 'Pending'
  },
  payment_date: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model('Payment', PaymentSchema, 'Payments');

