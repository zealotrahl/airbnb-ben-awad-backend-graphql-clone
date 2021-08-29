const yup = require('yup');
const {
  passwordNotLongEnough,
} = require('./modules/user/signup/error-messages');

module.exports.registerPasswordValidation = yup
  .string()
  .min(3, passwordNotLongEnough)
  .max(255);
