var Models = require('../../lib/core');
var $Store = Models.$Store;

exports.get = function* () {
    let user_id = this.state.user.id
    let user_store = yield $Store.getStoreByOwnerId(user_id);
    if (user_store) {
        this.state = 200;
        this.body = {
            success: true,
            user_store: user_store
        }
    } else {
        this.state = 200;
        this.body = {
            success: false,
            user_store: {}
        }
    }
}

// exports.post = function* () {
//     let user_id = this.state.user.id
//     var updates = this.request.body

//     updates["updated_at"] = new Date()
//     delete updates._id
//     var findUserAndUpdate = yield $User.update(user_id, updates)
//     console.log(findUserAndUpdate)
//     if (findUserAndUpdate) {
//         this.status = 200;
//         this.body = {
//             success: true
//         };
//     } else {
//         this.status = 500;
//         this.body = {
//             success: false,
//             error: "Fail to update"
//         };
//     }
// }

// exports.get = function* () {
//     let user = this.state.user

//     var userInfo = yield $User.getById(user.id)

//     if (userInfo) {
//       this.status = 200;
//       this.body = {
//         success: true,
//         userInfo: userInfo
//       };
//     } else {
//       this.status = 500;
//       this.body = {
//         success: false,
//         error: "User account don't exist"
//       };
//     }
//   }