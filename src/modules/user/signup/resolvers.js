const yup = require('yup');
const { UserModel } = require('@src/entity/user/User.model');
const { formatYupError } = require('@src/utils/format-yup-error');
const {
  duplicateEmail,
  emailNotLongEnough,
  invalidEmail,
} = require('./error-messages');
const { registerPasswordValidation } = require('@src/yup-schemas');

// Use Joi instead of yup
const schema = yup.object().shape({
  email: yup.string().min(3, emailNotLongEnough).max(255).email(invalidEmail),
  password: registerPasswordValidation,
});

module.exports.resolvers = {
  Query: {
    hello() {
      return 'Hello world';
    },
  },
  Mutation: {
    signup: async (_, args) => {
      try {
        await schema.validate(args, { abortEarly: false });
      } catch (err) {
        return formatYupError(err);
      }

      const { email, password } = args;

      const userAlreadyExists = await UserModel.findOne(
        {
          email,
        },
        'id'
      ).exec();

      if (userAlreadyExists) {
        return [
          {
            path: 'email',
            message: duplicateEmail,
          },
        ];
      }

      const user = new UserModel({
        email,
        password,
      });

      await user.save();

      return null;
    },
  },
};
