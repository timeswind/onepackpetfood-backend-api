var Models = require('../../../lib/core');
var $Address = Models.$Address;

exports.get = function* () {
    const user_id = this.state.user.id

    const address = yield $Address.getUserDefaultAddress(user_id)

    this.state = 200
    this.body = {
        success: true,
        address: address
    }
};
