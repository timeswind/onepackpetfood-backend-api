var Article = require('../models').Article;
//新建一个LIST
exports.newArticle = function (data) {
  return Article.create(data);
};

exports.getSelfArticles = function (userid) {
  return Article.find({user: userid}).sort({_id: -1}).populate('user', 'name');
};

exports.getAllArticles = function () {
  return Article.find({}).sort({_id: -1}).populate('user', 'name');
};

exports.findOneById = function (id) {
  return Article.findOne({_id: id});
};

exports.update = function (article_id, user_id, updates) {
  return Article.findOneAndUpdate({"_id": article_id, user: user_id}, {"$set": updates}, {new: true}).exec()
}

exports.deleteArticle = function (id, user_id) {
  return Article.findOneAndRemove({_id: id, user: user_id}).exec()
}
