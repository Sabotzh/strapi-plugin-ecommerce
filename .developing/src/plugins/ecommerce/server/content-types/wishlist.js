module.exports = {
  collectionName: 'ecommerce_wishlist',
  info: {
    name: 'Wishlist',
    description: 'List of ecommerce customers wishlists',
    singularName: 'wishlist',
    pluralName: 'wishlist',
    displayName: 'Ecommerce Wishlist',
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
      configurable: false,
    },
    productId: {
      type: 'string',
      configurable: false,
    },
  },
};
