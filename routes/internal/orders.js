var Models = require('../../lib/core');
var $Order = Models.$Order;

exports.get = function* () {
    const allOrders = yield $Order.getAllOrdersInternal()
    this.status = 200
    this.body = {
        success: true,
        orders: allOrders
    }
};