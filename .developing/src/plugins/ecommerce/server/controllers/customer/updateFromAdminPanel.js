const strapiForbiddenFields = require('../_utils/strapiForbiddenFieldsForUpdate');

module.exports = ({ strapi }) => async (ctx) => {
  const data = ctx.request.body;
  const { id } = ctx.params;

  const forbiddenFields = [ ...strapiForbiddenFields, 'is_shadow', 'isShadow', 'attached_to_user', 'attachedToUser' ];
  for (const forbiddenField of forbiddenFields) {
    delete data[forbiddenField];
  }

  ctx.body = await strapi
    .query('plugin::ecommerce.customer')
    .update({ where: { id }, data });
};
