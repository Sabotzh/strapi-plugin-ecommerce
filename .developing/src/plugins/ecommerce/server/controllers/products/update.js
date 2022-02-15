module.exports = ({ strapi }) => async(ctx) => {
  const data = ctx.request.body;
  const { id } = ctx.params;

  const productWithTheSameName = await strapi
    .query('plugin::ecommerce.product')
    .findOne({ where: { name: data.name }});

  if (productWithTheSameName && productWithTheSameName.id !== Number(id)) {
    ctx.status = 400;
    ctx.body = `Field "name" must be unique`
    return
  }

  ctx.body = await strapi
    .query('plugin::ecommerce.product')
    .update({ where: { id }, data });
};
