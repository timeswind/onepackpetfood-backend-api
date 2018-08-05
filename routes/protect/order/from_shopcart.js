var Models = require('../../../lib/core');
var $User = Models.$User;
var $Shopcart = Models.$Shopcart;
var $Order = Models.$Order;
var $Address = Models.$Address;
var _ = require("lodash");

exports.post = function* () {
    const user_id = this.state.user.id
    const address_id = this.request.body.address_id
    const shopcart_ids = this.request.body.shopcart_ids
    var union_tagtrack_id = null

    const userData = yield $User.getById(user_id, 'union_tagtrack_id')
    if (userData && userData.union_tagtrack_id) {
        union_tagtrack_id = userData.union_tagtrack_id
    }
    const addressData = yield $Address.getAddressesById(address_id)
    const shopcarts = yield $Shopcart.getShopcartsByIds(shopcart_ids)
    if (shopcarts && shopcarts.length > 0 && addressData) {
        var total_fee = 0

        const addressField = `${addressData.name}|${addressData.phone}|${addressData.province}|${addressData.city}|${addressData.area}|${addressData.street}|${addressData.postcode}`
        console.log(addressField)
        var newOrderData = {
            user: user_id,
            shipping_type: "free",
            payment_type: "wechatpay",
            status: "WAIT_BUYER_PAY",
            address: addressField
        }
        var packages = shopcarts.map(shopcart => {
            var obj = {}
            let price_set = _.omit(JSON.parse(JSON.stringify(shopcart["price_set"])), '_id');
            obj["good"] = shopcart["good"]["_id"]
            obj["price_set"] = price_set
            obj["item_count"] = shopcart["item_count"]
            total_fee += shopcart.item_count * shopcart.price_set.price;
            return obj
        });
        newOrderData["packages"] = packages
        newOrderData["total_fee"] = financial(total_fee)
        
        if (union_tagtrack_id) {
            newOrderData["store_trackcode"] = union_tagtrack_id
        }

        yield $Shopcart.removeMultiple(shopcart_ids)
        const newOrder = yield $Order.newOrder(newOrderData)
        if (newOrder) {
            this.state = 200
            this.body = {
                success: true,
                order: newOrder
            }
        } else {
            this.state = 400
            this.body = {
                success: false,
                order: {}
            }
        }
    } else {
        console.log(this.request.body)
        console.log(shopcarts, addressData)
        this.state = 400
        this.body = {
            success: false,
            order: {}
        }
    }
};


function financial(x) {
    return Number.parseFloat(x).toFixed(2);
}