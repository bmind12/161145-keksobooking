'use strict';

window.card = (function () {

  var dialog = document.querySelector('#offer-dialog');
  var dialogClose = document.querySelector('.dialog__close');

  var onCloseClick = function () {
    hide();
  };

  var onCloseKeydown = function (evt) {
    if (evt.keyCode === window.ENTER_KEY_CODE) {
      hide();
    }
  };

  var onKeydown = function (evt) {
    if (evt.keyCode === window.ESC_KEY_CODE) {
      hide();
    }
  };

  var addListeners = function () {
    document.addEventListener('keydown', onKeydown);
    dialogClose.addEventListener('click', onCloseClick);
    dialogClose.addEventListener('keydown', onCloseKeydown);
  };

  var display = function () {
    dialog.style.display = 'block';
  };

  var hide = function () {
    window.pin.diactivateActiveAd();
    document.removeEventListener('keydown', onKeydown);
    dialogClose.removeEventListener('click', onCloseClick);
    dialogClose.removeEventListener('keydown', onCloseKeydown);
    dialog.style.display = 'none';
  };

  return {
    display: display,
    addListeners: addListeners,
  };
})();
