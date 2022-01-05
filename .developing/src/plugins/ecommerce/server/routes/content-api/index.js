const customerRoutes = require('./customer');
const cartRoutes = require('./cart');
const wishlistRoutes = require('./wishlist');
const ordersRoutes = require('./orders');
const productsRoutes = require('./products');

module.exports = {
  type: 'content-api',
  routes: [
    ...cartRoutes,
    ...wishlistRoutes,
    ...customerRoutes,
    ...ordersRoutes,
    /*...productsRoutes,*/
  ],
};
