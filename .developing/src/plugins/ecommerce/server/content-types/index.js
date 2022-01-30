const customer = require('./customer');
const cart = require('./cart');
const wishlist = require('./wishlist');
const category = require('./category');
const manufacturer = require('./manufacturer');
const product = require('./product');
const order = require('./order');


module.exports = {
  'customer': { schema: customer },
  'cart': { schema: cart },
  'wishlist': { schema: wishlist },
  'category': { schema: category },
  'manufacturer': { schema: manufacturer },
  'product': { schema: product },
  'order': { schema: order },
};
