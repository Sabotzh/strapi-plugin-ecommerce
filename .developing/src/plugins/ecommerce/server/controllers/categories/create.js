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
    .findOne({ where: { name: { $contains: data.name } }});
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

  if (data.parent_category) {
    const parentCategory = await strapi
      .query('plugin::ecommerce.category')
      .findOne({ where: { id: data.parent_category } });

    if (parentCategory && parentCategory.category_level) {
      data.category_level = parentCategory.category_level + 1;
    } else {
      data.parent_category = null;
      data.category_level = 1;
    }
  } else {
    data.category_level = 1;
  }

  const category = await strapi
    .query('plugin::ecommerce.category')
    .create({ data });

  category.parent_category = data.parent_category;

  ctx.body = category;
};
