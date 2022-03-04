const slugify = require('slugify');
const strapiForbiddenFields = require('../_utils/strapiForbiddenFieldsForUpdate');
const randomIntFromInterval = require("../../utils/randomIntFromInterval");

module.exports = ({ strapi }) => async (ctx) => {
  const data = ctx.request.body;

  for (const forbiddenField of strapiForbiddenFields) {
    delete data[forbiddenField];
  }

  const getSlug = async (name) => {
    const slug = slugify(name).toLowerCase();
    const manufacturer = await strapi
      .query('plugin::ecommerce.manufacturer')
      .findOne({ where: { slug }});
    if (manufacturer) {
      return slug + '-' + randomIntFromInterval(1000, 9999)
    }
    return slug
  }

  const manufacturerWithTheSameName = await strapi
    .query('plugin::ecommerce.manufacturer')
    .findOne({ where: { name: data.name }});
  if (manufacturerWithTheSameName) {
    if (data.slug && data.slug !== manufacturerWithTheSameName.slug) {
      const manufacturer = await strapi
        .query('plugin::ecommerce.manufacturer')
        .update({ where: { id: manufacturerWithTheSameName.id }, data: { name: data.name, slug } });
      ctx.body = {
        manufacturer,
        message: 'Manufacturer changed'
      };
      return
    }
    ctx.body = {
      manufacturer: manufacturerWithTheSameName,
      message: 'Manufacturer existed'
    };
    return
  }

  data.slug = data.slug || await getSlug(data.name)
  const manufacturer = await strapi
    .query('plugin::ecommerce.manufacturer')
    .create({ data });

  ctx.body = { manufacturer, message: 'Manufacturer created' };
};
