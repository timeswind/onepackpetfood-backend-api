const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const ExtrasSchema = new Schema({
    key: { type: String, require: true },
    value: { type: String, require: false },
    _id: false
})
const specificationSchema = new Schema({
    key: { type: String, require: true },
    value: { type: String, require: false },
    _id: false
})

const PriceSetSchema = new Schema({
    name: { type: String, require: true },
    price: { type: Number, required: true },
    count: { type: Number, required: true, default: 1 },
    image: { type: String, require: false },
    _id: false
});

const DropshippingSchema = new Schema({
    good_images: { type: [String], required: false }, //产品图片
    company_name: { type: String, required: true }, //公司名称
    contact: { type: String, required: true }, //联系方式
    link: { type: String, required: false }, //产品链接
    brand_name: { type: String, required: true }, //品牌
    good_name: { type: String, required: true }, //商品名
    good_description: { type: String, required: false }, //商品描述
    price: { type: Number, required: true }, //单价
    cost_price:{ type: Number, required: false }, //成本价
    price_sets: [PriceSetSchema],
    weight: { type: String, required: false }, //重量
    average_shipping_time: { type: String, required: false }, //平均发货时长
    shipping_cost: { type: String, required: false }, //快递费
    seller_credit: { type: String, required: false }, //商家信用
    root_category: { type: ObjectId, required: true, ref: "Category" }, //商品类目
    category: { type: ObjectId, required: true, ref: "Category" }, //商品类目
    specifications: [specificationSchema], //商品规格
    extras: [ExtrasSchema],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Dropshipping', DropshippingSchema);
