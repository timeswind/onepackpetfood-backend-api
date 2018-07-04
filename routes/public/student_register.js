const Models = require('../../lib/core')
const $User = Models.$User
const jwt = require('koa-jwt')
const fs = require('fs')
const config = require('config-lite');
const privateKey = fs.readFileSync(config.privateKeyName);
const crypto = require('crypto')

exports.post = function* () {
  var postData = this.request.body;
  const errors = {}
  if (!postData.school) {
    errors.school = "填写学校"
  } else if (!postData.name) {
    errors.name = "填写姓名"
  } else if (!postData.schoolemail) {
    errors.schoolemail = '填写学校邮箱'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(postData.schoolemail)) {
    errors.schoolemail = '邮箱格式错误, 请以@psu.edu结尾'
  } else if (!postData.schoolemail.endsWith('@psu.edu')) {
    errors.schoolemail = '请以@psu.edu结尾'
  }

  if (Object.keys(errors).length !== 0) {
    this.status = 400
    this.body = {
      success: false,
      error: errors
    }
  } else {

    var findExistUser = yield $User.getUserByEmail(postData.schoolemail)

    if (findExistUser) {
      this.status = 400
      this.body = {
        success: false,
        error: 'email exists'
      }
    } else {
      var newUserData = {
        school: postData.school,
        name: postData.name,
        email: postData.schoolemail,
        password: $User.generateHash(postData.password),
        role: 1,
      };

      var newUser = yield $User.addUser(newUserData);

      let payload = {
        id: newUser.id,
        email: newUserData.email,
        role: newUserData.role,
        school: newUserData.school,
        name: newUserData.name
      };

      let token = jwt.sign(payload, privateKey, {algorithm: 'RS256', expiresIn: '7d'});

      this.body = {
        success: true,
        id: payload.id,
        name: payload.name,
        school: payload.school,
        email: payload.email,
        role: payload.role,
        token: token
      };
    }
  }
};
