'use strict';

window.ESC_KEY_CODE = 27;
window.ENTER_KEY_CODE = 13;
window.map = (function () {
  var mapElement = document.querySelector('.tokyo__pin-map');
  return {
    mapElement: mapElement,
  };
})();

window.pin.appendAds(window.map.mapElement);
window.card.generateDialog(window.adsList[0]);
