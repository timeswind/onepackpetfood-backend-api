var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TagtrackSchema = new Schema({
    name: { type: String, required: true },
    code: { type: String, required: true },
    type: { type: String, required: true },
    packageCode: { type: String, required: false },
    active: { type: Boolean, require: true, default: false },
    active_date: { type: Date },
    note: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});

TagtrackSchema.index({ code: 1 });


module.exports = mongoose.model('Tagtrack', TagtrackSchema);
