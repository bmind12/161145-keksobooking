'use strict';

var TITLE_LIST = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPE_LIST = ['flat', 'house', 'bungalo'];
var CHECKIN_LIST = ['12:00', '13:00', '14:00'];
var CHECKOUT_LIST = ['12:00', '13:00', '14:00'];
var FEATURES_LIST = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var AD_LIST_LENGTH = 8;

var adList = [];

for (var i = 1; i <= AD_LIST_LENGTH; i++) {
  var avatarNum = i > 9 ? i : '0' + i;
  var offerTitle = TITLE_LIST.length % i;
  var offerPrice = getRandomIntInclusive(1000, 1000000);
  var offerType = TYPE_LIST[getRandomIntInclusive(0, 2)];
  var offerRooms = getRandomIntInclusive(1, 5);
  var offerGuests = Math.random().toFixed(1) * 10;
  var offerCheckin = CHECKIN_LIST[getRandomIntInclusive(0, 2)];
  var offerCheckout = CHECKOUT_LIST[getRandomIntInclusive(0, 2)];
  var offerFeatures = getRandomElements(FEATURES_LIST);
  var locationX = getRandomIntInclusive(300, 900);
  var locationY = getRandomIntInclusive(100, 500);

  var newAd = new Ad(avatarNum, offerTitle, offerPrice, offerType, offerRooms, offerGuests, offerCheckin, offerCheckout, offerFeatures, locationX, locationY);

  adList.push(newAd);
}

console.log(adList);

function Ad(imgNum, title, price, type, rooms, guests, checkin, checkout, features, x, y) {
  this.author = {
    avatar: 'img/avatars/user{{' + imgNum + '}}.png',
  };
  this.offer = {
    title: title,
    address: "{{location.x}}, {{location.y}}",
    price: price,
    type: type,
    rooms: rooms,
    guests: guests,
    checkin: checkin,
    checkout: checkout,
    features: features,
    description: "",
    photos: [],
  };
  this.location = {
    x: x,
    y: y,
  }
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
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
