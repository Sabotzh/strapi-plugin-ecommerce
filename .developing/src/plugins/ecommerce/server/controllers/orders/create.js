module.exports = ({ strapi }) => async (ctx) => {
  const data = ctx.request.body;

  console.log(ctx.request);

  if (!data.name) {
    ctx.status = 400;
    ctx.body = `Field "products" required`;
    return;
  }

  ctx.body = await strapi
    .query('plugin::ecommerce.order')
    .create({ data });
};
