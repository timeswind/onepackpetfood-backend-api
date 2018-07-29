var Category = require('../models').Category;

exports.newCategory = function (data) {
    return Category.create(data);
};

exports.getRoot = function (scope) {
    return Category.find({ scope: scope, parent: null }).exec();
}

exports.getChildrens = function (parent_id) {
    return Category.find({ parent: parent_id }).exec();
}

exports.getManyByParentIds = function (parent_ids) {
    return Category.find({ parent: { $in: parent_ids } }).exec();
}

exports.update = function (category_id, updates) {
    return Category.findOneAndUpdate({ "_id": category_id }, { "$set": updates }, { new: true }).exec()
}