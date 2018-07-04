var Models = require('../../lib/core');
var $Article = Models.$Article;

exports.get = function* () {
  var articles = yield $Article.getAllArticles()
  if (articles) {
    this.status = 200;
    this.body = {
      success: true,
      articles: articles
    };
  } else {
    this.status = 404;
    this.body = {
      success: false,
      articles: {}
    };
  }
};
