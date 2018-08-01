var Good = require('../models').Good;

exports.newGood = function (data) {
    return Good.create(data);
};

exports.getGoodDetail = function (good_id) {
    return Good.findOne({ _id: good_id }).exec()
}

exports.getGoodsByStoreId = function (store_id) {
    return Good.find({ store: store_id }).exec();
}

exports.update = function (good_id, updates) {
    console.log(updates)
    return Good.findOneAndUpdate({ "_id": good_id }, { "$set": updates }, { new: true }).exec()
}

exports.deleteById = function (good_id) {
    return Good.findOneAndRemove({ "_id": good_id }).exec();
}

exports.getGoodsByCategoryAndStore = function (category_id, store_id) {
    return Good.find({ $and: [{ category: category_id }, { store: store_id }] }).exec();
}

exports.setPublishedState = function (good_id, state) {
    return Good.findOneAndUpdate({ "_id": good_id }, { "$set": { "published": state } }, { new: true }).exec()
}
