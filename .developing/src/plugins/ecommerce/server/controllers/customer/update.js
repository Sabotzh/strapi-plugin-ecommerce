const strapiForbiddenFields = require('../_utils/strapiForbiddenFieldsForUpdate');
const getCustomerIdFromctx = require('../_utils/getCustomerIdFromCtx');

module.exports = ({ strapi }) => async (ctx) => {
  const data = ctx.request.body;
  const customerId = getCustomerIdFromctx(ctx);
  if (!customerId) {
    ctx.status = 403;
    ctx.body = 'Invalid Ecommerce Authorization';
    return;
  }

  const forbiddenFields = [ ...strapiForbiddenFields, 'is_shadow', 'isShadow', 'attached_to_user', 'attachedToUser' ];
  for (const forbiddenField of forbiddenFields) {
    delete data[forbiddenField];
  }

  ctx.body = await strapi
    .query('plugin::ecommerce.customer')
    .update({ where: { id: customerId }, data });
};
