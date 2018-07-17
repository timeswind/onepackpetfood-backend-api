var Models = require('../../lib/core');
// var _ = require('lodash');
var $StoreAccount = Models.$StoreAccount;
var $Store = Models.$Store;

exports.post = function* () {
    const user_id = this.state.user.id
    const body = this.request.body;
    const storeTagrackCode = body.tagtrack_code
    let unbindedStore = yield $Store.getUnbindStoreByTagtrack(storeTagrackCode);
    if (unbindedStore) {
        const store_id = unbindedStore.id;
        let bindedStore = yield $Store.bindStoreWithUserById(store_id, user_id);
        let newStoreAccount = yield $StoreAccount.newStoreAccount({ user: user_id, store: store_id });
        if (bindedStore && newStoreAccount) {
            this.state = 200
            this.body = {
                success: true,
                store: bindedStore,
                storeAccount: newStoreAccount
            }
        } else {
            this.state = 500
            this.body = {
                success: false,
                store: {},
                storeAccount: {},
                error: "fail to bind store and create store account"
            }
        }
    } else {
        this.state = 404
        this.body = {
            success: false,
            store: {},
            storeAccount: {},
            error: "store is binded or not exist"
        }
    }
}