var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var StoreSchema = new Schema({
  owner: { type: ObjectId, ref: 'User', require: true },
  name: { type: String, require: true },
  address: {
    formattedAddress: String,
    streetAddress: String,
    addressLocality: String,
    addressRegion: String,
    postalCode: String,
    loc: { type: [Number] },
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

StoreSchema.index({
  owner: 1
});

module.exports = mongoose.model('Store', StoreSchema);
