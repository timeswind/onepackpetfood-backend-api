var parseString = require('xml2js').parseString;
const Models = require('../../lib/core')
var $Order = Models.$Order

const tenpay = require('tenpay');
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
    const order_id = this.request.query.order_id
    const api = new tenpay(tenpay_config);
    const order_detail = yield $Order.getOrderById(order_id)
    if (order_detail.payment_type === "wechatpay") {
        const wechat_pay_detail = yield api.orderQuery({
            // transaction_id, out_trade_no 二选一
            // transaction_id: '微信的订单号',
            out_trade_no: order_id
        });
        if (wechat_pay_detail["result_code"] === 'SUCCESS') {
            const wechatpay_total_fee = wechat_pay_detail["total_fee"]
            const total_fee = WechatPayTotalFeeToYuan(wechatpay_total_fee)
            yield $Order.orderPaid(order_id, "wechatpay", total_fee, new Date())
        }
    }

    this.status = 200
    this.body = result
}

function WechatPayTotalFeeToYuan(wechatpay_total_fee) {
    return (Number.parseFloat(wechatpay_total_fee) / 100).toFixed(2)
  }