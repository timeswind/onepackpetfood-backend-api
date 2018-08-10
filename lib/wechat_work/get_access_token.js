const request = require('request')
const qs = require('qs')
const config = require('config-lite');
//getWebToken.js
module.exports = function getToken() {
    let reqUrl = 'https://qyapi.weixin.qq.com/cgi-bin/gettoken?';
    let params = {
        corpid: config.ww_corpid,
        corpsecret: config.ww_corpsecret_1000008
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