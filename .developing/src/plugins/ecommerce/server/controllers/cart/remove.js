const getCustomerIdFromctx = require('../_utils/getCustomerIdFromCtx');

module.exports = ({ strapi }) => async (ctx) => {
  const id = ctx.params.id;

  const customerId = getCustomerIdFromctx(ctx);
  if (!customerId) {
    ctx.status = 403;
    ctx.body = 'Invalid Ecommerce Authorization';
    return;
  }

  await strapi
    .query('plugin::ecommerce.cart')
    .delete({ where: { id, customerId } });

  ctx.body = await strapi
    .query('plugin::ecommerce.cart')
    .findMany({ where: { customerId } });
};
