const request = require('request')
const qs = require('qs')
const config = require('config-lite');
//getWebToken.js
module.exports = function getToken(js_code) {
    let reqUrl = 'https://api.weixin.qq.com/sns/jscode2session?';
    let params = {
        appid: config.wx_xcx_appID,
        secret: config.wx_xcx_appSecret,
        js_code: js_code,
        grant_type: 'authorization_code'
    };

    let options = {
        method: 'get',
        url: reqUrl + qs.stringify(params)
    };
    return new Promise((resolve, reject) => {
        request(options, function (err, res, body) {
            if (res) {
                resolve(body);
            } else {
                reject(err);
            }
        })
    })
}