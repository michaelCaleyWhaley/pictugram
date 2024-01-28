const mongoose = require('mongoose');

const { Schema } = mongoose;
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
});
const User = mongoose.model('User', userSchema);
module.exports = User;
