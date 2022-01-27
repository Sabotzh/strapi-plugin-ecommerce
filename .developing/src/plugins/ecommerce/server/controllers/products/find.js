module.exports = ({ strapi }) => async(ctx) => {
  ctx.body = await strapi
    .query('plugin::ecommerce.product')
    .findMany({ populate: { categories: true } });
};

