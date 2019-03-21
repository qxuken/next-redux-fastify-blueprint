const isServer = typeof window === 'undefined';
const env = process.env.FRONT_ENV;

let initializeStore;
if (isServer && env === 'development') {
  initializeStore = require('./configurations/server.development.config.js')
    .default;
} else if (isServer) {
  initializeStore = require('./configurations/server.config.js').default;
} else if (env === 'development') {
  initializeStore = require('./configurations/development.config.js').default;
} else if (env === 'staging') {
  initializeStore = require('./configurations/staging.config.js').default;
} else {
  initializeStore = require('./configurations/production.config.js').default;
}

export default initializeStore;
