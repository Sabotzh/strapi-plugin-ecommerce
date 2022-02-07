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
  },
  {
    method: 'DELETE',
    path: '/manufacturer/:id',
    handler: 'manufacturer.remove',
    config: {},
  },
  {
    method: 'PUT',
    path: '/manufacturer/:id/publish',
    handler: 'manufacturer.publish',
    config: {},
  },
  {
    method: 'PUT',
    path: '/manufacturer/:id/un-publish',
    handler: 'manufacturer.unPublish',
    config: {},
  },
];
