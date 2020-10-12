const helmet = require('helmet') //web security vulnerability 
const compression = require('compression');

module.exports = function(app) {
  app.use(helmet());
  app.use(compression());
}