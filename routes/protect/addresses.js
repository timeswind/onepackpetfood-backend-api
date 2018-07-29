var Models = require('../../lib/core');
var _ = require('lodash');
var $Address = Models.$Address;

exports.get = function* () {
    const user_id = this.state.user.id
    const addresses = yield $Address.getAddressesByUserId(user_id)
    if (addresses) {
        this.state = 200
        this.body = {
            success: true,
            addresses: addresses
        }
    }
}