var Models = require('../../../lib/core');
var $Order = Models.$Order;

exports.get = function* () {
    const user_id = this.state.user.id
    const completeOrders = yield $Order.getOrdersByUserAndStatus(user_id, "TRADE_FINISHED")
    this.status = 200
    this.body = {
        success: true,
        orders: completeOrders
    }
};