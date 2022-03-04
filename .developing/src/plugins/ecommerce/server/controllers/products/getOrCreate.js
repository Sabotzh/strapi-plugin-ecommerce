const strapiForbiddenFields = require('../_utils/strapiForbiddenFieldsForUpdate');
const randomIntFromInterval = require('../../utils/randomIntFromInterval');
const slugify = require('slugify');

module.exports = ({ strapi }) => async (ctx) => {
  const data = ctx.request.body;

  for (const forbiddenField of strapiForbiddenFields) {
    delete data[forbiddenField];
  }

  const getSlug = async (name, id=null) => {
    const slug = slugify(name).toLowerCase();
    const productWithTheSameName = await strapi
      .query('plugin::ecommerce.product')
      .findOne({ where: { slug }});
    if (productWithTheSameName && !id && productWithTheSameName.id !== id) {
      return slug + '-' + randomIntFromInterval(1000, 9999)
    }
    return slug
  }

  const productWithTheSameName = await strapi
    .query('plugin::ecommerce.product')
    .findOne({ where: { name: data.name }, populate: ['categories'] });

  if (productWithTheSameName) {
    data.slug = await getSlug(data.name, productWithTheSameName.id)
    const product = await strapi
      .query('plugin::ecommerce.product')
      .update({ where: { id: productWithTheSameName.id }, data });
    ctx.body = {
      product,
      message: 'Category parent changed'
    }
    return
  }

  data.slug = await getSlug(data.name)
  const product = await strapi
    .query('plugin::ecommerce.product')
    .create({ data });

  ctx.body = { product, message: 'Category created' };
}