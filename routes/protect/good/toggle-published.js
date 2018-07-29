var Models = require('../../../lib/core');
var $Good = Models.$Good;

exports.post = function* () {
    // let user_id = this.state.user.id
    var goodStateToggle = null;
    const goodData = this.request.body
    if (goodData.published === true) {
        goodStateToggle = yield $Good.setPublishedState(goodData._id, false)
    } else {
        goodStateToggle = yield $Good.setPublishedState(goodData._id, true)
    }

    if (goodStateToggle) {
        this.state = 200
        this.body = {
            success: true
        }
    }

}