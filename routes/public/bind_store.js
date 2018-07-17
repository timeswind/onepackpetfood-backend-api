const config = require('config-lite');
const domain = config.domain;
const appID = config.wx_appID;

exports.get = function* () {
    const query = this.request.query;
    const storeTagrackCode = query.tagtrack;

    const redirectUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appID}&redirect_uri=http://${domain}/api/public/wxlogin&response_type=code&scope=snsapi_userinfo&state=${storeTagrackCode}#wechat_redirect`
    console.log(redirectUrl)
    this.redirect(redirectUrl)
}