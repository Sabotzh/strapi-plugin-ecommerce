module.exports = {
  collectionName: 'ecommerce_users',
  info: {
    name: 'Users',
    description: 'List of ecommerce users',
    singularName: 'user',
    pluralName: 'users',
    displayName: 'Ecommerce Users',
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
    lastname: {
      type: 'string',
      min: 1,
      max: 50,
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
