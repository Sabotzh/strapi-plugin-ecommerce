module.exports = [
  {
    method: 'GET',
    path: '/products',
    handler: 'cart.find',
    config: {},
  },
  {
    method: 'GET',
    path: '/products/:id',
    handler: 'cart.findOne',
    config: {},
  },
  {
    method: 'GET',
    path: '/products/:slug',
    handler: 'cart.findOneBySlug',
    config: {},
  },
];
