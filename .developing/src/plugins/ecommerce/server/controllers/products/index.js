const find = require('./find');
const findOne = require('./findOne');
const findOneBySlug = require('./findOneBySlug');

module.exports = (globalCtx) => ({
  find: find(globalCtx),
  findOne: findOne(globalCtx),
  findOneBySlug: findOneBySlug(globalCtx),
});
