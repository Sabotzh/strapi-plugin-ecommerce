module.exports = ({ strapi }) => async (ctx) => {
  ctx.body = await strapi
    .query('plugin::ecommerce.setting')
    .findMany(ctx.query);
};
