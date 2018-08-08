var Models = require('../../lib/core');
var $User = Models.$User;
var jwt = require('koa-jwt');
var fs = require('fs');
var qs = require('qs');
var config = require('config-lite');
var privateKey = fs.readFileSync(config.privateKeyName);
const getSessionKey = require('../../lib/wechat/jscode2session');
// const domain = config.domain;

exports.get = function* () {
    console.log("function called")
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
    const unionid = parsedSessionKeyAndOpenIDAndUnionID["unionid"]

    var pc = new WXBizDataCrypt(config.wx_xcx_appID, session_key)

    var data = pc.decryptData(query.encryptedData , query.iv)
    
    console.log('解密后 data: ', data)

    console.log(parsedSessionKeyAndOpenIDAndUnionID)
    this.status = 200;
    this.body = "test";

    var userInfo = yield $User.getByWxUnionId(unionid);
    if (!userInfo) {
        //第一次登入，注册用户
        newUser = {
            name: parsedUserInfo["nickName"],
            role: 1, //普通用户
            wx_openid: openid,
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
                wx_openid: newUser.wx_openid,
                wx_unionid: newUser.wx_unionid,
            };

            var token = jwt.sign(payload, privateKey, { algorithm: 'RS256', expiresIn: '30d' });
            this.status = 200
            this.body = {
                success: true,
                name: newUser.name,
                role: newUser.role,
                wx_openid: newUser.wx_openid,
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
        const payload = {
            id: userInfo.id,
            role: userInfo.role,
            wx_openid: userInfo.wx_openid,
            wx_unionid: userInfo.wx_unionid,
        };
        const token = jwt.sign(payload, privateKey, { algorithm: 'RS256', expiresIn: '30d' });
        this.status = 200
        console.log(token)
        this.body = {
            success: true,
            name: userInfo.name,
            role: userInfo.role,
            wx_openid: userInfo.wx_openid,
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
            wx_openid: userInfo.wx_openid,
            wx_unionid: userInfo.wx_unionid,
        };
        const token = jwt.sign(payload, privateKey, { algorithm: 'RS256', expiresIn: '30d' });
        this.status = 200
        this.body = {
            success: true,
            name: userInfo.name,
            role: userInfo.role,
            wx_openid: userInfo.wx_openid,
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
       // 解密
      var decipher = crypto.createDecipheriv('aes-128-cbc', sessionKey, iv)
      // 设置自动 padding 为 true，删除填充补位
      decipher.setAutoPadding(true)
      var decoded = decipher.update(encryptedData, 'binary', 'utf8')
      decoded += decipher.final('utf8')
      
      decoded = JSON.parse(decoded)
  
    } catch (err) {
      throw new Error('Illegal Buffer')
    }
  
    if (decoded.watermark.appid !== this.appId) {
      throw new Error('Illegal Buffer')
    }
  
    return decoded
  }
  
  module.exports = WXBizDataCrypt
  

