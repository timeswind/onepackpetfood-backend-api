var Models = require('../../../lib/core');
var $Order = Models.$Order;

exports.get = function* () {
    const user_id = this.state.user.id
    const unpaidOrders = yield $Order.getOrdersByUserAndStatus(user_id, "WAIT_BUYER_PAY")
    this.status = 200
    this.body = {
        success: true,
        orders: unpaidOrders
    }
};