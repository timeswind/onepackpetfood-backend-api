var Order = require('../models').Order;

exports.newOrder = function (data) {
  return Order.create(data);
};
