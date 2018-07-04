var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var CardSchema = new Schema({
  template: { type: ObjectId, ref: 'CardTemplate', required: true },
  holder: { type: ObjectId, ref: 'User', require: true },
  number: { type: Number, require: true },
  disable: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

CardSchema.index({
  template: 1,
});

CardSchema.index({
  holder: 1,
});

module.exports = mongoose.model('Card', CardSchema);
