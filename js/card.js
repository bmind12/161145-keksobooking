'use strict';

window.card = (function () {

  var dialog = document.querySelector('#offer-dialog');
  var dialogClose = document.querySelector('.dialog__close');

  var generateDialog = function (featuredItem) {
    var template = document.querySelector('#lodge-template');
    var dialogMockup = document.querySelector('#offer-dialog');
    var guestsText = 'Для ' + featuredItem.offer.guests + ' гостей в ' +
      featuredItem.offer.rooms + ' комнатах';
    var timeText = 'Заезд после ' + featuredItem.offer.checkin + ', выезд до ' +
      featuredItem.offer.checkout;
    var avatarSrc = '' + featuredItem.author.avatar;
    var dialogClone = template.content.cloneNode(true);

    fillLodgeElement(dialogClone, 'title', featuredItem.offer.title);
    fillLodgeElement(dialogClone, 'address', featuredItem.offer.address);
    fillLodgeElement(dialogClone, 'type', translateType(featuredItem.offer.type));
    fillLodgeElement(dialogClone, 'rooms-and-guests', guestsText);
    fillLodgeElement(dialogClone, 'checkin-time', timeText);
    fillLodgeElement(dialogClone, 'description', featuredItem.offer.description);

    dialogClone
      .querySelector('.lodge__price')
      .innerHTML = featuredItem.offer.price + '&#x20bd;/ночь';

    dialogClone
      .querySelector('.lodge__features')
      .appendChild(generateFeaturesIcons(featuredItem.offer.features));

    addDialogListeners();

    dialogMockup.querySelector('.dialog__title img').src = avatarSrc;
    dialogMockup
      .replaceChild(dialogClone, dialogMockup.querySelector('.dialog__panel'));
  };

  var addDialogListeners = function () {
    document.addEventListener('keydown', onDialogKeydown);
    dialogClose.addEventListener('click', onDialogCloseClick);
    dialogClose.addEventListener('keydown', onDialogCloseKeydown);
  };

  var fillLodgeElement = function (lodge, element, content) {
    var selector = '.lodge__' + element;

    lodge.querySelector(selector).textContent = content;
  };

  var translateType = function (type) {
    var typeDictionary = {
      flat: 'Квартира',
      bungalo: 'Бунгало',
      house: 'Дом',
    };

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

  var onDialogCloseClick = function () {
    hideDialog();
  };

  var onDialogCloseKeydown = function (evt) {
    if (evt.keyCode === window.ENTER_KEY_CODE) {
      hideDialog();
    }
  };

  var onDialogKeydown = function (evt) {
    if (evt.keyCode === window.ESC_KEY_CODE) {
      hideDialog();
    }
  };

  var hideDialog = function () {
    window.pin.diactivateActiveAd();
    document.removeEventListener('keydown', onDialogKeydown);
    dialogClose.removeEventListener('click', onDialogCloseClick);
    dialogClose.removeEventListener('keydown', onDialogCloseKeydown);
    dialog.style.display = 'none';
  };

  var showDialog = function () {
    dialog.style.display = 'block';
  };

  return {
    generateDialog: generateDialog,
    showDialog: showDialog,
  };
})();
