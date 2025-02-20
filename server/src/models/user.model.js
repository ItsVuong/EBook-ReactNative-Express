const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

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
    type: String,
  },
  avatar: {
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
  is_admin: { type: Boolean, default: false }
});

UserSchema.pre("save", async function(next) {
  console.log(this)
  if (!this.isModified("password_hash")) {
    return next();
  }
  const hash = await bcrypt.hash(this.password_hash, 10);
  console.log('running')
  this.password_hash = hash;
  next();
});
UserSchema.pre("findOneAndUpdate", async function (next){
    if(!this._update.password_hash){
        return next();
    }
    const hash = await bcrypt.hash(this._update.password_hash, 10);
    this._update.password_hash = hash;
    next();
});

module.exports = mongoose.model('User', UserSchema, 'Users');
