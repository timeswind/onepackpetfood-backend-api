var Models = require('../../lib/core');
// var _ = require('lodash');
var $CardTemplate = Models.$CardTemplate;
var $Card = Models.$Card;

exports.get = function* () {
  var card_template_id = this.request.query.id
  var user_id = this.state.user.id
  var user_school = this.state.user.school

  var cardtemplate = yield $CardTemplate.findOneById(card_template_id)
  if (cardtemplate) {
    if (cardtemplate.school === user_school) {
      var checkIfHasOwned = yield $Card.findOneOwned(card_template_id, user_id)
      if (checkIfHasOwned) {
        var reavtiveCard = yield $Card.reactiveCardById(checkIfHasOwned._id, user_id)
        if (reavtiveCard) {
          this.status = 200;
          this.body = {
            success: true,
            card: reavtiveCard
          };
        } else {
          this.status = 400;
          this.body = {
            success: false,
            card: {},
            error: 'fail to create new card'
          };
        }
      } else {
        var updatedCardTemplate = yield $CardTemplate.increaseCount(card_template_id)
        console.log('updatedCardTemplate', updatedCardTemplate)
        var newCardData = {
          template: card_template_id,
          holder: user_id,
          number: updatedCardTemplate.count,
        }
        var newCard = yield $Card.newCard(newCardData)
        if (newCard) {
          this.status = 200;
          this.body = {
            success: true,
            card: newCard
          };
        } else {
          this.status = 400;
          this.body = {
            success: false,
            card: {},
            error: 'fail to create new card'
          };
        }
      }

    } else {
      this.status = 400;
      this.body = {
        success: false,
        error: "not in the target school"
      };
    }
  } else {
    this.status = 404;
    this.body = {
      success: false,
      cardtemplate: {}
    };
  }
};
