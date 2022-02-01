module.exports = [
  {
    method: 'GET',
    path: '/wishlist',
    handler: 'wishlist.get',
    config: {},
  },
  {
    method: 'PUT',
    path: '/wishlist/add',
    handler: 'wishlist.add',
    config: {},
  },
  {
    method: 'DELETE',
    path: '/wishlist/:id',
    handler: 'wishlist.remove',
    config: {},
  },
  {
    method: 'DELETE',
    path: '/wishlist',
    handler: 'wishlist.removeAll',
    config: {},
  },
];
