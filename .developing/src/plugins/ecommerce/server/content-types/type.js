module.exports = {
  collectionName: 'ecommerce_types',
  info: {
    name: 'types',
    description: 'List of ecommerce types',
    singularName: 'type',
    pluralName: 'types',
    displayName: 'Ecommerce types',
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
    parent_type: {
      type: 'relation',
      relation: 'oneToOne',
      target: 'plugin::ecommerce.type'
    },
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
  },
};
