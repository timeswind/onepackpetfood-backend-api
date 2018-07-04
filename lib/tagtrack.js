var Tagtrack = require('../models').Tagtrack;

exports.addTagtrack = function (data) {
  return Tagtrack.create(data);
};

exports.addMultipleTagtrack = function (data) {
    return Tagtrack.insertMany(data);
  };

exports.getById = function (id, selectFields) {
  if (arguments.length === 1) {
    return Tagtrack.findOne({"_id": id}).exec();
  } else {
    return Tagtrack.findOne({"_id": id}, selectFields).exec();
  }
};

exports.update = function (tagtrack_id, updates) {
    return Tagtrack.findOneAndUpdate({"_id": tagtrack_id}, {"$set": updates}, {new: true}).exec()
}

exports.getTagByCode = function (code) {
  return Tagtrack.findOne({code: code}).exec();
};

exports.getAll = function () {
    return Tagtrack.find({}).sort({_id: -1}).exec();
  };

// exports.patch = function (user_id, patchField, patchData) {
//   var update = {
//     $set: {}
//   }
//   update.$set[patchField] = patchData
//   return User.findOneAndUpdate({_id: user_id}, update).exec();
// }

// exports.generateHash = function (password) {
//   return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// };
