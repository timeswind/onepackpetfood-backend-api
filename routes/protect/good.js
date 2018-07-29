var Models = require('../../lib/core');
var $Good = Models.$Good;
var $Store = Models.$Store;

exports.put = function* () {
    // let user_id = this.state.user.id
    var updates = this.request.body
    updates["updated_at"] = new Date()
    let good_id = updates._id
    delete updates._id
    var findGoodAndUpdate = yield $Good.update(good_id, updates)
    if (findGoodAndUpdate) {
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

exports.delete = function* () {
    var id = this.request.query.id;
    let deleted = yield $Good.deleteById(id)
    if (deleted) {
        this.status = 200
        this.body = {
            success: true,
            deleted: deleted
        }
    }
}