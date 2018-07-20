var StoreAccount = require('../models').StoreAccount;

exports.newStoreAccount = function (data) {
  return StoreAccount.create(data);
};

exports.getStoreAccountByStoreId = function (store_id) {
  return StoreAccount.findOne({ store: store_id }).exec();
}
