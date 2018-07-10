var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var OrderSchema = new Schema({
    user: { type: ObjectId, required: true, ref: 'User' },
    item: { type: ObjectId, required: true, ref: 'Item' },
    price: { type: Number, required: true },
    address: { type: String, require: true },
    storeTagtrackCode: { type: String, require: false },
});

OrderSchema.index({ user: 1 });

module.exports = mongoose.model('Order', OrderSchema);
