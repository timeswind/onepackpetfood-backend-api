var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var StoreSchema = new Schema({
  tagtrack_code: { type: String, unique: true },
  name: { type: String },
  owner_name: { type: String },
  phone: { type: String },
  address: { type: String },
  note: { type: String },
  owner_user: { type: ObjectId, ref: 'User' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

StoreSchema.index({
  tagtrack_code: 1
});

module.exports = mongoose.model('Store', StoreSchema);
