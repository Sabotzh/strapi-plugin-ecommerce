module.exports = [
  {
    method: 'POST',
    path: '/settings',
    handler: 'setting.create',
    config: {},
  },
  {
    method: 'GET',
    path: '/settings',
    handler: 'setting.find',
    config: {},
  },
  {
    method: 'GET',
    path: '/settings/:slug',
    handler: 'setting.findOneByKey',
    config: {},
  },
  {
    method: 'PUT',
    path: '/products/:key',
    handler: 'products.update',
    config: {},
  },
  {
    method: 'DELETE',
    path: '/products/:key',
    handler: 'products.remove',
    config: {},
  }
];
