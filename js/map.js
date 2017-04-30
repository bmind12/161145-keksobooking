'use strict';

window.map = (function () {
  var MAP_ELEMENT = document.querySelector('.tokyo__pin-map');
  var MAIN_PIN = document.querySelector('.pin__main');
  var MAX_LEFT_OFFSET = 300;
  var MAX_RIGHT_OFFSET = 900;
  var MAX_TOP_OFFSET = 100;
  var MAX_BOTTOM_OFFSET = 500;

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

      var moveItem = function (item, shift) {
        if (item.offsetTop - shift.y < MAX_TOP_OFFSET) {
          item.style.top = MAX_TOP_OFFSET + 'px';
        } else if (item.offsetTop - shift.y > MAX_BOTTOM_OFFSET) {
          item.style.top = MAX_BOTTOM_OFFSET + 'px';
        } else {
          item.style.top = (item.offsetTop - shift.y) + 'px';
        }

        if (item.offsetLeft - shift.x < MAX_LEFT_OFFSET) {
          item.style.left = MAX_LEFT_OFFSET + 'px';
        } else if (item.offsetLeft - shift.x > MAX_RIGHT_OFFSET) {
          item.style.left = MAX_RIGHT_OFFSET + 'px';
        } else {
          item.style.left = (item.offsetLeft - shift.x) + 'px';
        }
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

        moveItem(draggbleElem, shift);

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

  makeDraggble(MAIN_PIN, document.querySelector('#address'));

  return {
    mapElement: MAP_ELEMENT,
    mainPin: MAIN_PIN,
  };
})();
