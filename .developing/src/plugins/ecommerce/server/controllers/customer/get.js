const jwt = require('jsonwebtoken');
const getCustomerIdFromctx = require('../_utils/getCustomerIdFromCtx');

module.exports = ({ strapi }) => async (ctx) => {
  const customerId = getCustomerIdFromctx(ctx);

  let customer = null;

  if (customerId) {
    customer = await strapi
      .query('plugin::ecommerce.customer')
      .findOne({ where: { id: customerId } });
  } else if (ctx.state.isAuthenticated) {
    customer = await strapi
      .query('plugin::ecommerce.customer')
      .findOne({ where: { attachedToUser: ctx.state.user.id } });

    if (!customer) {
      customer = await strapi
        .query('plugin::ecommerce.customer')
        .create({
          data: {
            firstname: ctx.state.user.username,
            middlename: '',
            lastname: '',
            isShadow: false,
            email: ctx.state.user.email,
            phone: '',
            cart: [],
            wishlist: [],
            attachedToUser: ctx.state.user.id,
          }
        });
    }
  }

  if (!customer) {
    customer = await strapi
      .query('plugin::ecommerce.customer')
      .create({
        data: {
          firstname: '',
          middlename: '',
          lastname: '',
          isShadow: true,
          email: '',
          phone: '',
          cart: [],
          wishlist: [],
          attachedToUser: null,
        }
      });
  }

  const token = jwt.sign(
    { version: 1, ecommerceCustomerId: customer.id },
    process.env.JWT_SECRET,
  );

  ctx.body = {
    ecommerceJwt: token,
    data: customer,
  };
};
