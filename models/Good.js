var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var PriceSetSchema = new Schema({
    name: { type: String, require: true },
    price: { type: Number, required: true },
    count: { type: Number, required: true, default: 1 },
});

var ExtrasSchema = new Schema({
    key: { type: String, require: true },
    value: { type: String, require: false },
})

var GoodSchema = new Schema({
    store: { type: ObjectId, required: false, ref: "Store" },
    category: { type: ObjectId, required: true, ref: "Category" }, //商品类目
    name: { type: String, required: true }, //商品名称
    subtitle: { type: String, required: false }, //商品卖点
    price: { type: Number, required: true }, //单件价格
    strike_price: { type: Number, required: false }, //划线价格
    price_sets: [PriceSetSchema], //不同规格的价格
    stock: { type: Number, required: false }, //库存
    show_stock: { type: Boolean, required: true, default: false }, //是否显示剩余库存
    bar_code: { type: String, required: false },
    description: { type: String, required: false }, //微信转发描述
    images: [{ type: String, required: true }], //商品图片
    extras: [ExtrasSchema],
    total_sales_count: { type: Number, default: 0 },
    view_count: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
    distribution: { type: Boolean, default: false },
    drop_shipping: { type: ObjectId, required: false, ref: "Dropshipping" },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

GoodSchema.index({ store: 1, name: 1 });
GoodSchema.index({ category: 1 });

module.exports = mongoose.model('Good', GoodSchema);
