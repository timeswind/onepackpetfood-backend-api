var Models = require('../../lib/core');
var $Good = Models.$Good;
var $Store = Models.$Store;
exports.get = function* () {
    const user_id = this.state.user.id
    const user_role = this.state.user.role
    if (user_role === 100) {
        const goods = yield $Good.getGoodsByStoreId(null)
        if (goods) {
            this.status = 200
            this.body = {
                success: true,
                goods: goods
            }
        } else {
            this.status = 500
            this.body = {
                success: false,
                goods: {}
            }
        }
    } else {
        const store = yield $Store.getStoreByOwnerId(user_id)
        if (store) {
            const goods = yield $Good.getGoodsByStoreId(store.id)
            if (goods) {
                this.status = 200
                this.body = {
                    success: true,
                    goods: goods
                }
            } else {
                this.status = 500
                this.body = {
                    success: false,
                    goods: {}
                }
            }
        } else {
            this.status = 404
            this.body = {
                success: false,
                error: "store not found"
            }
        }
    }
};
