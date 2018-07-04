var Models = require('../../lib/core');
var $CardTemplate = Models.$CardTemplate;
var $Card = Models.$Card;

exports.get = function* () {
  var card_id = this.request.query.id
  var user_id = this.state.user.id

  var deregisteredCard = yield $Card.deregisterCardById(card_id, user_id)
  console.log(deregisteredCard)
  if (deregisteredCard) {
    this.status = 200;
    this.body = {
      success: true,
      card: deregisteredCard
    };
  } else {
    this.status = 404;
    this.body = {
      success: false,
      card: {},
      error: 'fail to deregisteredCard'
    };
  }
};
