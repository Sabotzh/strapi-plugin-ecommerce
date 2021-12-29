module.exports = ({ strapi }) => {
  console.log('Ecommerce bootstrap');
  console.log(strapi.plugins['users-permissions'].controllers)
};
