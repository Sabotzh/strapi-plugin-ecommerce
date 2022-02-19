const slugify = require('slugify');
const strapiForbiddenFields = require('../_utils/strapiForbiddenFieldsForUpdate');
const validateFields = require('../_utils/categoriesValidateFields');
const validator = require('../_utils/validator');

module.exports = ({ strapi }) => async (ctx) => {
  const data = ctx.request.body;

  const forbiddenFields = [ ...strapiForbiddenFields, 'category_level', 'categoryLevel' ];
  for (const forbiddenField of forbiddenFields) {
    delete data[forbiddenField];
  }

  const error = validator.require(validateFields(data))

  if (data.name) {
    const categoryWithTheSameName = await strapi
      .query('plugin::ecommerce.category')
      .findOne({ where: { name: data.name }});
    if (categoryWithTheSameName) {
      error.validateErrors = { ...error.validateErrors, name: `This field must be unique` }
      error.success = false
    }
  }

  if (data.slug) {
    data.slug = slugify(data.slug).toLowerCase()
    const categoryWithTheSameSlug = await strapi
      .query('plugin::ecommerce.category')
      .findOne({ where: { slug: data.slug } });
    if (categoryWithTheSameSlug) {
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

  const category = await strapi
    .query('plugin::ecommerce.category')
    .create({ data });

  category.parent_category = data.parentCategory;

  ctx.body = category;
};
