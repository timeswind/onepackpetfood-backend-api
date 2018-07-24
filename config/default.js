var path = require('path');

var domain = "xiaoquanju.ap.ngrok.io"//本地测试域名
var wx_appID = "wxce6778b50056766b"//微信测试号
var wx_appSecret = "d04a97091ed3a836d8a9e6d634801579"
var wx_xcx_appID = "wxb3ff1fcb37b94be1"
var wx_xcx_appSecret = "a6c3766dc5d9b08cdda977b801617356"

if (process.env.NODE_ENV === 'production') {
    domain = "www.xiaoquanju.xyz"
    wx_appID = "wxad001b07cb52f3fe" //小犬居宠物生活服务号
    wx_appSecret = "025c5567e6a65f0624dd16d7bd1ea819"
}

module.exports = {
  port: process.env.PORT || 8080,
  privateKeyName: 'platform.rsa',
  publicKeyName: 'platform.rsa.pub',
  domain: domain,
  wx_appID: wx_appID,
  wx_appSecret: wx_appSecret,
  wx_xcx_appID: wx_xcx_appID,
  wx_xcx_appSecret: wx_xcx_appSecret,
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
