const tenpay = require('tenpay');
var Models = require('../../lib/core');
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
  const openid = this.state.user.wx_openid
  const order_id = this.request.query.order_id
  const api = new tenpay(tenpay_config);
  const order = yield $Order.getOrderById(order_id)
  console.log(order)
  if (order && 'total_fee' in order) {
    let result = yield api.getPayParams({
      out_trade_no: order_id,
      body: "小犬居订单" + order_id,
      total_fee: orderTotalFeeToCent(order.total_fee),
      openid: openid
    });

    if (result) {
      this.status = 200
      this.body = {
        success: true,
        params: result
      }
    }
  } else {
    this.status = 400
    this.body = {
      success: false,
      params: {}
    }
  }
}

function orderTotalFeeToCent(total_fee) {
  return (Number.parseFloat(total_fee) * 100).toString();
}