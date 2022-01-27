const slugify = require('slugify');
const randomIntFromInterval = require('../../utils/randomIntFromInterval');

module.exports = ({ strapi }) => async(ctx) => {
  const data = ctx.request.body;
  const { id } = ctx.params;

  if (data.slug) {
    data.slug = slugify(data.slug);
  } else {
    data.slug = slugify(data.name);
  }
  const categoryWithTheSameSlug = await strapi
    .query('plugin::ecommerce.category')
    .findOne({ where: { slug: data.slug } });
  console.log(categoryWithTheSameSlug);
  if (categoryWithTheSameSlug) {
    data.slug = data.slug + '-' + randomIntFromInterval(1000, 9999);
  }

  ctx.body = await strapi
    .query('plugin::ecommerce.category')
    .update({ where: { id }, data });
};
