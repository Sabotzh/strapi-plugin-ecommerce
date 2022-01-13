const customer = require('./customer');
const category = require('./category');
const manufacturer = require('./manufacturer');
const product = require('./product');
const order = require('./order');


module.exports = {
  'customer': { schema: customer },
  'category': { schema: category },
  'manufacturer': { schema: manufacturer },
  'product': { schema: product },
  'order': { schema: order },
};
