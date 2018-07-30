var Models = require('../../lib/core');
var _ = require('lodash');
var $Good = Models.$Good;

exports.get = function* () {
    let good_id = this.query.id
    const good = yield $Good.getGoodDetail(good_id)
    if (good) {
        this.state = 200
        this.body = {
            success: true,
            good: good
        }
    }
};
