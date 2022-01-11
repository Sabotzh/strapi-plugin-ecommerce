const register = require('./server/onRegister');
const bootstrap = require('./server/onBootstrap');
const destroy = require('./server/onDestroy');

const contentTypes = require('./server/content-types');
const routes = require('./server/routes');
const controllers = require('./server/controllers');
const services = require('./server/services');
const policies = require('./server/policies');
const middlewares = require('./server/middlewares');

module.exports = () => ({
  register,
  bootstrap,
  destroy,

  contentTypes,
  routes,
  controllers,
  services,
  policies,
  middlewares,
});
