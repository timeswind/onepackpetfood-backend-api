var Models = require('../../lib/core');
var $Tagtrack = Models.$Tagtrack;

exports.get = function* () {

    var records = yield $Tagtrack.getAll()

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
