var Models = require('../../lib/core');
var $Order = Models.$Order;

exports.get = function* () {
    const order_id = this.request.query.id
    const order = yield $Order.getOrderDetailInternal(order_id)
    this.status = 200
    this.body = {
        success: true,
        order: order
    }
};