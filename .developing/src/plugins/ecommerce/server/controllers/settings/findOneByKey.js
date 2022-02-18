module.exports = ({ strapi }) => async (ctx) => {
  const { key } = ctx.params;

  ctx.body = await strapi
    .query('plugin::ecommerce.setting')
    .findOne({ where: { key } });
};
