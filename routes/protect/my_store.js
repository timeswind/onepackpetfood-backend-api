var Models = require('../../lib/core');
var $Store = Models.$Store;
var $StoreAccount = Models.$StoreAccount;

exports.get = function* () {
    let user_id = this.state.user.id
    let user_store = yield $Store.getStoreByOwnerId(user_id);
    var store_account = null;
    if (user_store && 'id' in user_store) {
        store_account = yield $StoreAccount.getStoreAccountByStoreId(user_store.id)
    }
    if (user_store && store_account) {
        this.state = 200;
        this.body = {
            success: true,
            store: user_store,
            storeAccount: store_account
        }
    } else {
        this.state = 200;
        this.body = {
            success: false,
            store: {},
            storeAccount: {}
        }
    }
}