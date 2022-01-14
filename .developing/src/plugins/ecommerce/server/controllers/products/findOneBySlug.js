module.exports = ({ strapi }) => async(ctx) => {
  const { slug } = ctx.params

  ctx.body = await strapi
    .query('plugin::ecommerce.product')
    .findOne({ where: { slug } });
};