var Models = require('../../lib/core');
var $Article = Models.$Article;
var _ = require('lodash')

exports.get = function* () {
  var article_id = this.request.query.id
  var article = yield $Article.findOneById(article_id)
  if (article) {
    this.status = 200;
    this.body = {
      success: true,
      article: article
    };
  } else {
    this.status = 404;
    this.body = {
      success: false,
      article: {}
    };
  }
};
