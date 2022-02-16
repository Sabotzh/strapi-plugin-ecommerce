const randomIntFromInterval = require('../../utils/randomIntFromInterval');

module.exports = ({ strapi }) => async (ctx) => {
  const data = ctx.request.body;

  const getUniqueSlug = async (slug) => {
    const manufacturerWithTheSameSlug = await strapi
      .query('plugin::ecommerce.manufacturer')
      .findOne({ where: { slug }});

    if (manufacturerWithTheSameSlug && manufacturerWithTheSameSlug?.id !== Number(data.id)) {
      return await getUniqueSlug(slug + '-' + randomIntFromInterval(1000, 9999))
    }

    return ctx.body = { slug: slug.toLowerCase() }
  }

  return await getUniqueSlug(data.slug)
}