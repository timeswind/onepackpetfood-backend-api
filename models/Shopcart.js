//购物车
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var PriceSetSchema = new Schema({
    name: { type: String, require: true },
    price: { type: Number, required: true },
    count: { type: Number, required: true, default: 1 },
    _id: false
});

var ShopcartSchema = new Schema({
    user: { type: ObjectId, ref: 'User', required: true },
    good: { type: ObjectId, ref: 'Good', required: true },
    price_set: PriceSetSchema,
    item_count: { type: Number, required: true }
});

ShopcartSchema.index({
    user: 1
});

module.exports = mongoose.model('Shopcart', ShopcartSchema);
