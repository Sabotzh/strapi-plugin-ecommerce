module.exports = {
  collectionName: 'ecommerce_orders',
  info: {
    name: 'orders',
    description: 'List of ecommerce orders',
    singularName: 'order',
    pluralName: 'orders',
    displayName: 'Ecommerce orders',
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
    name: {
      type: 'string',
      min: 1,
      max: 50,
      configurable: false,
    },
    slug: {
      type: 'uid',
      targetField: 'name',
      configurable: false,
    },
    images: {
      allowedTypes: [ 'images' ],
      type: 'media',
      multiple: true,
    },
    types: {
      type: 'relation',
      relation: 'oneToMany',
      target: 'plugin::ecommerce.type'
    },
    price: {
      type: 'integer',
      configurable: false,
    },
  },
};
