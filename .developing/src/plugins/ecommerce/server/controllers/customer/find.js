module.exports = ({ strapi }) => async (ctx) => {
  ctx.body = await strapi
    .query('plugin::ecommerce.customer')
    .findMany({ orderBy: { id: 'asc' } });
};
