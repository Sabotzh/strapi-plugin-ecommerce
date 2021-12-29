const customerRoutes = require('./customer');
const cartRoutes = require('./cart');
const wishlistRoutes = require('./wishlist');

module.exports = {
  type: 'content-api',
  routes: [
    {
      method: "GET",
      path: "/cart",
      handler: "cart.get",
      config: {
        policies: [],
      },
    },
  ],
};
