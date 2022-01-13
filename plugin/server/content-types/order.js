module.exports = {
  collectionName: 'ecommerce_products',
  info: {
    name: 'products',
    description: 'List of ecommerce products',
    singularName: 'product',
    pluralName: 'products',
    displayName: 'Ecommerce products',
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
      visible: true,
    },
  },
  attributes: {
    user: {
      type: 'relation',
      relation: 'oneToOne',
      target: 'plugin::ecommerce.user'
    },
    products: {
      type: 'json',
      configurable: false,
    },
  },
};
