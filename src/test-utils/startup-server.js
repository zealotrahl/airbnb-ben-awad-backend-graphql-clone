// If you want to reference other typescript modules, do it via require:
const { bootstrapTestServer } = require('./bootstrap-test-server');

(async () => {
  process.env.NODE_ENV = 'test';
  // Call your initialization methods here.
  await bootstrapTestServer();
})();
