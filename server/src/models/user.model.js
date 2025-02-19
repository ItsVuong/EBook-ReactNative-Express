const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password_hash: {
    type: String,
    required: true
  },
  display_name: {
    type: String
  },
  date_joined: {
    type: Date,
    default: Date.now
  },
  reading_list: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book'
  }],
  cart: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book'
  }],
  order_history: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  }],
  is_admin: {type: Boolean, default: false}
});

module.exports = mongoose.model('User', UserSchema, 'Users');
