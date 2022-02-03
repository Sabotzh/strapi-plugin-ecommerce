const find = require('./find')

module.exports = (globalCtx) => ({
  find: find(globalCtx),
});