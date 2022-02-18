module.exports = ({ strapi }) => async (ctx) => {
  const data = ctx.request.body;
  const { key } = ctx.params;

  if (typeof data.value === 'undefined') {
    ctx.status = 400;
    ctx.body = 'Field "value" is undefined'
  }


  ctx.body = await strapi
    .query('plugin::ecommerce.setting')
    .update({ where: { key }, data: { value: data.value } });
}