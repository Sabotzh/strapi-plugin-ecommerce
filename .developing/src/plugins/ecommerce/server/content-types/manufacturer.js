module.exports = {
  collectionName: 'ecommerce_categories',
  info: {
    name: 'categories',
    description: 'List of ecommerce categories',
    singularName: 'category',
    pluralName: 'categories',
    displayName: 'Ecommerce categories',
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
    description: {
      type: 'richtext',
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
