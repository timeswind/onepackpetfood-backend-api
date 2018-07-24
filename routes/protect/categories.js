var Models = require('../../lib/core');
var $Category = Models.$Category;

exports.get = function* () {
  const scope = this.query.scope
  const parent = this.query.parent // parent_id
  if (scope) {
    console.log('hit')
    let rootCategories = yield $Category.getRoot(scope)
    if (rootCategories) {
      this.state = 200
      this.body = {
        success: true,
        rootCategories: rootCategories
      }
    } else {
      this.state = 404
      this.body = {
        success: false,
        rootCategories: {}
      }
    }
  } else if (parent) {
    let childCategories = yield $Category.getChildrens(parent)
    if (childCategories) {
      this.state = 200
      this.body = {
        success: true,
        childCategories: childCategories
      }
    } else {
      this.state = 404
      this.body = {
        success: false,
        childCategories: {}
      }
    }
  } else {
    this.state = 400
    this.body = {
      success: false,
      error: 'missing query data'
    }
  }
};
