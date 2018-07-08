var Models = require('../../lib/core');
var $Store = Models.$Store;

exports.get = function* () {

    var records = yield $Store.getAll()

    if (records) {
      this.status = 200
      this.body = {
        success: true,
        records: records
      }
    } else {
      this.status = 404
      this.body = {
        success: false,
        records: null,
        error: "No records found !"
      }
    }

};
