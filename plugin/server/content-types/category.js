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
    parent_category: {
      type: 'relation',
      relation: 'oneToOne',
      target: 'plugin::ecommerce.category',
      configurable: false,
    },
    category_level: {
      type: 'integer',
      configurable: false,
    },
    name: {
      type: 'string',
      min: 1,
      max: 50,
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