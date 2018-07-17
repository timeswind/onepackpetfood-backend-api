var Models = require('../../lib/core');
var $Store = Models.$Store;

exports.get = function* () {
    let tagtrack_code = this.request.query.tagtrack
    console.log(tagtrack_code)
    let storeData = yield $Store.getStoreByTagtrack(tagtrack_code);
    if (storeData) {
        this.state = 200;
        this.body = {
            success: true,
            store: storeData
        }
    } else {
        this.state = 200;
        this.body = {
            success: false,
            store: {}
        }
    }
}