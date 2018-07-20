var User = require('./user');
var Tagtrack = require('./tagtrack');
var Store = require('./store');
var StoreAccount = require('./store-account');
var Item = require('./item');
var Order = require('./order');
var Category = require('./category');


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
  },
  get $Category() {
    return Category
  }
};
