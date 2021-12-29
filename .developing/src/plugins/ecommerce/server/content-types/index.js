const customer = require('./customer');
const category = require('./category');
const product = require('./order');
const order = require('./product');


module.exports = {
  'customer': { schema: customer },
  'category': { schema: category },
  'product': { schema: product },
  'order': { schema: order },
};
