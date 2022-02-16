const create = require('./create');
const remove = require('./remove');
const update = require('./update');
const find = require('./find');
const findOne = require('./findOne');
const findOneBySlug = require('./findOneBySlug');
const findSorted = require('./findSorted')
const publish = require('./publish');
const unPublish = require('./unPublish');
const createSlug = require('./createSlug');

module.exports = (globalCtx) => ({
  create: create(globalCtx),
  remove: remove(globalCtx),
  update: update(globalCtx),
  findSorted: findSorted(globalCtx),
  find: find(globalCtx),
  findOne: findOne(globalCtx),
  findOneBySlug: findOneBySlug(globalCtx),
  publish: publish(globalCtx),
  unPublish: unPublish(globalCtx),
  createSlug:createSlug(globalCtx),
});
