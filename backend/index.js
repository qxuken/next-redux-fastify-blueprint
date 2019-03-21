require('dotenv').config();
const uuid = require('uuid/v4');
const fastify = require('fastify')({
  logger: { level: 'error' },
  ignoreTrailingSlash: true,
});
const Next = require('next');

const dev = process.env.NODE_ENV === 'development';
const frontEnv = process.env.FRONT_ENV || 'production';
const address = process.env.HOST || '0.0.0.0';
const port = parseInt(process.env.PORT, 10) || 3000;

if (!dev && process.env.REDIS_URL) {
  const IoRedis = require('ioredis');
  const redis = new IoRedis(process.env.REDIS_URL);
  fastify
    .register(require('fastify-redis'), { client: redis })
    .register(require('fastify-rate-limit'), {
      max: 300,
      whitelist: ['127.0.0.1'],
      redis,
      skipOnError: true,
      keyGenerator() {
        uuid();
      },
    });
}
if (frontEnv !== 'production') {
  fastify.register(require('fastify-metrics'), { endpoint: '/metrics' });
}

fastify
  .register(require('fastify-healthcheck'))
  .register((fastify, opts, next) => {
    const app = Next({ dev });
    app
      .prepare()
      .then(() => {
        fastify.get('/_next/*', function(req, reply) {
          app.handleRequest(req.req, reply.res).then(function() {
            reply.sent = true;
          });
        });

        // fastify.get('/custom_route/:id', (req, reply) =>
        //   app.render(req.req, reply.res, '/next_js_route/', { id: req.params.id }).then(() => {
        //     reply.sent = true;
        //   }),
        // );

        fastify.get('/*', function(req, reply) {
          app.handleRequest(req.req, reply.res).then(function() {
            reply.sent = true;
          });
        });

        fastify.setNotFoundHandler(function(request, reply) {
          app.render404(request.req, reply.res).then(function() {
            reply.sent = true;
          });
        });

        next();
      })
      .catch(function(err) {
        return next(err);
      });
  });

fastify.listen(port, address, err => {
  if (err) throw err;
  console.log(`> Ready on ${address}:${port}`);
  console.log(`> mod=${dev ? 'development' : 'production'}`);
  console.log(`> FRONT_ENV=${frontEnv}`);
});
