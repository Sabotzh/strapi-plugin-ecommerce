const strapiForbiddenFields = require('../_utils/strapiForbiddenFieldsForUpdate');

module.exports = ({ strapi }) => async (ctx) => {
  const data = ctx.request.body;
  const { id } = ctx.params;

  const manufacturerWithTheSameName = await strapi
    .query('plugin::ecommerce.manufacturer')
    .findOne({ where: { name: data.name }});

  if (manufacturerWithTheSameName && manufacturerWithTheSameName.id !== Number(id)) {
    ctx.status = 400;
    ctx.body = `Field "name" must be unique`
    return
  }

  for (const forbiddenField of strapiForbiddenFields) {
    delete data[forbiddenField];
  }

  ctx.body = await strapi
    .query('plugin::ecommerce.manufacturer')
    .update({ where: { id }, data });
};
