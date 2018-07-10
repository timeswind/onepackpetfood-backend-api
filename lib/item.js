var Item = require('../models').Item;

exports.newItem = function (data) {
  return Item.create(data);
};
