var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var CategorySchema = new Schema({
    scope: { type: String, required: true },// 不同地方用的目录
    parent: { type: ObjectId, ref: 'Category', default: null },
    name: { type: String, required: true },
    image: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

CategorySchema.index({ scope: 1 });
CategorySchema.index({ parent: 1 });

module.exports = mongoose.model('Category', CategorySchema);
