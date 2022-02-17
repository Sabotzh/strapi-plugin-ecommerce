const strapiForbiddenFields = require('../_utils/strapiForbiddenFieldsForUpdate');
const validateFields = require('../_utils/categoriesValidateFields');
const validator = require('../_utils/validator');
const slugify = require('slugify');

module.exports = ({ strapi }) => async (ctx) => {
  const data = ctx.request.body;
  const { id } = ctx.params;

  const forbiddenFields = [ ...strapiForbiddenFields, 'category_level', 'categoryLevel' ];
  for (const forbiddenField of forbiddenFields) {
    delete data[forbiddenField];
  }

  const error = validator.require(validateFields(data))

  if (data.name) {
    const categoryWithTheSameName = await strapi
      .query('plugin::ecommerce.category')
      .findOne({ where: { name: data.name }});
    if (categoryWithTheSameName && categoryWithTheSameName.id !== Number(id)) {
      error.validateErrors = { ...error.validateErrors, name: `This field must be unique` }
      error.success = false
    }
  }

  if (data.slug) {
    data.slug = slugify(data.slug).toLowerCase()
    const categoryWithTheSameSlug = await strapi
      .query('plugin::ecommerce.category')
      .findOne({ where: { slug: data.slug } });
    if (categoryWithTheSameSlug && categoryWithTheSameSlug.id !== Number(id)) {
      error.validateErrors = { ...error.validateErrors, slug: `This field must be unique` }
      error.success = false
    }
  }

  if (!error.success) {
    ctx.status = 400;
    ctx.body = error.validateErrors
    return
  }

  if (data.parentCategory) {
    const parentCategory = await strapi
      .query('plugin::ecommerce.category')
      .findOne({ where: { id: data.parentCategory } });
    if (parentCategory && parentCategory.categoryLevel) {
      data.categoryLevel = parentCategory.categoryLevel + 1;
    } else {
      data.categoryLevel = null;
      data.categoryLevel = 1;
    }
  } else {
    data.categoryLevel = 1;
  }

  ctx.body = await strapi
    .query('plugin::ecommerce.category')
    .update({ where: { id }, data });
};
