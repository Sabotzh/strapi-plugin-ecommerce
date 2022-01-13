module.exports = ({ strapi }) => async(ctx) => {
  ctx.body = await strapi
    .query('plugin::ecommerce.category')
    .findMany();
};
