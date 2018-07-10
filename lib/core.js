var User = require('./user');
var Tagtrack = require('./tagtrack');
var Store = require('./store');
var StoreAccount = require('./store-account');
var Item = require('./item');
var Order = require('./order');


module.exports = {
  get $User() {
    return User;
  },
  get $Tagtrack() {
    return Tagtrack;
  },
  get $Store() {
    return Store;
  },
  get $StoreAccount() {
    return StoreAccount;
  },
  get $Item() {
    return Item
  },
  get $Order() {
    return Order
  }
};
