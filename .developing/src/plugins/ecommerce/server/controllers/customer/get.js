const jwt = require('jsonwebtoken');

module.exports = ({ strapi }) => async (ctx) => {
  const isGenerateNewCustomer = true;
  let customer = null;

  if (isGenerateNewCustomer) {
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
