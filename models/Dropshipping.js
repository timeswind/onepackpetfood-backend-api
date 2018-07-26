var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var ObjectId = Schema.Types.ObjectId;

var ExtrasSchema = new Schema({
    key: { type: String, require: true },
    value: { type: String, require: false },
    _id: false
})

var PriceSetSchema = new Schema({
    name: { type: String, require: true },
    price: { type: Number, required: true },
    count: { type: Number, required: true, default: 1 },
    _id: false
});

var DropshippingSchema = new Schema({
    good_images: { type: [String], required: false }, //产品图片
    company_name: { type: String, required: true }, //公司名称
    contact: { type: String, required: true }, //联系方式
    link: { type: String, required: false }, //产品链接
    brand_name: { type: String, required: true }, //品牌
    good_name: { type: String, required: true }, //商品名
    good_description: { type: String, required: false }, //商品描述
    price: { type: Number, required: true }, //单价
    price_sets: [PriceSetSchema],
    weight: { type: String, required: false }, //重量
    average_shipping_time: { type: String, required: false }, //平均发货时长
    shipping_cost: { type: String, required: false }, //快递费
    seller_credit: { type: String, required: false }, //商家信用
    extras: [ExtrasSchema],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Dropshipping', DropshippingSchema);
