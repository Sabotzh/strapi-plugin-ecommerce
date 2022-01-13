const find = require('./find');
const findOne = require('./findOne');
const create = require('./create');

module.exports = (globalCtx) => ({
  find: find(globalCtx),
  findOne: findOne(globalCtx),
  create: create(globalCtx),
});
