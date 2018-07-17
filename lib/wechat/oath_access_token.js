const request = require('request')
const qs = require('qs')
const config = require('config-lite');
//getWebToken.js
module.exports = function getToken(code) {
    let reqUrl = 'https://api.weixin.qq.com/sns/oauth2/access_token?';
    let params = {
        appid: config.wx_appID,
        secret: config.wx_appSecret,
        code: code,
        grant_type: 'authorization_code'
    };

    let options = {
        method: 'get',
        url: reqUrl + qs.stringify(params)
    };
    console.log(options.url);
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