const slugify = require('slugify');
const validateFields = require('../_utils/productsValidateFields');
const validator = require('../_utils/validator');
const strapiForbiddenFields = require('../_utils/strapiForbiddenFieldsForUpdate');

module.exports = ({ strapi }) => async (ctx) => {
  const data = ctx.request.body;

  for (const forbiddenField of strapiForbiddenFields) {
    delete data[forbiddenField];
  }

  const validateRequires = validator.require(validateFields(data).required)
  const validateNumbers = validator.numbers(validateFields(data).numbers)

  if (data.name) {
    const productWithTheSameName = await strapi
      .query('plugin::ecommerce.product')
      .findOne({ where: { name: data.name }});
    if (productWithTheSameName) {
      validateRequires.validateErrors = { ...validateRequires.validateErrors, name: `This field must be unique` }
      validateRequires.success = false
    }
  }

  if (data.slug) {
    data.slug = slugify(data.slug).toLowerCase()
    const productWithTheSameSlug = await strapi
      .query('plugin::ecommerce.product')
      .findOne({ where: { slug: data.slug } });
    if (productWithTheSameSlug) {
      validateRequires.validateErrors = { ...validateRequires.validateErrors, slug: `This field must be unique` }
      validateRequires.success = false
    }
  }

  if (!validateRequires.success || !validateNumbers.success) {
    ctx.status = 400;
    ctx.body = { ...validateNumbers.validateErrors, ...validateRequires.validateErrors }
    return
  }

  ctx.body = await strapi
    .query('plugin::ecommerce.product')
    .create({ data });
};
