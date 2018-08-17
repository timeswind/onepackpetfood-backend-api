var Models = require('../../../lib/core');
var $User = Models.$User;
var jwt = require('koa-jwt');
var fs = require('fs');
var qs = require('qs');
var config = require('config-lite');
var privateKey = fs.readFileSync(config.privateKeyName);
const getWechatWorkAccessToken = require('../../../lib/wechat_work/get_access_token');
const codeToUserInfo = require('../../../lib/wechat_work/code_to_userinfo.js');
const getUserInfoData = require('../../../lib/wechat_work/get_user.js');
// const sendMessageTest = require('../../../lib/wechat_work/send_message.js');
const domain = config.domain;

exports.get = function* () {
    // const test = yield sendMessageTest('textcard', {
    //     "title": "通知测试",
    //     "description": `<div class=\"gray\">${new Date()}</div> <div class=\"normal\">用户下单</div><div class=\"highlight\">请及时处理</div>`,
    //     "url": "https://api.xiaoquanjia.com",
    //     "btntxt": "查看"
    // })
    console.log(test)
    const query = this.request.query;
    const code = query.code
    // const state = query.state
    // const appid = query.appid // corpid
    const access_token = yield getWechatWorkAccessToken()

    if (!code) {
        this.status = 400
        this.body = {
            success: false,
            error: "missing code"
        }
        return
    }

    var userInfo = yield codeToUserInfo(access_token, code)
    userInfo = JSON.parse(userInfo)
    console.log("userInfo", userInfo)
    if (userInfo.errcode !== 0) {
        this.status = 400
        this.body = {
            success: false,
            userInfo: userInfo,
            errcode: userInfo.errcode
        }
        return
    }

    const findUserInDB = yield $User.getByWwUserId(userInfo.UserId)
    if (!findUserInDB) {
        var userInfoData = yield getUserInfoData(access_token, userInfo.UserId)
        userInfoData = JSON.parse(userInfoData)
        console.log("userInfoData", userInfoData)
        //第一次登入，注册用户
        newUser = {
            ww_userid: userInfoData.userid,
            name: userInfoData.name,
            phone: userInfoData.mobile,
            avatar: userInfoData.avatar,
            role: 100 //企业内部管理员
        }
        var newUser = yield $User.addUser(newUser);
        if (newUser) {
            var payload = {
                id: newUser.id,
                ww_userid: newUser.ww_userid,
                role: newUser.role
            };

            var token = jwt.sign(payload, privateKey, { algorithm: 'RS256', expiresIn: '7d' });
            const baseUrl = `http://${domain}/login?`;
            var params = {
                type: "ww_login", //企业微信登入
                name: newUser.name,
                avatar: newUser.avatar,
                token: token,
                role: newUser.role
            }
            const redirectUrl = baseUrl + qs.stringify(params)
            this.redirect(redirectUrl)
        } else {
            this.body = 'fail'
        }
    } else {
        var payload = {
            id: findUserInDB.id,
            ww_userid: findUserInDB.ww_userid,
            role: findUserInDB.role
        };

        var token = jwt.sign(payload, privateKey, { algorithm: 'RS256', expiresIn: '7d' });
        const baseUrl = `http://${domain}/login?`;
        var params = {
            type: "ww_login", //企业微信登入
            name: findUserInDB.name,
            avatar: findUserInDB.avatar,
            token: token,
            role: findUserInDB.role
        }
        const redirectUrl = baseUrl + qs.stringify(params)
        this.redirect(redirectUrl)
    }
};
