'use strict';

window.ESC_KEY_CODE = 27;
window.ENTER_KEY_CODE = 13;
window.map = (function () {
  var mapElement = document.querySelector('.tokyo__pin-map');
  var pinMain = document.querySelector('.pin__main');

  var makeDraggble = function (draggbleElem, addressElem) {
    draggbleElem.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var elemHeight = draggbleElem.offsetHeight;
      var elemHalfWidth = Math.floor(draggbleElem.offsetWidth / 2);

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var displayAddress = function (element, x, y) {
        element.value = x + ', ' + y;
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        draggbleElem.style.top = (draggbleElem.offsetTop - shift.y) + 'px';
        draggbleElem.style.left = (draggbleElem.offsetLeft - shift.x) + 'px';

        var pointerX = parseInt(draggbleElem.style.left, 10) + elemHalfWidth;
        var pointerY = parseInt(draggbleElem.style.top, 10) + elemHeight;
        displayAddress(addressElem, pointerX, pointerY);
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      var onAddressChange = function () {
        var address = JSON.parse('[' + addressElem.value + ']');
        var inputX = address[0];
        var inputY = address[1];

        draggbleElem.style.top = (inputY - elemHeight) + 'px';
        draggbleElem.style.left = (inputX - elemHalfWidth) + 'px';
      };

      document.addEventListener('change', onAddressChange);
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  };

  return {
    mapElement: mapElement,
    pinMain: pinMain,
    makeDraggble: makeDraggble,
  };
})();

window.pin.appendAds(window.map.mapElement);
window.card.generateDialog(window.adsList[0]);
window.map.makeDraggble(window.map.pinMain, document.querySelector('#address'));
