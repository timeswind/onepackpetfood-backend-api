var Models = require('../../../lib/core');
var $Order = Models.$Order;

exports.get = function* () {
    const user_id = this.state.user.id
    const allOrders = yield $Order.getOrdersByUser(user_id)
    this.status = 200
    this.body = {
        success: true,
        orders: allOrders
    }
};