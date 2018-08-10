const request = require('request')
const qs = require('qs')

module.exports = function getToken(access_token, code) {
    let reqUrl = 'https://qyapi.weixin.qq.com/cgi-bin/user/getuserinfo?';
    let params = {
        access_token: access_token,
        code: code
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