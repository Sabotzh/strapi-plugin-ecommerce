const baseRoutes = require('../baseRoutes');
const cartRoutes = require('./cart');
const wishlistRoutes = require('./wishlist');

module.exports = {
  type: 'content-api',
  routes: [
    ...baseRoutes,
    ...cartRoutes,
    ...wishlistRoutes,
  ],
};
