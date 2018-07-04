var Models = require('../../lib/core');
var $CardTemplate = Models.$CardTemplate;

exports.get = function* () {
  var school = this.request.query.school
  console.log(school)
  var cards = yield $CardTemplate.getAvailableCards(school)
  console.log(cards)
  if (cards) {
    this.status = 200;
    this.body = {
      success: true,
      cards: cards
    };
  } else {
    this.status = 404;
    this.body = {
      success: false,
      cards: {}
    };
  }
};
