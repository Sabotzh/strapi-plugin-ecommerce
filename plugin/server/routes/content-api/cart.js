module.exports = [
  {
    method: 'GET',
    path: '/cart',
    handler: 'cart.get',
    config: {},
  },
  {
    method: 'PUT',
    path: '/cart',
    handler: 'cart.add',
    config: {},
  },
  {
    method: 'DELETE',
    path: '/cart',
    handler: 'cart.remove',
    config: {},
  },
  {
    method: 'DELETE',
    path: '/cart/all',
    handler: 'cart.removeAll',
    config: {},
  },
];
