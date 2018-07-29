var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var AddressSchema = new Schema({
    user: { type: ObjectId, ref: 'User', required: true },
    name: { type: String, require: true },
    phone: { type: String, require: true },
    province: { type: String, require: true },
    city: { type: String, require: true },
    area: { type: String, require: false },
    street: { type: String, require: true },
    postcode: { type: String, require: true },
    isDefault: { type: Boolean, required: false, default: false }
});


module.exports = mongoose.model('Address', AddressSchema);
