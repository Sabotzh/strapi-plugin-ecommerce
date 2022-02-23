const strapiForbiddenFields = require("../_utils/strapiForbiddenFieldsForUpdate");
const randomIntFromInterval = require('../../utils/randomIntFromInterval');

module.exports = ({ strapi }) => async (ctx) => {
  const data = ctx.request.body;

  const forbiddenFields = [ ...strapiForbiddenFields, 'category_level', 'categoryLevel' ];
  for (const forbiddenField of forbiddenFields) {
    delete data[forbiddenField];
  }

  const getSlug = async (name) => {
    const slug = name.toLowerCase().split(' ').join('-');
    const parentCategory = await strapi
      .query('plugin::ecommerce.category')
      .findOne({ where: { slug }});
    if (parentCategory) {
      return name + '-' + randomIntFromInterval(1000, 9999)
    }
    return slug
  }

  const getCategoryLevel = async(category) => {
    if (category.parentCategory) {
      const parentCategory = await strapi
        .query('plugin::ecommerce.category')
        .findOne({ where: { id: category.parentCategory }});
      if (parentCategory && parentCategory.categoryLevel) {
        return parentCategory.categoryLevel + 1;
      } else {
        return 1;
      }
    } else {
      return 1;
    }
  }

  const categoryWithTheSameName = await strapi
    .query('plugin::ecommerce.category')
    .findOne({ where: { name: data.name }, populate: ['parentCategory'] });
  if (categoryWithTheSameName) {
    if (data.parentCategory !== categoryWithTheSameName.parentCategory?.id) {
      categoryWithTheSameName.parentCategory = data.parentCategory
      console.log(categoryWithTheSameName)
      const categoryLevel = await getCategoryLevel(categoryWithTheSameName)
      const category = await strapi
        .query('plugin::ecommerce.category')
        .update({ where: { id: categoryWithTheSameName.id }, data: { parentCategory: data.parentCategory, categoryLevel } });
      ctx.body = {
        category,
        message: 'Category parent changed'
      };
      return
    }
    ctx.body = {
      category: categoryWithTheSameName,
      message: 'Category existed'
    };
    return
  }

  data.categoryLevel = await getCategoryLevel(data)
  data.slug = await getSlug(data.name)

  const category = await strapi
    .query('plugin::ecommerce.category')
    .create({ data });

  ctx.body = { category, message: 'Category created' };
}