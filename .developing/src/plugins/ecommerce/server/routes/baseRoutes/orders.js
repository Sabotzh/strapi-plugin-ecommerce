module.exports = [
  {
    method: 'GET',
    path: '/orders',
    handler: 'orders.find',
    config: {},
  },
  {
    method: 'GET',
    path: '/orders/:id',
    handler: 'orders.findOne',
    config: {},
  },
  {
    method: 'POST',
    path: '/orders',
    handler: 'orders.create',
    config: {},
  },
  {
    method: 'PUT',
    path: '/orders/status/:id',
    handler: 'orders.status',
    config: {},
  },
];
