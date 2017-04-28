'use strict';

(function () {

  var TYPE_DICTIONARY = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом'
  };
  var template = document.querySelector('#lodge-template');
  var dialogMockup = document.querySelector('#offer-dialog');

  var fillElem = function (dialog, element, content) {
    var selector = '.lodge__' + element;
    dialog.querySelector(selector).textContent = content;
  };

  var translateType = function (type) {
    return TYPE_DICTIONARY[type];
  };

  var generateFeaturesIcons = function (features) {
    var fragment = document.createDocumentFragment();
    features.forEach(function (it) {
      var icon = createFeatureIcon(it);
      fragment.appendChild(icon);
    });
    return fragment;
  };

  var createFeatureIcon = function (feature) {
    var icon = document.createElement('span');
    icon.classList.add('feature__image');
    icon.classList.add('feature__image--' + feature);
    return icon;
  };

  window.showCard = function (featuredItem) {
    var guestsText = 'Для ' + featuredItem.offer.guests + ' гостей в ' +
      featuredItem.offer.rooms + ' комнатах';
    var timeText = 'Заезд после ' + featuredItem.offer.checkin + ', выезд до ' +
      featuredItem.offer.checkout;
    var avatarSrc = String(featuredItem.author.avatar);
    var dialogClone = template.content.cloneNode(true);

    fillElem(dialogClone, 'title', featuredItem.offer.title);
    fillElem(dialogClone, 'address', featuredItem.offer.address);
    fillElem(dialogClone, 'type', translateType(featuredItem.offer.type));
    fillElem(dialogClone, 'rooms-and-guests', guestsText);
    fillElem(dialogClone, 'checkin-time', timeText);
    fillElem(dialogClone, 'description', featuredItem.offer.description);

    dialogClone
      .querySelector('.lodge__price')
      .innerHTML = featuredItem.offer.price + '&#x20bd;/ночь';
    dialogClone
      .querySelector('.lodge__features')
      .appendChild(generateFeaturesIcons(featuredItem.offer.features));

    dialogMockup
      .querySelector('.dialog__title img').src = avatarSrc;
    dialogMockup
      .replaceChild(dialogClone, dialogMockup.querySelector('.dialog__panel'));
  };
})();
