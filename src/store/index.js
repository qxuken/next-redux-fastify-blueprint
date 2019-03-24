const isServer = typeof window === 'undefined';
const env = process.env.FRONT_ENV;

function storeSelector() {
  if (isServer && env === 'development') {
    return require('./configurations/server.development.config.js').default;
  } else if (isServer) {
    return require('./configurations/server.config.js').default;
  } else if (env === 'development') {
    return require('./configurations/development.config.js').default;
  } else if (env === 'staging') {
    return require('./configurations/staging.config.js').default;
  }
  return require('./configurations/production.config.js').default;
}

export default storeSelector();
