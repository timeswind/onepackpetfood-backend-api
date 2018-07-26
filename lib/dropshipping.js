var Dropshipping = require('../models').Dropshipping;

exports.newDropshipping = function (data) {
    return Dropshipping.create(data);
};

exports.getDropShippings = function () {
    return Dropshipping.find({}).exec();
}

exports.update = function (dropshipping_id, updates) {
    return Dropshipping.findOneAndUpdate({ "_id": dropshipping_id }, { "$set": updates }, { new: true }).exec()
}

exports.deleteById = function (dropshipping_id) {
    return Dropshipping.findOneAndRemove({"_id": dropshipping_id}).exec();
}
