var Models = require('../../lib/core');
var $Dropshipping = Models.$Dropshipping;

exports.get = function* () {
    var dropshippings = yield $Dropshipping.getDropShippings()

    if (dropshippings) {
        this.status = 200
        this.body = {
            success: true,
            dropshippings: dropshippings
        }
    } else {
        this.status = 404
        this.body = {
            success: false,
            dropshippings: [],
            error: "No dropshippings found !"
        }
    }
};
