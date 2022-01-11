module.exports = [
  {
    method: 'GET',
    path: '/customer',
    handler: 'customer.get',
    config: {},
  },
  {
    method: 'PUT',
    path: '/customer',
    handler: 'customer.update',
    config: {},
  },
  {
    method: 'POST',
    path: '/customer/attach',
    handler: 'customer.attach',
    config: {},
  },
  {
    method: 'POST',
    path: '/customer/unfasten',
    handler: 'customer.unfasten',
    config: {},
  },
];
