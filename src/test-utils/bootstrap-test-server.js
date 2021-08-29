const { startServer } = require('../bootstrap');

module.exports.bootstrapTestServer = async () => {
  const app = await startServer();
};
