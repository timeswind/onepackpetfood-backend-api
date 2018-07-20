var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var ObjectId = Schema.Types.ObjectId;

var UserSchema = new Schema({
  name: { type: String, required: false },
  email: { type: String, required: false, sparse: true, unique: true },
  phone: { type: String },
  avatar: { type: String, required: false },
  verify: { type: Boolean, default: false },
  password: { type: String, required: false },
  role: { type: Number, required: true }, //  1 for normal user, 2 for organization account, 100 for admin
  permissions: { type: [String] },

  wx_openid: { type: String, required: false, sparse: true, unique: true },
  wx_nickname: { type: String },
  wx_sex: { type: String },
  wx_province: { type: String },
  wx_city: { type: String },
  wx_country: { type: String },
  wx_headimgurl: { type: String },
  wx_privilege: [{ type: String }],
  wx_unionid: { type: String, required: false, sparse: true, unique: true },
  union_tagtrack_id: { type: String }, //商家返佣追踪码
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

UserSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
