const Mongoose = require('mongoose');
const { userSchema } = require('./User.schema');

module.exports.UserModel = Mongoose.model('User', userSchema);
