var path = require('path');
var production_domain = "api.cssapsu.cn"
var domain = "xiaoquanju.ap.ngrok.io"//本地测试域名
var wx_appID = "wxce6778b50056766b"//微信测试号
var wx_appSecret = "d04a97091ed3a836d8a9e6d634801579"
var wx_xcx_appID = "wxb3ff1fcb37b94be1"
var wx_xcx_appSecret = "a6c3766dc5d9b08cdda977b801617356"
var wechat_pay_mchid = "1509964241"
var wechat_pay_api_key = "mufBu3DgPB3ENFh82WFeAtwzPe8JpAWx"
var wechat_pay_notify_url = `https://${production_domain}/testpay/wechat_pay_callback`
var wechat_pay_refund_url = `https://${production_domain}/testpay/wechat_refund`


if (process.env.NODE_ENV === 'production') {
    domain = production_domain
    wx_appID = "wxad001b07cb52f3fe" //小犬居宠物生活服务号
    wx_appSecret = "025c5567e6a65f0624dd16d7bd1ea819"
    wechat_pay_notify_url = `https://${production_domain}/api/public/wechat_pay_callback`
    wechat_pay_refund_url = `https://${production_domain}/api/public/wechat_refund`
}

module.exports = {
  port: process.env.PORT || 8080,
  privateKeyName: 'platform.rsa',
  publicKeyName: 'platform.rsa.pub',
  wechat_pay_cert_name: 'apiclient_cert.p12',
  domain: domain,
  wx_appID: wx_appID,
  wx_appSecret: wx_appSecret,
  wx_xcx_appID: wx_xcx_appID,
  wx_xcx_appSecret: wx_xcx_appSecret,
  wechat_pay_mchid: wechat_pay_mchid,
  wechat_pay_api_key: wechat_pay_api_key,
  wechat_pay_notify_url: wechat_pay_notify_url,
  tencent_cloud_SecretId: "AKIDJFyVo6NLBnES7ZsiRu75oJacQ0UlggLm",
  tencent_cloud_SecretKey: "PI0UounSr0tWt2OhqkPoAIAmAKEuKVQ8",
  mongodb: {
    url: 'mongodb://127.0.0.1:27017/xiaoquanju',
    developmentUrl: 'mongodb://127.0.0.1:27017/xiaoquanju',
    productionUrl: 'mongodb://127.0.0.1:27017/xiaoquanju'
  },
  schemeConf: path.join(__dirname, './default.scheme'),
  routerConf: { wildcard: '_', root: 'routes' }
};
