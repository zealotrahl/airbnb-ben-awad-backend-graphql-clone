import * as faker from 'faker';

import { UserModel } from 'src/entity/user/User.model';
import {
  duplicateEmail,
  emailNotLongEnough,
  invalidEmail,
  passwordNotLongEnough,
} from './errorMessages';
import { TestClient } from 'src/utils/TestClient';

faker.seed(Date.now() + 5);
const email = faker.internet.email();
const password = faker.internet.password();

const client = new TestClient(process.env.TEST_HOST);

let conn;
// Before All Create connection
// After All Close connection

// user signup tests group
// Check that we can register user
// Check if we can handle duplicate users error

// Check for bad email input

// Check for bad password input

// Check bad password and bad email
