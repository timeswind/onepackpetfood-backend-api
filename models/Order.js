var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

const PriceSetSchema = new Schema({
    name: { type: String, require: true },
    price: { type: Number, required: true },
    count: { type: Number, required: true, default: 1 },
    image: { type: String, require: false }
});

const PackageSchema = new Schema({
    good: { type: ObjectId, required: true, ref: 'Good' },
    price_set: PriceSetSchema,
    item_count: { type: Number, required: true },
    logistics_trackcode: { type: String, require: false },
    logistics_service_tag: { type: String, require: false },
});

var OrderSchema = new Schema({
    user: { type: ObjectId, required: true, ref: 'User' },
    packages: [PackageSchema],
    shipping_type: { type: String, require: false }, //创建交易时的物流方式 free(卖家包邮),post(平邮),express(快递),ems(EMS),virtual(虚拟发货)，25(次日必达)，26(预约配送)。
    payment: { type: Number, required: false }, //实付金额。精确到2位小数;单位:元。如:200.07，
    payment_type: { type: String, required: true }, //wechatpay, alipay
    discount_fee: { type: Number, required: false }, // 系统优惠金额
    total_fee: { type: Number, required: true }, // 商品金额（商品价格乘以数量的总金额）。
    address: { type: String, require: true },// 姓名|电话|province|city|area|street|postcode
    status: { type: String, require: true }, //订单状态
    refund_status: { type: String, require: false }, // 退款状态。退款状态。可选值 WAIT_SELLER_AGREE(买家已经申请退款，等待卖家同意) WAIT_BUYER_RETURN_GOODS(卖家已经同意退款，等待买家退货) WAIT_SELLER_CONFIRM_GOODS(买家已经退货，等待卖家确认收货) SELLER_REFUSE_BUYER(卖家拒绝退款) CLOSED(退款关闭) SUCCESS(退款成功)
    referer_code: { type: String, require: false }, //用户邀请码
    store_trackcode: { type: String, require: false }, //商家返佣追踪码
    buyer_rated: { type: Boolean, required: false }, //买家是否已评价。
    pay_at: { type: Date }, //付款时间
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

OrderSchema.index({ user: 1 });
module.exports = mongoose.model('Order', OrderSchema);
//STATUS

// export const tradeStatusTranslateCN = {
//     "WAIT_BUYER_PAY": "等待付款",
//     "WAIT_SELLER_SEND_GOODS": "等待发货",
//     "PARTIAL_SHIPPED": "部分发货",
//     "WAIT_BUYER_CONFIRM_GOODS": "全部发货",
//     "TRADE_FINISHED": "交易成功",
//     "TRADE_CLOSED": "已退款",
//     "TRADE_CLOSED_WITHOUT_PAYMENT": "已关闭",
//     "WAIT_SELLER_CONFIRM": "已通知店家",
//     "SELLER_CONFIRMED": "店家已确认",
//     "TRADE_BUYER_SIGNED": "已签收" //货到付款
// }

//WAIT_BUYER_PAY(等待买家付款)
//WAIT_SELLER_SEND_GOODS(等待卖家发货,即:买家已付款)
//WAIT_BUYER_CONFIRM_GOODS(等待买家确认收货,即:卖家已发货)
//TRADE_BUYER_SIGNED(买家已签收,货到付款专用)
//TRADE_FINISHED(交易成功)
//TRADE_CLOSED(付款以后用户退款成功，交易自动关闭)
//TRADE_CLOSED_WITHOUT_PAYMENT(付款以前，卖家或买家主动关闭交易)

//TRADE_NO_CREATE_PAY(没有创建支付宝交易)
//SELLER_CONSIGNED_PART(卖家部分发货)
//PAY_PENDING(国际信用卡支付付款确认中)
//WAIT_PRE_AUTH_CONFIRM(0元购合约中）
//PAID_FORBID_CONSIGN(拼团中订单或者发货强管控的订单，已付款但禁止发货)

