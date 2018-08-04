var Models = require('../../../lib/core');
var $Order = Models.$Order;

exports.get = function* () {
    const user_id = this.state.user.id
    const paidOrders = yield $Order.getOrdersByUserAndStatus(user_id, "WAIT_SELLER_SEND_GOODS")
    this.status = 200
    this.body = {
        success: true,
        orders: paidOrders
    }
};