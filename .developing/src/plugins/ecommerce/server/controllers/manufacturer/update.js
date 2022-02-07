const strapiForbiddenFields = require('../_utils/strapiForbiddenFieldsForUpdate');

module.exports = ({ strapi }) => async (ctx) => {
  const data = ctx.request.body;
  const { id } = ctx.params;

  for (const forbiddenField of strapiForbiddenFields) {
    delete data[forbiddenField];
  }

  ctx.body = await strapi
    .query('plugin::ecommerce.manufacturer')
    .update({ where: { id }, data });
};
