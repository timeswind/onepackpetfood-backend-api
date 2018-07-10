var StoreAccount = require('../models').StoreAccount;

exports.newStoreAccount = function (data) {
  return StoreAccount.create(data);
};
