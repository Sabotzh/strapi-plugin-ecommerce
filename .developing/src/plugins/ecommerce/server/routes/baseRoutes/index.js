const customerRoutes = require('./customer');
const ordersRoutes = require('./orders');
const categoriesRoutes = require('./categories');
const productsRoutes = require('./products');
const manufacturersRoutes = require('./manufacturer');
const settingsRoutes = require('./settings')

module.exports = [
  ...customerRoutes,
  ...ordersRoutes,
  ...categoriesRoutes,
  ...productsRoutes,
  ...manufacturersRoutes,
  ...settingsRoutes,
];
