const get = require('./get');
const find = require('./find');
const update = require('./update');
const updateFromAdminPanel = require('./updateFromAdminPanel')
const attach = require('./attach');
const unfasten = require('./unfasten');

module.exports = (globalCtx) => ({
  get: get(globalCtx),
  find: find(globalCtx),
  update: update(globalCtx),
  updateFromAdminPanel: updateFromAdminPanel(globalCtx),
  attach: attach(globalCtx),
  unfasten: unfasten(globalCtx),
});
