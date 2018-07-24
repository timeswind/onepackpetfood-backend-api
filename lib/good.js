var Good = require('../models').Good;

exports.newGood = function (data) {
    return Good.create(data);
};

exports.getGoodsByStoreId = function (store_id) {
    return Good.find({ store: store_id }).exec();
}
