var Models = require('../../../lib/core');
var $Shopcart = Models.$Shopcart;

exports.get = function* () {
    const user_id = this.state.user.id
    const shopcart_ids = JSON.parse(this.request.query.shopcart_ids)
    const shopcarts = yield $Shopcart.getShopcartsByIds(shopcart_ids)
    this.state = 200
    this.body = {
        success: true,
        shopcarts: shopcarts
    }
};
