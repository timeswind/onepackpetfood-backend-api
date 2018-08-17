const request = require('request')
const config = require('config-lite');
const guard_dog = require('guard_dog')

guard_dog.init('WECHAT_WORK_ACCESS_TOKEN', (handler) => {
    request.get({
        uri: 'https://qyapi.weixin.qq.com/cgi-bin/gettoken',
        json: true,
        qs: {
            corpid: config.ww_corpid,
            corpsecret: config.ww_corpsecret_1000008
        }
    }, (err, res, body) => {
        if (err) {
            console.log(err)
            return
        }
        console.log(body)
        if (body.errcode) {
            return
        }
        handler(body.access_token, body.expires_in)
    })
})
// 只要向外暴露一个获取值的方法就可以了
module.exports = function () {
    return new Promise(function (resolve, reject) {
        guard_dog.get('WECHAT_WORK_ACCESS_TOKEN', function (access_token) {
            resolve(access_token);
        });
    });
    // guard_dog.get('WECHAT_WORK_ACCESS_TOKEN', callback)
}

// module.exports = function getToken() {
//     let reqUrl = 'https://qyapi.weixin.qq.com/cgi-bin/gettoken?';
//     let params = {
//         corpid: config.ww_corpid,
//         corpsecret: config.ww_corpsecret_1000008
//     };

//     let options = {
//         method: 'get',
//         url: reqUrl + qs.stringify(params)
//     };
//     return new Promise((resolve, reject) => {
//         request(options, function (err, res, body) {
//             if (res) {
//                 resolve(body);
//             } else {
//                 reject(err);
//             }
//         })
//     })
// }