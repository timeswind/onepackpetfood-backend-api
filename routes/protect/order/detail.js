const tenpay = require('tenpay');
var Models = require('../../../lib/core');
var $Order = Models.$Order;
var config = require('config-lite');

const tenpay_config = {
    appid: config.wx_xcx_appID,
    mchid: config.wechat_pay_mchid,
    partnerKey: config.wechat_pay_api_key,
    pfx: require('fs').readFileSync(config.wechat_pay_cert_name),
    notify_url: config.wechat_pay_notify_url,
    refund_url: config.wechat_pay_refund_url,
    spbill_create_ip: '127.0.0.1'
};

exports.get = function* () {
    const order_id = this.request.query.id
    const api = new tenpay(tenpay_config);
    const order_detail = yield $Order.getOrderById(order_id)
    var result = {
        success: true,
        order_detail: order_detail
    }
    if (order_detail.payment_type === "wechatpay") {
        const wechat_pay_detail = yield api.orderQuery({
            // transaction_id, out_trade_no 二选一
            // transaction_id: '微信的订单号',
            out_trade_no: order_id
        });
        result["wechat_pay_detail"] = wechat_pay_detail
    }

    this.status = 200
    this.body = result
}