const find = require('./find');
const create = require('./create');
const update = require('./update');
const remove = require('./remove');
const publish = require('./publish');
const unPublish = require('./unPublish');
const createSlug = require('./createSlug');


module.exports = (globalCtx) => ({
  find: find(globalCtx),
  create: create(globalCtx),
  update: update(globalCtx),
  remove: remove(globalCtx),
  publish: publish(globalCtx),
  unPublish: unPublish(globalCtx),
  createSlug: createSlug(globalCtx),
});