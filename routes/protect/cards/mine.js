var Models = require('../../../lib/core');
// var _ = require('lodash');
var $Card = Models.$Card;

exports.get = function* () {
  console.log('hit')
  var userid = this.state.user.id
  var ownedCards = yield $Card.getOwnedCards(userid)
  if (ownedCards) {
    console.log(ownedCards)
    this.status = 200;
    this.body = {
      success: true,
      cards: ownedCards
    };
  } else {
    this.status = 404;
    this.body = {
      success: false,
      cards: []
    };
  }
};
