var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var OrderSchema = new Schema({
    user: { type: ObjectId, required: true, ref: 'User' },
    good: { type: ObjectId, required: true, ref: 'Good' },
    item_count: { type: Number, required: true },
    original_price: { type: Number, required: true },
    total_paid: { type: Number, required: true },
    address: { type: String, require: true },
    logistics_trackcode: { type: String, require: false },
    referer_code: { type: String, require: false },
    store_trackcode: { type: String, require: false }
});

OrderSchema.index({ user: 1 });

module.exports = mongoose.model('Order', OrderSchema);
