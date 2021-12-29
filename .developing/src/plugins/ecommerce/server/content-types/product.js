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
    sku: {
      type: 'string',
      configurable: false,
    },
    description: {
      type: 'richtext',
      configurable: false,
    },
    short_description: {
      type: 'string',
      configurable: false,
    },
    image: {
      allowedTypes: [ 'images' ],
      type: 'media',
      multiple: false,
    },
    addition_images: {
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
    quantity: {
      type: 'integer',
      configurable: false,
    },
    min_quantity: {
      type: 'integer',
      configurable: false,
    },
    date_available: {
      type: 'date',
      configurable: false,
    },
    status: {
      type: 'enumeration',
      enum: [
        'enabled',
        'disabled',
      ],
      configurable: false,
    },
    relative_products: {
      type: 'relation',
      relation: 'manyToMany',
      target: 'plugin::ecommerce.product'
    },
    meta_title: {
      type: 'string',
      configurable: false,
    },
    meta_description: {
      type: 'string',
      configurable: false,
    },
    meta_keywords: {
      type: 'string',
      configurable: false,
    },
  },
};
