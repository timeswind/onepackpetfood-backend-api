var User = require('./user');
var Tagtrack = require('./tagtrack');
var Store = require('./store');
var StoreAccount = require('./store-account');
var Good = require('./good');
var Order = require('./order');
var Category = require('./category');
var Dropshipping = require('./dropshipping');
var Address = require('./address');
var Shopcart = require('./shopcart')
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
  get $Good() {
    return Good
  },
  get $Order() {
    return Order
  },
  get $Category() {
    return Category
  },
  get $Dropshipping() {
    return Dropshipping
  },
  get $Address() {
    return Address
  },
  get $Shopcart() {
    return Shopcart
  }
};
