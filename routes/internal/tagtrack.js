var Models = require('../../lib/core');
var $Tagtrack = Models.$Tagtrack;
var _ = require('lodash');
var shortid = require('shortid');
shortid.characters("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@*")

exports.put = function* () {
    // let user_id = this.state.user.id
    var updates = this.request.body

    updates["updated_at"] = new Date()
    let tagtrack_id = updates._id
    delete updates._id
    var findTagtrackAndUpdate = yield $Tagtrack.update(tagtrack_id, updates)
    console.log(findTagtrackAndUpdate)
    if (findTagtrackAndUpdate) {
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
    var newTagtrackData = this.request.body;
    if (newTagtrackData.type === 'pack') {
        var documents = []
        if (newTagtrackData.count > 1) {
            _.times(newTagtrackData.count, i => {
                documents.push({
                    name: newTagtrackData.name + i,
                    code: shortid.generate(),
                    type: newTagtrackData.type,
                    packageCode: newTagtrackData.packageCode
                })
            })
        } else {
            documents.push({
                name: newTagtrackData.name,
                code: shortid.generate(),
                type: newTagtrackData.type,
                packageCode: newTagtrackData.packageCode
            })
        }
        var insertResult = yield $Tagtrack.addMultipleTagtrack(documents);
        console.log('insertResult', insertResult)
        if (insertResult) {
            this.status = 200
            this.body = {
                success: true,
                insertResult: insertResult
            }
        } else {
            this.status = 500
            this.body = {
                success: false,
                insertResult: null
            }
        }

    } else if (newTagtrackData.type === 'store') {
        var document = {
            name: newTagtrackData.name,
            code: shortid.generate(),
            type: newTagtrackData.type
        }
        var insertResult = yield $Tagtrack.addTagtrack(document)

        if (insertResult) {
            this.status = 200
            this.body = {
                success: true,
                insertResult: insertResult
            }
        } else {
            this.status = 500
            this.body = {
                success: false,
                insertResult: null
            }
        }
    }
    //   var newSiteblog = yield $Siteblog.create(newSiteblogData)
    //   if (newSiteblog) {
    //     this.status = 200
    //     this.body = {
    //       success: true,
    //       newSiteblog: newSiteblog
    //     }
    //   } else {
    //     this.status = 500
    //     this.body = {
    //       success: false,
    //       newSiteblog: null
    //     }
    //   }

};
