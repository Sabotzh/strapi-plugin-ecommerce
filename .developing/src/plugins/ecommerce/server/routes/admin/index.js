module.exports = {
  type: 'admin',
  routes: [
    {
      method: "GET",
      path: "/cart",
      handler: "cart.get",
      config: {
        policies: [],
      },
    },
  ],
};
