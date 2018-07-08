var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var ObjectId = Schema.Types.ObjectId;

var StoreSchema = new Schema({
  tagtrack_code: { type: String },
  name: { type: String },
  owner_name: { type: String },
  phone: { type: String },
  address: { type: String },
  note: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

// name: string;
// address: string;
// phone: string;
// owner_name: string;
// tagtrace_code: string;
// note: string;

StoreSchema.index({
  tagtrack_code: 1
});

module.exports = mongoose.model('Store', StoreSchema);
