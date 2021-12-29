module.exports = [
  {
    method: 'GET',
    path: '/wishlist',
    handler: 'wishlist.get',
    config: {},
  },
  {
    method: 'PUT',
    path: '/wishlist',
    handler: 'wishlist.add',
    config: {},
  },
  {
    method: 'DELETE',
    path: '/wishlist',
    handler: 'wishlist.remove',
    config: {},
  },
  {
    method: 'DELETE',
    path: '/wishlist/all',
    handler: 'wishlist.removeAll',
    config: {},
  },
];
