module.exports = ({ strapi }) => async(ctx) => {
  const data = ctx.request.body;
  const { id } = ctx.params;

  ctx.body = await strapi
    .query('plugin::ecommerce.product')
    .update({ where: { id }, data });
};
