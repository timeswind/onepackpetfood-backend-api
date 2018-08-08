var Order = require('../models').Order;

exports.newOrder = function (data) {
  return Order.create(data);
};

exports.getOrderById = function (order_id) {
  return Order.findOne({ _id: order_id }).exec();
}

exports.getOrdersByUser = function (user_id) {
  return Order.find({ user: user_id }).populate("packages.good").sort({ _id: -1 }).exec();
}

exports.getOrdersByUserAndStatus = function (user_id, status) {
  return Order.find({ $and: [{ user: user_id }, { status: status }] }).populate("packages.good").exec();
}

exports.getOrdersByTagtrack = function (tagtrack_id) {
  return Order.find({ store_trackcode: tagtrack_id }).populate("packages.good").exec();
}

exports.orderPaid = function (order_id, payment_method, payment, pay_at) {
  return Order.findOneAndUpdate({ _id: order_id }, {
    $set: {
      payment_type: payment_method,
      status: "WAIT_SELLER_SEND_GOODS",
      payment: payment,
      pay_at: pay_at
    }
  }).exec();
}

//internal functions

exports.getAllOrdersInternal = function () {
  return Order.find({}).populate("packages.good").sort({ _id: -1 }).exec();
}

exports.getOrderDetailInternal = function (order_id) {
  return Order.findOne({ _id: order_id }).populate([{
    path: 'user',
    select: 'name phone union_tagtrack_id wx_nickname'
  }, {
    path: 'packages.good'
  }]).exec();
}