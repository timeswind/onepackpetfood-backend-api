const get_ticket = require('../../lib/wechat/jsapi_ticket');
const get_access_token = require('../../lib/wechat/access_token');
const calcSigniture = require('../../lib/wechat/calc_jssdk_signiture');

exports.get = function* () {
    const query = this.request.query;
    const url = query.url
    const token = yield get_access_token()
    this.state = 200
    this.body = token
}