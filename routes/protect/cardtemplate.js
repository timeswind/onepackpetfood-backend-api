var Models = require('../../lib/core');
// var _ = require('lodash');
var $CardTemplate = Models.$CardTemplate;
var $Card = Models.$Card;

exports.post = function* () {
  var newCardTemplateData = this.request.body
  newCardTemplateData['issuer'] = this.state.user.id
  newCardTemplateData['school'] = this.state.user.school
  newCardTemplateData['type'] = 'membership'

  var newCardTemplate = yield $CardTemplate.newCardTemplate(newCardTemplateData)

  if (newCardTemplate) {
    this.status = 200
    this.body = {
      success: true,
      newCardTemplate: newCardTemplate
    }
  } else {
    this.status = 500
    this.body = {
      success: false,
      error: 'Fail to add new card template'
    }
  }
};

exports.put = function* () {
  var updatedCardTemplateData = this.request.body
  if ('id' in updatedCardTemplateData) {
    const cardtemplateId = updatedCardTemplateData.id
    var updatedCardtemplate = yield $CardTemplate.updateCardtemplate(cardtemplateId, {
      name: updatedCardTemplateData['name'],
      description: updatedCardTemplateData['description'],
      image: updatedCardTemplateData['image']
    })
    if (updatedCardtemplate) {
      this.status = 200
      this.body = {
        success: true,
        updatedCardtemplate: updatedCardtemplate
      }
    } else {
      this.status = 500
      this.body = {
        success: false,
        error: 'Fail to update card template'
      }
    }
  }
};

exports.get = function* () {
  var card_template_id = this.request.query.id
  var user_id = this.state.user.id
  var cardtemplate = yield $CardTemplate.findOneById(card_template_id)
  if (cardtemplate && cardtemplate.issuer == user_id) {
    var cards = yield $Card.getRegistedCardByTemplateId(card_template_id)
    this.status = 200;
    this.body = {
      success: true,
      cardtemplate: cardtemplate,
      cards: cards
    };
  } else {
    this.status = 404;
    this.body = {
      success: false,
      cardtemplate: {}
    };
  }
};
