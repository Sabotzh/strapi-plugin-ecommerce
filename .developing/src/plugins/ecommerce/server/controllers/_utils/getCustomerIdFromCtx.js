const jwt = require('jsonwebtoken');

module.exports = (ctx) => {
  if (!ctx || !ctx.request || !ctx.request.headers) return null;

  let customerId = null;

  const ecommersAuthHeader = ctx.request.headers['ecommerce-authorization'];
  if (ecommersAuthHeader) {
    const headerTokenFormat = ecommersAuthHeader.split(' ')[0];
    const headerToken = ecommersAuthHeader.split(' ')[1];
    if (headerTokenFormat !== 'Bearer' || !headerToken) {
      return null;
    }

    let verifiedToken = null;
    try {
      verifiedToken = jwt.verify(headerToken, process.env.JWT_SECRET);
    } catch (err) {
      return null;
    }

    if (verifiedToken && verifiedToken.ecommerceCustomerId) {
      customerId = verifiedToken.ecommerceCustomerId;
    }
  }

  return customerId;
}
