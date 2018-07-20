var mongoose = require('mongoose');
var config = require('config-lite');

mongoose.Promise = global.Promise;
mongoose.connect(config.mongodb.developmentUrl, function (err) {
  if (err) {
    console.error('connect to %s error: ', config.mongodb.url, err.message);
    process.exit(1);
  }
});

exports.User = require('./User');
exports.Tagtrack = require('./Tagtrack');
exports.Store = require('./Store');
exports.StoreAccount = require('./StoreAccount');
exports.Item = require('./Item');
exports.Order = require('./Order');
exports.Category = require('./Category');
