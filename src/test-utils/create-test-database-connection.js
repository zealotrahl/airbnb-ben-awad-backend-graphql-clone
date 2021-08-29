const mongoose = require('mongoose');

module.exports.createTestDatabaseConnection = async () => {
  await mongoose.connect(
    `mongodb://${process.env.DB_HOST_NAME}:${process.env.DB_PORT}/${process.env.DB_TEST_NAME}`
  );
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.remove();
  }
};
