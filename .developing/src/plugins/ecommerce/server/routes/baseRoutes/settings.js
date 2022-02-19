module.exports = [
  {
    method: 'POST',
    path: '/settings',
    handler: 'settings.create',
    config: {},
  },
  {
    method: 'GET',
    path: '/settings',
    handler: 'settings.find',
    config: {},
  },
  {
    method: 'GET',
    path: '/settings/:key',
    handler: 'settings.findOneByKey',
    config: {},
  },
  {
    method: 'PUT',
    path: '/settings/:key',
    handler: 'settings.update',
    config: {},
  },
  {
    method: 'DELETE',
    path: '/settings/:key',
    handler: 'settings.remove',
    config: {},
  }
];
