var Models = require('../../../lib/core');
var $CardTemplate = Models.$CardTemplate;

exports.get = function* () {
  var user_id = this.state.user.id

  var cardtemplates = yield $CardTemplate.getSelfIssuedCardTemplates(user_id)
  if (cardtemplates) {
    this.status = 200
    this.body = {
      success: true,
      cardtemplates: cardtemplates
    }
  } else {
    this.status = 404
    this.body = {
      success: false,
      cardtemplates: null
    }
  }
};
