module.exports = [
  {
    method: 'GET',
    path: '/manufacturer',
    handler: 'manufacturer.find',
    config: {},
  },
  {
    method: 'POST',
    path: '/manufacturer',
    handler: 'manufacturer.create',
    config: {},
  },
  {
    method: 'PUT',
    path: '/manufacturer/:id',
    handler: 'manufacturer.update',
    config: {},
  }
];
