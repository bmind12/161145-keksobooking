'use strict';

var TITLE_LIST = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
var TYPE_LIST = ['flat', 'house', 'bungalo'];
var CHECKIN_LIST = ['12:00', '13:00', '14:00'];
var CHECKOUT_LIST = ['12:00', '13:00', '14:00'];
var FEATURES_LIST = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
var AD_LIST_LENGTH = 8;
var MARKER_WIDTH = 56;
var MARKER_HEIGHT = 75;
var ESC_KEY_CODE = 27;
var ENTER_KEY_CODE = 13;

var adsList = generateAds();
var adsHTML = generateAdsHTML(adsList);
var map = document.querySelector('.tokyo__pin-map');
var dialog = document.querySelector('#offer-dialog');
var dialogClose = document.querySelector('.dialog__close');

appendAds();
generateDialog(adsList[0]);

function generateAds() {
  var adList = [];

  for (var i = 1; i <= AD_LIST_LENGTH; i++) {

    var newAd = createAd({
      imgNum: i > 9 ? String(i) : '0' + i,
      offerTitle: TITLE_LIST[getRandomIntInclusive(0, TITLE_LIST.length - 1)],
      offerPrice: getRandomIntInclusive(1000, 1000000),
      offerType: TYPE_LIST[getRandomIntInclusive(0, 2)],
      offerRooms: getRandomIntInclusive(1, 5),
      offerGuests: getRandomIntInclusive(1, 10),
      offerCheckin: CHECKIN_LIST[getRandomIntInclusive(0, 2)],
      offerCheckout: CHECKOUT_LIST[getRandomIntInclusive(0, 2)],
      offerFeatures: getRandomElements(FEATURES_LIST),
      locationX: getRandomIntInclusive(300, 900),
      locationY: getRandomIntInclusive(100, 500),
    });

    adList.push(newAd);
  }

  return adList;
}

function generateAdsHTML(list) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < list.length; i++) {
    var adElement = createAdElement(list[i], MARKER_WIDTH, MARKER_HEIGHT);

    (function (i) {
      adElement.addEventListener('click', function (evt) {
        onAdClick(evt, i);
      });
    })(i);

    (function (i) {
      adElement.addEventListener('keydown', function (evt) {
        onAdKeydown(evt, i);
      });
    })(i);

    fragment.appendChild(adElement);
  }

  return fragment;
}

function createAdElement(elementData, markerWidth, markerHeight) {
  var element = document.createElement('div');
  var elementImg = document.createElement('img');

  element.className = 'pin';
  element.style.left = (elementData.location.x - markerWidth / 2) + 'px';
  element.style.top = (elementData.location.y - markerHeight) + 'px';
  elementImg.src = elementData.author.avatar;
  elementImg.style.borderRadius = '50%';
  elementImg.style.width = '40px';
  element.appendChild(elementImg);
  element.tabIndex = '0';

  return element;
}

function generateDialog(featuredItem) {
  var template = document.querySelector('#lodge-template');
  var dialogMockup = document.querySelector('#offer-dialog');
  var dialog = template.content.cloneNode(true);
  var guestsText = 'Для ' + featuredItem.offer.guests + ' гостей в ' +
    featuredItem.offer.rooms + ' комнатах';
  var timeText = 'Заезд после ' + featuredItem.offer.checkin + ', выезд до ' +
    featuredItem.offer.checkout;
  var avatarSrc = '' + featuredItem.author.avatar;

  fillLodgeElement(dialog, 'title', featuredItem.offer.title);
  fillLodgeElement(dialog, 'address', featuredItem.offer.address);
  fillLodgeElement(dialog, 'type', translateType(featuredItem.offer.type));
  fillLodgeElement(dialog, 'rooms-and-guests', guestsText);
  fillLodgeElement(dialog, 'checkin-time', timeText);
  fillLodgeElement(dialog, 'description', featuredItem.offer.description);

  dialog
    .querySelector('.lodge__price')
    .innerHTML = featuredItem.offer.price + '&#x20bd;/ночь';

  dialog
    .querySelector('.lodge__features')
    .appendChild(generateFeaturesIcons(featuredItem.offer.features));

  addDialogListeners();

  dialogMockup.querySelector('.dialog__title img').src = avatarSrc;
  dialogMockup
    .replaceChild(dialog, dialogMockup.querySelector('.dialog__panel'));
}

function addDialogListeners() {
  document.addEventListener('keydown', onDialogKeydown);
  dialogClose.addEventListener('click', onDialogCloseClick);
  dialogClose.addEventListener('keydown', onDialogCloseKeydown);
}

function appendAds() {
  map.appendChild(adsHTML);
}

function fillLodgeElement(lodge, element, content) {
  var selector = '.lodge__' + element;

  lodge.querySelector(selector).textContent = content;
}

function createAd(adData) {
  var ad = {
    author: {
      avatar: 'img/avatars/user' + adData.imgNum + '.png',
    },
    offer: {
      title: adData.offerTitle,
      address: adData.locationX + ', ' + adData.locationY,
      price: adData.offerPrice,
      type: adData.offerType,
      rooms: adData.offerRooms,
      guests: adData.offerGuests,
      checkin: adData.offerCheckin,
      checkout: adData.offerCheckout,
      features: adData.offerFeatures,
      description: '',
      photos: [],
    },
    location: {
      x: adData.locationX,
      y: adData.locationY,
    },
  };

  return ad;
}

function translateType(type) {
  var typeDictionary = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
  };

  var translatedType = typeDictionary[type];

  return translatedType;
}

function generateFeaturesIcons(features) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < features.length; i++) {
    var icon = createFeatureIcon(features[i]);

    fragment.appendChild(icon);
  }

  return fragment;
}

function createFeatureIcon(feature) {
  var icon = document.createElement('span');
  icon.classList.add('feature__image');
  icon.classList.add('feature__image--' + feature);

  return icon;
}

function getRandomElements(list) {
  var randomList = [];

  for (var i = 0; i < list.length; i++) {
    if (Math.random() > 0.5) {
      randomList.push(list[i]);
    }
  }

  return randomList;
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function onDialogCloseClick() {
  diactivateActiveAd();
  hideDialog();
}

function onDialogCloseKeydown(evt) {
  if (evt.keyCode === ENTER_KEY_CODE) {
    diactivateActiveAd();
    hideDialog();
  }
}

function onDialogKeydown(evt) {
  if (evt.keyCode === ESC_KEY_CODE) {
    diactivateActiveAd();
    hideDialog();
  }
}

function hideDialog() {
  document.removeEventListener('keydown', onDialogKeydown);
  dialogClose.removeEventListener('click', onDialogCloseClick);
  dialogClose.removeEventListener('keydown', onDialogCloseKeydown);
  dialog.style.display = 'none';
}

function showDialog() {
  dialog.style.display = 'block';
}

function onAdClick(evt, adNum) {
  diactivateActiveAd();
  evt.currentTarget.classList.add('pin--active');
  showDialog();
  generateDialog(adsList[adNum]);
}

function onAdKeydown(evt, adNum) {
  if (evt.keyCode === ENTER_KEY_CODE) {
    diactivateActiveAd();
    evt.currentTarget.classList.add('pin--active');
    showDialog();
    generateDialog(adsList[adNum]);
  }
}

function diactivateActiveAd() {
  var activeAd = document.querySelector('.pin--active');

  if (activeAd) {
    activeAd.classList.remove('pin--active');
  }
}
