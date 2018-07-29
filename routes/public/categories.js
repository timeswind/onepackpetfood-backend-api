var Models = require('../../lib/core');
var _ = require('lodash');
var $Category = Models.$Category;

exports.get = function* () {
  const scope = this.query.scope
  const parent = this.query.parent // parent_id
  const aggregate_scope = this.query.aggregate_scope
  if (scope) {
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
        rootCategories: []
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
        childCategories: []
      }
    }
  } else if (aggregate_scope) {
    // let aggregateCategories = yield $Category.aggregate(aggregate_scope)
    let rootCategories = yield $Category.getRoot(aggregate_scope)
    var rootCategoriesArray = []
    rootCategories.forEach(category => {
      rootCategoriesArray.push(category._id)
    });
    let childCategories = yield $Category.getManyByParentIds(rootCategoriesArray)
    // console.log(rootCategoriesArray)
    // console.log(childCategories)
    var childCategoriesCollection = {}
    childCategoriesCollection = _.groupBy(childCategories, (category)=> category.parent)
    // console.log(childCategoriesCollection)
    this.state = 200
    this.body = {
      success: true,
      rootCategories: rootCategories,
      childCategoriesCollection: childCategoriesCollection
    }
    // if (aggregateCategories) {
    //   this.state = 200
    //   this.body = {
    //     success: true,
    //     aggregateCategories: aggregateCategories
    //   }
    // } else {
    //   this.state = 404
    //   this.body = {
    //     success: false,
    //     aggregateCategories: []
    //   }
    // }
  } else {
    this.state = 400
    this.body = {
      success: false,
      error: 'missing query data'
    }
  }
};
