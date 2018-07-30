var Shopcart = require('../models').Shopcart;
//新建一个LIST
exports.newShopcart = function (data) {
    return Shopcart.create(data);
};

exports.getUserShopcarts = function (user_id) {
    return Shopcart.find({ user: user_id }).populate("good").exec();
}

exports.deleteUserShopcart = function (shopcart_id, user_id) {
    return Shopcart.findOneAndRemove({ $and: [{ _id: shopcart_id }, { user: user_id }] }).exec();
}

exports.updateUserShopcart = function (shopcart_id, user_id, updates) {
    return Shopcart.findByIdAndUpdate({_id: shopcart_id} , { $set: updates }).exec();
}
