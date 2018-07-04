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
  } else if (!postData.email) {
    errors.email = '填写邮箱'
  }

  if (Object.keys(errors).length !== 0) {
    this.status = 400
    this.body = {
      success: false,
      error: errors
    }
  } else {

    var findExistUser = yield $User.getUserByEmail(postData.email)

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
        email: postData.email,
        password: $User.generateHash(postData.password),
        role: 2,
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
