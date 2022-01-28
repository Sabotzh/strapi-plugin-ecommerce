const strapiForbiddenFields = require('../_utils/strapiForbiddenFieldsForUpdate');

module.exports = ({ strapi }) => async (ctx) => {
  const data = ctx.request.body;
  const { id } = ctx.params;

  const forbiddenFields = [ ...strapiForbiddenFields, 'category_level' ];
  for (const forbiddenField of forbiddenFields) {
    delete data[forbiddenField];
  }

  ctx.body = await strapi
    .query('plugin::ecommerce.category')
    .update({ where: { id }, data });
};
