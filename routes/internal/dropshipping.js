var Models = require('../../lib/core');
var $Dropshipping = Models.$Dropshipping;

exports.put = function* () {
    // let user_id = this.state.user.id
    var updates = this.request.body

    updates["updated_at"] = new Date()
    let dropshipping_id = updates._id
    delete updates._id
    var findDropshippingAndUpdate = yield $Dropshipping.update(dropshipping_id, updates)
    if (findDropshippingAndUpdate) {
        this.status = 200;
        this.body = {
            success: true
        };
    } else {
        this.status = 500;
        this.body = {
            success: false,
            error: "Fail to update"
        };
    }
}

exports.post = function* () {
    var newDropshippingData = this.request.body;
    let newDropshipping = yield $Dropshipping.newDropshipping(newDropshippingData);
    if (newDropshipping) {
        this.status = 200
        this.body = {
            success: true,
            dropshipping: newDropshipping
        }
    } else {
        this.status = 400
        this.body = {
            success: false,
            dropshipping: {}
        }
    }
};
