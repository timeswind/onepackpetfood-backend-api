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
    return User.findOne({ "_id": id }).exec();
  } else {
    return User.findOne({ "_id": id }, selectFields).exec();
  }
};

exports.patchUserWxOpenIds = function (user_id, type, openid) {
  //type :
  // service: { type: String, required: false }, //服务号
  // subscribe: { type: String, required: false }, //订阅号
  // miniprogram: { type: String, required: false },//小程序
  // site: { type: String, required: false } //网页应用
  var update = {}
  update[`wx_openids.${type}`] = openid
  return User.findOneAndUpdate({ "_id": user_id }, { $set: update }).exec();
}

exports.getByWxUnionId = function (wx_unionid) {
  return User.findOne({ "wx_unionid": wx_unionid }).exec();
}

exports.getByWwUserId = function (ww_userid) { //企业微信userid
  return User.findOne({ "ww_userid": ww_userid }).exec();
}

//通过name获取用户
exports.getUserByEmail = function (email) {
  return User.findOne({ email: email }).exec();
};

exports.patch = function (user_id, patchField, patchData) {
  var update = {
    $set: {}
  }
  update.$set[patchField] = patchData
  return User.findOneAndUpdate({ _id: user_id }, update).exec();
}

exports.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

exports.update = function (user_id, updates) {
  return User.findOneAndUpdate({ "_id": user_id }, { "$set": updates }, { new: true }).exec()
}
