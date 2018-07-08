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