const getCustomerIdFromctx = require('../_utils/getCustomerIdFromCtx');

module.exports = ({ strapi }) => async (ctx) => {
  const data = ctx.request.body;
  if (!data || !data.productId) {
    ctx.status = 400;
    ctx.body = 'Field "productId" required';
    return;
  }

  const productId = data.productId;
  const amount = data.amount || 1;
  const customerId = getCustomerIdFromctx(ctx);
  if (!customerId) {
    ctx.status = 403;
    ctx.body = 'Invalid Ecommerce Authorization';
    return;
  }

  const createdProduct = await strapi
    .query('plugin::ecommerce.cart')
    .findOne({
      where: {
        customerId,
        productId,
      }
    });

  if (createdProduct) {
    const newAmount = Number(createdProduct.amount) + Number(amount);
    ctx.body = await strapi
      .query('plugin::ecommerce.cart')
      .update({
        where: {
          id: createdProduct.id,
        },
        data: {
          amount: newAmount,
        },
      });
  } else {
    await strapi
      .query('plugin::ecommerce.cart')
      .create({
        data: {
          customerId,
          productId,
          amount,
        }
      });
  }

  ctx.body = await strapi
    .query('plugin::ecommerce.cart')
    .findMany({ where: { customerId } });
};
