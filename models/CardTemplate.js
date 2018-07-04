var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var CardTemplateSchema = new Schema({
  issuer: { type: ObjectId, ref: 'User', required: true},
  school: { type: String, required: true},
  type: { type: String, required: true }, //cardType: membership,
  name: { type: String, required: true }, // cardName
  image: { type: String }, // card background image
  limits: { type: Number, default: 0 }, // limit number of cards can be issued
  count: { type: Number, default: 0 }, // card number in sequence
  description: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

CardTemplateSchema.index({
  issuer: 1,
});

module.exports = mongoose.model('CardTemplate', CardTemplateSchema);
