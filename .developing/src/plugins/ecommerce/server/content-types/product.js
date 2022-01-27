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
    draftAndPublish: true,
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
      configurable: false,
    },
    addition_images: {
      allowedTypes: [ 'images' ],
      type: 'media',
      multiple: true,
      configurable: false,
    },
    categories: {
      type: 'relation',
      relation: 'oneToMany',
      target: 'plugin::ecommerce.category',
      configurable: false,
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
        'SELLING',
        'ON_ORDER',
        'UNAVAILABLE',
      ],
      configurable: false,
    },
    discount: {
      type: 'integer',
      configurable: false
    },
    relative_products: {
      type: 'relation',
      relation: 'manyToMany',
      target: 'plugin::ecommerce.product',
      configurable: false,
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
