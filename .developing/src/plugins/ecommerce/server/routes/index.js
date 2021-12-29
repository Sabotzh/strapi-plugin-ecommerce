const customerRoutes = require('./customer');
const cartRoutes = require('./cart');
const wishlistRoutes = require('./wishlist');

module.exports = [
  ...customerRoutes,
  ...cartRoutes,
  ...wishlistRoutes,
];
