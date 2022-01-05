module.exports = [
  {
    method: 'GET',
    path: '/products',
    handler: 'products.find',
    config: {},
  },
  {
    method: 'GET',
    path: '/products/:id',
    handler: 'products.findOne',
    config: {},
  },
  {
    method: 'GET',
    path: '/products/:slug',
    handler: 'products.findOneBySlug',
    config: {},
  },
];
