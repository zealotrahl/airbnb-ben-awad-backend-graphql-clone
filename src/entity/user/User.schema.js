const { Schema } = require('mongoose');

module.exports.userSchema = new Schema({
  email: String, // String is shorthand for {type: String}
  password: String,
});
