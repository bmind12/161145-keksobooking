'use strict';

window.pin = (function () {

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
    window.card.showDialog();
    window.showCard.generateDialog(window.adsList[adNum]);
    window.card.addDialogListeners();
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

  var loadError = function (errorMsg) {
    var errorBlock = document.createElement('div');
    window.pin.errorMsgFormat(errorBlock, errorMsg);
    document.body.appendChild(errorBlock);
  };

  var drawAds = function (ads) {
    window.pin.generateAdsHTML(ads);
    window.pin.appendAds(window.map.mapElement);
    window.showCard.generateDialog(ads[0]);
    window.card.addDialogListeners();
    window.map.makeDraggble(
        window.map.pinMain,
        document.querySelector('#address')
    );
  };

  return {
    generateAdsHTML: generateAdsHTML,
    appendAds: appendAds,
    diactivateActiveAd: diactivateAd,
    URL: URL,
    errorMsgFormat: errorMsgFormat,
    loadError: loadError,
    drawAds: drawAds,
  };
})();

window.load(
    window.pin.URL,
    window.pin.drawAds,
    window.pin.loadError
);
