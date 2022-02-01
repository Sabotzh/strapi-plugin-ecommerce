const getCustomerIdFromctx = require('../_utils/getCustomerIdFromCtx');

module.exports = ({ strapi }) => async (ctx) => {
  const customerId = getCustomerIdFromctx(ctx);
  if (!customerId) {
    ctx.status = 403;
    ctx.body = 'Invalid Ecommerce Authorization';
    return;
  }

  await strapi
    .query('plugin::ecommerce.wishlist')
    .deleteMany({ where: { customerId } });

  ctx.body = [];
};
