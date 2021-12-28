const user = require('./user');
const type = require('./type');
const product = require('./order');
const order = require('./product');


module.exports = {
  'user': { schema: user },
  'type': { schema: type },
  'product': { schema: product },
  'order': { schema: order },
};
