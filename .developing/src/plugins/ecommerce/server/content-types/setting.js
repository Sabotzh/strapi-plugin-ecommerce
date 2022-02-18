module.exports = {
  collectionName: 'ecommerce_settings',
  info: {
    name: 'settings',
    description: 'List of ecommerce customers carts',
    singularName: 'setting',
    pluralName: 'settings',
    displayName: 'Ecommerce Settings',
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
    key: {
      type: 'string',
      unique: true,
      configurable: false,
    },
    value: {
      type: 'string',
      configurable: false,
    },
  },
};
