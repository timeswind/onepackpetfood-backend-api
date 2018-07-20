var User = require('../models').User;
var bcrypt = require('bcrypt-nodejs');

//新建一个用户
exports.addUser = function (data) {
  console.log(data)
  return User.create(data);
};

//通过id获取用户
exports.getById = function (id, selectFields) {
  if (arguments.length === 1) {
    return User.findOne({"_id": id}).exec();
  } else {
    return User.findOne({"_id": id}, selectFields).exec();
  }
};

exports.getByWxOpenId = function(wx_openid) {
  return User.findOne({"wx_openid": wx_openid}).exec();
}

exports.getByWxUnionId = function(wx_unionid) {
  return User.findOne({"wx_unionid": wx_unionid}).exec();
}

//通过name获取用户
exports.getUserByEmail = function (email) {
  return User.findOne({email: email}).exec();
};

exports.patch = function (user_id, patchField, patchData) {
  var update = {
    $set: {}
  }
  update.$set[patchField] = patchData
  return User.findOneAndUpdate({_id: user_id}, update).exec();
}

exports.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

exports.update = function (user_id, updates) {
  return User.findOneAndUpdate({ "_id": user_id }, { "$set": updates }, { new: true }).exec()
}
