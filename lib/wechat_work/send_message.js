const request = require('request')
const qs = require('qs')
const getWechatWorkAccessToken = require('./get_access_token');

module.exports = function* (type, data) {
    let reqUrl = 'https://qyapi.weixin.qq.com/cgi-bin/message/send?';
    let params = {
        access_token: yield getWechatWorkAccessToken()
    };

    var postdata = {
        "touser": "@all",
        "agentid": 1000008,
    }

    if (type === 'textcard') {
        postdata['msgtype'] = 'textcard'
        postdata['textcard'] = data
        // var body = {
        //     "touser": "@all",
        //     "msgtype": "textcard",
        //     "agentid": 1000008,
        //     "textcard": {
        //         "title": "通知测试",
        //         "description": `<div class=\"gray\">${new Date()}</div> <div class=\"normal\">用户下单</div><div class=\"highlight\">请及时处理</div>`,
        //         "url": "https://api.xiaoquanjia.com",
        //         "btntxt": "查看"
        //     }
        // }
    } else {
        return 'invalid params type'
    }

    let options = {
        method: 'post',
        url: reqUrl + qs.stringify(params),
        json: postdata
    };
    console.log(options)
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