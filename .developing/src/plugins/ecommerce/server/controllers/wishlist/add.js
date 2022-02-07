const getCustomerIdFromctx = require('../_utils/getCustomerIdFromCtx');

module.exports = ({ strapi }) => async (ctx) => {
  const data = ctx.request.body;
  if (!data || !data.productId) {
    ctx.status = 400;
    ctx.body = 'Field "productId" required';
    return;
  }

  const productId = data.productId;
  const customerId = getCustomerIdFromctx(ctx);
  if (!customerId) {
    ctx.status = 403;
    ctx.body = 'Invalid Ecommerce Authorization';
    return;
  }

  const createdProduct = await strapi
    .query('plugin::ecommerce.wishlist')
    .findOne({
      where: {
        customerId,
        productId,
      }
    });

  if (!createdProduct) {
    await strapi
      .query('plugin::ecommerce.wishlist')
      .create({
        data: {
          customerId,
          productId,
        }
      });
  }

  ctx.body = await strapi
    .query('plugin::ecommerce.wishlist')
    .findMany({ where: { customerId } });
};

