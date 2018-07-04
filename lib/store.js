var Store = require('../models').Store;

exports.newStore = function (data) {
  return Store.create(data);
};
