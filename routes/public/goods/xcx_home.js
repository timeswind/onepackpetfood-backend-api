var Models = require('../../../lib/core');
var $Good = Models.$Good;
var _ = require('lodash')

exports.get = function* () {
    const goods = yield $Good.getGoodsByStoreId(null)
    if (goods) {
        this.state = 200
        this.body = {
            success: true,
            goods: goods
        }
    }
};
