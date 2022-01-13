module.exports = {
  collectionName: 'ecommerce_customers',
  info: {
    name: 'Customers',
    description: 'List of ecommerce users',
    singularName: 'customer',
    pluralName: 'customers',
    displayName: 'Ecommerce Customers',
    kind: 'collectionType',
  },
  options: {
    draftAndPublish: false,
  },
  pluginOptions: {
    'content-manager': {
      visible: false,
    },
    'content-type-builder': {
      visible: false,
    },
  },
  attributes: {
    firstname: {
      type: 'string',
      min: 1,
      max: 50,
      configurable: false,
    },
    middlename: {
      type: 'string',
      min: 1,
      max: 50,
      configurable: false,
    },
    lastname: {
      type: 'string',
      min: 1,
      max: 50,
      configurable: false,
    },
    token: {
      type: 'string',
      configurable: false,
    },
    is_shadow: {
      type: 'boolean',
      configurable: false,
    },
    email: {
      type: 'string',
      configurable: false,
    },
    phone: {
      type: 'string',
      min: 4,
      max: 50,
      configurable: false,
    },
    cart: {
      type: 'json',
      configurable: false,
    },
    wishlist: {
      type: 'json',
      configurable: false,
    },
  },
};