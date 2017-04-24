'use strict';

window.showCard = (function () {
  var typeDictionary = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом'
  };

  var generateDialog = function (featuredItem) {
    var template = document.querySelector('#lodge-template');
    var dialogMockup = document.querySelector('#offer-dialog');
    var guestsText = 'Для ' + featuredItem.offer.guests + ' гостей в ' +
      featuredItem.offer.rooms + ' комнатах';
    var timeText = 'Заезд после ' + featuredItem.offer.checkin + ', выезд до ' +
      featuredItem.offer.checkout;
    var avatarSrc = '' + featuredItem.author.avatar;
    var dialogClone = template.content.cloneNode(true);

    fillDialogElem(dialogClone, 'title', featuredItem.offer.title);
    fillDialogElem(dialogClone, 'address', featuredItem.offer.address);
    fillDialogElem(dialogClone, 'type', translateType(featuredItem.offer.type));
    fillDialogElem(dialogClone, 'rooms-and-guests', guestsText);
    fillDialogElem(dialogClone, 'checkin-time', timeText);
    fillDialogElem(dialogClone, 'description', featuredItem.offer.description);

    dialogClone
      .querySelector('.lodge__price')
      .innerHTML = featuredItem.offer.price + '&#x20bd;/ночь';

    dialogClone
      .querySelector('.lodge__features')
      .appendChild(generateFeaturesIcons(featuredItem.offer.features));

    dialogMockup.querySelector('.dialog__title img').src = avatarSrc;
    dialogMockup
      .replaceChild(dialogClone, dialogMockup.querySelector('.dialog__panel'));
  };

  var fillDialogElem = function (dialog, element, content) {
    var selector = '.lodge__' + element;

    dialog.querySelector(selector).textContent = content;
  };

  var translateType = function (type) {
    var translatedType = typeDictionary[type];
    return translatedType;
  };

  var generateFeaturesIcons = function (features) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < features.length; i++) {
      var icon = createFeatureIcon(features[i]);

      fragment.appendChild(icon);
    }

    return fragment;
  };

  var createFeatureIcon = function (feature) {
    var icon = document.createElement('span');
    icon.classList.add('feature__image');
    icon.classList.add('feature__image--' + feature);

    return icon;
  };

  return {
    generateDialog: generateDialog,
  };
})();
