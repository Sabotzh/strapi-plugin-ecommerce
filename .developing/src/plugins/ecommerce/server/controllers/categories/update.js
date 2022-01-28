module.exports = ({ strapi }) => async(ctx) => {
  const data = ctx.request.body;
  const { id } = ctx.params;

  ctx.body = await strapi
    .query('plugin::ecommerce.category')
    .update({ where: { id }, data });
};
