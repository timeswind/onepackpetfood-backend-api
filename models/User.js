var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var ObjectId = Schema.Types.ObjectId;

var UserSchema = new Schema({
  name: { type: String, required: false },
  email: { type: String, required: true, unique: true},
  phone: { type: String },
  avatar: { type: String, required: false },
  verify: { type: Boolean, default: false },
  password: { type: String, required: true },
  role: { type: Number, required: false }, //  1 for normal user, 2 for organization account, 100 for admin
  permissions: { type: [String] },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

UserSchema.index({email: 1});

UserSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
