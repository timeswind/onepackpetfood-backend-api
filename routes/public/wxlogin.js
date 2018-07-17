var Models = require('../../lib/core');
var $User = Models.$User;
var jwt = require('koa-jwt');
var fs = require('fs');
var qs = require('qs');
var config = require('config-lite');
var privateKey = fs.readFileSync(config.privateKeyName);
const getAccessToken = require('../../lib/wechat/oath_access_token');
const getUserInfo = require('../../lib/wechat/get_userinfo');
const domain = config.domain;

exports.get = function* () {
    const query = this.request.query;
    const code = query.code
    const state = query.state
    console.log('state', state)
    const accessTokenData = yield getAccessToken(code)
    const parsedAccessTokenData = JSON.parse(accessTokenData)
    const access_token = parsedAccessTokenData.access_token
    const openid = parsedAccessTokenData.openid
    const rawuserinfo = yield getUserInfo(access_token, openid)
    const parsedUserInfo = JSON.parse(rawuserinfo)
    this.status = 200
    this.body = "test"

    var userInfo = yield $User.getByWxOpenId(openid);
    if (!userInfo) {
        //第一次登入，注册用户
        newUser = {
            name: parsedUserInfo.nickname,
            wx_openid: parsedUserInfo.openid,
            wx_nickname: parsedUserInfo.nickname,
            wx_sex: parsedUserInfo.sex,
            wx_province: parsedUserInfo.province,
            wx_city: parsedUserInfo.city,
            wx_country: parsedUserInfo.country,
            wx_headimgurl: parsedUserInfo.headimgurl,
            wx_privilege: parsedUserInfo.privilege,
            wx_unionid: parsedUserInfo.unionid,
            role: 2 //销售商
        }
        var newUser = yield $User.addUser(newUser);
        if (newUser) {
            
            var payload = {
                id: newUser.id,
                wx_openid: newUser.wx_openid,
                name: newUser.name,
                role: newUser.role
            };

            var token = jwt.sign(payload, privateKey, { algorithm: 'RS256', expiresIn: '7d' });
            const baseUrl = `http://${domain}/login?`;
            var params = {
                name: newUser.name,
                role: newUser.role,
                avatar: newUser.wx_headimgurl,
                token: token
            }
            if (state) {
                params["state"] = state
            }
            const redirectUrl = baseUrl + qs.stringify(params)
            this.redirect(redirectUrl)
        } else {
            this.body = 'fail'
        }

    } else {
        const payload = {
            id: userInfo.id,
            wx_openid: userInfo.wx_openid,
            name: userInfo.name,
            role: userInfo.role
        };

        const token = jwt.sign(payload, privateKey, { algorithm: 'RS256', expiresIn: '7d' });
        const baseUrl = `http://${domain}/login?`;
        var params = {
            name: userInfo.name,
            role: userInfo.role,
            avatar: userInfo.wx_headimgurl,
            token: token
        }
        if (state) {
            params["state"] = state
        }
        const redirectUrl = baseUrl + qs.stringify(params)
        console.log(redirectUrl)
        this.redirect(redirectUrl)
    }
};
