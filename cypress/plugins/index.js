module.exports = (on, config) => {
  // eslint-disable-next-line global-require
  require('@cypress/code-coverage/task')(on, config);
  // eslint-disable-next-line global-require
  on('file:preprocessor', require('@cypress/code-coverage/use-browserify-istanbul'));
  return config;
};
