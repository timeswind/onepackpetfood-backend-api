const request = require('request')
const qs = require('qs')
const config = require('config-lite');
//getWebToken.js
module.exports = function getToken(access_token, userid) {
    let reqUrl = 'https://qyapi.weixin.qq.com/cgi-bin/user/get?';
    let params = {
        access_token: access_token,
        userid: userid
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