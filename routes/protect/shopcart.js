var Models = require('../../lib/core');
var _ = require('lodash');
var $Shopcart = Models.$Shopcart;

exports.put = function* () {
    let user_id = this.state.user.id
    var updates = this.request.body
    let shopcart_id = updates._id

    delete updates._id
    delete updates.user
    delete updates.good
    
    var findShopcartAndUpdate = yield $Shopcart.updateUserShopcart(shopcart_id, user_id, updates)
    if (findShopcartAndUpdate) {
        this.status = 200;
        this.body = {
            success: true,
            shopcart: findShopcartAndUpdate
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
    const user_id = this.state.user.id
    var newShopCartData = this.request.body
    newShopCartData["user"] = user_id
    console.log(newShopCartData)
    const newShopCart = yield $Shopcart.newShopcart(newShopCartData);

    if (newShopCart) {
        this.state = 200
        this.body = {
            success: true,
            shopcart: newShopCart
        }
    }
}