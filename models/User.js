const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // Import jwt for token generation

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, {
  collection: 'users'
});

// Generate JWT token
userSchema.methods.generateJwt = function() {
  const token = jwt.sign(
    { _id: this._id, email: this.email, name: this.name },
    'YOUR_SECRET_KEY', // Replace with your own secret key
    { expiresIn: '1h' } // Set the expiration time for the token
  );
  return token;
};

// Verify password
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
