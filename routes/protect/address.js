var Models = require('../../lib/core');
var _ = require('lodash');
var $Address = Models.$Address;

exports.get = function* () {
    const id = this.request.query.id
    const address = yield $Address.getAddressesById(id)
    this.state = 200
    this.body = {
        success: true,
        address: address
    }
}

exports.put = function* () {
    let user_id = this.state.user.id
    var updates = this.request.body
    let address_id = updates._id

    delete updates._id
    delete updates.user
    console.log(user_id, address_id, updates)
    if (updates.isDefault) {
        const userDefaultAddress = yield $Address.getUserDefaultAddress(user_id)
        if (userDefaultAddress) {
            yield $Address.removeDefault(userDefaultAddress._id)
        }
    }

    var findAddressAndUpdate = yield $Address.updateAddress(address_id, user_id, updates)
    if (findAddressAndUpdate) {
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
    const user_id = this.state.user.id
    var newAddressData = this.request.body
    newAddressData["user"] = user_id
    if (newAddressData.isDefault) {
        const userDefaultAddress = yield $Address.getUserDefaultAddress(user_id)
        if (userDefaultAddress) {
            yield $Address.removeDefault(userDefaultAddress._id)
        }
    }

    const newAddress = yield $Address.newAddress(newAddressData);
    console.log(newAddress)
    if (newAddress) {
        this.state = 200
        this.body = {
            success: true,
            address: newAddress
        }
    }
}

exports.delete = function* () {
    const user_id = this.state.user.id
    const address_id = this.request.body.id
    const deleted = yield $Address.deleteByUser(address_id, user_id)
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