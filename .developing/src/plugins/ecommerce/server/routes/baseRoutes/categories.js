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
    path: '/categories/:sort',
    handler: 'categories.findSorted',
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
  {
    method: 'POST',
    path: '/categories/create-slug',
    handler: 'categories.createSlug',
    config: {},
  },
  {
    method: 'POST',
    path: '/categories/get-create',
    handler: 'categories.getOrCreate',
    config: {},
  },
];
