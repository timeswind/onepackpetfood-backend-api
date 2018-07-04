var Models = require('../../lib/core');
var _ = require('lodash');
var $Article = Models.$Article;

exports.post = function* () {
  var newArticleData = this.request.body
  newArticleData['user'] = this.state.user.id
  newArticleData['school'] = this.state.user.school

  var newArticle = yield $Article.newArticle(newArticleData)

  if (newArticle) {
    this.status = 200
    this.body = {
      success: true,
      newArticle: newArticle
    }
  } else {
    this.status = 500
    this.body = {
      success: false,
      error: 'Fail to add new article'
    }
  }
};
