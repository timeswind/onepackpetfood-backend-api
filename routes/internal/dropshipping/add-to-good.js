var Models = require('../../../lib/core');
var $Dropshipping = Models.$Dropshipping;
var $Good = Models.$Good;

exports.post = function* () {
    const dropshipping_id = this.request.body.id
    const dropshipping = yield $Dropshipping.getById(dropshipping_id)
    const newGoodData = {
        name: dropshipping.good_name,
        description: dropshipping.good_description,
        images: dropshipping.good_images,
        root_category: dropshipping.root_category,
        category: dropshipping.category,
        subtitle: "",
        price: dropshipping.price,
        price_sets: dropshipping.price_sets,
        stock: 0,
        show_stock: false,
        published: false,
        drop_shipping: dropshipping_id
    }
    const newGood = yield $Good.newGood(newGoodData)
    if (newGood) {
        this.state = 200
        this.body = {
            success: true
        }
    }
}