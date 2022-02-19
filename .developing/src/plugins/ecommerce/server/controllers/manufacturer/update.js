const slugify = require('slugify');
const strapiForbiddenFields = require('../_utils/strapiForbiddenFieldsForUpdate');
const validator = require('../_utils/validator');
const validateFields = require('../_utils/manufacturersValidateFileds');

module.exports = ({ strapi }) => async (ctx) => {
  const data = ctx.request.body;
  const { id } = ctx.params;

  for (const forbiddenField of strapiForbiddenFields) {
    delete data[forbiddenField];
  }

  const error = validator.require(validateFields(data))

  if (data.name) {
    const manufacturerWithTheSameName = await strapi
      .query('plugin::ecommerce.manufacturer')
      .findOne({ where: { name: data.name }});
    if (manufacturerWithTheSameName && manufacturerWithTheSameName.id !== Number(id)) {
      error.validateErrors = { ...error.validateErrors, name: `This field must be unique` }
      error.success = false
    }
  }

  if (data.slug) {
    data.slug = slugify(data.slug).toLowerCase()
    const manufacturerWithTheSameSlug = await strapi
      .query('plugin::ecommerce.manufacturer')
      .findOne({ where: { slug: data.slug } });
    if (manufacturerWithTheSameSlug && manufacturerWithTheSameSlug.id !== Number(id)) {
      error.validateErrors = { ...error.validateErrors, slug: `This field must be unique` }
      error.success = false
    }
  }

  if (!error.success) {
    ctx.status = 400;
    ctx.body = error.validateErrors
    return
  }

  ctx.body = await strapi
    .query('plugin::ecommerce.manufacturer')
    .update({ where: { id }, data });
};
