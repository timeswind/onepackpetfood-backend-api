var Models = require('../../lib/core');
var _ = require('lodash');
var $Shopcart = Models.$Shopcart;

exports.delete = function* () {
    let user_id = this.state.user.id
    let shopcart_id = this.request.body.id

    const deleted = yield $Shopcart.deleteByUser(shopcart_id, user_id)
    if (deleted) {
        this.state = 200
        this.body = {
            success: true
        }
    } else {
        this.state = 500
        this.body = {
            success: false
        }
    }
}

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
    const user_id = this.state.user.id;
    var newShopCartData = this.request.body;
    const price_set_id = newShopCartData["price_set"];
    newShopCartData["user"] = user_id

    const ifSamePriceSetExist = yield $Shopcart.getExistPriceSetShopcart(user_id, price_set_id)
    if (ifSamePriceSetExist) {
        const existShopCartId = ifSamePriceSetExist._id
        yield $Shopcart.incrementShopcartItemCount(existShopCartId)
        this.state = 200
        this.body = {
            success: true
        }
    } else {
        const newShopCart = yield $Shopcart.newShopcart(newShopCartData);

        if (newShopCart) {
            this.state = 200
            this.body = {
                success: true,
                shopcart: newShopCart
            }
        }
    }
}