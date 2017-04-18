'use strict';

window.pin = (function () {
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

  var generateAds = function () {
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

  };

  var generateAdsHTML = function (list) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < list.length; i++) {
      var adElement = createAdElement(list[i], MARKER_WIDTH, MARKER_HEIGHT);
      addClickListener(adElement, i);

      addKeydownListener(adElement, i);
      fragment.appendChild(adElement);

    }
    return fragment;

  };

  var addClickListener = function (element, markerNum) {
    element.addEventListener('click', function (evt) {
      onAdClick(evt, markerNum);
    });
  };

  var addKeydownListener = function (element, markerNum) {
    element.addEventListener('keydown', function (evt) {
      onAdKeydown(evt, markerNum);
    });
  };

  var onAdClick = function (evt, adNum) {
    diactivateAd();
    evt.currentTarget.classList.add('pin--active');
    window.card.showDialog();
    window.card.generateDialog(window.adsList[adNum]);
  };

  var onAdKeydown = function (evt, adNum) {
    if (evt.keyCode === window.ENTER_KEY_CODE) {
      onAdClick(evt, adNum);
    }
  };

  var diactivateAd = function () {
    var activeAd = document.querySelector('.pin--active');

    if (activeAd) {
      activeAd.classList.remove('pin--active');
    }
  };

  var createAd = function (adData) {
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

  };

  var createAdElement = function (elementData, markerWidth, markerHeight) {
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

  };

  var getRandomElements = function (list) {
    var randomList = [];

    for (var i = 0; i < list.length; i++) {
      if (Math.random() > 0.5) {
        randomList.push(list[i]);
      }
    }
    return randomList;

  };

  var getRandomIntInclusive = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;

  };

  var appendAds = function (map) {
    map.appendChild(window.adsHTML);
  };

  return {
    generateAds: generateAds,
    generateAdsHTML: generateAdsHTML,
    appendAds: appendAds,
    diactivateActiveAd: diactivateAd,
  };
})();

window.adsList = window.pin.generateAds();
window.adsHTML = window.pin.generateAdsHTML(window.adsList);
