const contentTypes = require('./server/content-types');

module.exports = () => ({
  register({ strapi }) {
    console.log('Ecommerce register');
  },
  bootstrap({ strapi }) {
    console.log('Ecommerce bootstrap');
  },
  destroy({ strapi }) {
    console.log('Ecommerce destroy');
  },
  contentTypes,
});
