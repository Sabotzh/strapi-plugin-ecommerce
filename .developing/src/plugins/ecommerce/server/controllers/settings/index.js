const create = require('./create');
const update = require('./update');
const remove = require('./remove');
const find = require('./find');
const findOneByKey = require('./findOneByKey');

module.exports = (globalCtx) => ({
  create: create(globalCtx),
  update: update(globalCtx),
  remove: remove(globalCtx),
  find: find(globalCtx),
  findOneByKey: findOneByKey(globalCtx),
});
