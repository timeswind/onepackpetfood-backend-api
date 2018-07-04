var Models = require('../../../lib/core');
var $User = Models.$User;

exports.post = function* () {
  var newAvatarUrl = this.request.body.url
  console.log(this.request.body)
  var user_id = this.state.user.id

  var patchedUser = $User.patch(user_id, 'avatar', newAvatarUrl)

  if (patchedUser) {
    this.status = 200
    this.body = {
      success: true
    }
  } else {
    this.status = 500
    this.body = {
      success: false,
      error: 'Fail to update ' + "avatar"
    }
  }
}
