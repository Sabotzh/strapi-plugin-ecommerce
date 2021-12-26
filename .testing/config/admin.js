module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '1ce16f15817d63241f8eca6e850d499a'),
  },
});
