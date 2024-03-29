var Models = require('../../lib/core');
var $User = Models.$User;
var jwt = require('koa-jwt');
var fs = require('fs');
var qs = require('qs');
var config = require('config-lite');
var privateKey = fs.readFileSync(config.privateKeyName);
const getSessionKey = require('../../lib/wechat/jscode2session');
var crypto = require('crypto')

// const domain = config.domain;
//小程序使用only
exports.get = function* () {
    const query = this.request.query;
    const js_code = query.js_code
    var userInfoData = null
    var parsedUserInfo = null
    if ('userInfo' in query) {
        userInfoData = query.userInfo
        parsedUserInfo = JSON.parse(userInfoData)
    }


    const union_tagtrack_id = query.union_tagtrack_id
    const sessionKeyAndOpenID = yield getSessionKey(js_code)
    const parsedSessionKeyAndOpenIDAndUnionID = JSON.parse(sessionKeyAndOpenID)
    const session_key = parsedSessionKeyAndOpenIDAndUnionID["session_key"]
    const openid = parsedSessionKeyAndOpenIDAndUnionID["openid"]
    var unionid = parsedSessionKeyAndOpenIDAndUnionID["unionid"]

    if (!unionid) {
        if ('encryptedData' in query && 'iv' in query) {
            console.log(config.wx_xcx_appID, session_key)
            console.log(query.encryptedData)
            console.log(query.iv)
            var pc = new WXBizDataCrypt(config.wx_xcx_appID, session_key)

            var data = pc.decryptData(query.encryptedData, query.iv)
            //         解密后 data:  { openId: 'oGb-e4mYiefdJMEzl8b52MHoOSy8',
            //   nickName: '商家测试号',
            //   gender: 0,
            //   language: 'zh_CN',
            //   city: '',
            //   province: '',
            //   country: '',
            //   avatarUrl: '',
            //   unionId: 'oCVKj0owxcTliAY7iyJekqHK75bM',
            //   watermark: { timestamp: 1533745646, appid: 'wxb3ff1fcb37b94be1' } }
            console.log('解密后 data: ', data)
            unionid = data.unionId
        } else {
            this.status = 500
            this.body = {
                success: false,
                error: "fail to get union id"
            }
            return
        }
    }


    console.log(parsedSessionKeyAndOpenIDAndUnionID)
    this.status = 200;
    this.body = "test";

    var userInfo = yield $User.getByWxUnionId(unionid);
    if (!userInfo) {
        //第一次登入，注册用户
        newUser = {
            name: parsedUserInfo["nickName"],
            role: 1, //普通用户
            wx_openids: {
                miniprogram: openid
            },
            wx_unionid: unionid,
            wx_nickname: parsedUserInfo["nickName"],
            wx_sex: parsedUserInfo["gender"],
            wx_province: parsedUserInfo["province"],
            wx_city: parsedUserInfo["city"],
            wx_country: parsedUserInfo["country"],
            wx_headimgurl: parsedUserInfo["avatarUrl"]
        }
        if (union_tagtrack_id) {
            newUser["union_tagtrack_id"] = union_tagtrack_id
        }
        var newUser = yield $User.addUser(newUser);
        if (newUser) {
            var payload = {
                id: newUser.id,
                role: newUser.role,
                wx_unionid: newUser.wx_unionid
            };

            var token = jwt.sign(payload, privateKey, { algorithm: 'RS256', expiresIn: '30d' });
            this.status = 200
            this.body = {
                success: true,
                name: newUser.name,
                role: newUser.role,
                wx_openid: newUser.wx_openids.miniprogram,
                wx_unionid: newUser.wx_unionid,
                avatar: newUser.wx_headimgurl,
                token: token,
                session_key: session_key
            }
        } else {
            this.status = 400
            this.body = {
                success: false
            }
        }

    } else {
        console.log(userInfo)
        if (!userInfo.wx_openids.miniprogram) {
            yield $User.patchUserWxOpenIds(userInfo.id, "miniprogram", openid)
        }
        const payload = {
            id: userInfo.id,
            role: userInfo.role,
            wx_unionid: userInfo.wx_unionid,
        };
        const token = jwt.sign(payload, privateKey, { algorithm: 'RS256', expiresIn: '30d' });
        this.status = 200
        console.log(token)
        this.body = {
            success: true,
            name: userInfo.name,
            role: userInfo.role,
            wx_openid: userInfo.wx_openids.miniprogram,
            wx_unionid: userInfo.wx_unionid,
            avatar: userInfo.wx_headimgurl,
            token: token,
            session_key: session_key
        }
    }
};

exports.post = function* () {
    const union_id = this.request.body.union_id
    var userInfo = yield $User.getByWxUnionId(union_id);
    if (!userInfo) {
        this.status = 404
        this.body = {
            success: false,
            error: "User Not Found"
        }
    } else {
        const payload = {
            id: userInfo.id,
            role: userInfo.role,
            wx_unionid: userInfo.wx_unionid,
        };
        const token = jwt.sign(payload, privateKey, { algorithm: 'RS256', expiresIn: '30d' });
        this.status = 200
        this.body = {
            success: true,
            name: userInfo.name,
            role: userInfo.role,
            wx_openid: userInfo.wx_openids.miniprogram,
            wx_unionid: userInfo.wx_unionid,
            avatar: userInfo.wx_headimgurl,
            token: token
        }
    }
}

function WXBizDataCrypt(appId, sessionKey) {
    this.appId = appId
    this.sessionKey = sessionKey
}

WXBizDataCrypt.prototype.decryptData = function (encryptedData, iv) {
    // base64 decode
    var sessionKey = new Buffer(this.sessionKey, 'base64')
    encryptedData = new Buffer(encryptedData, 'base64')
    iv = new Buffer(iv, 'base64')

    try {
        var decipher = crypto.createDecipheriv('aes-128-cbc', sessionKey, iv)
        decipher.setAutoPadding(false);

        var decoded = decipher.update(encryptedData, 'base64', 'utf8');
        // decoded += decipher.final('utf8');

        // var decoded = decipher.update(encryptedData, 'binary', 'utf8')
        // decoded += decipher.final('utf8')
        console.log(decoded)
        decoded = JSON.parse(decoded)

    } catch (err) {
        console.log(err)
        throw new Error('Illegal Buffer')
    }

    if (decoded.watermark.appid !== this.appId) {
        throw new Error('Illegal Buffer')
    }

    return decoded
}