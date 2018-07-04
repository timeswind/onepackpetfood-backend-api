var Card = require('../models').Card;
//新建一个LIST
exports.newCard = function (data) {
  return Card.create(data);
};

exports.getOwnedCards = function (userid) {
  return Card.find({holder: userid}).sort({_id: -1}).populate({
     path: 'template',
     select: 'issuer school type name image description disable',
     populate: {
       path: 'issuer',
       select: 'avatar name',
     }
  }).lean();
};

exports.findOneById = function (id) {
  return Card.findOne({_id: id});
};

exports.findOneOwned = function(template_id, user_id) {
  return Card.findOne({$and: [{holder: user_id}, {template: template_id}]});
};

exports.deregisterCardById = function(id, user_id) {
  return Card.findOneAndUpdate({$and: [{holder: user_id}, {_id: id}]}, {$set: {'disable': true}}).exec();
}

exports.reactiveCardById = function(id, user_id) {
  return Card.findOneAndUpdate({$and: [{holder: user_id}, {_id: id}]}, {$set: {'disable': false}}).exec();
}

exports.getRegistedCardByTemplateId = function (template_id) {
  return Card.find({template: template_id}).populate({path: 'holder', select: 'name'}).lean();
}
