module.exports = {
  collectionName: 'ecommerce_manufacturers',
  info: {
    name: 'manufacturers',
    description: 'List of ecommerce manufacturers',
    singularName: 'manufacturer',
    pluralName: 'manufacturers',
    displayName: 'Ecommerce manufacturers',
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
    shortDescription: {
      type: 'text',
      configurable: false,
    },
    description: {
      type: 'richtext',
      configurable: false,
    },
    image: {
      allowedTypes: [ 'images' ],
      type: 'media',
      multiple: false,
      configurable: false,
    },
    additionImages: {
      allowedTypes: [ 'images' ],
      type: 'media',
      multiple: true,
      configurable: false,
    },
    metaTitle: {
      type: 'string',
      configurable: false,
    },
    metaDescription: {
      type: 'string',
      configurable: false,
    },
    metaKeywords: {
      type: 'string',
      configurable: false,
    },
  },
};
