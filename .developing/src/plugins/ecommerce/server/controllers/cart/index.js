const get = require('./get');
const add = require('./add');
const subtract = require('./subtract');
const remove = require('./remove');
const removeAll = require('./removeAll');

module.exports = (globalCtx) => ({
  get: get(globalCtx),
  add: add(globalCtx),
  subtract: subtract(globalCtx),
  remove: remove(globalCtx),
  removeAll: removeAll(globalCtx),
});
