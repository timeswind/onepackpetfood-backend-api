var CardTemplate = require('../models').CardTemplate;
//新建一个LIST
exports.newCardTemplate = function (data) {
  return CardTemplate.create(data);
};

exports.getSelfIssuedCardTemplates = function (userid) {
  return CardTemplate.find({issuer: userid}).sort({_id: -1});
};

exports.findOneById = function (id) {
  return CardTemplate.findOne({_id: id});
};

exports.getAvailableCards = function (school) {
  return CardTemplate.find({school: school}).sort({_id: -1}).populate('issuer', 'avatar name');
};

exports.increaseCount = function (id) {
  return CardTemplate.findByIdAndUpdate(id, {$inc: {count:1}}).lean()
}

exports.updateCardtemplate = function (id, updatedCardTemplateData) {
  return CardTemplate.findOneAndUpdate({_id: id}, {$set: updatedCardTemplateData}, { new: true }).exec();
}
