var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var ObjectId = Schema.Types.ObjectId;

var StoreAccountSchema = new Schema({
  user: { type: ObjectId, required: true, ref: 'User' },
  store: { type: ObjectId, required: true, ref: 'Store' },
  balance: { type: Number }
});

StoreAccountSchema.index({user: 1});

module.exports = mongoose.model('StoreAccount', StoreAccountSchema);
