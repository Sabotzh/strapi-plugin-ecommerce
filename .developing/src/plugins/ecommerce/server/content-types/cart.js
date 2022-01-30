module.exports = {
  collectionName: 'ecommerce_cart',
  info: {
    name: 'Cart',
    description: 'List of ecommerce customers carts',
    singularName: 'cart',
    pluralName: 'cart',
    displayName: 'Ecommerce Cart',
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
    customerId: {
      type: 'string',
      min: 1,
      max: 50,
      configurable: false,
    },
    productId: {
      type: 'string',
      min: 1,
      max: 50,
      configurable: false,
    },
  },
};
