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
  Mutation: {
    signin: async (_, args) => {
      try {
        await schema.validate(args, { abortEarly: false });
      } catch (err) {
        return formatYupError(err);
      }

      const { email, password } = args;

      const userAlreadyExists = await UserModel.findOne({
        where: { email },
        select: ['id'],
      });

      if (userAlreadyExists) {
        return [
          {
            path: 'email',
            message: duplicateEmail,
          },
        ];
      }

      const user = UserModel.create({
        email,
        password,
      });

      await user.save();

      return null;
    },
  },
};
