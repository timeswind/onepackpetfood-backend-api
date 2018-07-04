var Models = require('../../lib/core');
// var _ = require('lodash');
var $Article = Models.$Article;

exports.put = function* () {
  let user_id = this.state.user.id
  var updates = this.request.body

  updates["updated_at"] = new Date()
  let article_id = updates._id

  delete updates._id

  var findArticleAndUpdate = yield $Article.update(article_id, user_id, updates)
  if (findArticleAndUpdate) {
    this.status = 200;
    this.body = {
      success: true
    };
  } else {
    this.status = 500;
    this.body = {
      success: false,
      error: "Fail to update"
    };
  }
}

exports.delete = function*() {
  var user_id = this.state.user.id
  var article_id = this.request.query.id

  var articleDeleted = yield $Article.deleteArticle(article_id, user_id)

  if (articleDeleted) {
    this.status = 200
    this.body = {
      success: true
    }
  } else {
    this.status = 500
    this.body = {
      success: false
    }
  }
}
