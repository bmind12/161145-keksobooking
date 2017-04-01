'use strict';

var TITLE_LIST = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPE_LIST = ['flat', 'house', 'bungalo'];
var CHECKIN_LIST = ['12:00', '13:00', '14:00'];
var CHECKOUT_LIST = ['12:00', '13:00', '14:00'];
var FEATURES_LIST = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var AD_LIST_LENGTH = 8;
var MAP_CLASS = 'tokyo__pin-map';

var adsList = generateAds();
var adsHTML = generateAdsHTML(adsList);
appendAds(adsHTML, MAP_CLASS);
generateLodge(adsList[0]);

function generateAds() {
  var adList = [];

  for (var i = 1; i <= AD_LIST_LENGTH; i++) {
    var imgNum = i > 9 ? i : '0' + i;
    var offerTitle = TITLE_LIST[i / TITLE_LIST.length];
    var offerPrice = getRandomIntInclusive(1000, 1000000);
    var offerType = TYPE_LIST[getRandomIntInclusive(0, 2)];
    var offerRooms = getRandomIntInclusive(1, 5);
    var offerGuests = Math.random().toFixed(1) * 10;
    var offerCheckin = CHECKIN_LIST[getRandomIntInclusive(0, 2)];
    var offerCheckout = CHECKOUT_LIST[getRandomIntInclusive(0, 2)];
    var offerFeatures = getRandomElements(FEATURES_LIST);
    var locationX = getRandomIntInclusive(300, 900);
    var locationY = getRandomIntInclusive(100, 500);

    var newAd = new Ad(imgNum, offerTitle, offerPrice, offerType, offerRooms, offerGuests, offerCheckin, offerCheckout, offerFeatures, locationX, locationY);

    adList.push(newAd);
  }

  return adList;
}

function generateAdsHTML(list) {
  var fragment = document.createDocumentFragment();
  var markerWidth = 56;
  var marketHeight = 75;

  for (var i = 0; i < list.length; i++) {
    var adElement = document.createElement('div');
    adElement.className = 'pin';
    adElement.style.left = (list[i].location.x - markerWidth / 2) + 'px';
    adElement.style.top = (list[i].location.y - marketHeight) + 'px';

    var adElementImg = document.createElement('img');
    adElementImg.src = list[i].author.avatar;

    adElement.appendChild(adElementImg);
    fragment.appendChild(adElement);
  }

  return fragment;
}

function appendAds(ads) {
  var map = document.querySelector(MAP_CLASS);

  map.appendChild(ads);
}

function generateLodge(featuredItem) {
  var template = document.querySelector('#lodge-template');
  var lodgeMockup = document.querySelector('#offer-dialog');
  var lodge = template.content.cloneNode(true);

  lodge.querySelector('.lodge__title').textContent = featuredItem.offer.title;
  lodge.querySelector('.lodge__address').textContent = featuredItem.offer.address;
  lodge.querySelector('.lodge__price').innerHTML = featuredItem.offer.price + '&#x20bd;/ночь';
  lodge.querySelector('.lodge__type').textContent = translateType(featuredItem.offer.type);
  lodge.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + featuredItem.offer.guests + ' гостей в ' + featuredItem.offer.rooms + ' комнатах';
  lodge.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + featuredItem.offer.checkin + ', выезд до ' + featuredItem.offer.checkout;
  lodge.querySelector('.lodge__features').appendChild(getFormattedFeatures(featuredItem.offer.features));
  lodge.querySelector('.lodge__description').textContent = featuredItem.offer.description;
  lodgeMockup.replaceChild(lodge, lodgeMockup.querySelector('.dialog__panel'));
}

function Ad(avatarNum, title, price, type, rooms, guests, checkin, checkout, features, x, y) {
  this.author = {
    avatar: 'img/avatars/user{{' + avatarNum + '}}.png',
  };
  this.offer = {
    title: title,
    address: x + ', ' + y,
    price: price,
    type: type,
    rooms: rooms,
    guests: guests,
    checkin: checkin,
    checkout: checkout,
    features: features,
    description: '',
    photos: [],
  };
  this.location = {
    x: x,
    y: y,
  };
}

// function getMarkerStyle(styleName) {
//   var element = document.querySelector('.pin');
//   var style = window.getComputedStyle(element);
//   var value = parseInt(style.getPropertyValue(styleName));
//
//   return value;
// }

function translateType(type) {
  var translatedType;

  switch (type) {
    case 'flat':
      translatedType = 'Квартира';
      break;
    case 'bungalo':
      translatedType = 'Бунгало';
      break;
    case 'house':
      translatedType = 'Дом';
      break;
  }

  return translatedType;
}

function getFormattedFeatures(featuresList) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < featuresList.length; i++) {
    var feature = document.createElement('span');
    feature.classList.add('feature__image');
    feature.classList.add('feature__image--' + featuresList[i]);
    fragment.appendChild(feature);
  }

  return fragment;
}

function getRandomElements(list) {
  var randomList = [];
  var counter = 0;

  for (var i = 0; i < list.length; i++) {
    if (Math.random() > 0.5) {
      randomList[counter++] = list[i];
    }
  }

  return randomList;
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}
