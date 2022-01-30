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
      visible: true,
    },
  },
  attributes: {
    customer: {
      type: 'relation',
      relation: 'oneToOne',
      target: 'plugin::ecommerce.customer',
      configurable: false,
    },
    products: {
      type: 'json',
      configurable: false,
    },
    shippingAddress: {
      type: "string",
      configurable: false,
    },
    method: {
      type: "string",
      configurable: false,
    },
    status: {
      type: "string",
      configurable: false,
    },
    time: {
      type: "datetime",
      configurable: false,
    }
  },
};
