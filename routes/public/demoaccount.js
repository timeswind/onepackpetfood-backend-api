// const Models = require('../../lib/core')
// const $User = Models.$User
// const jwt = require('koa-jwt')
// const fs = require('fs')
// const config = require('config-lite');
// const privateKey = fs.readFileSync(config.privateKeyName);
// const crypto = require('crypto')
//
// exports.get = function* () {
//   var data = {
//     name: 'demo',
//     email: 'yuanyuan.official@gmail.com',
//     password: '123456',
//     role: 2,
//     school: 'psu'
//   };
//   data.password = $User.generateHash(data.password)
//
//   var newUser = yield $User.addUser(data);
//
//   let payload = {
//     name: data.name,
//     id: newUser.id,
//     email: data.email,
//     role: newUser.role
//   };
//
//   let token = jwt.sign(payload, privateKey, {algorithm: 'RS256', expiresIn: '7d'});
//
//   this.body = {
//     success: true,
//     name: payload.name,
//     id: payload.id,
//     email: payload.email,
//     role: payload.role,
//     token: token
//   };
// };
