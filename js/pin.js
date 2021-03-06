'use strict';

window.pin = (function () {
  var ENTER_KEY_CODE = 13;
  var INITIAL_ADS_NUMBER = 3;
  var MARKER_WIDTH = 56;
  var MARKER_HEIGHT = 75;
  var URL = 'https://intensive-javascript-server-kjgvxfepjl.now.sh/keksobooking/data';
  var adsList = [];
  var adsHTML;

  var generateAdsHTML = function (list) {
    adsList = list;

    var fragment = document.createDocumentFragment();

    list.forEach(function (it, i) {
      var adElement = createAdElement(it, MARKER_WIDTH, MARKER_HEIGHT);
      addClickListener(adElement, i);
      addKeydownListener(adElement, i);
      fragment.appendChild(adElement);
    });

    adsHTML = fragment;
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
    window.card.display();
    window.showCard(adsList[adNum]);
    window.card.addListeners();
  };

  var onAdKeydown = function (evt, adNum) {
    if (evt.keyCode === ENTER_KEY_CODE) {
      onAdClick(evt, adNum);
    }
  };

  var diactivateAd = function () {
    var activeAd = document.querySelector('.pin--active');

    if (activeAd !== null) {
      activeAd.classList.remove('pin--active');
    }
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

  var appendAds = function (map) {
    map.appendChild(adsHTML);
  };

  var errorMsgFormat = function (element, text) {
    element.style.position = 'fixed';
    element.style.top = '0px';
    element.style.left = '0px';
    element.style.backgroundColor = '#e53b3b';
    element.style.color = 'white';
    element.style.color = 'white';
    element.style.minHeight = '30px';
    element.style.width = '100%';
    element.style.padding = '5px';
    element.style.boxSizing = 'border-box';
    element.style.textAlign = 'center';
    element.style.zIndex = 100;
    element.textContent = text;
  };

  var renderAds = function (ads) {
    removePins(window.map.mapElement);
    if (ads.length > 0) {
      generateAdsHTML(ads);
      appendAds(window.map.mapElement);
      window.showCard(ads[0]);
      window.card.addListeners();
    }
  };

  var onLoadSuccess = function (data) {
    var adsToDisplay = data.sort(function () {
      return 0.5 - Math.random();
    }).slice(0, INITIAL_ADS_NUMBER);

    renderAds(adsToDisplay);
  };

  var onLoadError = function (errorMsg) {
    var errorBlock = document.createElement('div');
    errorMsgFormat(errorBlock, errorMsg);
    document.body.appendChild(errorBlock);
  };

  var removePins = function (map) {
    var pin;
    while ((pin = map.querySelector('.pin:not(.pin__main)')) !== null) {
      pin.parentNode.removeChild(pin);
    }
  };

  window.load(URL, onLoadSuccess, onLoadError);

  return {
    diactivateActiveAd: diactivateAd,
    URL: URL,
    onLoadError: onLoadError,
    renderAds: renderAds,
  };
})();
