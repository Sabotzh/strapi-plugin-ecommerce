const slugify = require('slugify');
const strapiForbiddenFields = require('../_utils/strapiForbiddenFieldsForUpdate');
const randomIntFromInterval = require('../../utils/randomIntFromInterval');

module.exports = ({ strapi }) => async (ctx) => {
  const data = ctx.request.body;

  if (!data.name) {
    ctx.status = 400;
    ctx.body = `Field "name" required`;
    return
  }

  const categoryWithTheSameName = await strapi
    .query('plugin::ecommerce.category')
    .findOne({ where: { name: data.name }});
  if (categoryWithTheSameName) {
    ctx.status = 400;
    ctx.body = `Field "name" must be unique`
    return
  }

  const forbiddenFields = [ ...strapiForbiddenFields, 'category_level', 'categoryLevel' ];
  for (const forbiddenField of forbiddenFields) {
    delete data[forbiddenField];
  }

  if (data.slug) {
    data.slug = slugify(data.slug)
  } else {
    data.slug = slugify(data.name)
  }
  const categoryWithTheSameSlug = await strapi
    .query('plugin::ecommerce.category')
    .findOne({ where: { slug: data.slug } });
  if (categoryWithTheSameSlug) {
    data.slug = data.slug + '-' + randomIntFromInterval(1000, 9999);
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
