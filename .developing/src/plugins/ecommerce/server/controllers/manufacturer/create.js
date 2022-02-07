const slugify = require('slugify');
const strapiForbiddenFields = require('../_utils/strapiForbiddenFieldsForUpdate');
const randomIntFromInterval = require('../../utils/randomIntFromInterval');

module.exports = ({ strapi }) => async (ctx) => {
  const data = ctx.request.body;
  console.log('ff', data)
  if (!data.name) {
    ctx.status = 400;
    ctx.body = `Field "name" required`;
    return
  }

  const manufacturerWithTheSameName = await strapi
    .query('plugin::ecommerce.manufacturer')
    .findOne({ where: { name: { $contains: data.name } }});
  if (manufacturerWithTheSameName) {
    ctx.status = 400;
    ctx.body = `Field "name" must be unique`
    return
  }

  const forbiddenFields = [ ...strapiForbiddenFields ];
  for (const forbiddenField of forbiddenFields) {
    delete data[forbiddenField];
  }

  if (data.slug) {
    data.slug = slugify(data.slug)
  } else {
    data.slug = slugify(data.name)
  }
  const manufacturerWithTheSameSlug = await strapi
    .query('plugin::ecommerce.manufacturer')
    .findOne({ where: { slug: data.slug } });
  if (manufacturerWithTheSameSlug) {
    data.slug = data.slug + '-' + randomIntFromInterval(1000, 9999);
  }

  ctx.body = await strapi
    .query('plugin::ecommerce.manufacturer')
    .create({ data });
};
