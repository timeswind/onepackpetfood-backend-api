var User = require('./user');
var Tagtrack = require('./tagtrack');
var Store = require('./store');
// var Article = require('./article');
// var Card = require('./card');
// var CardTemplate = require('./cardtemplate');
// var Store = require('./store');

module.exports = {
  get $User () {
    return User;
  },
  get $Tagtrack () {
    return Tagtrack;
  },
  get $Store () {
    return Store;
  }
  // get $Card () {
  //   return Card;
  // },
  // get $CardTemplate () {
  //   return CardTemplate;
  // },
  // get $Store() {
  //   return Store;
  // }
};
