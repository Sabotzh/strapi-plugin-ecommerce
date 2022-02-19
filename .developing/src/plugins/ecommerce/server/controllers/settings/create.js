module.exports = ({ strapi }) => async (ctx) => {
  const data = ctx.request.body;

  const settingWithTheSameKey = await strapi
    .query('plugin::ecommerce.setting')
    .findOne({ where: { key: data.key }});
  if (settingWithTheSameKey) {
    ctx.status = 400;
    ctx.body = '"Key" must be unique'
    return
  }

  await strapi
    .query('plugin::ecommerce.setting')
    .create({ data });
}