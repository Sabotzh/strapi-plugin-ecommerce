const get = require('./get');
const update = require('./update');
const attach = require('./attach');
const unfasten = require('./unfasten');

module.exports = (globalCtx) => ({
  get: get(globalCtx),
  update: update(globalCtx),
  attach: attach(globalCtx),
  unfasten: unfasten(globalCtx),
});
