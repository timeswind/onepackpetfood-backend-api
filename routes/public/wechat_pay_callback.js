var parseString = require('xml2js').parseString;
const Models = require('../../lib/core')
var $Order = Models.$Order

exports.post = function* () {
    const xml = this.request.body
    const parsedXml = yield parseXmlAsync(xml)
    const result = parsedXml.data
    const result_code = result["xml"]["result_code"][0]
    if (result_code === 'SUCCESS') {
        const orderId = result["xml"]["out_trade_no"][0]
        const wechatpay_total_fee = result["xml"]["total_fee"][0]
        const total_fee = WechatPayTotalFeeToYuan(wechatpay_total_fee)
        yield $Order.orderPaid(orderId, "wechatpay", total_fee, new Date())
        this.status = 200
    }
};

function parseXmlAsync(xml) {
    return new Promise(function (resolve, reject) {
        parseString(xml, function (err, result) {
            if (err !== null) resolve({ success: false, error: err });
            resolve({ success: true, data: result });
        });
    });
}

function WechatPayTotalFeeToYuan(wechatpay_total_fee) {
    return (Number.parseFloat(wechatpay_total_fee) / 100).toFixed(2)
  }