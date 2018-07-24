var Models = require('../../lib/core');
var $Good = Models.$Good;
var $Store = Models.$Store;

exports.post = function* () {
    var newGoodData = this.request.body
    var user_id = this.state.user.id
    var user_role = this.state.user.role
    if (user_role === 100) {
        newGoodData["store"] = null
        const newGood = yield $Good.newGood(newGoodData)
        if (newGood) {
            this.status = 200
            this.body = {
                success: true,
                good: newGood
            }
        } else {
            this.status = 500
            this.body = {
                success: false,
                good: {}
            }
        }
    } else {
        const store = yield $Store.getStoreByOwnerId(user_id)
        if (store) {
            const store_id = store.id
            newGoodData["store"] = store_id
            const newGood = yield $Good.newGood(newGoodData)
            if (newGood) {
                this.status = 200
                this.body = {
                    success: true,
                    good: newGood
                }
            } else {
                this.status = 500
                this.body = {
                    success: false,
                    good: {}
                }
            }
        } else {
            this.status = 404
            this.body = {
                success: false,
                error: "user store not found"
            }
        }
    }
};