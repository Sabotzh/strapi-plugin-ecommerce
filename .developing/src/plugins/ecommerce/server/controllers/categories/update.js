const strapiForbiddenFields = require('../_utils/strapiForbiddenFieldsForUpdate');

module.exports = ({ strapi }) => async (ctx) => {
  const data = ctx.request.body;
  const { id } = ctx.params;

  const categoryWithTheSameName = await strapi
    .query('plugin::ecommerce.category')
    .findOne({ where: { name: data.name }});

  if (categoryWithTheSameName && categoryWithTheSameName.id !== Number(id)) {
    ctx.status = 400;
    ctx.body = `Field "name" must be unique`
    return
  }

  const forbiddenFields = [ ...strapiForbiddenFields, 'category_level', 'categoryLevel' ];
  for (const forbiddenField of forbiddenFields) {
    delete data[forbiddenField];
  }

  ctx.body = await strapi
    .query('plugin::ecommerce.category')
    .update({ where: { id }, data });
};
