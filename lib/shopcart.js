var Shopcart = require('../models').Shopcart;
//新建一个LIST
exports.newShopcart = function (data) {
    return Shopcart.create(data);
};

exports.getUserShopcarts = function (user_id) {
    return Shopcart.find({ user: user_id }).populate("good").exec();
}

exports.deleteByUser = function (shopcart_id, user_id) {
    return Shopcart.findOneAndRemove({ $and: [{ _id: shopcart_id }, { user: user_id }] }).exec();
}

exports.removeMultiple = function (shopcart_ids) {
    return Shopcart.remove({ _id: { $in: shopcart_ids } }).exec();
}

exports.getExistPriceSetShopcart = function (user_id, price_set_id) {
    return Shopcart.findOne({ $and: [{ user: user_id }, { "price_set._id": price_set_id }] }).exec();
}

exports.getShopcartsByIds = function (shopcart_ids) {
    return Shopcart.find({ '_id': { $in: shopcart_ids } }).populate("good").exec();
}

exports.incrementShopcartItemCount = function (shopcart_id) {
    return Shopcart.findOneAndUpdate({ _id: shopcart_id }, { $inc: { item_count: 1 } }).exec();
}

exports.updateUserShopcart = function (shopcart_id, user_id, updates) {
    return Shopcart.findByIdAndUpdate({ _id: shopcart_id }, { $set: updates }).exec();
}
