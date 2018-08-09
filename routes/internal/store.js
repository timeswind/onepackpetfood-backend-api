var Models = require('../../lib/core');
var $Tagtrack = Models.$Tagtrack;
var $Store = Models.$Store;
// var _ = require('lodash');
var shortid = require('shortid');
shortid.characters("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@*")

exports.put = function* () {
    // let user_id = this.state.user.id
    var updates = this.request.body

    updates["updated_at"] = new Date()
    let store_id = updates._id
    delete updates._id
    var findStoreAndUpdate = yield $Store.update(store_id, updates)
    console.log(findStoreAndUpdate)
    if (findStoreAndUpdate) {
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
    var newStoreData = this.request.body;
    if (newStoreData.tagtrack_code === "" || !(!!newStoreData.tagtrack_code)) {
        let newTagtrackData = {
            name: newStoreData.name,
            code: shortid.generate(),
            type: 'store',
            active: true,
            active_date: new Date()
        }
        var insertResult = yield $Tagtrack.addMultipleTagtrack(newTagtrackData);
        if (insertResult) {
            newStoreData.tagtrack_code = newTagtrackData.code
            var insertNewStoreResult = yield $Store.newStore(newStoreData)
            if (insertNewStoreResult) {
                this.status = 200
                this.body = {
                    success: true,
                    insertNewStoreResult: insertNewStoreResult
                }
            } else {
                this.status = 500
                this.body = {
                    success: false,
                    insertResult: null
                }
            }
        } else {
            this.status = 500
            this.body = {
                success: false,
                insertResult: null
            }
        }

    } else {
        var active_tag_track = yield $Tagtrack.activeTagtrack(newStoreData.tagtrack_code)
        var insertNewStoreResult = yield $Store.newStore(newStoreData)
        if (insertNewStoreResult) {
            this.status = 200
            this.body = {
                success: true,
                insertNewStoreResult: insertNewStoreResult
            }
        } else {
            this.status = 500
            this.body = {
                success: false,
                insertNewStoreResult: null
            }
        }
    }
};
