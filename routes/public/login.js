var Models = require('../../lib/core');
var $User = Models.$User;
var jwt = require('koa-jwt');
var fs = require('fs');
var config = require('config-lite');
var privateKey = fs.readFileSync(config.privateKeyName);

exports.post = function* () {
  var data = this.request.body;

  var userInfo = yield $User.getUserByEmail(data.email);
  if (!userInfo || !userInfo.validPassword(data.password)) {
    this.status = 401;
    this.body = {error: 'Email or password wrong!'};
    return false
  }

  var payload = {
    id: userInfo.id,
    name: userInfo.name,
    email: userInfo.email,
    role: userInfo.role,
    school: userInfo.school
  };

  var token = jwt.sign(payload, privateKey, {algorithm: 'RS256', expiresIn: '7d'});
  this.status = 200;
  this.body = {
    success: true,
    id: userInfo.id,
    name: userInfo.name,
    email: userInfo.email,
    role: userInfo.role,
    school: userInfo.school,
    permissions: userInfo.permissions || [],
    avatar: userInfo.avatar,
    token: token
  };
};
