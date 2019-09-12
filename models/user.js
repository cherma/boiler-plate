const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: Number, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  userType: { type: String },
});

// hash the password
UserSchema.methods.generateHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

// checking if password is valid
UserSchema.methods.validPassword = (password) => bcrypt.compareSync(password, this.password);

const User = mongoose.model('User', UserSchema);

module.exports = {
  User,
};
