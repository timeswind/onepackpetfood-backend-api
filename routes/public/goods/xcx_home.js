var Models = require('../../../lib/core');
var $Good = Models.$Good;
var _ = require('lodash')

exports.get = function* () {
    console.log("yield $Good.getPublishedGoodsByStoreId(null)")
    const goods = yield $Good.getPublishedGoodsByStoreId(null)
    if (goods) {
        this.state = 200
        this.body = {
            success: true,
            goods: goods
        }
    }
};
