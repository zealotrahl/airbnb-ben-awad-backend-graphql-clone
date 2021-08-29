const mongoose = require('mongoose');
module.exports = exports = () => {
  mongoose.connect(
    `mongodb://${process.env.DB_HOST_NAME}:${process.env.DB_PORT}/${
      process.env.NODE_ENV === 'test'
        ? process.env.DB_TEST_NAME
        : process.env.DB_NAME
    }`
  );
};
