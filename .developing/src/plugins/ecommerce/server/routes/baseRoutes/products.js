module.exports = [
  {
    method: 'POST',
    path: '/products',
    handler: 'products.create',
    config: {},
  },
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
    path: '/products/by-slug/:slug',
    handler: 'products.findOneBySlug',
    config: {},
  },
  {
    method: 'DELETE',
    path: '/products/:id',
    handler: 'products.remove',
    config: {},
  },
  {
    method: 'PUT',
    path: '/products/:id',
    handler: 'products.update',
    config: {},
  },
  {
    method: 'PUT',
    path: '/products/:id/publish',
    handler: 'products.publish',
    config: {},
  },
  {
    method: 'PUT',
    path: '/products/:id/un-publish',
    handler: 'products.unPublish',
    config: {},
  },
  {
    method: 'POST',
    path: '/products/create-slug',
    handler: 'products.createSlug',
    config: {},
  },
];
