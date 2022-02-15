const get = require('./get');
const find = require('./find');
const update = require('./update');
const attach = require('./attach');
const unfasten = require('./unfasten');

module.exports = (globalCtx) => ({
  get: get(globalCtx),
  find: find(globalCtx),
  update: update(globalCtx),
  attach: attach(globalCtx),
  unfasten: unfasten(globalCtx),
});
