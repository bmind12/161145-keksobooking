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
var MAP_CLASS = 'tokyo__pin-map';
var MARKER_WIDTH = 56;
var MARKER_HEIGHT = 75;
/*
 Перенес эти переменные наверх. Если их оставить перед функцией, они не успевают декларироваться.
 */

var adsList = generateAds();
var adsHTML = generateAdsHTML(adsList);

appendAds(adsHTML, MAP_CLASS);
generateLodge(adsList[0]);

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
  element.appendChild(elementImg);

  return element;
}

function appendAds(ads, mapClass) {
  var map = document.querySelector('.' + mapClass);

  map.appendChild(ads);
}

function generateLodge(featuredItem) {
  var template = document.querySelector('#lodge-template');
  var lodgeMockup = document.querySelector('#offer-dialog');
  var lodge = template.content.cloneNode(true);

  fillLodgeElement(lodge, 'title', featuredItem.offer.title);
  fillLodgeElement(lodge, 'address', featuredItem.offer.address);
  fillLodgeElement(lodge, 'type', translateType(featuredItem.offer.type));
  fillLodgeElement(lodge, 'rooms-and-guests', 'Для ' + featuredItem.offer.guests
    + ' гостей в ' + featuredItem.offer.rooms + ' комнатах');
  fillLodgeElement(lodge, 'checkin-time', 'Заезд после '
    + featuredItem.offer.checkin + ', выезд до ' + featuredItem.offer.checkout);
  /*
   Не уверен на счет такого переноса параметров. Но а как быть? Они даже в
   одну строку в переменную не помещаются.
   */
  fillLodgeElement(lodge, 'description', featuredItem.offer.description);

  var lodgePrice = featuredItem.offer.price + '&#x20bd;/ночь';
  lodge.querySelector('.lodge__price').innerHTML = lodgePrice;

  var lodgeFeaturesIcons = generateFeaturesIcons(featuredItem.offer.features);
  lodge.querySelector('.lodge__features').appendChild(lodgeFeaturesIcons);
  /*
   Не знаю насколько это нормально - создавать пару переменных, только потому,
   что они не влазят в ширину строки. А если быть последовательеым и все
   параметры в переменные загонять, то становиться грамоздко.
   */

  lodgeMockup.replaceChild(lodge, lodgeMockup.querySelector('.dialog__panel'));
}

function fillLodgeElement(lodge, element, content) {
  var selector = '.lodge__' + element;

  lodge.querySelector(selector).textContent = content;
}

function createAd(adData) {

  var ad = {
    author: {
      avatar: 'img/avatars/user{{' + adData.imgNum + '}}.png',
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
    var feature = document.createElement('span');
    feature.classList.add('feature__image'); // createFeature
    feature.classList.add('feature__image--' + features[i]);
    fragment.appendChild(feature);
  }

  return fragment;
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
