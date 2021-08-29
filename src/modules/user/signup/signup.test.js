const test = require('ava');

const faker = require('faker');
require('module-alias/register');
require('dotenv').config();
const { UserModel } = require('@src/entity/user/User.model');
const {
  duplicateEmail,
  emailNotLongEnough,
  invalidEmail,
  passwordNotLongEnough,
} = require('./error-messages');
const {
  createTestDatabaseConnection,
} = require('@src/test-utils/create-test-database-connection');

const { TestClient } = require('@src/test-utils/test-client');

faker.seed(Date.now() + 5);
const email = faker.internet.email();
const password = faker.internet.password();

const client = new TestClient(process.env.TEST_HOST);
test.before(async (t) => {
  // Before All Create connection
  await createTestDatabaseConnection();
});

test.after(async (t) => {
  // After All Close connection
});

test.serial('user signup success test', async (t) => {
  const response = await client.signup(email, password);
  t.deepEqual(response.data, {
    signup: null,
  });
  const foundUser = await UserModel.findOne({
    email,
  });
  t.assert(foundUser);
  t.assert(foundUser.email === email);
});

test.serial('user signup bad email test', async (t) => {
  const response = await client.signup('b', password);
  t.deepEqual(response.data, {
    signup: [
      {
        path: 'email',
        message: emailNotLongEnough,
      },
      {
        path: 'email',
        message: invalidEmail,
      },
    ],
  });
});

test.serial('user signup duplicate email', async (t) => {
  const response = await client.signup(email, password);
  t.deepEqual(response.data, {
    signup: [
      {
        path: 'email',
        message: duplicateEmail,
      },
    ],
  });
});

test.serial('user signup bad password', async (t) => {
  const response = await client.signup(email, '1');

  t.deepEqual(response.data, {
    signup: [
      {
        path: 'password',
        message: passwordNotLongEnough,
      },
    ],
  });
});
