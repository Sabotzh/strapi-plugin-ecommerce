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
    image: {
      type: 'media',
      multiple: false,
      required: false,
      allowedTypes: [
        'images'
      ],
      configurable: false,
    },
    name: {
      type: 'string',
      min: 1,
      max: 50,
      unique: true,
      configurable: false,
    },
    parentCategory: {
      type: 'relation',
      relation: 'oneToOne',
      target: 'plugin::ecommerce.category',
      configurable: false,
    },
    categoryLevel: {
      type: 'integer',
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
    slug: {
      type: 'uid',
      targetField: 'name',
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
