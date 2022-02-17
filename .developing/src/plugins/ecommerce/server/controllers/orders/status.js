module.exports = ({ strapi }) => async(ctx) => {
  const data = ctx.request.body;
  const { id } = ctx.params;

  if (data.status !== 'PENDING' && data.status !== 'DELIVERED' && data.status !== 'PROCESSING') {
    ctx.status = 400;
    ctx.body = 'Status must be "PENDING" or "DELIVERED" or "PROCESSING"';
    return
  }

  ctx.body = await strapi
    .query('plugin::ecommerce.order')
    .update({ where: { id }, data: { status: data.status } });
};
