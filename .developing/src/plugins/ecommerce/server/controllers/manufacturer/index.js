const find = require('./find')
const create = require('./create')
const update = require('./update')

module.exports = (globalCtx) => ({
  find: find(globalCtx),
  create: create(globalCtx),
  update: update(globalCtx,)
});