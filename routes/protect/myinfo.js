var Models = require('../../lib/core');
// var _ = require('lodash');
// var $List = Models.$List;
var $User = Models.$User;

exports.post = function* () {
    let user_id = this.state.user.id
    var updates = this.request.body

    updates["updated_at"] = new Date()
    delete updates._id
    var findUserAndUpdate = yield $User.update(user_id, updates)
    console.log(findUserAndUpdate)
    if (findUserAndUpdate) {
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

exports.get = function* () {
    let user = this.state.user
  
    var userInfo = yield $User.getById(user.id)
  
    if (userInfo) {
      this.status = 200;
      this.body = {
        success: true,
        userInfo: userInfo
      };
    } else {
      this.status = 500;
      this.body = {
        success: false,
        error: "User account don't exist"
      };
    }
  }