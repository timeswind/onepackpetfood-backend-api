var Store = require('../models').Store;

exports.newStore = function (data) {
  return Store.create(data);
};

exports.getAll = function () {
  return Store.find({}).sort({ _id: -1 }).exec();
};

exports.update = function (store_id, updates) {
  return Store.findOneAndUpdate({ "_id": store_id }, { "$set": updates }, { new: true }).exec()
}

exports.getStoreByOwnerId = function (user_id) {
  return Store.findOne({owner_user: user_id}).exec();
}

exports.getStoreByTagtrack = function (tagtrack) {
  return Store.findOne({tagtrack_code: tagtrack}).exec();
}

exports.getUnbindStoreByTagtrack = function (tagtrack) {
  return Store.findOne({tagtrack_code: tagtrack, owner_user: {$exists: false}}).exec();
}

exports.bindStoreWithUserById = function (store_id, user_id) {
  return Store.findOneAndUpdate({ "_id": store_id }, { "$set": {owner_user: user_id} }, { new: true }).exec()
}