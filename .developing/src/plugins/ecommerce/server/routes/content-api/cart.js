module.exports = [
  {
    method: 'GET',
    path: '/cart',
    handler: 'cart.get',
    config: {},
  },
  {
    method: 'PUT',
    path: '/cart/add',
    handler: 'cart.add',
    config: {},
  },
  {
    method: 'PUT',
    path: '/cart/subtract',
    handler: 'cart.subtract',
    config: {},
  },
  {
    method: 'DELETE',
    path: '/cart/:id',
    handler: 'cart.remove',
    config: {},
  },
  {
    method: 'DELETE',
    path: '/cart',
    handler: 'cart.removeAll',
    config: {},
  },
];
