require('module-alias/register');
require('dotenv').config();
const { GraphQLServer } = require('graphql-yoga');
const RateLimit = require('express-rate-limit');

const connectToDb = require('./utils/database-connector');
const { genSchema } = require('./utils/generate-schema');
const { testRoute } = require('./routes/test-route');

module.exports.startServer = async () => {
  const server = new GraphQLServer({
    schema: genSchema(),
    context: ({ request }) => ({
      url: request.protocol + '://' + request.get('host'),
      req: request,
    }),
  });

  await connectToDb();

  server.express.use(
    new RateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
      delayMs: 0, // disable delaying - full speed until the max limit is reached
    })
  );

  server.express.get('/test-routes/test', testRoute);

  const cors = {
    credentials: true,
    origin: process.env.NODE_ENV === 'test' ? '*' : process.env.FRONTEND_HOST,
  };

  const appPort = process.env.NODE_ENV === 'test' ? 4040 : 4000;

  const app = await server.start({
    playground: '/playground',
    cors,
    port: appPort,
  });
  console.log(`Server is running on localhost:${appPort}`);

  return app;
};
