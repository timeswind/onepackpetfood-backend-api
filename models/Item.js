var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var PriceSetSchema = new Schema({
    name: { type: String, require: true },
    price: { type: Number, required: true }
});

var ItemSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    price_sets: [PriceSetSchema],
    description: { type: String, required: true },
    slider_images: [{ type: String, required: true }],
    description_images: [{ type: String, required: true }]
});

ItemSchema.index({ name: 1 });

module.exports = mongoose.model('Item', ItemSchema);
