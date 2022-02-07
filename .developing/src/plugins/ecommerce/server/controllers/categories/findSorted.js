module.exports = ({ strapi }) => async(ctx) => {
  const { sort } = ctx.params;

  const categories = await strapi
    .query('plugin::ecommerce.category')
    .findMany({ populate: { parentCategory: true } });

  const reformattedCategories = {}
  // reform arr to obj
  categories.forEach(el => reformattedCategories[el.id] = el)

  const sortedCategories = []
  // add category and category_parent
  const sortCategories = (category) => {
    sortedCategories.push(category)
    if (category.parentCategory) sortCategories(reformattedCategories[category.parentCategory.id])
  }

  categories.map(category => {
    if (category.name === sort) sortCategories(category)
  })

  ctx.body = sortedCategories
};
