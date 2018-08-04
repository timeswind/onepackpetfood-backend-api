var Address = require('../models').Address;

exports.newAddress = function (data) {
    return Address.create(data);
};

exports.updateAddress = function (address_id, user_id, updates) {
    return Address.findOneAndUpdate({ $and: [{ _id: address_id }, { user: user_id }] }, { $set: updates }).exec()
}

exports.getAddressesById = function (address_id) {
    return Address.findOne({ _id: address_id }).exec()
}

exports.getAddressesByUserId = function (user_id) {
    return Address.find({ user: user_id }).exec()
}

exports.getUserDefaultAddress = function (user_id) {
    return Address.findOne({ $and: [{ user: user_id }, { isDefault: true }] }).exec()
}

exports.removeDefault = function (address_id) {
    return Address.findOneAndUpdate({ _id: address_id }, { isDefault: false }).exec();
}

exports.deleteByUser = function (address_id, user_id) {
    return Address.findOneAndRemove({ $and: [{ _id: address_id }, { user: user_id }] }).exec();
}
