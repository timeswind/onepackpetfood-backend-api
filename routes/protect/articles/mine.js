var Models = require('../../../lib/core');
var $Article = Models.$Article;

exports.get = function* () {
  var user_id = this.state.user.id

  var articles = yield $Article.getSelfArticles(user_id)
  if (articles) {
    this.status = 200
    this.body = {
      success: true,
      articles: articles
    }
  } else {
    this.status = 404
    this.body = {
      success: false,
      articles: null
    }
  }
};
