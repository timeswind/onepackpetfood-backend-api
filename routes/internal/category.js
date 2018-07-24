var Models = require('../../lib/core');
var $Category = Models.$Category;

exports.put = function* () {
    // let user_id = this.state.user.id
    var updates = this.request.body

    updates["updated_at"] = new Date()
    let category_id = updates._id
    delete updates._id
    var findCategoryAndUpdate = yield $Category.update(category_id, updates)
    if (findCategoryAndUpdate) {
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
    var newCategoryData = this.request.body;
    if (newCategoryData && newCategoryData.scope && 'parent' in newCategoryData) {
        let newCategory = yield $Category.newCategory(newCategoryData);
        if (newCategory) {
            this.status = 200
            this.body = {
                success: true,
                category: newCategory
            }
        } else {
            this.status = 400
            this.body = {
                success: false,
                category: {}
            }
        }
    } else {
        this.status = 400
        this.body = {
            success: false,
            category: {},
            error: 'missing required data'
        }
    }
};
