var Models = require('../../../lib/core');
var $Order = Models.$Order;

exports.get = function* () {
    const tagtrack_id = this.request.query.id

    const tagtrackOrders = yield $Order.getOrdersByTagtrack(tagtrack_id)
    this.status = 200
    this.body = {
        success: true,
        orders: tagtrackOrders
    }
};