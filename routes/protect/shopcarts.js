var Models = require('../../lib/core');
var $Shopcart = Models.$Shopcart;
exports.get = function* () {
    const user_id = this.state.user.id
    const shopcarts = yield $Shopcart.getUserShopcarts(user_id)
    if (shopcarts) {
        this.state = 200
        this.body = {
            success: true,
            shopcarts: shopcarts
        }
    }
};
