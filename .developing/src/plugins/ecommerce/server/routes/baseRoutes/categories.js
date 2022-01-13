module.exports = [
  {
    method: 'POST',
    path: '/categories',
    handler: 'categories.create',
    config: {},
  },
  {
    method: 'GET',
    path: '/categories',
    handler: 'categories.find',
    config: {},
  },
  {
    method: 'GET',
    path: '/categories/:id',
    handler: 'categories.findOne',
    config: {},
  },
  {
    method: 'GET',
    path: '/categories/by-slug/:slug',
    handler: 'categories.findOneBySlug',
    config: {},
  },
  {
    method: 'PUT',
    path: '/categories/:id',
    handler: 'categories.update',
    config: {},
  },
  {
    method: 'DELETE',
    path: '/categories/:id',
    handler: 'categories.remove',
    config: {},
  },
  {
    method: 'PUT',
    path: '/categories/:id/publish',
    handler: 'categories.publish',
    config: {},
  },
  {
    method: 'PUT',
    path: '/categories/:id/un-publish',
    handler: 'categories.unPublish',
    config: {},
  },
];
