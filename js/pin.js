'use strict';

window.pin = (function () {

  var INITIAL_ADS_NUMBER = 3;
  var MARKER_WIDTH = 56;
  var MARKER_HEIGHT = 75;
  var URL = 'https://intensive-javascript-server-kjgvxfepjl.now.sh/keksobooking/data';

  var generateAdsHTML = function (list) {

    window.adsList = list;

    var fragment = document.createDocumentFragment();

    for (var i = 0; i < list.length; i++) {
      var adElement = createAdElement(list[i], MARKER_WIDTH, MARKER_HEIGHT);
      addClickListener(adElement, i);

      addKeydownListener(adElement, i);
      fragment.appendChild(adElement);

    }
    window.adsHTML = fragment;
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
    window.card.show();
    window.showCard.generate(window.adsList[adNum]);
    window.card.addListeners();
  };

  var onAdKeydown = function (evt, adNum) {
    if (evt.keyCode === window.ENTER_KEY_CODE) {
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
    map.appendChild(window.adsHTML);
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
      window.showCard.generate(ads[0]);
      window.card.addListeners();
    }
  };

  var onLoadSuccess = function (data) {
    data.sort(function () {
      return 0.5 - Math.random();
    });
    data.length = INITIAL_ADS_NUMBER;
    renderAds(data);
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

  return {
    diactivateActiveAd: diactivateAd,
    URL: URL,
    onLoadError: onLoadError,
    onLoadSuccess: onLoadSuccess,
    renderAds: renderAds,
  };
})();

window.load(
    window.pin.URL,
    window.pin.onLoadSuccess,
    window.pin.onLoadError
);
